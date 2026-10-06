import json
import os
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.gis import HyacinthZone
from app.schemas.gis import HyacinthZoneResponse, AreaMeasurementRequest, AreaMeasurementResponse
from app.core.gis_engine import calculate_geometry_metrics
from app.core.satellite.factory import get_satellite_provider

router = APIRouter(prefix="/hyacinth", tags=["Hyacinth Intelligence"])

class HyacinthDetectionRequest(BaseModel):
    aoi_bbox: List[float] = Field(default=[81.80, 25.38, 81.95, 25.54], description="[min_lng, min_lat, max_lng, max_lat]")
    start_date: str = "2026-09-15"
    end_date: str = "2026-10-05"
    max_cloud_cover_pct: float = 20.0
    provider: Optional[str] = None
    save_to_database: bool = False

@router.post("/detect")
def detect_hyacinth_candidates(req: HyacinthDetectionRequest, db: Session = Depends(get_db)):
    """
    Executes satellite-driven hyacinth candidate zone classification.
    Optionally stores derived candidate zones into the HyacinthZone database table.
    """
    sat_provider = get_satellite_provider(req.provider)
    analysis = sat_provider.analyze_hyacinth_extent(
        aoi_bbox=req.aoi_bbox,
        start_date=req.start_date,
        end_date=req.end_date,
        max_cloud_cover_pct=req.max_cloud_cover_pct
    )

    persisted_zones = []
    if req.save_to_database and analysis.get("candidate_zones"):
        for z in analysis["candidate_zones"]:
            geom = z.get("geometry", {})
            centroid = z.get("coordinates_centroid", [req.aoi_bbox[0], req.aoi_bbox[1]])
            zone_obj = HyacinthZone(
                zone_code=z.get("zone_id", f"HZ-EE-{len(persisted_zones)+1}"),
                name=z.get("name", "Earth Engine Candidate Zone"),
                density_class=z.get("density_class", "High"),
                coverage_pct=round(z.get("confidence", 0.85) * 100.0, 1),
                area_ha=z.get("area_ha", 5.0),
                perimeter_m=round(z.get("area_ha", 5.0) * 120.0, 1),
                centroid_lat=centroid[1] if len(centroid) > 1 else 25.43,
                centroid_lng=centroid[0] if len(centroid) > 0 else 81.88,
                geometry_geojson=geom,
                classification_confidence=z.get("confidence", 0.88),
                spectral_indices={"ndvi_mean": z.get("mean_ndvi", 0.65), "mndwi_mean": z.get("mean_mndwi", -0.40)},
                model_version=analysis.get("provenance", {}).get("algorithm_version", "GEE-S2-V2.5"),
                data_source=f"Sentinel-2 MSI ({analysis.get('provider', 'EARTH_ENGINE')})",
                is_demo_data=1 if analysis.get("provider") == "DEMO" else 0
            )
            db.add(zone_obj)
            persisted_zones.append(z.get("zone_id"))
        db.commit()

    analysis["persisted_to_db"] = req.save_to_database
    analysis["persisted_zone_codes"] = persisted_zones
    return analysis

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
