from sqlalchemy import Column, String, Float, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin

class BiomassAssessment(Base, TimestampMixin):
    __tablename__ = "biomass_assessments"

    assessment_code = Column(String(50), unique=True, index=True, nullable=False)
    zone_id = Column(Integer, ForeignKey("hyacinth_zones.id"), nullable=True)
    
    area_ha = Column(Float, nullable=False)
    coverage_pct = Column(Float, nullable=False)
    fresh_biomass_density_t_ha = Column(Float, default=32.0)
    fresh_biomass_total_t = Column(Float, nullable=False)
    
    moisture_content_pct = Column(Float, default=91.0)
    total_solids_pct = Column(Float, default=9.0)
    total_solids_t = Column(Float, nullable=False) # dry biomass
    volatile_solids_pct_of_ts = Column(Float, default=80.0)
    volatile_solids_t = Column(Float, nullable=False)
    carbon_to_nitrogen_ratio = Column(Float, default=24.5)
    
    recoverable_biomass_t = Column(Float, nullable=False)
    collection_efficiency_pct = Column(Float, default=85.0)
    
    methodology_version = Column(String(50), default="v1.2-Allometric-TS-VS")
    is_demo_data = Column(Integer, default=1)
    meta_attributes = Column(JSON, nullable=True)

    hyacinth_zone = relationship("HyacinthZone", back_populates="biomass_assessments")
    bioenergy_assessments = relationship("BioenergyAssessment", back_populates="biomass_assessment")
