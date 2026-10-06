# BioRiver Spatial Database Architecture (PostGIS & SQLite)

The **BioRiver** platform relies on an extensible geospatial relational database architecture.

---

## 1. Spatial Models

### `monitoring_regions`
Defines multi-river basins, project areas, and bounding geometry.
- `id` (PK, Integer)
- `region_code` (Unique, String)
- `name` (String) — e.g., "Prayagraj Confluence Reach"
- `river_basin` (String) — e.g., "Ganga-Yamuna Basin"
- `center_latitude` (Float) — 25.426°N
- `center_longitude` (Float) — 81.884°E
- `bbox_geojson` (JSON/Geometry)

### `river_segments`
Stores reach vectors, centerline LineStrings, and channel dimensions.
- `id` (PK, Integer)
- `segment_code` (String)
- `name` (String)
- `length_km` (Float)
- `avg_width_m` (Float)
- `geometry_geojson` (JSON/LineString)

### `monitoring_stations`
Geotagged sampling and monitoring stations.
- `id` (PK, Integer)
- `station_code` (String)
- `name` (String)
- `latitude` (Float)
- `longitude` (Float)
- `station_type` (String)

### `hyacinth_zones`
Spatial vector polygons representing detected water hyacinth mats.
- `id` (PK, Integer)
- `zone_code` (String)
- `density_class` (Enum: Low, Moderate, High, Very High)
- `coverage_pct` (Float)
- `area_ha` (Float)
- `geometry_geojson` (JSON/Polygon)
- `classification_confidence` (Float)

### `biomass_assessments`
Stores allometric calculation snapshots and inputs.

### `harvesting_records`
Field log of collected macrophyte weed, removal efficiency, and transport.

### `water_quality_observations`
Continuous limnological parameters and heavy metal monitoring records.

---

## 2. Geodesic Calculations & Spatial Indexing

For PostGIS production instances:
- Spatial column geometry indexed with **GiST (Generalized Search Tree)** indexes:
  `CREATE INDEX idx_hyacinth_geom ON hyacinth_zones USING GIST (geom);`
- Area calculated natively via geodesic ellipsoidal projection:
  `ST_Area(geom::geography) / 10000.0 AS area_ha`
