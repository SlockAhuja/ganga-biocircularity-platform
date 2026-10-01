from typing import List, Dict, Any
from fastapi import APIRouter
from app.core.remote_sensing import classify_hyacinth_spectral_profile

router = APIRouter(prefix="/satellite", tags=["Satellite & Remote Sensing"])

@router.get("/scenes")
def get_satellite_scenes():
    return [
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
            "data_source_mode": "Copernicus Open Access Hub / Research Cache"
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
            "data_source_mode": "Copernicus Open Access Hub / Research Cache"
        }
    ]

@router.post("/spectral-profile-eval")
def evaluate_spectral_profile(nir: float = 0.45, red: float = 0.08, green: float = 0.12, swir1: float = 0.05, blue: float = 0.04):
    """
    Simulates remote sensing pixel classification pipeline.
    """
    return classify_hyacinth_spectral_profile(nir, red, green, swir1, blue)
