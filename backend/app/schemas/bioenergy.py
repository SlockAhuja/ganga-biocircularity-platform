from typing import Optional
from pydantic import BaseModel

class ResourceSimulatorRequest(BaseModel):
    biomass_input_t: float
    moisture_content_pct: float = 91.0
    total_solids_pct: float = 9.0
    volatile_solids_pct: float = 80.0
    utilization_pct: float = 85.0
    scenario_type: str = "Baseline" # Conservative, Baseline, Optimistic
    bmp_override: Optional[float] = None

class BioenergyAssessmentResponse(BaseModel):
    id: Optional[int] = None
    assessment_code: str
    scenario_type: str
    biomass_input_t: float
    biogas_volume_m3: float
    methane_volume_m3: float
    bio_cng_potential_kg: float
    electrical_energy_kwh: float
    thermal_energy_mj: float
    lpg_equivalent_kg: float
    digestate_total_t: float
    vermicompost_potential_t: float
    liquid_vermiwash_liters: float
    nitrogen_recovery_kg: float
    phosphorus_recovery_kg: float
    potassium_recovery_kg: float
    methodology_version: str
    is_demo_data: int = 1
    class Config:
        from_attributes = True

class ScenarioComparisonResponse(BaseModel):
    conservative: BioenergyAssessmentResponse
    baseline: BioenergyAssessmentResponse
    optimistic: BioenergyAssessmentResponse
