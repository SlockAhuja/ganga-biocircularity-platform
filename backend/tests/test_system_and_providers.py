"""
Unit and Integration Tests for BioRiver External Providers, Mass Balance, Uncertainty & System Diagnostics
"""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_system_providers_health_endpoint():
    response = client.get("/api/v1/system/providers-health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert data["total_providers"] >= 7
    provider_ids = [p["provider_id"] for p in data["providers"]]
    assert "GOOGLE_EARTH_ENGINE" in provider_ids
    assert "MAPTILER" in provider_ids
    assert "CPCB_NWMP" in provider_ids
    assert "INDIA_WRIS_CWC" in provider_ids
    assert "OPEN_METEO_WEATHER" in provider_ids
    assert "OPEN_STREET_MAP" in provider_ids
    assert "OBJECT_STORAGE" in provider_ids

def test_system_weather_endpoint():
    response = client.get("/api/v1/system/weather")
    assert response.status_code == 200
    data = response.json()
    assert "conditions" in data
    assert "operational_impact" in data
    assert "temperature_c" in data["conditions"]
    assert "harvesting_safety" in data["operational_impact"]
    assert "provenance" in data
    assert data["provenance"]["provenance"] in ["OBSERVED", "ESTIMATED"]

def test_system_hydrology_endpoint():
    response = client.get("/api/v1/system/hydrology")
    assert response.status_code == 200
    data = response.json()
    assert "gauges" in data
    assert len(data["gauges"]) >= 2
    assert "total_confluence_inflow_m3_s" in data

def test_system_mass_balance_closure():
    response = client.get("/api/v1/system/mass-balance?harvested_tonnes=479.1&moisture_pct=91.0&dewatering_efficiency=25.0")
    assert response.status_code == 200
    data = response.json()
    assert data["mass_closure_valid"] is True
    assert data["closure_error_percent"] < 0.01
    assert "stages" in data
    assert len(data["stages"]) == 5
    assert "products_summary" in data

def test_system_uncertainty_quantification():
    response = client.get("/api/v1/system/uncertainty")
    assert response.status_code == 200
    data = response.json()
    assert "biomass" in data
    assert "bioenergy" in data
    assert "economics" in data
    assert data["biomass"]["mean_value"] == 479.1
    assert data["biomass"]["ci_95_low"] < data["biomass"]["mean_value"] < data["biomass"]["ci_95_high"]
    assert data["heavy_metals"]["status"] == "UNCONSTRAINED"

def test_system_data_quality_evaluation():
    response = client.get("/api/v1/system/data-quality")
    assert response.status_code == 200
    data = response.json()
    assert "data_quality_score" in data
    assert 0.0 <= data["data_quality_score"] <= 100.0
    assert data["status"] in ["PASS", "WARNING", "FAIL"]

def test_ground_truth_field_observation_submission():
    payload = {
        "station_name": "Triveni Sangam Ground Truth Site 01",
        "latitude": 25.4275,
        "longitude": 81.8860,
        "hyacinth_density": "High",
        "coverage_pct": 82.5,
        "water_appearance": "Dense blooming hyacinth mat",
        "observer_name": "Dr. Ananya Sharma",
        "ground_truth_class": "HYACINTH",
        "species_identified": "Eichhornia crassipes",
        "confidence_score": 0.99,
        "validation_status": "VALIDATED",
        "notes": "Ground-truth canopy sample collected with GPS logger."
    }
    response = client.post("/api/v1/harvesting/field-observations", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["ground_truth_class"] == "HYACINTH"
    assert data["species_identified"] == "Eichhornia crassipes"
    assert data["confidence_score"] == 0.99
    assert data["validation_status"] == "VALIDATED"
