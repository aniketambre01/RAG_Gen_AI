"""
document_loader.py

Loads PDF, DOCX, and TXT files and splits them into chunks
for embedding into the vector database.
"""

import os

from dotenv import load_dotenv

from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    Docx2txtLoader,
)

from langchain_text_splitters import RecursiveCharacterTextSplitter


# Load environment variables
load_dotenv()


class DocumentLoader:
    def __init__(self):
        self.chunk_size = int(os.getenv("CHUNK_SIZE", 1000))
        self.chunk_overlap = int(os.getenv("CHUNK_OVERLAP", 200))

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size,
            chunk_overlap=self.chunk_overlap,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                "",
            ],
        )

    def load_document(self, file_path: str):
        """
        Load a single document based on file extension.

        Returns:
            List[Document]
        """

        extension = os.path.splitext(file_path)[1].lower()

        if extension == ".pdf":
            loader = PyPDFLoader(file_path)

        elif extension == ".docx":
            loader = Docx2txtLoader(file_path)

        elif extension == ".txt":
            loader = TextLoader(file_path, encoding="utf-8")

        else:
            raise ValueError(f"Unsupported file type: {extension}")

        documents = loader.load()

        return documents

    def split_documents(self, documents):
        """
        Split loaded documents into chunks.
        """

        chunks = self.text_splitter.split_documents(documents)

        for i, chunk in enumerate(chunks):
            chunk.metadata["chunk"] = i + 1

        return chunks

    def load_and_split(self, file_path: str):
        """
        Complete pipeline.

        File
            ↓
        Load
            ↓
        Split
            ↓
        Return Chunks
        """

        documents = self.load_document(file_path)

        chunks = self.split_documents(documents)

        filename = os.path.basename(file_path)

        for chunk in chunks:
            chunk.metadata["source"] = filename

        return chunks

    def load_multiple_files(self, file_paths):
        """
        Load and split multiple files.

        Returns:
            List[Document]
        """

        all_chunks = []

        for file in file_paths:
            chunks = self.load_and_split(file)
            all_chunks.extend(chunks)

        return all_chunks