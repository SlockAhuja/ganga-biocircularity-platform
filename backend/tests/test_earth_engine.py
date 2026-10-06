import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.satellite.factory import get_satellite_provider
from app.core.satellite.earth_engine_provider import EarthEngineSatelliteProvider
from app.core.satellite.demo_provider import DemoSatelliteProvider

client = TestClient(app)

# -------------------------------------------------------------
# 1. PROVIDER ABSTRACTION & FACTORY TESTS
# -------------------------------------------------------------
def test_satellite_factory_provider_selection():
    demo_prov = get_satellite_provider("demo")
    assert isinstance(demo_prov, DemoSatelliteProvider)
    assert demo_prov.provider_id == "DEMO"
    assert demo_prov.is_configured is True

    ee_prov = get_satellite_provider("earth_engine")
    assert isinstance(ee_prov, EarthEngineSatelliteProvider)
    assert ee_prov.provider_id == "EARTH_ENGINE"
    assert ee_prov.project_id == "camera-503319"


# -------------------------------------------------------------
# 2. HEALTH ENDPOINT & SECRET LEAKAGE PREVENTION
# -------------------------------------------------------------
def test_satellite_health_endpoint():
    response = client.get("/api/v1/satellite/health")
    assert response.status_code == 200
    data = response.json()
    
    assert "provider" in data
    assert "project_id" in data
    assert "authenticated" in data
    assert "status" in data
    
    # Crucial Security Check: Never expose tokens, private keys, or credentials
    data_str = str(data).lower()
    assert "private_key" not in data_str
    assert "client_secret" not in data_str
    assert "token" not in data_str or data.get("provider") in ["demo", "earth_engine"]


def test_satellite_providers_status():
    response = client.get("/api/v1/satellite/providers/status")
    assert response.status_code == 200
    data = response.json()
    assert "providers" in data
    assert "DEMO" in data["providers"]
    assert "EARTH_ENGINE" in data["providers"]
    assert data["providers"]["EARTH_ENGINE"]["project_id"] == "camera-503319"


# -------------------------------------------------------------
# 3. SENTINEL-2 SCENE SEARCH & FILTERING
# -------------------------------------------------------------
def test_satellite_scene_search():
    payload = {
        "aoi_bbox": [81.80, 25.38, 81.95, 25.54],
        "start_date": "2026-09-01",
        "end_date": "2026-10-06",
        "max_cloud_cover_pct": 10.0,
        "provider": "demo"
    }
    response = client.post("/api/v1/satellite/search-scenes", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "matched_scenes_count" in data
    assert "scenes" in data
    for s in data["scenes"]:
        assert s["cloud_coverage_pct"] <= 10.0


# -------------------------------------------------------------
# 4. FULL SPECTRAL ANALYSIS & CANDIDATE CLASSIFICATION
# -------------------------------------------------------------
def test_satellite_analysis_pipeline():
    payload = {
        "aoi_bbox": [81.80, 25.38, 81.95, 25.54],
        "start_date": "2026-09-15",
        "end_date": "2026-10-05",
        "max_cloud_cover_pct": 15.0,
        "provider": "demo",
        "analysis_type": "SINGLE",
        "biomass_density_factor_t_ha": 44.05
    }
    response = client.post("/api/v1/satellite/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    assert data["status"] == "SUCCESS"
    assert data["total_estimated_hyacinth_area_ha"] > 0
    assert data["total_estimated_fresh_biomass_t"] > 0
    assert data["classification_status"] == "ESTIMATED"
    assert "candidate_zones" in data
    assert len(data["candidate_zones"]) >= 1
    
    # Verify provenance metadata
    assert "provenance" in data
    assert "dataset" in data["provenance"]
    assert "algorithm_version" in data["provenance"]


# -------------------------------------------------------------
# 5. BEFORE / AFTER MULTI-TEMPORAL COMPARISON
# -------------------------------------------------------------
def test_satellite_before_after_comparison():
    payload = {
        "aoi_bbox": [81.80, 25.38, 81.95, 25.54],
        "period_a_start": "2026-09-15",
        "period_a_end": "2026-10-05",
        "period_b_start": "2026-08-01",
        "period_b_end": "2026-08-31",
        "max_cloud_cover_pct": 20.0,
        "provider": "demo"
    }
    response = client.post("/api/v1/satellite/compare", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    assert data["status"] == "SUCCESS"
    assert "period_a" in data
    assert "period_b" in data
    assert "delta_area_ha" in data
    assert "percentage_change" in data
    assert "interpretation" in data


# -------------------------------------------------------------
# 6. HYACINTH CANDIDATE DETECTION & PERSISTENCE
# -------------------------------------------------------------
def test_hyacinth_detection_endpoint():
    payload = {
        "aoi_bbox": [81.80, 25.38, 81.95, 25.54],
        "start_date": "2026-09-15",
        "end_date": "2026-10-05",
        "max_cloud_cover_pct": 20.0,
        "provider": "demo",
        "save_to_database": False
    }
    response = client.post("/api/v1/hyacinth/detect", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "candidate_zones" in data
    assert data["persisted_to_db"] is False
