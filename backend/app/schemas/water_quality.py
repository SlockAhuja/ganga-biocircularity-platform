from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field, validator
from datetime import datetime

class WaterQualityItemInput(BaseModel):
    station_id: int
    station_name: Optional[str] = None
    observation_time: str # ISO 8601 string or YYYY-MM-DD
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    river_reach: Optional[str] = "Ganga - Prayagraj Reach"
    
    # Physico-chemical
    ph: float = Field(..., ge=0.0, le=14.0, description="Water pH (0-14)")
    do_mg_l: float = Field(..., ge=0.0, le=25.0, description="Dissolved Oxygen (mg/L)")
    bod_mg_l: float = Field(..., ge=0.0, le=100.0, description="Biochemical Oxygen Demand (mg/L)")
    cod_mg_l: float = Field(..., ge=0.0, le=500.0, description="Chemical Oxygen Demand (mg/L)")
    tss_mg_l: float = Field(..., ge=0.0, le=2000.0, description="Total Suspended Solids (mg/L)")
    tds_mg_l: Optional[float] = Field(320.0, ge=0.0, le=5000.0)
    temperature_c: Optional[float] = Field(24.5, ge=0.0, le=50.0)
    turbidity_ntu: Optional[float] = Field(14.2, ge=0.0, le=1000.0)
    conductivity_us_cm: Optional[float] = Field(420.0, ge=0.0, le=10000.0)
    nitrate_no3_mg_l: Optional[float] = Field(1.85, ge=0.0, le=100.0)
    phosphate_po4_mg_l: Optional[float] = Field(0.38, ge=0.0, le=50.0)
    
    # Trace & Heavy Metals
    chromium_cr: Optional[float] = Field(8.4, ge=0.0)
    lead_pb: Optional[float] = Field(6.2, ge=0.0)
    cadmium_cd: Optional[float] = Field(0.4, ge=0.0)
    nickel_ni: Optional[float] = Field(4.8, ge=0.0)
    mercury_hg: Optional[float] = Field(0.02, ge=0.0)
    arsenic_as: Optional[float] = Field(0.9, ge=0.0)
    zinc_zn: Optional[float] = Field(65.0, ge=0.0)
    copper_cu: Optional[float] = Field(18.2, ge=0.0)
    is_heavy_metal_measured: Optional[int] = 0
    
    # Provenance
    source: Optional[str] = "CPCB / National Water Quality Monitoring Programme"
    source_url: Optional[str] = "https://cpcb.nic.in/water-quality-data/"
    method: Optional[str] = "Electrochemical Sensor & Standard Methods APHA 23rd Ed"
    quality_flag: Optional[str] = "VALIDATED" # VALIDATED, PROVISIONAL, ESTIMATED, SUSPECT
    provenance_status: Optional[str] = "OBSERVED" # OBSERVED, LITERATURE, ESTIMATED, MODELED, DEMO
    is_demo_data: Optional[int] = 0

class WaterQualityImportRequest(BaseModel):
    observations: Optional[List[WaterQualityItemInput]] = None
    csv_content: Optional[str] = None
    dataset_name: Optional[str] = "CPCB Prayagraj Telemetry Batch"
    source_attribution: Optional[str] = "CPCB NWMP Official Monitoring"

class WaterQualityImportResponse(BaseModel):
    status: str
    imported_count: int
    skipped_duplicates_count: int
    validation_errors_count: int
    validation_errors: List[str]
    imported_observation_ids: List[int]
    provenance_applied: str

class WaterQualityResponse(BaseModel):
    id: int
    station_id: int
    station_name: Optional[str] = None
    observation_time: datetime
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    river_reach: Optional[str] = None
    
    # Physico-chemical
    ph: float
    do_mg_l: float
    bod_mg_l: float
    cod_mg_l: float
    tss_mg_l: float
    tds_mg_l: Optional[float] = 320.0
    temperature_c: Optional[float] = 24.5
    turbidity_ntu: Optional[float] = 14.2
    conductivity_us_cm: Optional[float] = 420.0
    nitrate_no3_mg_l: Optional[float] = 1.85
    phosphate_po4_mg_l: Optional[float] = 0.38
    
    # Contaminants
    chromium_cr: float
    lead_pb: float
    cadmium_cd: float
    nickel_ni: float
    mercury_hg: float
    arsenic_as: float
    zinc_zn: float
    copper_cu: float
    is_heavy_metal_measured: int = 0
    
    source: str
    source_url: Optional[str] = None
    method: Optional[str] = None
    quality_flag: str
    provenance_status: str = "OBSERVED"
    is_demo_data: int = 0
    compliance_status: Optional[Dict[str, str]] = None
    
    class Config:
        from_attributes = True

class WaterQualityStationSummary(BaseModel):
    station_id: int
    station_code: str
    station_name: str
    river: str
    latitude: float
    longitude: float
    latest_observation_time: Optional[datetime] = None
    mean_ph: float
    mean_do_mg_l: float
    mean_bod_mg_l: float
    cpcb_water_class: str # Class A, Class B, Class C, Class D, Below Class E
    total_observations_count: int
    provenance_status: str

class WaterQualitySummaryResponse(BaseModel):
    total_observations_count: int
    stations_count: int
    date_range: Dict[str, Optional[str]]
    regional_means: Dict[str, float]
    provenance_breakdown: Dict[str, int]
    cpcb_compliance_rate_pct: float
    heavy_metal_status: str
    stations: List[WaterQualityStationSummary]
