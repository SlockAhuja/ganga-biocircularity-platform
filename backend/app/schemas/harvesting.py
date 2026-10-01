from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

class HarvestingCreateRequest(BaseModel):
    zone_id: int
    biomass_collected_t: float
    harvesting_method: str = "Amphibious Harvester + Weed Boom"
    removal_efficiency_pct: float = 88.0
    labour_hours: float = 40.0
    fuel_consumed_liters: float = 110.0
    transport_distance_km: float = 8.5
    destination_facility: str = "Prayagraj Bio-CNG Facility"
    notes: Optional[str] = None

class HarvestingResponse(BaseModel):
    id: int
    zone_id: int
    harvest_date: datetime
    harvesting_method: str
    biomass_collected_t: float
    removal_efficiency_pct: float
    labour_hours: float
    fuel_consumed_liters: float
    transport_distance_km: float
    destination_facility: str
    status: str
    notes: Optional[str] = None
    class Config:
        from_attributes = True

class FieldObservationCreate(BaseModel):
    station_name: str
    latitude: float
    longitude: float
    hyacinth_density: str = "High"
    coverage_pct: float = 75.0
    water_appearance: str = "Greenish turbid with dense vegetative clumps"
    ph_field: Optional[float] = None
    do_field: Optional[float] = None
    observer_name: str = "Field Survey Team"
    photo_urls: Optional[List[str]] = None
    notes: Optional[str] = None

class FieldObservationResponse(BaseModel):
    id: int
    station_name: str
    observation_date: datetime
    latitude: float
    longitude: float
    hyacinth_density: str
    coverage_pct: float
    water_appearance: str
    ph_field: Optional[float] = None
    do_field: Optional[float] = None
    observer_name: str
    photo_urls: Optional[List[str]] = None
    notes: Optional[str] = None
    is_demo_data: int = 1
    class Config:
        from_attributes = True
