"""
vector_store.py

Handles:
1. Creating a persistent Chroma database
2. Loading an existing database
3. Adding new documents
4. Similarity search
5. Deleting the database
"""

import os
import shutil

from dotenv import load_dotenv
from langchain_chroma import Chroma

from utils.embeddings import MistralEmbeddings

load_dotenv()


class VectorStore:

    def __init__(self):

        self.persist_directory = os.getenv(
            "CHROMA_DB_PATH",
            "./database"
        )

        os.makedirs(self.persist_directory, exist_ok=True)

        self.embedding = MistralEmbeddings()

        self.vectordb = Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embedding,
        )

    def add_documents(self, documents):
        """
        Add documents to the vector database.
        """

        if not documents:
            return

        self.vectordb.add_documents(documents)

    def similarity_search(self, query, k=5):
        """
        Perform semantic search.

        Returns:
            List[Document]
        """

        return self.vectordb.similarity_search(
            query=query,
            k=k,
        )

    def similarity_search_with_score(self, query, k=5):
        """
        Search with similarity scores.

        Returns:
            [(Document, Score)]
        """

        return self.vectordb.similarity_search_with_score(
            query=query,
            k=k,
        )

    def document_count(self):
        """
        Returns number of chunks stored.
        """

        return self.vectordb._collection.count()

    def reset_database(self):
        """
        Delete entire Chroma database safely (Windows-safe version).
        """

        try:
            import gc

            # Step 1: Ask Chroma to properly delete its own collection
            # This closes things out through Chroma's API instead of
            # yanking the sqlite file out from under an open connection.
            if hasattr(self, "vectordb"):
                try:
                    self.vectordb.delete_collection()
                except Exception:
                    # Collection might not exist yet, or already be gone — ignore
                    pass

            # Step 2: Drop the Python reference and force garbage collection
            # so any lingering sqlite connection object gets released.
            if hasattr(self, "vectordb"):
                del self.vectordb

            gc.collect()

            # Step 3: Now it's safer to remove the folder on disk.
            if os.path.exists(self.persist_directory):
                shutil.rmtree(
                    self.persist_directory,
                    ignore_errors=True
                )

            # Step 4: Recreate empty directory
            os.makedirs(
                self.persist_directory,
                exist_ok=True
            )

            # Step 5: Create a fresh Chroma database
            self.vectordb = Chroma(
                persist_directory=self.persist_directory,
                embedding_function=self.embedding
            )

        except Exception as e:
            raise RuntimeError(
                f"Database reset failed: {str(e)}"
            )
    def is_empty(self):
        """
        Check whether database contains vectors.
        """

        return self.document_count() == 0

    def get_retriever(self, k=5):
        """
        Return LangChain Retriever.
        """

        return self.vectordb.as_retriever(
            search_kwargs={"k": k}
        )