import json
import os
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, Query, HTTPException, Body
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.gis import MonitoringRegion, RiverSegment
from app.schemas.gis import RiverSegmentResponse, WaterExtentResponse
from app.core.water_geometry_provider import water_geometry_provider

router = APIRouter(prefix="/regions", tags=["Regions & River Network"])

@router.get("/")
def get_monitoring_regions(db: Session = Depends(get_db)):
    regions = db.query(MonitoringRegion).all()
    if not regions:
        return [{
            "id": 1,
            "region_code": "REG-PRY-01",
            "name": "Prayagraj (Allahabad) Ganga-Yamuna Confluence",
            "state": "Uttar Pradesh",
            "country": "India",
            "center_lat": 25.4260,
            "center_lng": 81.8845,
            "total_area_sqkm": 180.0,
            "description": "Critical monitoring stretch covering Phaphamau, Curzon Bridge, Triveni Sangam, and Arail Ghat reaches."
        }]
    return regions

@router.get("/water-extent", response_model=WaterExtentResponse)
def get_river_water_extent(
    region_code: str = Query("REG-PRY-01"),
    provider: Optional[str] = Query(None)
):
    """
    Returns high-resolution river water surface extent polygons for the study region.
    Delineated from Sentinel-2 MNDWI (B3-B11)/(B3+B11) and authoritative hydrography.
    Includes full scientific provenance metadata.
    """
    return water_geometry_provider.get_water_extent(region_code=region_code, provider=provider)

@router.get("/centerlines")
def get_river_centerlines(region_code: str = Query("REG-PRY-01")):
    """
    Returns high-resolution river thalweg centerlines following natural curvature.
    """
    return water_geometry_provider.get_river_centerlines(region_code=region_code)

@router.get("/river-segments", response_model=List[RiverSegmentResponse])
def get_river_segments(db: Session = Depends(get_db)):
    """
    Returns monitoring river segments with hydrographic properties and geometry.
    """
    segments = db.query(RiverSegment).all()
    if segments:
        return segments

    # Fallback to loading from GeoJSON
    cl_data = water_geometry_provider.get_river_centerlines("REG-PRY-01")
    features = cl_data.get("features", [])
    if features:
        return [
            RiverSegmentResponse(
                id=idx + 1,
                segment_code=f.get("properties", {}).get("id", f"SEG-{idx+1}"),
                name=f.get("properties", {}).get("name", "Ganga Reach"),
                river=f.get("properties", {}).get("river", "Ganga"),
                length_km=float(f.get("properties", {}).get("length_km", 10.0)),
                avg_width_m=float(f.get("properties", {}).get("avg_width_m", 500.0)),
                flow_type=f.get("properties", {}).get("flow_type", "Mainstream"),
                monitoring_priority=f.get("properties", {}).get("monitoring_priority", "High"),
                geometry_geojson=f.get("geometry", {})
            )
            for idx, f in enumerate(features)
        ]

    return []

@router.post("/validate-geometry")
def validate_geometry(geometry: Dict[str, Any] = Body(...)):
    """
    Validates a GeoJSON geometry using Shapely: checks validity, bounds within Prayagraj AOI, and geodesic area.
    """
    return water_geometry_provider.validate_geometry(geometry)
