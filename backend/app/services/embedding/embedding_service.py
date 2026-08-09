from __future__ import annotations

from openai import OpenAI


class EmbeddingService:
    """Generate embeddings using OpenAI."""

    def __init__(
        self,
        api_key: str,
        model: str = "text-embedding-3-small",
    ) -> None:
        if not api_key:
            raise ValueError("OPENAI_API_KEY is not configured")

        self.client = OpenAI(api_key=api_key)
        self.model = model

    def embed_documents(
        self,
        texts: list[str],
    ) -> list[list[float]]:
        """Generate embeddings for multiple documents."""

        if not texts:
            return []

        response = self.client.embeddings.create(
            model=self.model,
            input=texts,
        )

        return [item.embedding for item in response.data]

    def embed_query(
        self,
        text: str,
    ) -> list[float]:
        """Generate an embedding for a user query."""

        if not text.strip():
            raise ValueError("Query text cannot be empty")

        response = self.client.embeddings.create(
            model=self.model,
            input=text,
        )

        return response.data[0].embedding