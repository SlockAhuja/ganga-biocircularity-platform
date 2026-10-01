from sqlalchemy import Column, String, Float, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin

class BioenergyAssessment(Base, TimestampMixin):
    __tablename__ = "bioenergy_assessments"

    assessment_code = Column(String(50), unique=True, index=True, nullable=False)
    biomass_assessment_id = Column(Integer, ForeignKey("biomass_assessments.id"), nullable=True)
    
    biomass_input_t = Column(Float, nullable=False)
    bmp_m3_ch4_per_kg_vs = Column(Float, default=0.28) # Biochemical Methane Potential
    methane_fraction = Column(Float, default=0.62)
    conversion_efficiency = Column(Float, default=0.85)
    
    biogas_volume_m3 = Column(Float, nullable=False)
    methane_volume_m3 = Column(Float, nullable=False)
    bio_cng_potential_kg = Column(Float, nullable=False)
    electrical_energy_kwh = Column(Float, nullable=False)
    thermal_energy_mj = Column(Float, nullable=False)
    lpg_equivalent_kg = Column(Float, nullable=False)
    
    digestate_total_t = Column(Float, nullable=False)
    vermicompost_potential_t = Column(Float, nullable=False)
    liquid_vermiwash_liters = Column(Float, nullable=False)
    nitrogen_recovery_kg = Column(Float, nullable=False)
    phosphorus_recovery_kg = Column(Float, nullable=False)
    potassium_recovery_kg = Column(Float, nullable=False)
    
    scenario_type = Column(String(50), default="Baseline") # Conservative, Baseline, Optimistic
    methodology_version = Column(String(50), default="v1.4-AD-Biogas-CSTR")
    is_demo_data = Column(Integer, default=1)
    
    biomass_assessment = relationship("BiomassAssessment", back_populates="bioenergy_assessments")
