import pytest
from app.core.biomass_engine import calculate_biomass_quantification
from app.core.bioenergy_engine import calculate_bioenergy_and_products
from app.core.circularity_engine import calculate_circularity_score
from app.core.economic_engine import calculate_economic_viability
from app.core.environmental_engine import calculate_environmental_impact
from app.core.gis_engine import calculate_geodesic_polygon_area_sqm, calculate_linestring_length_meters

def test_biomass_quantification():
    result = calculate_biomass_quantification(
        area_ha=10.0,
        coverage_pct=80.0,
        density_class="High",
        moisture_pct=91.0,
        total_solids_pct=9.0,
        volatile_solids_pct=80.0,
        collection_efficiency_pct=85.0
    )
    # 10 ha * 0.8 * 32 t/ha = 256 t
    assert result["fresh_biomass_total_t"] == 256.0
    assert result["total_solids_t"] == round(256.0 * 0.09, 2)
    assert result["volatile_solids_t"] == round(result["total_solids_t"] * 0.80, 2)
    assert result["recoverable_biomass_t"] == round(256.0 * 0.85, 2)

def test_bioenergy_modeling():
    result = calculate_bioenergy_and_products(
        biomass_input_t=500.0,
        moisture_pct=91.0,
        total_solids_pct=9.0,
        volatile_solids_pct=80.0,
        utilization_pct=85.0,
        scenario_type="Baseline"
    )
    assert result["biogas_volume_m3"] > 0
    assert result["bio_cng_potential_kg"] > 0
    assert result["vermicompost_potential_t"] > 0
    assert result["nitrogen_recovery_kg"] > 0

def test_circularity_score():
    result = calculate_circularity_score(
        biomass_harvested_t=950.0,
        biomass_available_t=1170.4,
        bio_cng_produced_kg=16840.0,
        vermicompost_produced_t=23.7,
        digestate_reutilized_t=780.0,
        total_digestate_t=850.0
    )
    assert 0 <= result["overall_circularity_score"] <= 100
    assert result["biomass_recovery_subscore"] > 0

def test_economic_valuation():
    result = calculate_economic_viability(
        fresh_biomass_t=1000.0,
        bio_cng_kg=15000.0,
        vermicompost_t=20.0,
        vermiwash_liters=12000.0
    )
    assert result["total_cost"] > 0
    assert result["total_revenue"] > 0
    assert "net_benefit" in result
    assert "payback_period_years" in result

def test_environmental_lca():
    result = calculate_environmental_impact(
        fresh_biomass_t=1000.0,
        area_cleared_ha=30.0,
        bio_cng_kg=15000.0,
        electricity_kwh=50000.0,
        vermicompost_t=20.0
    )
    assert result["ghg_avoidance_kg_co2e"] > 0
    assert result["water_bod_reduction_kg"] == 30.0 * 185.0

def test_gis_geodesic_measurements():
    # Square around Prayagraj approx 0.01 deg lat/lon
    poly_coords = [
        [81.88, 25.42],
        [81.89, 25.42],
        [81.89, 25.43],
        [81.88, 25.43],
        [81.88, 25.42]
    ]
    area_sqm = calculate_geodesic_polygon_area_sqm(poly_coords)
    assert area_sqm > 100000.0 # roughly 1 sq km
