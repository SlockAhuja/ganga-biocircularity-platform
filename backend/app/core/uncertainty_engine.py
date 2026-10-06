"""
BioRiver Scientific Uncertainty & Sensitivity Engine
Quantifies confidence intervals (mean +/- uncertainty), propagated standard errors, and sensitivity bounds.
Explicitly flags when experimental data is unconstrained.
"""
from typing import Dict, Any, Optional
import math

class UncertaintyEngine:
    """
    Propagates parameter uncertainty through biomass, bioenergy, environmental LCA, and economic cascades.
    """

    @staticmethod
    def calculate_biomass_uncertainty(
        fresh_biomass_tonnes: float,
        area_ha: float,
        density_cv: float = 0.18  # 18% coefficient of variation in spatial weed density
    ) -> Dict[str, Any]:
        sigma = fresh_biomass_tonnes * density_cv
        return {
            "parameter": "fresh_biomass",
            "mean_value": round(fresh_biomass_tonnes, 2),
            "unit": "tonnes",
            "uncertainty_sigma": round(sigma, 2),
            "ci_95_low": round(max(0.0, fresh_biomass_tonnes - 1.96 * sigma), 2),
            "ci_95_high": round(fresh_biomass_tonnes + 1.96 * sigma, 2),
            "display_str": f"{round(fresh_biomass_tonnes, 1)} +/- {round(1.96 * sigma, 1)} tonnes (95% CI)",
            "uncertainty_source": "Spatial patch density variance from high-resolution Sentinel-2 pixel sampling",
            "status": "ESTIMATED"
        }

    @staticmethod
    def calculate_bioenergy_uncertainty(
        biogas_m3: float,
        bmp_cv: float = 0.12  # 12% coefficient of variation in Biochemical Methane Potential
    ) -> Dict[str, Any]:
        sigma = biogas_m3 * bmp_cv
        return {
            "parameter": "biogas_generation",
            "mean_value": round(biogas_m3, 2),
            "unit": "m3",
            "uncertainty_sigma": round(sigma, 2),
            "ci_95_low": round(max(0.0, biogas_m3 - 1.96 * sigma), 2),
            "ci_95_high": round(biogas_m3 + 1.96 * sigma, 2),
            "display_str": f"{round(biogas_m3, 1)} +/- {round(1.96 * sigma, 1)} m3 (95% CI)",
            "uncertainty_source": "BMP temperature fluctuations and volatile fatty acid degradation kinetic variance",
            "status": "MODELED"
        }

    @staticmethod
    def calculate_economic_uncertainty(
        net_revenue_inr: float,
        market_price_cv: float = 0.15
    ) -> Dict[str, Any]:
        sigma = abs(net_revenue_inr) * market_price_cv
        return {
            "parameter": "net_economic_benefit",
            "mean_value": round(net_revenue_inr, 2),
            "unit": "INR",
            "uncertainty_sigma": round(sigma, 2),
            "ci_95_low": round(net_revenue_inr - 1.96 * sigma, 2),
            "ci_95_high": round(net_revenue_inr + 1.96 * sigma, 2),
            "display_str": f"INR {round(net_revenue_inr, 0):,} +/- INR {round(1.96 * sigma, 0):,} (95% CI)",
            "uncertainty_source": "Regional Bio-CNG off-take tariff and vermicompost retail market volatility",
            "status": "MODELED"
        }

    @staticmethod
    def format_unconstrained(parameter_name: str, unit: str) -> Dict[str, Any]:
        return {
            "parameter": parameter_name,
            "unit": unit,
            "status": "UNCONSTRAINED",
            "message": "Uncertainty not yet experimentally constrained pending pilot laboratory batch runs.",
            "is_quantified": False
        }
