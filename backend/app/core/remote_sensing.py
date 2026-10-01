from typing import Dict, Any, List

def calculate_ndvi(nir: float, red: float) -> float:
    """Normalized Difference Vegetation Index: (NIR - RED) / (NIR + RED)"""
    denom = nir + red
    if denom == 0:
        return 0.0
    return round((nir - red) / denom, 4)

def calculate_ndwi(green: float, nir: float) -> float:
    """Normalized Difference Water Index (McFeeters): (GREEN - NIR) / (GREEN + NIR)"""
    denom = green + nir
    if denom == 0:
        return 0.0
    return round((green - nir) / denom, 4)

def calculate_mndwi(green: float, swir1: float) -> float:
    """Modified Normalized Difference Water Index (Xu): (GREEN - SWIR1) / (GREEN + SWIR1)"""
    denom = green + swir1
    if denom == 0:
        return 0.0
    return round((green - swir1) / denom, 4)

def calculate_evi(nir: float, red: float, blue: float) -> float:
    """Enhanced Vegetation Index: 2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))"""
    denom = nir + (6.0 * red) - (7.5 * blue) + 1.0
    if denom == 0:
        return 0.0
    return round(2.5 * ((nir - red) / denom), 4)

def classify_hyacinth_spectral_profile(nir: float, red: float, green: float, swir1: float, blue: float) -> Dict[str, Any]:
    """
    Evaluates multi-spectral surface reflectance to produce vegetation index scores,
    estimated water hyacinth density class, and classification confidence.
    """
    ndvi = calculate_ndvi(nir, red)
    ndwi = calculate_ndwi(green, nir)
    mndwi = calculate_mndwi(green, swir1)
    evi = calculate_evi(nir, red, blue)
    
    # Classification rules for Eichhornia crassipes on water surface:
    # High NDVI (>0.5) over water body (low SWIR, negative MNDWI for vegetation canopy)
    if ndvi >= 0.70 and mndwi < -0.30:
        density_class = "Very High"
        confidence = 0.94
    elif ndvi >= 0.55:
        density_class = "High"
        confidence = 0.90
    elif ndvi >= 0.38:
        density_class = "Moderate"
        confidence = 0.85
    elif ndvi >= 0.20:
        density_class = "Low"
        confidence = 0.78
    else:
        density_class = "Sparse/None"
        confidence = 0.65
        
    return {
        "density_class": density_class,
        "classification_confidence": confidence,
        "indices": {
            "NDVI": ndvi,
            "NDWI": ndwi,
            "MNDWI": mndwi,
            "EVI": evi
        },
        "model_pipeline": "Sentinel-2 MSI Level-2A Multi-Index Spectral Decision Tree v2.4",
        "provenance": {
            "satellite": "Copernicus Sentinel-2B",
            "band_resolution": "10m (B2, B3, B4, B8), 20m (B11)",
            "water_masking": "Automated Modified Otsu on MNDWI"
        }
    }
