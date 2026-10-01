# REST API Documentation

The backend exposes interactive OpenAPI 3.0 documentation at `/api/v1/docs` and ReDoc at `/api/v1/redoc`.

## API Endpoints Summary

### Authentication
- `POST /api/v1/auth/token` - OAuth2 password token generation
- `GET /api/v1/auth/me` - Authenticated user details

### GIS & River Network
- `GET /api/v1/regions/` - List monitoring regions
- `GET /api/v1/regions/river-segments` - Vector GeoJSON for river reaches
- `GET /api/v1/stations/` - Hydrological monitoring station points
- `GET /api/v1/hyacinth/zones` - Detected water hyacinth polygon zones
- `POST /api/v1/hyacinth/measure-area` - Geodesic polygon area & biomass computation

### Remote Sensing
- `GET /api/v1/satellite/scenes` - Satellite scene metadata
- `POST /api/v1/satellite/spectral-profile-eval` - Evaluate multi-band reflectance into NDVI/MNDWI/EVI

### Biomass Engine
- `GET /api/v1/biomass/assessments` - Zone-wise biomass assessments
- `POST /api/v1/biomass/calculate` - Custom allometric biomass calculator

### Bioenergy & Resource Simulator
- `POST /api/v1/bioenergy/simulate` - Simulate CSTR digestion, Bio-CNG, and fertilizer
- `POST /api/v1/bioenergy/compare-scenarios` - Multi-scenario comparison (Conservative, Baseline, Optimistic)

### Circularity & Environment
- `GET /api/v1/circularity/score` - 5-pillar Circularity Index
- `GET /api/v1/environment/impact` - LCA environmental benefits & GHG avoidance

### Water Quality & Contaminants
- `GET /api/v1/water-quality/observations` - Physicochemical & ICP-MS heavy metal assays

### Harvesting & Operations
- `GET /api/v1/harvesting/records` - Completed harvesting records
- `POST /api/v1/harvesting/records` - Log a new mechanical harvesting batch
- `GET /api/v1/harvesting/field-observations` - Field survey ground-truth logs
- `POST /api/v1/harvesting/field-observations` - Submit a new GPS field survey

### Techno-Economics
- `POST /api/v1/economics/calculate` - Custom Capex/Opex/Revenue modeling
- `GET /api/v1/economics/baseline` - Baseline pilot plant financial indicators

### Reports & PDF Generator
- `POST /api/v1/reports/generate` - Compile formal research report
- `GET /api/v1/reports/list` - List generated reports
- `GET /api/v1/reports/download-pdf/{report_code}` - Download binary PDF document
