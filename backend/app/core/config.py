from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "AI Document Platform"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = True

    SECRET_KEY: str = "change_this_secret"

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    DATABASE_URL: str = (
        "postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/chat_documents"
    )

    QDRANT_URL: str = "http://localhost:6333"

    OPENAI_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()