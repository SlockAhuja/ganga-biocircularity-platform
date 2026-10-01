from typing import Dict, Any

def calculate_economic_viability(
    fresh_biomass_t: float,
    bio_cng_kg: float,
    vermicompost_t: float,
    vermiwash_liters: float,
    harvesting_cost_per_ton: float = 850.0,
    transport_cost_per_ton: float = 450.0,
    processing_opex_per_ton: float = 600.0,
    bio_cng_price_per_kg: float = 75.0,
    vermicompost_price_per_kg: float = 12.0,
    vermiwash_price_per_liter: float = 35.0,
    carbon_credit_price_per_ton_co2e: float = 1200.0
) -> Dict[str, Any]:
    """
    Techno-Economic Valuation Model:
    - Operational Costs:
      1. Harvesting Cost (Mechanical harvesting, boat fuel, operators)
      2. Dewatering & River-to-Plant Transport
      3. Anaerobic Digestion & Vermicomposting Processing Opex
    - Revenue Streams:
      1. Bio-CNG sales (₹75 / kg SATAT scheme benchmark)
      2. Premium Vermicompost fertilizer (₹12 / kg bulk/packaged)
      3. Liquid Vermiwash organic foliar spray (₹35 / liter)
      4. Carbon credits (₹1,200 / ton CO2e avoided)
    - Financial Indicators:
      Net Benefit = Revenue - Cost
      ROI % = (Net Benefit / Total Cost) * 100
      Payback Period (Years) = Capex / Annual Net Benefit
    """
    # Costs
    harvesting_cost = fresh_biomass_t * harvesting_cost_per_ton
    transport_cost = fresh_biomass_t * transport_cost_per_ton
    processing_opex = fresh_biomass_t * processing_opex_per_ton
    annualized_capex = 180000.0 # Standard pilot plant annualized capital cost
    total_cost = harvesting_cost + transport_cost + processing_opex + annualized_capex
    
    # Revenues
    bio_cng_revenue = bio_cng_kg * bio_cng_price_per_kg
    vermicompost_revenue = (vermicompost_t * 1000.0) * vermicompost_price_per_kg
    vermiwash_revenue = vermiwash_liters * vermiwash_price_per_liter
    
    # GHG avoided for carbon credits (64.2 kg/t + 2.75 kg/kg CNG)
    co2e_tons = (fresh_biomass_t * 64.2 + bio_cng_kg * 2.75) / 1000.0
    carbon_credit_revenue = co2e_tons * carbon_credit_price_per_ton_co2e
    
    total_revenue = bio_cng_revenue + vermicompost_revenue + vermiwash_revenue + carbon_credit_revenue
    
    net_benefit = total_revenue - total_cost
    roi_percentage = (net_benefit / total_cost) * 100.0 if total_cost > 0 else 0.0
    payback_years = round(annualized_capex * 4.0 / max(net_benefit, 1000.0), 2)
    
    return {
        "scenario_name": "Techno-Economic Valuation Model (Prayagraj Pilot)",
        "currency": "INR",
        "harvesting_cost_total": round(harvesting_cost, 2),
        "transport_cost_total": round(transport_cost, 2),
        "processing_opex_total": round(processing_opex, 2),
        "capex_annualized": annualized_capex,
        "total_cost": round(total_cost, 2),
        "bio_cng_revenue": round(bio_cng_revenue, 2),
        "vermicompost_revenue": round(vermicompost_revenue, 2),
        "vermiwash_revenue": round(vermiwash_revenue, 2),
        "carbon_credit_revenue": round(carbon_credit_revenue, 2),
        "value_added_extracts_revenue": 0.0,
        "total_revenue": round(total_revenue, 2),
        "net_benefit": round(net_benefit, 2),
        "roi_percentage": round(roi_percentage, 1),
        "payback_period_years": min(max(payback_years, 0.8), 15.0),
        "assumptions_json": {
            "cng_price_inr_kg": bio_cng_price_per_kg,
            "vermicompost_price_inr_kg": vermicompost_price_per_kg,
            "vermiwash_price_inr_liter": vermiwash_price_per_liter,
            "carbon_credit_price_inr_ton": carbon_credit_price_per_ton_co2e
        }
    }
