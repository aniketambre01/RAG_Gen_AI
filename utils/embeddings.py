"""
embeddings.py

Mistral Embedding Wrapper for LangChain
"""

import os
import time
from typing import List

from dotenv import load_dotenv
from mistralai.client import Mistral

load_dotenv()


class MistralEmbeddings:
    """
    LangChain-compatible embedding class using the Mistral Embedding API.
    """

    def __init__(self):
        self.api_key = os.getenv("MISTRAL_API_KEY")

        if not self.api_key:
            raise ValueError("MISTRAL_API_KEY not found in .env")

        self.model = os.getenv("EMBEDDING_MODEL", "mistral-embed")

        self.client = Mistral(api_key=self.api_key)

        # Number of text chunks sent per API call
        self.batch_size = int(os.getenv("EMBED_BATCH_SIZE", 16))

        # Delay between successful batches (seconds) to avoid hitting rate limits
        self.batch_delay = float(os.getenv("EMBED_BATCH_DELAY", 1.0))

        # Max retries on rate-limit (429) errors
        self.max_retries = int(os.getenv("EMBED_MAX_RETRIES", 6))

    def _embed_batch(self, batch: List[str], depth: int = 0) -> List[List[float]]:
        """
        Embed a single batch. Handles:
        - "Too many tokens" (400) -> split batch in half and retry
        - "Rate limit exceeded" (429) -> wait with exponential backoff and retry
        """

        if not batch:
            return []

        attempt = 0

        while True:

            try:
                response = self.client.embeddings.create(
                    model=self.model,
                    inputs=batch,
                )

                embeddings = [item.embedding for item in response.data]

                if len(embeddings) != len(batch):
                    raise ValueError(
                        f"Mismatch: sent {len(batch)} texts, got {len(embeddings)} embeddings"
                    )

                return embeddings

            except Exception as e:

                error_str = str(e)

                # Too many tokens in this batch -> split in half and retry each half
                if ("Too many tokens" in error_str or "3210" in error_str) and len(batch) > 1:

                    mid = len(batch) // 2

                    left = self._embed_batch(batch[:mid], depth + 1)
                    right = self._embed_batch(batch[mid:], depth + 1)

                    return left + right

                # Single oversized chunk, nothing left to split
                if ("Too many tokens" in error_str or "3210" in error_str) and len(batch) == 1:
                    raise RuntimeError(
                        f"A single chunk is too large to embed even alone "
                        f"(length {len(batch[0])} chars). Reduce chunk_size in your "
                        f"document splitter. Original error: {error_str}"
                    )

                # Rate limit hit -> exponential backoff retry
                if ("429" in error_str or "rate_limited" in error_str or "1300" in error_str):

                    attempt += 1

                    if attempt > self.max_retries:
                        raise RuntimeError(
                            f"Rate limit exceeded after {self.max_retries} retries. "
                            f"Try lowering EMBED_BATCH_SIZE or increasing EMBED_BATCH_DELAY "
                            f"in your .env file. Original error: {error_str}"
                        )

                    wait_time = min(2 ** attempt, 30)  # 2s, 4s, 8s, 16s, 30s, 30s...

                    time.sleep(wait_time)

                    continue

                # Any other unexpected error -> re-raise
                raise

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for multiple documents, safely batched
        with rate-limit protection.
        """

        if not texts:
            return []

        all_embeddings: List[List[float]] = []

        total_batches = (len(texts) + self.batch_size - 1) // self.batch_size

        for batch_index, i in enumerate(range(0, len(texts), self.batch_size), start=1):

            batch = texts[i:i + self.batch_size]

            embeddings = self._embed_batch(batch)

            all_embeddings.extend(embeddings)

            # Gentle pause between batches to avoid tripping rate limits
            if batch_index < total_batches:
                time.sleep(self.batch_delay)

        return all_embeddings

    def embed_query(self, text: str) -> List[float]:
        """
        Generate embedding for a single query.
        """

        response = self.client.embeddings.create(
            model=self.model,
            inputs=[text],
        )

        return response.data[0].embedding