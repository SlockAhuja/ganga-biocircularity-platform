"""
BioRiver End-to-End System Smoke Test
Executes the full scientific user journey against the real FastAPI backend and database.
"""
import sys
import os
import json

# Add backend to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from fastapi.testclient import TestClient
from app.main import app

def run_e2e_smoke_test():
    print("=" * 70)
    print("      BIORIVER -- END-TO-END INTEGRATION & REALITY SMOKE TEST")
    print("=" * 70)
    
    client = TestClient(app)
    
    # 1. Health & Root
    print("\n[Step 1] Checking Platform Health & Metadata...")
    res = client.get("/")
    assert res.status_code == 200, f"Root endpoint failed: {res.text}"
    data = res.json()
    assert data["status"] == "OPERATIONAL"
    print(f"  [OK] Platform: {data['platform']} v{data['version']} (Region: {data['region']})")
    
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"
    print("  [OK] Health Check: Healthy (GIS & Bioenergy Engines Operational)")
    
    # 2. Authentication
    print("\n[Step 2] Authenticating Roles via /api/v1/auth/login-json...")
    roles_to_test = [
        ("admin@bioriver.in", "bioriver2026", "ADMIN"),
        ("researcher@bioriver.in", "bioriver2026", "RESEARCHER"),
        ("operator@bioriver.in", "bioriver2026", "FIELD_OPERATOR"),
        ("analyst@bioriver.in", "bioriver2026", "RESEARCHER")
    ]
    tokens = {}
    for email, pwd, expected_role in roles_to_test:
        auth_res = client.post("/api/v1/auth/login-json", json={"username": email, "password": pwd})
        assert auth_res.status_code == 200, f"Auth failed for {email}: {auth_res.text}"
        auth_data = auth_res.json()
        assert "access_token" in auth_data
        assert auth_data["role"] == expected_role
        tokens[email] = auth_data["access_token"]
        print(f"  [OK] Authenticated {email} -> Role: {auth_data['role']} ({auth_data['full_name']})")
        
    auth_headers = {"Authorization": f"Bearer {tokens['researcher@bioriver.in']}"}
    
    # 3. Projects, River & Regions
    print("\n[Step 3] Fetching River Basins & Segments...")
    reg_res = client.get("/api/v1/regions/", headers=auth_headers)
    assert reg_res.status_code == 200
    regions = reg_res.json()
    assert len(regions) >= 1
    print(f"  [OK] Loaded {len(regions)} Monitoring Regions (Primary: {regions[0]['name']})")
    
    seg_res = client.get("/api/v1/regions/river-segments", headers=auth_headers)
    assert seg_res.status_code == 200
    segments = seg_res.json()
    assert len(segments) >= 1
    print(f"  [OK] Loaded {len(segments)} River Segments with GeoJSON LineStrings")
    
    # 4. Monitoring Stations
    print("\n[Step 4] Querying Geospatial Monitoring Stations...")
    stn_res = client.get("/api/v1/stations/", headers=auth_headers)
    assert stn_res.status_code == 200
    stations = stn_res.json()
    assert len(stations) >= 1
    print(f"  [OK] Loaded {len(stations)} Active Stations in Prayagraj Reach")
    for s in stations[:3]:
        print(f"     - [{s['station_code']}] {s['name']} at ({s['latitude']} deg N, {s['longitude']} deg E)")
        
    # 5. Hyacinth Polygons
    print("\n[Step 5] Retrieving Sentinel-2 Classified Hyacinth Vector Zones...")
    zn_res = client.get("/api/v1/hyacinth/zones", headers=auth_headers)
    assert zn_res.status_code == 200
    zones = zn_res.json()
    assert len(zones) >= 1
    total_area_ha = sum(z["area_ha"] for z in zones)
    print(f"  [OK] Loaded {len(zones)} Hyacinth Vector Zones (Total Area: {total_area_ha:.2f} ha)")
    
    # 6. GIS Geodesic Measurement & Biomass Quantification
    print("\n[Step 6] Running Geodesic Area Measurement & Biomass Quantification...")
    bio_payload = {
        "assessment_name": "Sangam Main Pool Assessment",
        "area_ha": zones[0]["area_ha"],
        "coverage_pct": zones[0]["coverage_pct"],
        "density_class": zones[0]["density_class"],
        "moisture_pct": 91.0,
        "total_solids_pct": 9.0,
        "volatile_solids_pct": 80.0,
        "collection_efficiency_pct": 85.0
    }
    quant_res = client.post("/api/v1/biomass/quantify", json=bio_payload, headers=auth_headers)
    assert quant_res.status_code == 200, f"Biomass quantify failed: {quant_res.text}"
    quant_data = quant_res.json()
    fresh_biomass_t = quant_data["fresh_biomass_total_t"]
    recoverable_t = quant_data["recoverable_biomass_t"]
    print(f"  [OK] Calculated Fresh Biomass: {fresh_biomass_t:.1f} tonnes")
    print(f"  [OK] Calculated Dry Solids (TS): {quant_data['total_solids_t']:.2f} tonnes")
    print(f"  [OK] Calculated Volatile Solids (VS): {quant_data['volatile_solids_t']:.2f} tonnes")
    print(f"  [OK] Calculated Recoverable Biomass (85% eff): {recoverable_t:.1f} tonnes")
    
    # 7. Bioenergy & Resource Recovery Simulation
    print("\n[Step 7] Simulating Anaerobic Digestion & Bio-CNG Yields...")
    energy_payload = {
        "biomass_input_t": recoverable_t,
        "moisture_content_pct": 91.0,
        "total_solids_pct": 9.0,
        "volatile_solids_pct": 80.0,
        "utilization_pct": 85.0,
        "scenario_type": "Baseline"
    }
    sim_res = client.post("/api/v1/bioenergy/simulate", json=energy_payload, headers=auth_headers)
    assert sim_res.status_code == 200, f"Bioenergy simulate failed: {sim_res.text}"
    sim_data = sim_res.json()
    bio_cng_kg = sim_data["bio_cng_potential_kg"]
    vermicompost_t = sim_data["vermicompost_potential_t"]
    print(f"  [OK] Biogas Volume Generated: {sim_data['biogas_volume_m3']:,} m3")
    print(f"  [OK] Purified Bio-CNG Potential: {bio_cng_kg:,} kg")
    print(f"  [OK] Electrical Power Equivalent: {sim_data['electrical_energy_kwh']:,} kWh")
    print(f"  [OK] Fortified Vermicompost Output: {vermicompost_t:.2f} tonnes")
    print(f"  [OK] Liquid Vermiwash Extracted: {sim_data['liquid_vermiwash_liters']:,} Liters")
    print(f"  [OK] N-P-K Nutrients Recycled: {sim_data['nitrogen_recovery_kg']:.1f} kg N, {sim_data['phosphorus_recovery_kg']:.1f} kg P, {sim_data['potassium_recovery_kg']:.1f} kg K")
    
    # 8. Environmental LCA Impact
    print("\n[Step 8] Evaluating Environmental Life Cycle Carbon Mitigation...")
    env_res = client.get(f"/api/v1/environment/impact?fresh_biomass_t={fresh_biomass_t}", headers=auth_headers)
    assert env_res.status_code == 200
    env_data = env_res.json()
    print(f"  [OK] Net GHG Avoidance: {env_data['ghg_avoidance_kg_co2e']:,.0f} kg CO2e")
    print(f"  [OK] River BOD Load Reduction: {env_data['water_bod_reduction_kg']:,.0f} kg BOD")
    print(f"  [OK] River Surface Cleared: {env_data['river_surface_cleared_ha']:.1f} ha")
    
    # 9. Techno-Economic Feasibility Across Scenarios
    print("\n[Step 9] Computing Economic Cost-Benefit Analysis...")
    econ_payload = {
        "fresh_biomass_t": fresh_biomass_t,
        "bio_cng_kg": bio_cng_kg,
        "vermicompost_t": vermicompost_t,
        "vermiwash_liters": sim_data["liquid_vermiwash_liters"]
    }
    econ_res = client.post("/api/v1/economics/calculate", json=econ_payload, headers=auth_headers)
    assert econ_res.status_code == 200
    econ_data = econ_res.json()
    print(f"  [OK] Total Operating & Harvest Cost: INR {econ_data['total_cost']:,.0f}")
    print(f"  [OK] Gross Cascading Product Revenue: INR {econ_data['total_revenue']:,.0f}")
    print(f"  [OK] Net Economic Benefit: INR {econ_data['net_benefit']:,.0f}")
    print(f"  [OK] Project Payback Period: {econ_data['payback_period_years']:.2f} years")
    
    # 10. Circularity Index
    print("\n[Step 10] Calculating 5-Pillar Circularity Index...")
    circ_res = client.get("/api/v1/circularity/score", headers=auth_headers)
    assert circ_res.status_code == 200
    circ_data = circ_res.json()
    print(f"  [OK] Overall Circularity Index: {circ_data['overall_circularity_score']:.1f} / 100")
    print(f"     - Biomass Recovery Subscore: {circ_data['biomass_recovery_subscore']:.1f}")
    print(f"     - Resource Conversion Subscore: {circ_data['resource_conversion_subscore']:.1f}")
    print(f"     - Nutrient Recycling Subscore: {circ_data['nutrient_recovery_subscore']:.1f}")
    print(f"     - Waste Diversion Subscore: {circ_data['waste_diversion_subscore']:.1f}")
    print(f"     - Energy Recovery Subscore: {circ_data['energy_recovery_subscore']:.1f}")
    
    # 11. Water Quality Monitoring
    print("\n[Step 11] Checking Real-Time Water Quality & Heavy Metal Telemetry...")
    wq_res = client.get("/api/v1/water-quality/observations", headers=auth_headers)
    assert wq_res.status_code == 200
    wq_data = wq_res.json()
    print(f"  [OK] Loaded {len(wq_data)} Multi-Parameter Observations (Station #1 DO: {wq_data[0]['do_mg_l']} mg/L, BOD: {wq_data[0]['bod_mg_l']} mg/L)")
    
    # 12. Harvesting Records & Field Logging
    print("\n[Step 12] Creating Field Observation & Verifying Harvesting Operations...")
    field_payload = {
        "station_name": stations[0]["name"],
        "observation_date": "2026-10-06T10:00:00Z",
        "latitude": stations[0]["latitude"],
        "longitude": stations[0]["longitude"],
        "hyacinth_density": "High",
        "coverage_pct": 80.0,
        "water_appearance": "Dense macrophyte clustering",
        "observer_name": "Field Operator",
        "notes": "E2E verification observation"
    }
    field_res = client.post("/api/v1/harvesting/field-observations", json=field_payload, headers=auth_headers)
    assert field_res.status_code == 200
    print(f"  [OK] Saved Field Observation ID #{field_res.json()['id']} successfully")
    
    # 13. PDF Report Compilation & Download
    print("\n[Step 13] Compiling Full Multi-Page Scientific PDF Assessment Report...")
    rep_payload = {
        "title": "Ganga Biocircularity Verification Assessment",
        "study_region": "Prayagraj (Allahabad) Confluence Stretch",
        "zone_ids": [z["id"] for z in zones],
        "include_sections": ["All"],
        "custom_notes": "Validated via automated BioRiver E2E smoke test pipeline."
    }
    rep_res = client.post("/api/v1/reports/generate", json=rep_payload, headers=auth_headers)
    assert rep_res.status_code == 200
    rep_data = rep_res.json()
    report_code = rep_data["report_code"]
    print(f"  [OK] Report Registered: {report_code} (Status: {rep_data['status']})")
    
    pdf_res = client.get(f"/api/v1/reports/download-pdf/{report_code}")
    assert pdf_res.status_code == 200
    assert pdf_res.headers["content-type"] == "application/pdf"
    assert len(pdf_res.content) > 1000
    print(f"  [OK] Downloaded ReportLab PDF ({len(pdf_res.content):,} bytes, Content-Type: {pdf_res.headers['content-type']})")
    
    print("\n" + "=" * 70)
    print("  [SUCCESS] ALL 13 END-TO-END WORKFLOW INTEGRATION STEPS PASSED!")
    print("=" * 70)

if __name__ == '__main__':
    run_e2e_smoke_test()
