from __future__ import annotations

from sentence_transformers import SentenceTransformer

from app.services.embedding.base import EmbeddingProvider


class LocalEmbeddingProvider(EmbeddingProvider):
    """Local embedding provider using Sentence Transformers."""

    def __init__(
        self,
        model_name: str = "BAAI/bge-small-en-v1.5",
    ) -> None:
        self.model_name = model_name
        self.model = SentenceTransformer(model_name)

    def embed_documents(
        self,
        texts: list[str],
    ) -> list[list[float]]:
        if not texts:
            return []

        embeddings = self.model.encode(
            texts,
            normalize_embeddings=True,
            convert_to_numpy=True,
        )

        return embeddings.tolist()

    def embed_query(
        self,
        text: str,
    ) -> list[float]:
        if not text.strip():
            raise ValueError("Query text cannot be empty")

        embedding = self.model.encode(
            text,
            normalize_embeddings=True,
            convert_to_numpy=True,
        )

        return embedding.tolist()

    @property
    def dimension(self) -> int:
        return 384