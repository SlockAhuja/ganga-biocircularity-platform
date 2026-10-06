export type UserRole = 'ADMIN' | 'RESEARCHER' | 'FIELD_OPERATOR' | 'VIEWER';

export type ProvenanceType = 'OBSERVED' | 'LITERATURE' | 'ESTIMATED' | 'MODELED' | 'DEMO' | 'REFERENCE';


export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  role: UserRole;
  organization: string;
}

export interface MonitoringStation {
  id: number;
  station_code: string;
  name: string;
  river: string;
  station_type: string;
  status: string;
  latitude: float;
  longitude: float;
  elevation_m?: number;
  metadata_json?: any;
}

export type float = number;

export interface RiverSegment {
  id: number;
  segment_code: string;
  name: string;
  river: string;
  length_km: number;
  avg_width_m: number;
  flow_type: string;
  monitoring_priority: string;
  geometry_geojson: any;
}

export interface WaterExtentFeature {
  type: string;
  properties: {
    id: string;
    name: string;
    river: string;
    layer_type: string;
    area_ha: number;
    avg_width_m: number;
    provenance_status: ProvenanceType;
    source: string;
    quality_flag: string;
  };
  geometry: any;
}

export interface WaterExtentCollection {
  type: string;
  name: string;
  properties: {
    source: string;
    provenance_status: ProvenanceType;
    method: string;
    study_region?: string;
    total_water_area_ha?: number;
    crs?: string;
  };
  features: WaterExtentFeature[];
}

export interface HyacinthZone {
  id: number;
  zone_code: string;
  name: string;
  density_class: 'Low' | 'Moderate' | 'High' | 'Very High';
  coverage_pct: number;
  area_ha: number;
  perimeter_m: number;
  centroid_lat: number;
  centroid_lng: number;
  geometry_geojson: any;
  classification_confidence: number;
  spectral_indices?: {
    ndvi_mean: number;
    mndwi_mean: number;
  };
  model_version: string;
  data_source: string;
  is_demo_data: number;
}

export interface BiomassAssessment {
  id?: number;
  assessment_code: string;
  area_ha: number;
  coverage_pct: number;
  fresh_biomass_density_t_ha: number;
  fresh_biomass_total_t: number;
  moisture_content_pct: number;
  total_solids_pct: number;
  total_solids_t: number;
  volatile_solids_pct_of_ts: number;
  volatile_solids_t: number;
  carbon_to_nitrogen_ratio: number;
  recoverable_biomass_t: number;
  collection_efficiency_pct: number;
  methodology_version: string;
  is_demo_data: number;
}

export interface BioenergyAssessment {
  id?: number;
  assessment_code: string;
  scenario_type: 'Conservative' | 'Baseline' | 'Optimistic';
  biomass_input_t: number;
  biogas_volume_m3: number;
  methane_volume_m3: number;
  bio_cng_potential_kg: number;
  electrical_energy_kwh: number;
  thermal_energy_mj: number;
  lpg_equivalent_kg: number;
  digestate_total_t: number;
  vermicompost_potential_t: number;
  liquid_vermiwash_liters: number;
  nitrogen_recovery_kg: number;
  phosphorus_recovery_kg: number;
  potassium_recovery_kg: number;
  methodology_version: string;
  is_demo_data: number;
}

export interface WaterQualityObservation {
  id: number;
  station_id: number;
  station_name?: string;
  observation_time: string;
  ph: number;
  do_mg_l: number;
  bod_mg_l: number;
  cod_mg_l: number;
  tss_mg_l: number;
  temperature_c: number;
  turbidity_ntu: number;
  tds_mg_l?: number;
  nitrate_no3_mg_l?: number;
  phosphate_po4_mg_l?: number;
  latitude?: number;
  longitude?: number;
  river_reach?: string;
  chromium_cr: number;
  lead_pb: number;
  cadmium_cd: number;
  nickel_ni: number;
  mercury_hg: number;
  arsenic_as: number;
  zinc_zn: number;
  copper_cu: number;
  is_heavy_metal_measured?: number;
  source: string;
  source_url?: string;
  method?: string;
  quality_flag: string;
  provenance_status?: ProvenanceType;
  compliance_status?: Record<string, string>;
}

export interface HarvestingRecord {
  id: number;
  zone_id: number;
  harvest_date: string;
  harvesting_method: string;
  biomass_collected_t: number;
  removal_efficiency_pct: number;
  labour_hours: number;
  fuel_consumed_liters: number;
  transport_distance_km: number;
  destination_facility: string;
  status: string;
  notes?: string;
}

export interface FieldObservation {
  id: number;
  station_name: string;
  observation_date: string;
  latitude: number;
  longitude: number;
  hyacinth_density: string;
  coverage_pct: number;
  water_appearance: string;
  ph_field?: number;
  do_field?: number;
  observer_name: string;
  photo_urls?: string[];
  notes?: string;
}

export interface CircularityScore {
  assessment_name: string;
  overall_circularity_score: number;
  biomass_recovery_subscore: number;
  resource_conversion_subscore: number;
  nutrient_recovery_subscore: number;
  waste_diversion_subscore: number;
  energy_recovery_subscore: number;
  methodology_version: string;
  components_breakdown?: Record<string, number>;
}

export interface EnvironmentalImpact {
  assessment_name: string;
  ghg_avoidance_kg_co2e: number;
  waste_diverted_t: number;
  water_bod_reduction_kg: number;
  fossil_fuel_offset_kg_cng: number;
  grid_power_offset_kwh: number;
  nitrogen_recycled_kg: number;
  phosphorus_recycled_kg: number;
  potassium_recycled_kg: number;
  river_surface_cleared_ha: number;
  methodology_version: string;
}

export interface EconomicMetric {
  scenario_name: string;
  currency: string;
  harvesting_cost_total: number;
  transport_cost_total: number;
  processing_opex_total: number;
  capex_annualized: number;
  total_cost: number;
  bio_cng_revenue: number;
  vermicompost_revenue: number;
  vermiwash_revenue: number;
  carbon_credit_revenue: number;
  value_added_extracts_revenue: number;
  total_revenue: number;
  net_benefit: number;
  roi_percentage: number;
  payback_period_years: number;
  assumptions_json?: Record<string, any>;
}

export interface GeneratedReport {
  id: number;
  report_code: string;
  title: string;
  study_region: string;
  generated_by: string;
  summary_metrics_json: any;
  created_at: string;
  status: string;
}
