from dataclasses import dataclass
from pathlib import Path

from app.services.document.chunker import (
    DocumentChunk,
    DocumentChunker,
)
from app.services.document.parser import parse_document


@dataclass
class IngestedDocument:
    """Result of document parsing and chunking."""

    filename: str
    file_type: str
    text: str
    chunks: list[DocumentChunk]


class DocumentIngestionService:
    """Orchestrates document parsing and chunking."""

    def __init__(
        self,
        chunk_size: int = 1000,
        chunk_overlap: int = 200,
    ) -> None:
        self.chunker = DocumentChunker(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
        )

    def ingest(
        self,
        file_path: str | Path,
        *,
        document_id: str,
        project_id: str,
        user_id: str,
    ) -> IngestedDocument:
        path = Path(file_path)

        text = parse_document(path)

        chunks = self.chunker.chunk(
            text,
            document_id=document_id,
            project_id=project_id,
            user_id=user_id,
            filename=path.name,
            file_type=path.suffix.lower(),
        )

        return IngestedDocument(
            filename=path.name,
            file_type=path.suffix.lower(),
            text=text,
            chunks=chunks,
        )