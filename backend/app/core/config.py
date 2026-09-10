from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    environment: str = "development"
    llm_provider: str = "placeholder"
    llm_api_key: str = ""
    llm_model: str = "placeholder_model"
    vector_store_path: str = "./data/vector_store"

    class Config:
        env_file = ".env"

settings = Settings()
