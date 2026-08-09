from dataclasses import dataclass

from langchain_text_splitters import RecursiveCharacterTextSplitter


@dataclass
class DocumentChunk:
    """Represents a single chunk of a document."""

    content: str
    chunk_index: int
    document_id: str
    project_id: str
    user_id: str
    filename: str
    file_type: str


class DocumentChunker:
    """Split extracted document text into retrieval-friendly chunks."""

    def __init__(
        self,
        chunk_size: int = 1000,
        chunk_overlap: int = 200,
    ) -> None:
        if chunk_size <= 0:
            raise ValueError("chunk_size must be greater than 0")

        if chunk_overlap < 0:
            raise ValueError("chunk_overlap cannot be negative")

        if chunk_overlap >= chunk_size:
            raise ValueError(
                "chunk_overlap must be smaller than chunk_size"
            )

        self._splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                "",
            ],
        )

    def chunk(
    self,
    text: str,
    *,
    document_id: str,
    project_id: str,
    user_id: str,
    filename: str,
    file_type: str,
    ) -> list[DocumentChunk]:

        if not text or not text.strip():
            return []

        chunks = self._splitter.split_text(text)

        return [
            DocumentChunk(
                content=content,
                chunk_index=index,
                document_id=document_id,
                project_id=project_id,
                user_id=user_id,
                filename=filename,
                file_type=file_type,
            )
            for index, content in enumerate(chunks)
            if content.strip()
        ]