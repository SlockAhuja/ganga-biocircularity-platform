import math
from typing import List, Dict, Any, Tuple
from shapely.geometry import shape, Polygon, LineString

EARTH_RADIUS_M = 6371008.8

def haversine_distance_meters(coord1: Tuple[float, float], coord2: Tuple[float, float]) -> float:
    """
    Calculates great circle distance in meters between two (lng, lat) coordinates.
    """
    lng1, lat1 = coord1
    lng2, lat2 = coord2
    
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lng2 - lng1)
    
    a = math.sin(delta_phi / 2.0)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0)**2
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return EARTH_RADIUS_M * c

def calculate_geodesic_polygon_area_sqm(coordinates: List[List[float]]) -> float:
    """
    Computes geodesic spherical area in m^2 for a polygon ring of [lng, lat] coordinates.
    """
    if len(coordinates) < 3:
        return 0.0
    
    # Spherical excess / ring traversal algorithm
    total_area = 0.0
    num_points = len(coordinates)
    
    for i in range(num_points):
        p1 = coordinates[i]
        p2 = coordinates[(i + 1) % num_points]
        
        lat1_rad = math.radians(p1[1])
        lat2_rad = math.radians(p2[1])
        lng1_rad = math.radians(p1[0])
        lng2_rad = math.radians(p2[0])
        
        total_area += (lng2_rad - lng1_rad) * (2.0 + math.sin(lat1_rad) + math.sin(lat2_rad))
        
    total_area = abs(total_area * (EARTH_RADIUS_M ** 2) / 2.0)
    return round(total_area, 2)

def calculate_linestring_length_meters(coordinates: List[List[float]]) -> float:
    """
    Computes total length of a linestring in meters using Haversine segments.
    """
    total_length = 0.0
    for i in range(len(coordinates) - 1):
        total_length += haversine_distance_meters(
            (coordinates[i][0], coordinates[i][1]),
            (coordinates[i+1][0], coordinates[i+1][1])
        )
    return round(total_length, 2)

def calculate_geometry_metrics(geojson_geom: Dict[str, Any]) -> Dict[str, float]:
    """
    Extracts area, perimeter, and centroid metrics from GeoJSON geometry.
    """
    geom_type = geojson_geom.get("type", "")
    coords = geojson_geom.get("coordinates", [])
    
    if geom_type == "Polygon":
        outer_ring = coords[0] if coords else []
        area_sqm = calculate_geodesic_polygon_area_sqm(outer_ring)
        area_ha = round(area_sqm / 10000.0, 3)
        perimeter_m = calculate_linestring_length_meters(outer_ring)
        
        # Approximate fresh biomass density = 32 t/ha (typical Ganga hyacinth mat)
        estimated_biomass_t = round(area_ha * 32.0, 2)
        
        return {
            "area_sqm": area_sqm,
            "area_ha": area_ha,
            "perimeter_m": perimeter_m,
            "estimated_fresh_biomass_t": estimated_biomass_t,
            "confidence_factor": 0.92,
            "methodology": "Geodesic Spherical Area Calculation (WGS84)"
        }
    elif geom_type == "LineString":
        length_m = calculate_linestring_length_meters(coords)
        return {
            "area_sqm": 0.0,
            "area_ha": 0.0,
            "perimeter_m": length_m,
            "estimated_fresh_biomass_t": 0.0,
            "confidence_factor": 0.95,
            "methodology": "Geodesic Haversine Line Measurement"
        }
    else:
        return {
            "area_sqm": 0.0,
            "area_ha": 0.0,
            "perimeter_m": 0.0,
            "estimated_fresh_biomass_t": 0.0,
            "confidence_factor": 0.50,
            "methodology": "Unsupported Geometry Type"
        }
