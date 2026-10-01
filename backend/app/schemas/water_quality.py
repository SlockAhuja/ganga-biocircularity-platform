from typing import Optional, Dict
from pydantic import BaseModel
from datetime import datetime

class WaterQualityResponse(BaseModel):
    id: int
    station_id: int
    station_name: Optional[str] = None
    observation_time: datetime
    ph: float
    do_mg_l: float
    bod_mg_l: float
    cod_mg_l: float
    tss_mg_l: float
    temperature_c: float
    turbidity_ntu: float
    conductivity_us_cm: float
    
    # Contaminants
    chromium_cr: float
    lead_pb: float
    cadmium_cd: float
    nickel_ni: float
    mercury_hg: float
    arsenic_as: float
    zinc_zn: float
    copper_cu: float
    
    source: str
    quality_flag: str
    is_demo_data: int = 1
    compliance_status: Optional[Dict[str, str]] = None
    class Config:
        from_attributes = True
