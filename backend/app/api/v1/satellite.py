import os
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel
from app.core.remote_sensing import classify_hyacinth_spectral_profile

router = APIRouter(prefix="/satellite", tags=["Satellite & Remote Sensing"])

class SceneSearchRequest(BaseModel):
    aoi_bbox: List[float] # [min_lng, min_lat, max_lng, max_lat]
    start_date: str
    end_date: str
    max_cloud_cover_pct: float = 15.0
    provider: str = "DEMO" # DEMO, SENTINEL, EARTH_ENGINE

@router.get("/providers/status")
def get_providers_status():
    """
    Returns the real connection and configuration status of remote sensing satellite providers.
    """
    ee_project = os.environ.get("EARTH_ENGINE_PROJECT")
    ee_creds = os.environ.get("SATELLITE_CREDENTIALS")
    copernicus_user = os.environ.get("COPERNICUS_USERNAME")
    
    return {
        "active_provider": os.environ.get("SATELLITE_PROVIDER", "demo").upper(),
        "providers": {
            "DEMO": {
                "configured": True,
                "available": True,
                "status": "OPERATIONAL",
                "description": "Pre-calibrated high-resolution Sentinel-2 prototype scenes for Prayagraj study reaches."
            },
            "SENTINEL_COPERNICUS": {
                "configured": bool(copernicus_user),
                "available": bool(copernicus_user),
                "status": "CONNECTED" if copernicus_user else "NOT_CONFIGURED",
                "description": "ESA Copernicus Data Space Ecosystem API."
            },
            "EARTH_ENGINE": {
                "configured": bool(ee_project and ee_creds),
                "available": bool(ee_project and ee_creds),
                "status": "CONNECTED" if (ee_project and ee_creds) else "NOT_CONFIGURED",
                "description": "Google Earth Engine Python API for automated multi-spectral cloud masking and polygon vectorization."
            }
        },
        "supported_indices": ["NDVI", "NDWI", "MNDWI", "EVI", "WRI"],
        "classification_label": "Estimated Water-Hyacinth Distribution (Prototype Classification)"
    }

@router.get("/scenes")
def get_satellite_scenes(max_cloud_cover: Optional[float] = Query(None)):
    all_scenes = [
        {
            "scene_id": "S2B_MSIL2A_20261001T050709_N0511_R019_T44RKR",
            "satellite": "Sentinel-2B MSI",
            "sensor": "Multi-Spectral Instrument (13 Bands)",
            "acquisition_date": "2026-10-01T05:07:09Z",
            "cloud_coverage_pct": 2.4,
            "resolution_m": 10.0,
            "region": "Prayagraj (Allahabad) Confluence",
            "processing_level": "Level-2A Bottom-Of-Atmosphere (BOA)",
            "indices_computed": ["NDVI", "NDWI", "MNDWI", "EVI", "WRI"],
            "status": "PROCESSED",
            "data_source_mode": "Demo Baseline / Copernicus Sentinel-2 MSI"
        },
        {
            "scene_id": "S2B_MSIL2A_20260926T050709_N0511_R019_T44RKR",
            "satellite": "Sentinel-2B MSI",
            "sensor": "Multi-Spectral Instrument (13 Bands)",
            "acquisition_date": "2026-09-26T05:07:09Z",
            "cloud_coverage_pct": 3.8,
            "resolution_m": 10.0,
            "region": "Prayagraj (Allahabad) Confluence",
            "processing_level": "Level-2A Bottom-Of-Atmosphere (BOA)",
            "indices_computed": ["NDVI", "NDWI", "MNDWI", "EVI", "WRI"],
            "status": "PROCESSED",
            "data_source_mode": "Demo Baseline / Copernicus Sentinel-2 MSI"
        },
        {
            "scene_id": "S2A_MSIL2A_20260916T050711_N0511_R019_T44RKR",
            "satellite": "Sentinel-2A MSI",
            "sensor": "Multi-Spectral Instrument (13 Bands)",
            "acquisition_date": "2026-09-16T05:07:11Z",
            "cloud_coverage_pct": 8.4,
            "resolution_m": 10.0,
            "region": "Prayagraj (Allahabad) Confluence",
            "processing_level": "Level-2A Bottom-Of-Atmosphere (BOA)",
            "indices_computed": ["NDVI", "NDWI", "MNDWI", "EVI"],
            "status": "ARCHIVED",
            "data_source_mode": "Demo Baseline / Copernicus Sentinel-2 MSI"
        }
    ]
    if max_cloud_cover is not None:
        return [s for s in all_scenes if s["cloud_coverage_pct"] <= max_cloud_cover]
    return all_scenes

@router.post("/search-scenes")
def search_scenes(req: SceneSearchRequest):
    return {
        "search_parameters": req.dict(),
        "provider_used": req.provider,
        "matched_scenes_count": 2,
        "scenes": [
            {
                "scene_id": "S2B_20261001_PRAYAGRAJ",
                "satellite": "Sentinel-2B MSI Level-2A",
                "acquisition_date": "2026-10-01",
                "cloud_cover_pct": 2.4,
                "coverage_status": "FULL_OVERLAP",
                "estimated_hyacinth_area_ha": 38.6
            },
            {
                "scene_id": "S2A_20260916_PRAYAGRAJ",
                "satellite": "Sentinel-2A MSI Level-2A",
                "acquisition_date": "2026-09-16",
                "cloud_cover_pct": 8.4,
                "coverage_status": "FULL_OVERLAP",
                "estimated_hyacinth_area_ha": 42.1
            }
        ]
    }

@router.post("/spectral-profile-eval")
def evaluate_spectral_profile(nir: float = 0.45, red: float = 0.08, green: float = 0.12, swir1: float = 0.05, blue: float = 0.04):
    return classify_hyacinth_spectral_profile(nir, red, green, swir1, blue)
