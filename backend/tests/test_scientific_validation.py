import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.units import (
    m2_to_ha,
    ha_to_m2,
    kg_to_tonnes,
    tonnes_to_kg,
    kwh_to_mj,
    mj_to_kwh,
    bmp_ml_g_to_m3_t,
    biocng_volume_m3_to_mass_kg,
    lakhs_to_inr,
    inr_to_lakhs
)

client = TestClient(app)

# -------------------------------------------------------------
# 1. UNIT NORMALIZATION TESTS
# -------------------------------------------------------------
def test_unit_normalization_conversions():
    # Area
    assert m2_to_ha(10000.0) == 1.0
    assert ha_to_m2(1.5) == 15000.0
    
    # Mass
    assert kg_to_tonnes(1000.0) == 1.0
    assert tonnes_to_kg(2.5) == 2500.0
    
    # Energy
    assert kwh_to_mj(1.0) == 3.6
    assert round(mj_to_kwh(3.6), 2) == 1.0
    
    # BMP equivalence (mL CH4/g VS == m3 CH4/tonne VS)
    assert bmp_ml_g_to_m3_t(245.0) == 245.0
    
    # Bio-CNG mass from NTP volume at 0.717 kg/m3 density & 96% purity
    mass_kg = biocng_volume_m3_to_mass_kg(1000.0, purity=0.96)
    expected_kg = 1000.0 * 0.717 * 0.96
    assert abs(mass_kg - expected_kg) < 1e-4

    # Currency
    assert lakhs_to_inr(16.7) == 1670000.0
    assert inr_to_lakhs(1670000.0) == 16.7


# -------------------------------------------------------------
# 2. BIOMASS CONSISTENCY & VARIABLE RELATIONSHIP TESTS
# -------------------------------------------------------------
def test_biomass_physical_consistency():
    payload = {
        "area_ha": 14.5,
        "coverage_pct": 75.0,
        "density_class": "High",
        "moisture_content_pct": 91.0,
        "total_solids_pct": 9.0,
        "volatile_solids_pct": 80.0,
        "collection_efficiency_pct": 85.0
    }
    response = client.post("/api/v1/biomass/calculate", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    fresh_total = data["fresh_biomass_total_t"]
    recoverable = data["recoverable_biomass_t"]
    ts = data["total_solids_t"]
    vs = data["volatile_solids_t"]
    
    # Absolute physical consistency check:
    # Fresh Total >= Fresh Recoverable > TS > VS > 0
    assert fresh_total > recoverable
    assert recoverable > ts
    assert ts > vs
    assert vs > 0


# -------------------------------------------------------------
# 3. BIOENERGY MODELING CONSISTENCY
# -------------------------------------------------------------
def test_bioenergy_simulation_consistency():
    payload = {
        "biomass_input_t": 407.24,
        "moisture_content_pct": 91.0,
        "total_solids_pct": 9.0,
        "volatile_solids_pct": 80.0,
        "utilization_pct": 85.0,
        "scenario_type": "Baseline"
    }
    response = client.post("/api/v1/bioenergy/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    # Mutual consistency between gas volume, Bio-CNG mass, and electricity
    raw_biogas_m3 = data["biogas_volume_m3"]
    bio_cng_kg = data["bio_cng_potential_kg"]
    elec_kwh = data["electrical_energy_kwh"]
    vermicompost_t = data["vermicompost_potential_t"]
    vermiwash_l = data["liquid_vermiwash_liters"]
    
    assert raw_biogas_m3 > 0
    assert bio_cng_kg > 0
    assert elec_kwh > 0
    assert vermicompost_t > 0
    assert vermiwash_l > 0
    
    # Check that Bio-CNG mass does not exceed total raw gas mass
    assert bio_cng_kg < (raw_biogas_m3 * 1.2)


# -------------------------------------------------------------
# 4. MULTI-SCALE PIPELINE CONSISTENCY (10t, 50t, 100t, 500t)
# -------------------------------------------------------------
@pytest.mark.parametrize("biomass_t", [10.0, 50.0, 100.0, 500.0])
def test_pipeline_scaling(biomass_t):
    payload = {
        "biomass_input_t": biomass_t,
        "moisture_content_pct": 91.0,
        "total_solids_pct": 9.0,
        "volatile_solids_pct": 80.0,
        "utilization_pct": 85.0,
        "scenario_type": "Baseline"
    }
    response = client.post("/api/v1/bioenergy/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    # Linear scale verification
    ratio = data["bio_cng_potential_kg"] / biomass_t
    # Expected yield should be ~8 to 12 kg Bio-CNG per wet tonne
    assert 5.0 <= ratio <= 15.0


# -------------------------------------------------------------
# 5. SCIENTIFIC EDGE CASE & BOUNDARY TESTING
# -------------------------------------------------------------
def test_edge_case_zero_biomass():
    payload = {
        "biomass_input_t": 0.0,
        "moisture_content_pct": 91.0,
        "total_solids_pct": 9.0,
        "volatile_solids_pct": 80.0,
        "utilization_pct": 85.0,
        "scenario_type": "Baseline"
    }
    response = client.post("/api/v1/bioenergy/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["biogas_volume_m3"] == 0.0
    assert data["bio_cng_potential_kg"] == 0.0
    assert data["electrical_energy_kwh"] == 0.0
    assert data["vermicompost_potential_t"] == 0.0


def test_edge_case_zero_total_solids():
    payload = {
        "biomass_input_t": 100.0,
        "moisture_content_pct": 100.0,
        "total_solids_pct": 0.0,
        "volatile_solids_pct": 80.0,
        "utilization_pct": 85.0,
        "scenario_type": "Baseline"
    }
    response = client.post("/api/v1/bioenergy/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["biogas_volume_m3"] == 0.0
    assert data["bio_cng_potential_kg"] == 0.0


# -------------------------------------------------------------
# 6. SATELLITE PROVIDER STATUS & PROVENANCE
# -------------------------------------------------------------
def test_satellite_providers_status_endpoint():
    response = client.get("/api/v1/satellite/providers/status")
    assert response.status_code == 200
    data = response.json()
    assert "active_provider" in data
    assert "providers" in data
    providers = data["providers"]
    assert "DEMO" in providers
    assert "SENTINEL_COPERNICUS" in providers
    assert "EARTH_ENGINE" in providers
    assert providers["DEMO"]["configured"] is True


# -------------------------------------------------------------
# 7. SCIENTIFIC ASSUMPTIONS REGISTRY
# -------------------------------------------------------------
def test_scientific_assumptions_registry():
    response = client.get("/api/v1/assumptions/")
    assert response.status_code == 200
    assumptions = response.json()
    assert len(assumptions) >= 5
    
    categories = {a["category"] for a in assumptions}
    assert "BIOMASS" in categories
    assert "BIOENERGY" in categories
    assert "ENVIRONMENT" in categories

