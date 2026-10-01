from typing import Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime

class BiomassCalculationRequest(BaseModel):
    area_ha: float
    coverage_pct: float = 80.0
    density_class: str = "High" # Low, Moderate, High, Very High
    moisture_content_pct: float = 91.0
    total_solids_pct: float = 9.0
    volatile_solids_pct: float = 80.0
    collection_efficiency_pct: float = 85.0

class BiomassAssessmentResponse(BaseModel):
    id: Optional[int] = None
    assessment_code: str
    area_ha: float
    coverage_pct: float
    fresh_biomass_density_t_ha: float
    fresh_biomass_total_t: float
    moisture_content_pct: float
    total_solids_pct: float
    total_solids_t: float
    volatile_solids_pct_of_ts: float
    volatile_solids_t: float
    carbon_to_nitrogen_ratio: float
    recoverable_biomass_t: float
    collection_efficiency_pct: float
    methodology_version: str
    is_demo_data: int = 1
    class Config:
        from_attributes = True
