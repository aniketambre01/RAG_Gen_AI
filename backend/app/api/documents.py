from pathlib import Path
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.database.database import get_db
from app.database.models.document import Document
from app.database.models.user import User


router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


BASE_DIR = Path(__file__).resolve().parents[3]

UPLOAD_DIR = BASE_DIR / "uploads"

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx",
    ".xlsx",
    ".csv",
    ".txt",
    ".md",
    ".py",
    ".c",
    ".cpp",
    ".js",
    ".ts",
}


@router.post(
    "/upload",
    status_code=status.HTTP_201_CREATED,
)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Filename is required",
        )

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {extension}",
        )

    file_contents = await file.read()

    if not file_contents:
        raise HTTPException(
            status_code=400,
            detail="File is empty",
        )

    user_directory = UPLOAD_DIR / str(current_user.id)
    user_directory.mkdir(parents=True, exist_ok=True)

    file_path = user_directory / file.filename

    file_path.write_bytes(file_contents)

    document = Document(
        filename=file.filename,
        file_path=str(file_path),
        file_type=file.content_type,
        file_size=len(file_contents),
        owner_id=current_user.id,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return {
        "id": document.id,
        "filename": document.filename,
        "file_type": document.file_type,
        "file_size": document.file_size,
        "owner_id": document.owner_id,
        "message": "Document uploaded successfully",
    }


@router.get("/")
def get_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    documents = (
        db.query(Document)
        .filter(Document.owner_id == current_user.id)
        .order_by(Document.created_at.desc())
        .all()
    )

    return {
        "count": len(documents),
        "documents": [
            {
                "id": document.id,
                "filename": document.filename,
                "file_type": document.file_type,
                "file_size": document.file_size,
                "owner_id": document.owner_id,
                "created_at": document.created_at,
            }
            for document in documents
        ],
    }


@router.get("/{document_id}")
def get_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.owner_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return {
        "id": document.id,
        "filename": document.filename,
        "file_type": document.file_type,
        "file_size": document.file_size,
        "owner_id": document.owner_id,
        "created_at": document.created_at,
    }


@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.owner_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    # Delete physical file
    file_path = Path(document.file_path)

    if file_path.exists():
        file_path.unlink()

    # Delete database record
    db.delete(document)
    db.commit()

    return {
        "message": "Document deleted successfully",
        "document_id": document_id,
    }

