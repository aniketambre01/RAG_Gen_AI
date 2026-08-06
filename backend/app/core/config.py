from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "AI Document Platform"

    VERSION: str = "1.0.0"

    API_PREFIX: str = "/api/v1"

    DEBUG: bool = True

    SECRET_KEY: str = "change_this_secret"

    DATABASE_URL: str = (
        "postgresql://postgres:postgres@localhost:5432/chat_documents"
    )

    QDRANT_URL: str = "http://localhost:6333"

    OPENAI_API_KEY: str = ""

    class Config:
        env_file = ".env"


settings = Settings()