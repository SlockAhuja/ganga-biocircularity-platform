import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "OPERATIONAL"

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_get_regions():
    response = client.get("/api/v1/regions/")
    assert response.status_code == 200
    assert len(response.json()) >= 1

def test_get_stations():
    response = client.get("/api/v1/stations/")
    assert response.status_code == 200
    assert len(response.json()) >= 1

def test_get_hyacinth_zones():
    response = client.get("/api/v1/hyacinth/zones")
    assert response.status_code == 200
    zones = response.json()
    assert len(zones) >= 1
    assert "area_ha" in zones[0]

def test_simulate_bioenergy():
    payload = {
        "biomass_input_t": 500.0,
        "moisture_content_pct": 91.0,
        "total_solids_pct": 9.0,
        "volatile_solids_pct": 80.0,
        "utilization_pct": 85.0,
        "scenario_type": "Baseline"
    }
    response = client.post("/api/v1/bioenergy/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["bio_cng_potential_kg"] > 0
    assert data["vermicompost_potential_t"] > 0

def test_generate_report_and_pdf():
    payload = {
        "title": "Automated Test Report",
        "study_region": "Prayagraj",
        "zone_ids": [1, 2],
        "include_sections": ["All"]
    }
    response = client.post("/api/v1/reports/generate", json=payload)
    assert response.status_code == 200
    rep_data = response.json()
    report_code = rep_data["report_code"]
    
    # Test downloading PDF
    pdf_resp = client.get(f"/api/v1/reports/download-pdf/{report_code}")
    assert pdf_resp.status_code == 200
    assert pdf_resp.headers["content-type"] == "application/pdf"
    assert len(pdf_resp.content) > 100
