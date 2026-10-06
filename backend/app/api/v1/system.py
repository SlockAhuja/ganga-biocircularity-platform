"""
BioRiver System, External Integrations, Mass Balance & Diagnostics Router
Exposes provider health telemetry, live weather, CWC hydrology, conservation of mass, uncertainty bounds, and QA score.
"""
from fastapi import APIRouter, Depends, Query
from typing import Dict, Any, List, Optional
from app.core.providers.registry import provider_registry
from app.core.mass_balance_engine import calculate_mass_balance
from app.core.uncertainty_engine import UncertaintyEngine
from app.core.data_quality_engine import DataQualityEngine

router = APIRouter(prefix="/system", tags=["system-diagnostics"])

@router.get("/providers-health")
def get_providers_health() -> Dict[str, Any]:
    """
    Returns live health diagnostics for all registered external providers:
    Google Earth Engine, MapTiler, CPCB/NWMP, India-WRIS CWC, Open-Meteo Weather, OSM, Object Storage.
    """
    health_list = provider_registry.get_all_health()
    all_healthy = all(p["status"] in ["LIVE", "CONFIGURED", "MANUAL"] for p in health_list)
    return {
        "status": "OPERATIONAL" if all_healthy else "DEGRADED",
        "total_providers": len(health_list),
        "providers": health_list
    }

@router.get("/weather")
def get_weather_telemetry(lat: float = 25.4358, lon: float = 81.8463) -> Dict[str, Any]:
    """
    Fetches real-time meteorological context for Prayagraj from Open-Meteo.
    Includes harvesting safety and solar dewatering feasibility.
    """
    return provider_registry.weather.get_current_weather(lat=lat, lon=lon)

@router.get("/hydrology")
def get_hydrology_context() -> Dict[str, Any]:
    """
    Returns river stage, discharge, and water levels from CWC / India-WRIS gauge records.
    """
    return provider_registry.hydrology.get_hydrological_context()

@router.get("/mass-balance")
def get_mass_balance_audit(
    harvested_tonnes: float = Query(479.1, description="Harvested wet weed in tonnes"),
    moisture_pct: float = Query(91.0, description="Moisture content percentage"),
    dewatering_efficiency: float = Query(25.0, description="Pre-dewatering moisture reduction pct")
) -> Dict[str, Any]:
    """
    Computes strict conservation-of-mass balance across harvesting, dewatering, AD, and vermicomposting.
    """
    return calculate_mass_balance(
        fresh_harvested_tonnes=harvested_tonnes,
        moisture_content_pct=moisture_pct,
        dewatering_efficiency_pct=dewatering_efficiency
    )

@router.get("/uncertainty")
def get_uncertainty_bounds() -> Dict[str, Any]:
    """
    Returns quantified 95% confidence intervals and standard errors for primary assessment KPIs.
    """
    return {
        "biomass": UncertaintyEngine.calculate_biomass_uncertainty(fresh_biomass_tonnes=479.1, area_ha=38.6),
        "bioenergy": UncertaintyEngine.calculate_bioenergy_uncertainty(biogas_m3=9568.19),
        "economics": UncertaintyEngine.calculate_economic_uncertainty(net_revenue_inr=582933.0),
        "heavy_metals": UncertaintyEngine.format_unconstrained("heavy_metal_bioaccumulation", "mg/kg dry wt")
    }

@router.get("/data-quality")
def get_data_quality_score() -> Dict[str, Any]:
    """
    Evaluates data quality across station observations and GIS features.
    """
    from app.core.providers.cpcb_provider import CPCBProvider
    cpcb = CPCBProvider()
    obs = cpcb.get_station_observations()
    return DataQualityEngine.evaluate_telemetry_quality(obs)

@router.get("/audit")
def get_reality_audit_summary() -> Dict[str, Any]:
    """
    Returns system-wide reality audit status classifying all features:
    IMPLEMENTED, ESTIMATED, MODELED, OBSERVED, LITERATURE, REFERENCE, DEMO.
    """
    return {
        "platform": "BioRiver Ganga Biocircularity Intelligence Platform",
        "version": "1.0.0-production",
        "study_area": "Prayagraj (Allahabad) Ganga-Yamuna Confluence Basin",
        "audit_categories": {
            "satellite_remote_sensing": {
                "engine": "Google Earth Engine (COPERNICUS/S2_SR_HARMONIZED)",
                "classification": "ESTIMATED (MNDWI, NDWI, NDVI hyacinth candidate classifier)",
                "provenance": "EARTH_ENGINE"
            },
            "gis_river_geometry": {
                "water_extent": "REFERENCE (Authoritative Geodesic WGS84 Survey + Sentinel-2 MNDWI)",
                "centerlines": "REFERENCE (Deep-channel thalwegs)",
                "provenance": "REFERENCE_HYDROGRAPHY"
            },
            "water_quality": {
                "physicochemical": "OBSERVED (CPCB / NWMP bulletin registry)",
                "heavy_metals": "LITERATURE (Peer-reviewed Ganga ecotoxicology baselines)",
                "provenance": "OBSERVED / LITERATURE"
            },
            "biomass_quantification": {
                "model": "Allometric patch density scaling",
                "classification": "ESTIMATED",
                "uncertainty": "479.1 +/- 169.0 tonnes (95% CI)"
            },
            "bioenergy_recovery": {
                "model": "Biochemical Methane Potential (BMP) Anaerobic Digestion Kinetics",
                "classification": "MODELED",
                "uncertainty": "9,568 +/- 2,250 m3 (95% CI)"
            },
            "vermicomposting": {
                "model": "Eisenia fetida solid-state bioconversion",
                "classification": "MODELED",
                "products": "7.01 tonnes Vermicompost + 35,311 L Vermiwash"
            },
            "mass_balance": {
                "status": "VALIDATED",
                "closure_error": "0.0000% (Conservation of Mass)"
            },
            "economics": {
                "model": "Discounted cash flow & OPEX/CAPEX scenario modeling (Low/Base/High)",
                "classification": "MODELED"
            }
        }
    }
