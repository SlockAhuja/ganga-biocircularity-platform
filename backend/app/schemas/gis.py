from typing import List, Optional, Any, Dict
from pydantic import BaseModel
from datetime import datetime

class GeoJSONGeometry(BaseModel):
    type: str
    coordinates: Any

class MonitoringStationBase(BaseModel):
    station_code: str
    name: str
    river: str = "Ganga"
    station_type: str = "Hydrological & Biological"
    status: str = "Active"
    latitude: float
    longitude: float
    elevation_m: Optional[float] = None
    metadata_json: Optional[Dict[str, Any]] = None

class MonitoringStationResponse(MonitoringStationBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class RiverSegmentResponse(BaseModel):
    id: int
    segment_code: str
    name: str
    river: str
    length_km: float
    avg_width_m: float
    flow_type: str
    monitoring_priority: str
    geometry_geojson: Dict[str, Any]
    class Config:
        from_attributes = True

class HyacinthZoneBase(BaseModel):
    zone_code: str
    name: str
    density_class: str
    coverage_pct: float
    area_ha: float
    perimeter_m: float
    centroid_lat: float
    centroid_lng: float
    geometry_geojson: Dict[str, Any]
    classification_confidence: float = 0.90
    spectral_indices: Optional[Dict[str, float]] = None
    model_version: str = "v2.4-NDVI-MNDWI-FUSION"
    data_source: str = "Sentinel-2 MSI"
    is_demo_data: int = 1

class HyacinthZoneResponse(HyacinthZoneBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class AreaMeasurementRequest(BaseModel):
    geometry: Dict[str, Any] # Polygon or LineString
    measurement_type: str = "polygon" # "polygon" or "linestring"

class AreaMeasurementResponse(BaseModel):
    area_ha: float
    area_sqm: float
    perimeter_m: float
    estimated_fresh_biomass_t: float
    confidence_factor: float
    methodology: str
