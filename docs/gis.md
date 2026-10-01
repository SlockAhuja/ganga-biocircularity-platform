# GIS & Spatial Analytics

## Overview
The GIS Engine computes accurate geographical surface areas, perimeters, and reach lengths along the Ganga and Yamuna rivers around the Prayagraj confluence.

## Coordinate Reference System
- **CRS**: WGS 84 (EPSG:4326) / UTM Zone 44N (EPSG:32644)
- **Spherical Radius ($R$)**: $6,371,008.8\text{ m}$

## Geodesic Polygon Area Calculation
Rather than naive Euclidean projection on screen pixels, polygon areas are calculated over the WGS84 sphere using spherical ring excess:

$$\text{Area} = \frac{R^2}{2} \left| \sum_{i=0}^{n-1} (\lambda_{i+1} - \lambda_i)(2 + \sin \phi_i + \sin \phi_{i+1}) \right|$$

Where:
- $\phi_i$ = latitude of vertex $i$ in radians
- $\lambda_i$ = longitude of vertex $i$ in radians

## Haversine Segment Length
Linear distance between points $(\phi_1, \lambda_1)$ and $(\phi_2, \lambda_2)$:

$$d = 2 R \arcsin \left( \sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos \phi_1 \cos \phi_2 \sin^2\left(\frac{\Delta \lambda}{2}\right)} \right)$$

## Interactive Measurement Tool
The platform provides a floating HUD for:
1. **Polygon Draw**: Allows researchers to click custom vertices on top of satellite rasters to immediately quantify area in hectares and derive estimated biomass.
2. **Path Distance**: Computes river navigation channel length in meters and kilometers.
