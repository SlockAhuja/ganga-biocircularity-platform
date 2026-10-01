# Satellite & Remote Sensing Integration

## Sensor Architecture
- **Primary Satellite**: European Space Agency (ESA) Copernicus Sentinel-2A / Sentinel-2B
- **Sensor**: Multi-Spectral Instrument (MSI)
- **Bands Utilized**:
  - Band 2 (Blue - 490 nm, 10m)
  - Band 3 (Green - 560 nm, 10m)
  - Band 4 (Red - 665 nm, 10m)
  - Band 8 (Near-Infrared / NIR - 842 nm, 10m)
  - Band 11 (Short-Wave Infrared / SWIR-1 - 1610 nm, 20m)

## Spectral Indices Equations
1. **NDVI (Normalized Difference Vegetation Index)**:
   $$\text{NDVI} = \frac{\text{B8 (NIR)} - \text{B4 (Red)}}{\text{B8 (NIR)} + \text{B4 (Red)}}$$
2. **MNDWI (Modified Normalized Difference Water Index)**:
   $$\text{MNDWI} = \frac{\text{B3 (Green)} - \text{B11 (SWIR1)}}{\text{B3 (Green)} + \text{B11 (SWIR1)}}$$
3. **EVI (Enhanced Vegetation Index)**:
   $$\text{EVI} = 2.5 \times \frac{\text{NIR} - \text{Red}}{\text{NIR} + 6\text{Red} - 7.5\text{Blue} + 1}$$

## Decision Pipeline
```
Sentinel-2 MSI BOA L2A
          │
          ▼
   Cloud Masking (SCL)
          │
          ▼
 Water Boundary Extraction (MNDWI > 0)
          │
          ▼
 Floating Canopy Isolation (NDVI > 0.38 & MNDWI < -0.20)
          │
          ▼
 Density Classification (Low, Moderate, High, Very High)
          │
          ▼
 Vector Polygon Extraction & Confidence Scoring
```
