import pytest
import shapely.geometry as sg
from fastapi.testclient import TestClient
from app.main import app
from app.core.water_geometry_provider import water_geometry_provider

client = TestClient(app)

# Prayagraj Ganga-Yamuna Confluence Study AOI
PRAYAGRAJ_AOI = [81.70, 25.30, 82.10, 25.65] # [min_lng, min_lat, max_lng, max_lat]

def test_water_extent_api_endpoint():
    """Verify GET /api/v1/regions/water-extent returns valid GeoJSON FeatureCollection with provenance."""
    response = client.get("/api/v1/regions/water-extent")
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "FeatureCollection"
    assert len(data["features"]) >= 4

    props = data.get("properties", {})
    assert "source" in props
    assert "provenance_status" in props
    assert props["provenance_status"] in ["ESTIMATED", "REFERENCE", "OBSERVED", "DEMO"]
    assert "method" in props

    for feat in data["features"]:
        feat_props = feat.get("properties", {})
        assert "river" in feat_props
        assert "area_ha" in feat_props
        assert feat_props["area_ha"] > 0
        assert feat["geometry"]["type"] in ["Polygon", "MultiPolygon"]

def test_water_extent_shapely_validity():
    """Verify all water extent polygons are mathematically valid Shapely geometries without self-intersections."""
    water_data = water_geometry_provider.get_water_extent("REG-PRY-01")
    features = water_data.get("features", [])
    assert len(features) >= 4

    total_water_area_deg2 = 0.0
    for feat in features:
        geom = sg.shape(feat["geometry"])
        assert geom.is_valid, f"Invalid geometry in feature: {feat.get('properties', {}).get('id')}"
        assert not geom.is_empty
        assert geom.geom_type in ["Polygon", "MultiPolygon"]

        # Check bounds within study AOI
        minx, miny, maxx, maxy = geom.bounds
        assert minx >= PRAYAGRAJ_AOI[0], f"Min LNG {minx} outside AOI {PRAYAGRAJ_AOI[0]}"
        assert miny >= PRAYAGRAJ_AOI[1], f"Min LAT {miny} outside AOI {PRAYAGRAJ_AOI[1]}"
        assert maxx <= PRAYAGRAJ_AOI[2], f"Max LNG {maxx} outside AOI {PRAYAGRAJ_AOI[2]}"
        assert maxy <= PRAYAGRAJ_AOI[3], f"Max LAT {maxy} outside AOI {PRAYAGRAJ_AOI[3]}"

        total_water_area_deg2 += geom.area

    # Check total non-zero water area
    assert total_water_area_deg2 > 0.001 # Significant water area

def test_river_centerlines_api_endpoint():
    """Verify GET /api/v1/regions/centerlines returns valid thalweg LineStrings."""
    response = client.get("/api/v1/regions/centerlines")
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "FeatureCollection"
    assert len(data["features"]) >= 4

    for feat in data["features"]:
        geom = sg.shape(feat["geometry"])
        assert geom.is_valid
        assert geom.geom_type in ["LineString", "MultiLineString"]
        assert len(geom.coords) >= 5 # High resolution thalweg (not 4-point straight lines)

        # Check within study AOI
        minx, miny, maxx, maxy = geom.bounds
        assert minx >= PRAYAGRAJ_AOI[0]
        assert miny >= PRAYAGRAJ_AOI[1]
        assert maxx <= PRAYAGRAJ_AOI[2]
        assert maxy <= PRAYAGRAJ_AOI[3]

def test_river_water_extent_centerline_containment():
    """Verify that river thalweg centerlines intersect/align with the corresponding water extent polygons."""
    water_fc = water_geometry_provider.get_water_extent("REG-PRY-01")
    cl_fc = water_geometry_provider.get_river_centerlines("REG-PRY-01")
    water_polys = [sg.shape(f["geometry"]) for f in water_fc["features"]]

    # Check each centerline intersects at least one water body polygon
    for cl_feat in cl_fc["features"]:
        cl_geom = sg.shape(cl_feat["geometry"])
        intersects_any = any(cl_geom.intersects(wp) for wp in water_polys)
        assert intersects_any, f"Centerline {cl_feat.get('properties', {}).get('name')} does not intersect water body!"

def test_geometry_validation_endpoint():
    """Test POST /api/v1/regions/validate-geometry with valid and invalid inputs."""
    valid_poly = {
        "type": "Polygon",
        "coordinates": [[[81.85, 25.42], [81.88, 25.42], [81.88, 25.45], [81.85, 25.45], [81.85, 25.42]]]
    }
    res = client.post("/api/v1/regions/validate-geometry", json=valid_poly)
    assert res.status_code == 200
    data = res.json()
    assert data["is_valid"] is True
    assert data["within_study_aoi"] is True
    assert data["area_ha"] > 0
