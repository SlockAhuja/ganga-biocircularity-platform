from typing import Optional, Dict, Any
from pydantic import BaseModel

class CircularityScoreResponse(BaseModel):
    id: Optional[int] = None
    assessment_name: str
    overall_circularity_score: float
    biomass_recovery_subscore: float
    resource_conversion_subscore: float
    nutrient_recovery_subscore: float
    waste_diversion_subscore: float
    energy_recovery_subscore: float
    methodology_version: str
    components_breakdown: Optional[Dict[str, Any]] = None
    is_demo_data: int = 1
    class Config:
        from_attributes = True

class EnvironmentalImpactResponse(BaseModel):
    id: Optional[int] = None
    assessment_name: str
    ghg_avoidance_kg_co2e: float
    waste_diverted_t: float
    water_bod_reduction_kg: float
    fossil_fuel_offset_kg_cng: float
    grid_power_offset_kwh: float
    nitrogen_recycled_kg: float
    phosphorus_recycled_kg: float
    potassium_recycled_kg: float
    river_surface_cleared_ha: float
    methodology_version: str
    is_demo_data: int = 1
    class Config:
        from_attributes = True
