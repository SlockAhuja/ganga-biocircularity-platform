import os
import uuid
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Query, HTTPException, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.remote_sensing import classify_hyacinth_spectral_profile
from app.core.satellite.factory import get_satellite_provider

router = APIRouter(prefix="/satellite", tags=["Satellite & Earth Engine"])

# In-memory store for satellite analysis results
_ANALYSIS_CACHE: Dict[str, Any] = {}

class SceneSearchRequest(BaseModel):
    aoi_bbox: List[float] = Field(default=[81.80, 25.38, 81.95, 25.54], description="[min_lng, min_lat, max_lng, max_lat]")
    start_date: str = "2026-09-01"
    end_date: str = "2026-10-01"
    max_cloud_cover_pct: float = 20.0
    provider: Optional[str] = None

class SatelliteAnalysisRequest(BaseModel):
    aoi_bbox: List[float] = Field(default=[81.80, 25.38, 81.95, 25.54], description="[min_lng, min_lat, max_lng, max_lat]")
    start_date: str = "2026-09-15"
    end_date: str = "2026-10-05"
    max_cloud_cover_pct: float = 20.0
    provider: Optional[str] = None
    analysis_type: str = "SINGLE" # SINGLE, BEFORE_AFTER
    period_b_start: Optional[str] = None
    period_b_end: Optional[str] = None
    biomass_density_factor_t_ha: float = 44.05

class SatelliteComparisonRequest(BaseModel):
    aoi_bbox: List[float] = Field(default=[81.80, 25.38, 81.95, 25.54], description="[min_lng, min_lat, max_lng, max_lat]")
    period_a_start: str = "2026-08-01"
    period_a_end: str = "2026-08-31"
    period_b_start: str = "2026-09-15"
    period_b_end: str = "2026-10-05"
    max_cloud_cover_pct: float = 20.0
    provider: Optional[str] = None

@router.get("/health")
def get_satellite_health(provider: Optional[str] = Query(None)):
    """
    Returns the real-time operational health and authentication status of the satellite provider.
    Never exposes secrets, API tokens, or service account private keys.
    """
    sat_provider = get_satellite_provider(provider)
    return sat_provider.get_health()

@router.get("/providers/status")
def get_providers_status():
    """
    Returns connection and configuration status across all registered satellite providers.
    """
    ee_provider = get_satellite_provider("earth_engine")
    demo_provider = get_satellite_provider("demo")
    copernicus_user = os.environ.get("COPERNICUS_USERNAME")
    
    ee_health = ee_provider.get_health()
    active_prov = os.environ.get("SATELLITE_PROVIDER", "demo").upper()
    if os.environ.get("EARTH_ENGINE_ENABLED", "false").lower() == "true":
        active_prov = "EARTH_ENGINE"

    return {
        "active_provider": active_prov,
        "providers": {
            "DEMO": {
                "configured": True,
                "available": True,
                "status": "OPERATIONAL",
                "description": "Pre-calibrated high-resolution Sentinel-2 prototype scenes for Prayagraj study reaches."
            },
            "EARTH_ENGINE": {
                "configured": ee_health.get("authenticated", False),
                "available": ee_health.get("authenticated", False),
                "status": "CONNECTED" if ee_health.get("authenticated", False) else "NOT_CONFIGURED",
                "project_id": ee_health.get("project_id", "camera-503319"),
                "dataset": ee_health.get("dataset", "COPERNICUS/S2_SR_HARMONIZED"),
                "description": "Google Earth Engine Python API for automated Sentinel-2 SR cloud masking and candidate zone extraction."
            },
            "SENTINEL_COPERNICUS": {
                "configured": bool(copernicus_user),
                "available": bool(copernicus_user),
                "status": "CONNECTED" if copernicus_user else "NOT_CONFIGURED",
                "description": "ESA Copernicus Data Space Ecosystem API."
            }
        },
        "supported_indices": ["NDVI", "NDWI", "MNDWI", "EVI", "WRI"],
        "classification_label": "Estimated Water-Hyacinth Candidate Extent (Prototype / Earth Engine Analysis)"
    }

@router.get("/scenes")
def get_satellite_scenes(
    max_cloud_cover: Optional[float] = Query(None),
    provider: Optional[str] = Query(None),
    start_date: str = Query("2026-09-01"),
    end_date: str = Query("2026-10-06"),
    min_lng: float = Query(81.80),
    min_lat: float = Query(25.38),
    max_lng: float = Query(81.95),
    max_lat: float = Query(25.54)
):
    """
    Retrieves satellite scenes from active or requested provider for the AOI.
    """
    sat_provider = get_satellite_provider(provider)
    aoi_bbox = [min_lng, min_lat, max_lng, max_lat]
    cloud_thresh = max_cloud_cover if max_cloud_cover is not None else 20.0
    return sat_provider.search_scenes(aoi_bbox, start_date, end_date, cloud_thresh)

@router.post("/search-scenes")
def search_scenes(req: SceneSearchRequest):
    """
    Searches satellite scenes matching parameters.
    """
    sat_provider = get_satellite_provider(req.provider)
    scenes = sat_provider.search_scenes(req.aoi_bbox, req.start_date, req.end_date, req.max_cloud_cover_pct)
    return {
        "search_parameters": req.dict(),
        "provider_used": sat_provider.provider_id,
        "matched_scenes_count": len(scenes),
        "scenes": scenes
    }

@router.post("/analyze")
def run_satellite_analysis(req: SatelliteAnalysisRequest):
    """
    Executes full Earth Observation analysis:
    - Sentinel-2 Surface Reflectance acquisition
    - SCL / QA60 cloud and cloud-shadow masking
    - NDVI, NDWI, MNDWI computation
    - Water mask and vegetation signal intersection
    - Hyacinth candidate zone classification
    - Biomass estimation via assumption factor
    - Comprehensive provenance metadata recording
    """
    sat_provider = get_satellite_provider(req.provider)
    
    if req.analysis_type == "BEFORE_AFTER" and req.period_b_start and req.period_b_end:
        result = sat_provider.compare_periods(
            aoi_bbox=req.aoi_bbox,
            period_a_start=req.start_date,
            period_a_end=req.end_date,
            period_b_start=req.period_b_start,
            period_b_end=req.period_b_end,
            max_cloud_cover_pct=req.max_cloud_cover_pct
        )
    else:
        result = sat_provider.analyze_hyacinth_extent(
            aoi_bbox=req.aoi_bbox,
            start_date=req.start_date,
            end_date=req.end_date,
            max_cloud_cover_pct=req.max_cloud_cover_pct,
            biomass_density_factor_t_ha=req.biomass_density_factor_t_ha
        )
        
    analysis_id = f"SAT-RES-{uuid.uuid4().hex[:8].upper()}"
    result["result_id"] = analysis_id
    _ANALYSIS_CACHE[analysis_id] = result
    return result

@router.get("/results/{result_id}")
def get_analysis_result(result_id: str):
    """
    Retrieves stored satellite analysis result by ID.
    """
    if result_id not in _ANALYSIS_CACHE:
        # Fallback to default demo analysis if not in memory
        demo_prov = get_satellite_provider("demo")
        fallback = demo_prov.analyze_hyacinth_extent([81.80, 25.38, 81.95, 25.54], "2026-09-15", "2026-10-05")
        fallback["result_id"] = result_id
        return fallback
    return _ANALYSIS_CACHE[result_id]

@router.post("/compare")
def compare_periods(req: SatelliteComparisonRequest):
    """
    Executes before/after comparison between Period A and Period B.
    """
    sat_provider = get_satellite_provider(req.provider)
    return sat_provider.compare_periods(
        aoi_bbox=req.aoi_bbox,
        period_a_start=req.period_a_start,
        period_a_end=req.period_a_end,
        period_b_start=req.period_b_start,
        period_b_end=req.period_b_end,
        max_cloud_cover_pct=req.max_cloud_cover_pct
    )

@router.post("/spectral-profile-eval")
def evaluate_spectral_profile(nir: float = 0.45, red: float = 0.08, green: float = 0.12, swir1: float = 0.05, blue: float = 0.04):
    return classify_hyacinth_spectral_profile(nir, red, green, swir1, blue)
