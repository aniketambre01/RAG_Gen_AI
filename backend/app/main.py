from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.auth import router as auth_router
from app.api.v1.documents import router as documents_router
from app.core.config import settings

from app.database.database import Base, engine
from app.database import models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
)

app.include_router(
    auth_router,
    prefix=settings.API_PREFIX,
)

app.include_router(
    documents_router,
    prefix=settings.API_PREFIX,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.VERSION,
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }

