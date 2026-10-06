import uuid
import datetime
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# -------------------------------------------------------------
# 1. WATER QUALITY OBSERVATIONS ENDPOINT
# -------------------------------------------------------------
def test_get_water_quality_observations():
    response = client.get("/api/v1/water-quality")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    
    first = data[0]
    assert "ph" in first
    assert "do_mg_l" in first
    assert "bod_mg_l" in first
    assert "provenance_status" in first
    assert "quality_flag" in first
    assert "compliance_status" in first


def test_get_water_quality_filtered_by_station():
    response = client.get("/api/v1/water-quality?station_id=1")
    assert response.status_code == 200
    data = response.json()
    for item in data:
        assert item["station_id"] == 1


# -------------------------------------------------------------
# 2. STATIONS WATER QUALITY AGGREGATION
# -------------------------------------------------------------
def test_get_water_quality_stations_summary():
    response = client.get("/api/v1/water-quality/stations")
    assert response.status_code == 200
    stations = response.json()
    assert len(stations) >= 1
    
    first = stations[0]
    assert "station_name" in first
    assert "mean_do_mg_l" in first
    assert "mean_bod_mg_l" in first
    assert "cpcb_water_class" in first


# -------------------------------------------------------------
# 3. BASIN-WIDE SUMMARY & COMPLIANCE METRICS
# -------------------------------------------------------------
def test_get_water_quality_summary():
    response = client.get("/api/v1/water-quality/summary")
    assert response.status_code == 200
    summary = response.json()
    
    assert summary["total_observations_count"] >= 1
    assert "regional_means" in summary
    assert "ph" in summary["regional_means"]
    assert "do_mg_l" in summary["regional_means"]
    assert "bod_mg_l" in summary["regional_means"]
    assert "cpcb_compliance_rate_pct" in summary
    assert "provenance_breakdown" in summary


# -------------------------------------------------------------
# 4. SINGLE OBSERVATION WITH AUDIT COMPLIANCE
# -------------------------------------------------------------
def test_get_single_water_quality_observation():
    response = client.get("/api/v1/water-quality/1")
    assert response.status_code == 200
    obs = response.json()
    assert obs["id"] == 1
    assert "compliance_status" in obs
    assert "pH" in obs["compliance_status"]
    assert "DO" in obs["compliance_status"]


# -------------------------------------------------------------
# 5. DATA IMPORT & BOUNDS VALIDATION
# -------------------------------------------------------------
def test_import_water_quality_json_valid():
    # Generate a unique timestamp to prevent collision with persistent test DB
    unique_time = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=10, seconds=int(uuid.uuid4().int % 100000))).isoformat()
    payload = {
        "dataset_name": "Test Real CPCB Ingestion",
        "source_attribution": "CPCB Water Monitoring Division",
        "observations": [
            {
                "station_id": 1,
                "station_name": "Phaphamau Bridge Station",
                "observation_time": unique_time,
                "latitude": 25.5015,
                "longitude": 81.8612,
                "river_reach": "Ganga - Upstream Reach",
                "ph": 7.82,
                "do_mg_l": 6.5,
                "bod_mg_l": 3.4,
                "cod_mg_l": 17.5,
                "tss_mg_l": 40.0,
                "tds_mg_l": 310.0,
                "temperature_c": 24.2,
                "turbidity_ntu": 12.5,
                "conductivity_us_cm": 375.0,
                "nitrate_no3_mg_l": 1.75,
                "phosphate_po4_mg_l": 0.35,
                "source": "CPCB NWMP",
                "quality_flag": "VALIDATED",
                "provenance_status": "OBSERVED",
                "is_demo_data": 0
            }
        ]
    }
    response = client.post("/api/v1/water-quality/import", json=payload)
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["imported_count"] == 1
    assert res_data["validation_errors_count"] == 0

    # Repeating with the exact same timestamp should result in skipped duplicate
    dup_res = client.post("/api/v1/water-quality/import", json=payload)
    assert dup_res.status_code == 200
    assert dup_res.json()["skipped_duplicates_count"] == 1


def test_import_water_quality_bounds_validation_failure():
    # Test invalid pH (e.g. 15.5) which violates physical limits
    payload = {
        "observations": [
            {
                "station_id": 1,
                "observation_time": "2026-10-06T21:00:00Z",
                "ph": 15.5, # Invalid!
                "do_mg_l": 6.5,
                "bod_mg_l": 3.4,
                "cod_mg_l": 17.5,
                "tss_mg_l": 40.0
            }
        ]
    }
    response = client.post("/api/v1/water-quality/import", json=payload)
    # Pydantic schema will return 422 Unprocessable Entity
    assert response.status_code == 422


def test_import_water_quality_csv():
    unique_time = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=20, seconds=int(uuid.uuid4().int % 100000))).isoformat()
    csv_text = (
        "station_id,station_name,observation_time,latitude,longitude,river_reach,ph,do_mg_l,bod_mg_l,cod_mg_l,tss_mg_l,tds_mg_l,temperature_c,turbidity_ntu,conductivity_us_cm,nitrate_no3_mg_l,phosphate_po4_mg_l,chromium_cr,lead_pb,cadmium_cd,nickel_ni,mercury_hg,arsenic_as,zinc_zn,copper_cu,is_heavy_metal_measured,source,source_url,method,quality_flag,provenance_status,is_demo_data\n"
        f"2,Curzon Bridge Reach,{unique_time},25.4830,81.8755,Ganga Curzon Reach,7.65,5.9,4.2,20.0,50.0,340.0,25.0,16.0,395.0,1.90,0.40,8.0,6.0,0.4,4.5,0.02,0.9,65.0,18.0,0,CPCB Telemetry,https://cpcb.nic.in,APHA 23rd Ed,VALIDATED,OBSERVED,0\n"
    )
    payload = {
        "csv_content": csv_text,
        "source_attribution": "CPCB Live Test Import"
    }
    response = client.post("/api/v1/water-quality/import", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["imported_count"] == 1
    assert data["validation_errors_count"] == 0



# -------------------------------------------------------------
# 6. HEAVY METAL BENCHMARK PROVENANCE SEPARATION
# -------------------------------------------------------------
def test_heavy_metal_provenance_separation():
    response = client.get("/api/v1/water-quality/1")
    assert response.status_code == 200
    obs = response.json()
    assert obs["is_heavy_metal_measured"] == 0 # Flagged as unmeasured literature benchmark
    assert "Literature Benchmark" in obs["compliance_status"]["Heavy_Metals"]
