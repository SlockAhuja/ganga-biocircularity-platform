from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base

class ScientificAssumption(Base):
    __tablename__ = "scientific_assumptions"

    id = Column(Integer, primary_key=True, index=True)
    key_code = Column(String(64), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    value = Column(Float, nullable=False)
    unit = Column(String(64), nullable=False)
    category = Column(String(64), index=True, nullable=False) # BIOMASS, BIOENERGY, VERMICOMPOST, ENVIRONMENT, ECONOMICS, CIRCULARITY
    source = Column(String(255), nullable=False)
    reference = Column(String(512), nullable=True)
    version = Column(String(32), default="v1.0")
    scenario = Column(String(32), default="Baseline")
    is_demo = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
