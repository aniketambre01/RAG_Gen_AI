from __future__ import annotations

from typing import Any

from qdrant_client import QdrantClient
from qdrant_client.http import models


class QdrantVectorStore:
    """Qdrant vector database service."""

    def __init__(
        self,
        url: str = "http://localhost:6333",
        collection_name: str = "document_chunks",
        vector_size: int = 384,
    ) -> None:
        self.url = url
        self.collection_name = collection_name
        self.vector_size = vector_size

        self.client = QdrantClient(url=self.url)

    def health_check(self) -> bool:
        """Check whether Qdrant is reachable."""
        try:
            self.client.get_collections()
            return True
        except Exception:
            return False

    def create_collection(self) -> None:
        """Create the collection if it does not already exist."""

        collections = self.client.get_collections()

        exists = any(
            collection.name == self.collection_name
            for collection in collections.collections
        )

        if exists:
            return

        self.client.create_collection(
            collection_name=self.collection_name,
            vectors_config=models.VectorParams(
                size=self.vector_size,
                distance=models.Distance.COSINE,
            ),
        )

    def collection_exists(self) -> bool:
        """Check whether the configured collection exists."""

        collections = self.client.get_collections()

        return any(
            collection.name == self.collection_name
            for collection in collections.collections
        )

    def upsert(
        self,
        points: list[models.PointStruct],
    ) -> None:
        """Insert or update vectors in Qdrant."""

        if not points:
            return

        self.client.upsert(
            collection_name=self.collection_name,
            points=points,
        )

    def search(
        self,
        query_vector: list[float],
        limit: int = 5,
    ) -> list[Any]:
        """Search for the most similar vectors."""

        return self.client.query_points(
            collection_name=self.collection_name,
            query=query_vector,
            limit=limit,
            with_payload=True,
        ).points
    