import json
import os
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.gis import HyacinthZone
from app.schemas.gis import HyacinthZoneResponse, AreaMeasurementRequest, AreaMeasurementResponse
from app.core.gis_engine import calculate_geometry_metrics

router = APIRouter(prefix="/hyacinth", tags=["Hyacinth Intelligence"])

@router.get("/zones", response_model=List[HyacinthZoneResponse])
def get_hyacinth_zones(db: Session = Depends(get_db)):
    zones = db.query(HyacinthZone).all()
    if not zones:
        geojson_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "geojson", "hyacinth_zones.geojson")
        if os.path.exists(geojson_path):
            with open(geojson_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return [
                    {
                        "id": idx + 1,
                        "zone_code": f.get("properties", {}).get("zone_id", f"HZ-0{idx+1}"),
                        "name": f.get("properties", {}).get("name", "Hyacinth Zone"),
                        "density_class": f.get("properties", {}).get("density_class", "High"),
                        "coverage_pct": f.get("properties", {}).get("coverage_percentage", 80.0),
                        "area_ha": f.get("properties", {}).get("area_ha", 10.0),
                        "perimeter_m": f.get("properties", {}).get("perimeter_m", 1200.0),
                        "centroid_lat": f.get("properties", {}).get("coordinates_centroid", [81.88, 25.42])[1],
                        "centroid_lng": f.get("properties", {}).get("coordinates_centroid", [81.88, 25.42])[0],
                        "geometry_geojson": f.get("geometry", {}),
                        "classification_confidence": f.get("properties", {}).get("confidence", 0.90),
                        "spectral_indices": {"ndvi_mean": 0.68, "mndwi_mean": -0.42},
                        "model_version": f.get("properties", {}).get("processing_version", "v2.4-NDVI-MNDWI-FUSION"),
                        "data_source": f.get("properties", {}).get("data_source", "Sentinel-2 MSI Level-2A"),
                        "is_demo_data": 1,
                        "created_at": "2026-09-26T00:00:00Z"
                    }
                    for idx, f in enumerate(data.get("features", []))
                ]
    return zones

@router.get("/zones/geojson")
def get_hyacinth_zones_geojson():
    geojson_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "geojson", "hyacinth_zones.geojson")
    if os.path.exists(geojson_path):
        with open(geojson_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"type": "FeatureCollection", "features": []}

@router.get("/zones/{zone_id}")
def get_zone_by_id(zone_id: int, db: Session = Depends(get_db)):
    zone = db.query(HyacinthZone).filter(HyacinthZone.id == zone_id).first()
    if not zone:
        # Fallback to demo zone list
        zones_data = get_hyacinth_zones(db)
        for z in zones_data:
            if z.get("id") == zone_id:
                return z
        raise HTTPException(status_code=404, detail="Zone not found")
    return zone

@router.post("/measure-area", response_model=AreaMeasurementResponse)
def measure_drawn_area(request: AreaMeasurementRequest):
    """
    Computes geodesic area, perimeter, and estimated biomass from user-drawn polygon or linestring.
    """
    metrics = calculate_geometry_metrics(request.geometry)
    return metrics
