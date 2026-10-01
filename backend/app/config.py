import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Ganga Biocircularity Intelligence Platform"
    VERSION: str = "1.0.0-research"
    DESCRIPTION: str = "Satellite + GIS + Biomass + Circular Bioeconomy + Environmental + Economic Intelligence"
    API_V1_STR: str = "/api/v1"
    
    # Environment & Demo Mode
    DEMO_MODE: bool = True
    APP_ENV: str = "development"
    
    # Security
    SECRET_KEY: str = "ganga-biocircularity-research-key-2026-supersecret-jwt-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours
    
    # Database
    # Defaults to local SQLite if Postgres not set up, but fully compatible with PostgreSQL/PostGIS
    DATABASE_URL: str = "sqlite:///./ganga_bio.db"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://localhost:8000",
        "*"
    ]
    
    # Remote Sensing & Satellite Defaults
    DEFAULT_REGION_NAME: str = "Prayagraj (Allahabad) Ganga-Yamuna Confluence"
    DEFAULT_LATITUDE: float = 25.4260
    DEFAULT_LONGITUDE: float = 81.8845
    DEFAULT_ZOOM: int = 13
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "allow"

settings = Settings()
