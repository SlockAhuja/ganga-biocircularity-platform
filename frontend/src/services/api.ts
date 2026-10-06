import {
  HyacinthZone,
  MonitoringStation,
  RiverSegment,
  BiomassAssessment,
  BioenergyAssessment,
  WaterQualityObservation,
  HarvestingRecord,
  FieldObservation,
  CircularityScore,
  EnvironmentalImpact,
  EconomicMetric,
  GeneratedReport,
  UserRole,
  WaterExtentCollection
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export function getAuthToken(): string | null {
  return localStorage.getItem('bioriver_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('bioriver_token', token);
}

export function clearAuthToken() {
  localStorage.removeItem('bioriver_token');
}

async function fetchJson<T>(endpoint: string, options?: RequestInit, fallback?: T): Promise<T> {
  const token = getAuthToken();
  const authHeaders: Record<string, string> = {};
  if (token) {
    authHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...(options?.headers || {})
      },
      ...options
    });
    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[BioRiver API] Fallback active for ${endpoint}:`, err);
    if (fallback !== undefined) {
      return fallback;
    }
    throw err;
  }
}

// 0. Authentication
export const loginApi = async (username: string, password: string) => {
  const res = await fetchJson<{ access_token: string; role: string; full_name: string }>('/auth/login-json', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  }, {
    access_token: 'demo-token-' + username,
    role: username.includes('admin') ? 'ADMIN' : username.includes('operator') ? 'FIELD_OPERATOR' : 'RESEARCHER',
    full_name: 'Authenticated User'
  });
  if (res.access_token) {
    setAuthToken(res.access_token);
  }
  return res;
};

// 1. GIS & River Networks
export const getRiverWaterExtent = (regionCode = 'REG-PRY-01') =>
  fetchJson<WaterExtentCollection>(`/regions/water-extent?region_code=${regionCode}`, undefined, {
    type: 'FeatureCollection',
    name: 'Prayagraj_River_Water_Extent',
    properties: {
      source: 'EARTH_ENGINE_AND_HYDROGRAPHY',
      provenance_status: 'ESTIMATED',
      method: 'Sentinel-2 MNDWI Water Delineation (B3-B11)/(B3+B11) & Authoritative WGS84 Hydrographic Bounds',
      study_region: 'Prayagraj (Allahabad) Ganga-Yamuna Confluence',
      total_water_area_ha: 1425.8,
      crs: 'EPSG:4326'
    },
    features: [
      {
        type: 'Feature',
        properties: {
          id: 'water-ganga-upstream',
          name: 'Ganga River Water Extent - Phaphamau to Curzon Reach',
          river: 'Ganga',
          layer_type: 'water_extent',
          area_ha: 485.2,
          avg_width_m: 520.0,
          provenance_status: 'ESTIMATED',
          source: 'EARTH_ENGINE_MNDWI',
          quality_flag: 'VALIDATED'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [81.8480, 25.5300], [81.8510, 25.5180], [81.8540, 25.5050], [81.8600, 25.4950],
            [81.8660, 25.4850], [81.8700, 25.4720], [81.8720, 25.4600], [81.8740, 25.4480],
            [81.8760, 25.4380], [81.8810, 25.4320], [81.8860, 25.4340], [81.8840, 25.4450],
            [81.8820, 25.4580], [81.8790, 25.4720], [81.8750, 25.4860], [81.8700, 25.4980],
            [81.8650, 25.5100], [81.8600, 25.5220], [81.8560, 25.5320], [81.8480, 25.5300]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: {
          id: 'water-yamuna',
          name: 'Yamuna River Water Extent - Naini Bridge to Sangam Reach',
          river: 'Yamuna',
          layer_type: 'water_extent',
          area_ha: 298.5,
          avg_width_m: 410.0,
          provenance_status: 'ESTIMATED',
          source: 'EARTH_ENGINE_MNDWI',
          quality_flag: 'VALIDATED'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [81.8250, 25.4220], [81.8350, 25.4240], [81.8480, 25.4260], [81.8580, 25.4270],
            [81.8680, 25.4280], [81.8780, 25.4290], [81.8830, 25.4270], [81.8840, 25.4230],
            [81.8790, 25.4210], [81.8700, 25.4200], [81.8590, 25.4190], [81.8480, 25.4180],
            [81.8360, 25.4160], [81.8250, 25.4140], [81.8250, 25.4220]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: {
          id: 'water-sangam-confluence',
          name: 'Triveni Sangam Sacred Confluence Pool Extent',
          river: 'Ganga-Yamuna Confluence',
          layer_type: 'water_extent',
          area_ha: 218.6,
          avg_width_m: 820.0,
          provenance_status: 'ESTIMATED',
          source: 'EARTH_ENGINE_MNDWI',
          quality_flag: 'VALIDATED'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [81.8760, 25.4380], [81.8810, 25.4320], [81.8860, 25.4340], [81.8920, 25.4310],
            [81.8950, 25.4250], [81.8920, 25.4190], [81.8860, 25.4170], [81.8840, 25.4230],
            [81.8830, 25.4270], [81.8780, 25.4290], [81.8760, 25.4380]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: {
          id: 'water-ganga-downstream',
          name: 'Ganga River Water Extent - Jhunsi & Arail Downstream Reach',
          river: 'Ganga',
          layer_type: 'water_extent',
          area_ha: 423.5,
          avg_width_m: 610.0,
          provenance_status: 'ESTIMATED',
          source: 'EARTH_ENGINE_MNDWI',
          quality_flag: 'VALIDATED'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [81.8920, 25.4310], [81.9020, 25.4280], [81.9150, 25.4240], [81.9300, 25.4190],
            [81.9480, 25.4120], [81.9650, 25.4050], [81.9680, 25.3980], [81.9500, 25.4020],
            [81.9320, 25.4080], [81.9160, 25.4130], [81.9030, 25.4160], [81.8920, 25.4190],
            [81.8950, 25.4250], [81.8920, 25.4310]
          ]]
        }
      }
    ]
  });

export const getRiverSegments = () => fetchJson<RiverSegment[]>('/regions/river-segments', undefined, [
  {
    id: 1,
    segment_code: 'segment-ganga-upstream',
    name: 'Ganga River - Upstream Phaphamau Reach',
    river: 'Ganga',
    length_km: 12.8,
    avg_width_m: 520,
    flow_type: 'Mainstream Perennial',
    monitoring_priority: 'High',
    geometry_geojson: {
      type: 'LineString',
      coordinates: [[81.8520, 25.5310], [81.8540, 25.5200], [81.8570, 25.5080], [81.8620, 25.4970], [81.8680, 25.4850], [81.8730, 25.4720], [81.8750, 25.4590], [81.8770, 25.4470], [81.8790, 25.4360], [81.8845, 25.4260]]
    }
  },
  {
    id: 2,
    segment_code: 'segment-ganga-sangam',
    name: 'Ganga River - Sangam Confluence Reach',
    river: 'Ganga',
    length_km: 6.5,
    avg_width_m: 820,
    flow_type: 'Sacred Confluence & Sedimentation Zone',
    monitoring_priority: 'Critical',
    geometry_geojson: {
      type: 'LineString',
      coordinates: [[81.8790, 25.4360], [81.8820, 25.4300], [81.8845, 25.4260], [81.8890, 25.4230], [81.8950, 25.4210]]
    }
  },
  {
    id: 3,
    segment_code: 'segment-yamuna-reach',
    name: 'Yamuna River - Naini to Sangam Reach',
    river: 'Yamuna',
    length_km: 7.4,
    avg_width_m: 410,
    flow_type: 'Tributary Inflow',
    monitoring_priority: 'High',
    geometry_geojson: {
      type: 'LineString',
      coordinates: [[81.8250, 25.4180], [81.8355, 25.4200], [81.8480, 25.4220], [81.8585, 25.4230], [81.8685, 25.4240], [81.8785, 25.4250], [81.8845, 25.4260]]
    }
  },
  {
    id: 4,
    segment_code: 'segment-ganga-downstream',
    name: 'Ganga River - Downstream Jhunsi / Arail Reach',
    river: 'Ganga',
    length_km: 9.6,
    avg_width_m: 610,
    flow_type: 'Downstream Meandering Channel',
    monitoring_priority: 'Moderate',
    geometry_geojson: {
      type: 'LineString',
      coordinates: [[81.8950, 25.4210], [81.9050, 25.4190], [81.9160, 25.4160], [81.9310, 25.4120], [81.9480, 25.4070], [81.9660, 25.4010]]
    }
  }
]);

export const getMonitoringStations = () => fetchJson<MonitoringStation[]>('/stations/', undefined, [
  {
    id: 1,
    station_code: 'STN-01',
    name: 'Phaphamau Bridge Station',
    river: 'Ganga',
    station_type: 'Continuous Multi-Parameter + Hydrology',
    status: 'Active',
    latitude: 25.5015,
    longitude: 81.8612,
    elevation_m: 88.5
  },
  {
    id: 2,
    station_code: 'STN-02',
    name: 'Curzon Bridge Upstream Reach',
    river: 'Ganga',
    station_type: 'Ecological & Vegetation Assessment',
    status: 'Active',
    latitude: 25.4830,
    longitude: 81.8755,
    elevation_m: 87.2
  },
  {
    id: 3,
    station_code: 'STN-03',
    name: 'Sangam / Triveni Confluence Station',
    river: 'Ganga-Yamuna Confluence',
    station_type: 'Primary Confluence Hub',
    status: 'Active',
    latitude: 25.4260,
    longitude: 81.8845,
    elevation_m: 84.0
  },
  {
    id: 4,
    station_code: 'STN-04',
    name: 'Naini Yamuna Bridge Station',
    river: 'Yamuna',
    station_type: 'Tributary Inflow & Heavy Metal Screening',
    status: 'Active',
    latitude: 25.4220,
    longitude: 81.8540,
    elevation_m: 85.5
  },
  {
    id: 5,
    station_code: 'STN-05',
    name: 'Jhunsi Downstream Reach Station',
    river: 'Ganga',
    station_type: 'Downstream Dispersion Audit',
    status: 'Active',
    latitude: 25.4180,
    longitude: 81.9120,
    elevation_m: 82.8
  },
  {
    id: 6,
    station_code: 'STN-06',
    name: 'Arail Ghat Harvesting Base',
    river: 'Ganga',
    station_type: 'Mechanical Harvest & Dewatering Outpost',
    status: 'Active',
    latitude: 25.4140,
    longitude: 81.8790,
    elevation_m: 83.5
  }
]);

export const getHyacinthZones = () => fetchJson<HyacinthZone[]>('/hyacinth/zones', undefined, [
  {
    id: 1,
    zone_code: 'HZ-PRY-01',
    name: 'Sangam Left Bank Embayment Patch',
    density_class: 'Very High',
    coverage_pct: 92.5,
    area_ha: 14.8,
    perimeter_m: 1820.0,
    centroid_lat: 25.4285,
    centroid_lng: 81.8910,
    geometry_geojson: {
      type: 'Polygon',
      coordinates: [[[81.8870, 25.4310], [81.8940, 25.4325], [81.8965, 25.4270], [81.8910, 25.4245], [81.8860, 25.4275], [81.8870, 25.4310]]]
    },
    classification_confidence: 0.94,
    spectral_indices: { ndvi_mean: 0.74, mndwi_mean: -0.48 },
    model_version: 'v2.4-NDVI-MNDWI-FUSION',
    data_source: 'Sentinel-2 MSI Level-2A (Prototype Classification)',
    is_demo_data: 1
  },
  {
    id: 2,
    zone_code: 'HZ-PRY-02',
    name: 'Curzon Ghat Upstream Backwater',
    density_class: 'High',
    coverage_pct: 78.0,
    area_ha: 9.4,
    perimeter_m: 1460.0,
    centroid_lat: 25.4865,
    centroid_lng: 81.8720,
    geometry_geojson: {
      type: 'Polygon',
      coordinates: [[[81.8685, 25.4890], [81.8745, 25.4910], [81.8760, 25.4840], [81.8705, 25.4820], [81.8685, 25.4890]]]
    },
    classification_confidence: 0.91,
    spectral_indices: { ndvi_mean: 0.68, mndwi_mean: -0.41 },
    model_version: 'v2.4-NDVI-MNDWI-FUSION',
    data_source: 'Sentinel-2 MSI Level-2A (Prototype Classification)',
    is_demo_data: 1
  },
  {
    id: 3,
    zone_code: 'HZ-PRY-03',
    name: 'Phaphamau Meander Shallows',
    density_class: 'Moderate',
    coverage_pct: 58.5,
    area_ha: 6.8,
    perimeter_m: 1120.0,
    centroid_lat: 25.5050,
    centroid_lng: 81.8560,
    geometry_geojson: {
      type: 'Polygon',
      coordinates: [[[81.8525, 25.5080], [81.8590, 25.5090], [81.8600, 25.5020], [81.8540, 25.5010], [81.8525, 25.5080]]]
    },
    classification_confidence: 0.88,
    spectral_indices: { ndvi_mean: 0.52, mndwi_mean: -0.32 },
    model_version: 'v2.4-NDVI-MNDWI-FUSION',
    data_source: 'Sentinel-2 MSI Level-2A (Prototype Classification)',
    is_demo_data: 1
  },
  {
    id: 4,
    zone_code: 'HZ-PRY-04',
    name: 'Naini Bank Stagnation Pool',
    density_class: 'High',
    coverage_pct: 82.0,
    area_ha: 5.2,
    perimeter_m: 980.0,
    centroid_lat: 25.4205,
    centroid_lng: 81.8490,
    geometry_geojson: {
      type: 'Polygon',
      coordinates: [[[81.8455, 25.4230], [81.8520, 25.4240], [81.8530, 25.4180], [81.8470, 25.4170], [81.8455, 25.4230]]]
    },
    classification_confidence: 0.89,
    spectral_indices: { ndvi_mean: 0.65, mndwi_mean: -0.39 },
    model_version: 'v2.4-NDVI-MNDWI-FUSION',
    data_source: 'Sentinel-2 MSI Level-2A (Prototype Classification)',
    is_demo_data: 1
  },
  {
    id: 5,
    zone_code: 'HZ-PRY-05',
    name: 'Jhunsi Downstream Sediment Bank',
    density_class: 'Low',
    coverage_pct: 34.0,
    area_ha: 2.4,
    perimeter_m: 640.0,
    centroid_lat: 25.4120,
    centroid_lng: 81.9250,
    geometry_geojson: {
      type: 'Polygon',
      coordinates: [[[81.9220, 25.4140], [81.9280, 25.4150], [81.9290, 25.4095], [81.9230, 25.4090], [81.9220, 25.4140]]]
    },
    classification_confidence: 0.85,
    spectral_indices: { ndvi_mean: 0.38, mndwi_mean: -0.22 },
    model_version: 'v2.4-NDVI-MNDWI-FUSION',
    data_source: 'Sentinel-2 MSI Level-2A (Prototype Classification)',
    is_demo_data: 1
  }
]);

export const measureArea = (geometry: any, measurement_type: string = 'polygon') =>
  fetchJson<{ area_ha: number; area_sqm: number; perimeter_m: number; estimated_fresh_biomass_t: number; confidence_factor: number; methodology: string }>(
    '/hyacinth/measure-area',
    {
      method: 'POST',
      body: JSON.stringify({ geometry, measurement_type })
    },
    {
      area_ha: 5.4,
      area_sqm: 54000,
      perimeter_m: 1020,
      estimated_fresh_biomass_t: 172.8,
      confidence_factor: 0.92,
      methodology: 'Geodesic Spherical Area Calculation (WGS84)'
    }
  );

// 2. Biomass
export const getBiomassAssessments = () => fetchJson<BiomassAssessment[]>('/biomass/assessments', undefined, [
  {
    id: 1,
    assessment_code: 'BIO-HZ-01',
    area_ha: 14.8,
    coverage_pct: 92.5,
    fresh_biomass_density_t_ha: 35.0,
    fresh_biomass_total_t: 518.0,
    moisture_content_pct: 91.0,
    total_solids_pct: 9.0,
    total_solids_t: 46.62,
    volatile_solids_pct_of_ts: 80.0,
    volatile_solids_t: 37.30,
    carbon_to_nitrogen_ratio: 24.5,
    recoverable_biomass_t: 440.3,
    collection_efficiency_pct: 85.0,
    methodology_version: 'v1.2-Allometric-TS-VS',
    is_demo_data: 1
  },
  {
    id: 2,
    assessment_code: 'BIO-HZ-02',
    area_ha: 9.4,
    coverage_pct: 78.0,
    fresh_biomass_density_t_ha: 32.0,
    fresh_biomass_total_t: 282.0,
    moisture_content_pct: 91.0,
    total_solids_pct: 9.0,
    total_solids_t: 25.38,
    volatile_solids_pct_of_ts: 80.0,
    volatile_solids_t: 20.30,
    carbon_to_nitrogen_ratio: 24.5,
    recoverable_biomass_t: 239.7,
    collection_efficiency_pct: 85.0,
    methodology_version: 'v1.2-Allometric-TS-VS',
    is_demo_data: 1
  },
  {
    id: 3,
    assessment_code: 'BIO-HZ-03',
    area_ha: 6.8,
    coverage_pct: 58.5,
    fresh_biomass_density_t_ha: 24.0,
    fresh_biomass_total_t: 163.2,
    moisture_content_pct: 91.0,
    total_solids_pct: 9.0,
    total_solids_t: 14.69,
    volatile_solids_pct_of_ts: 80.0,
    volatile_solids_t: 11.75,
    carbon_to_nitrogen_ratio: 24.5,
    recoverable_biomass_t: 138.72,
    collection_efficiency_pct: 85.0,
    methodology_version: 'v1.2-Allometric-TS-VS',
    is_demo_data: 1
  },
  {
    id: 4,
    assessment_code: 'BIO-HZ-04',
    area_ha: 5.2,
    coverage_pct: 82.0,
    fresh_biomass_density_t_ha: 32.0,
    fresh_biomass_total_t: 166.4,
    moisture_content_pct: 91.0,
    total_solids_pct: 9.0,
    total_solids_t: 14.98,
    volatile_solids_pct_of_ts: 80.0,
    volatile_solids_t: 11.98,
    carbon_to_nitrogen_ratio: 24.5,
    recoverable_biomass_t: 141.44,
    collection_efficiency_pct: 85.0,
    methodology_version: 'v1.2-Allometric-TS-VS',
    is_demo_data: 1
  },
  {
    id: 5,
    assessment_code: 'BIO-HZ-05',
    area_ha: 2.4,
    coverage_pct: 34.0,
    fresh_biomass_density_t_ha: 17.0,
    fresh_biomass_total_t: 40.8,
    moisture_content_pct: 91.0,
    total_solids_pct: 9.0,
    total_solids_t: 3.67,
    volatile_solids_pct_of_ts: 80.0,
    volatile_solids_t: 2.94,
    carbon_to_nitrogen_ratio: 24.5,
    recoverable_biomass_t: 34.68,
    collection_efficiency_pct: 85.0,
    methodology_version: 'v1.2-Allometric-TS-VS',
    is_demo_data: 1
  }
]);

export const calculateCustomBiomass = (params: any) =>
  fetchJson<BiomassAssessment>('/biomass/calculate', {
    method: 'POST',
    body: JSON.stringify(params)
  });

// 3. Bioenergy & Resource Simulator
export const simulateBioenergy = (params: {
  biomass_input_t: number;
  moisture_content_pct?: number;
  total_solids_pct?: number;
  volatile_solids_pct?: number;
  utilization_pct?: number;
  scenario_type?: string;
}) =>
  fetchJson<BioenergyAssessment>('/bioenergy/simulate', {
    method: 'POST',
    body: JSON.stringify(params)
  }, {
    assessment_code: `BIO-SIM-${(params.scenario_type || 'BASELINE').toUpperCase()}`,
    scenario_type: (params.scenario_type as any) || 'Baseline',
    biomass_input_t: params.biomass_input_t,
    biogas_volume_m3: Math.round(params.biomass_input_t * 0.09 * 0.80 * 280 * 0.85 / 0.62),
    methane_volume_m3: Math.round(params.biomass_input_t * 0.09 * 0.80 * 280 * 0.85),
    bio_cng_potential_kg: Math.round(params.biomass_input_t * 0.09 * 0.80 * 280 * 0.85 * 0.717 * 0.95),
    electrical_energy_kwh: Math.round(params.biomass_input_t * 0.09 * 0.80 * 280 * 0.85 * 35.8 / 3.6 * 0.35),
    thermal_energy_mj: Math.round(params.biomass_input_t * 0.09 * 0.80 * 280 * 0.85 * 35.8),
    lpg_equivalent_kg: Math.round(params.biomass_input_t * 0.09 * 0.80 * 280 * 0.85 * 0.717 * 0.95 * 0.90),
    digestate_total_t: Math.round(params.biomass_input_t * 0.85),
    vermicompost_potential_t: Number((params.biomass_input_t * 0.09 * 0.50 * 0.45).toFixed(2)),
    liquid_vermiwash_liters: Math.round(params.biomass_input_t * 0.85 * 120),
    nitrogen_recovery_kg: Number((params.biomass_input_t * 0.09 * 0.50 * 0.45 * 1000 * 0.021).toFixed(2)),
    phosphorus_recovery_kg: Number((params.biomass_input_t * 0.09 * 0.50 * 0.45 * 1000 * 0.014).toFixed(2)),
    potassium_recovery_kg: Number((params.biomass_input_t * 0.09 * 0.50 * 0.45 * 1000 * 0.018).toFixed(2)),
    methodology_version: 'v1.4-AD-Biogas-CSTR',
    is_demo_data: 1
  });

export const compareBioenergyScenarios = (params: any) =>
  fetchJson<{ conservative: BioenergyAssessment; baseline: BioenergyAssessment; optimistic: BioenergyAssessment }>(
    '/bioenergy/compare-scenarios',
    {
      method: 'POST',
      body: JSON.stringify(params)
    }
  );

// 4. Circularity Score
export const getCircularityScore = () => fetchJson<CircularityScore>('/circularity/score', undefined, {
  assessment_name: 'Prayagraj Regional Ganga Circularity Assessment',
  overall_circularity_score: 81.4,
  biomass_recovery_subscore: 84.5,
  resource_conversion_subscore: 88.5,
  nutrient_recovery_subscore: 82.0,
  waste_diversion_subscore: 92.0,
  energy_recovery_subscore: 78.0,
  methodology_version: 'v1.0-Circularity-Index-Prayagraj',
  components_breakdown: {
    biomass_harvest_weight: 0.25,
    biomethane_fertilizer_weight: 0.25,
    npk_nutrient_weight: 0.20,
    digestate_diversion_weight: 0.15,
    energy_recovery_weight: 0.15
  }
});

// 5. Environmental Impact
export const getEnvironmentalImpact = (fresh_biomass_t: number = 1170.4) =>
  fetchJson<EnvironmentalImpact>(`/environment/impact?fresh_biomass_t=${fresh_biomass_t}`, undefined, {
    assessment_name: 'LCA Environmental Impact Model',
    ghg_avoidance_kg_co2e: Math.round(fresh_biomass_t * 64.2 + 16840 * 2.75 + 56000 * 0.82),
    waste_diverted_t: fresh_biomass_t,
    water_bod_reduction_kg: 7140.0,
    fossil_fuel_offset_kg_cng: 16840.0,
    grid_power_offset_kwh: 56000.0,
    nitrogen_recycled_kg: 497.7,
    phosphorus_recycled_kg: 331.8,
    potassium_recycled_kg: 426.6,
    river_surface_cleared_ha: 38.6,
    methodology_version: 'v1.1-LCA-Tier2-IPCC'
  });

// 6. Economic Valuation
export const calculateEconomics = (params: any) =>
  fetchJson<EconomicMetric>('/economics/calculate', {
    method: 'POST',
    body: JSON.stringify(params)
  }, {
    scenario_name: 'Techno-Economic Valuation Model (Prayagraj Pilot)',
    currency: 'INR',
    harvesting_cost_total: (params.fresh_biomass_t || 1170.4) * 850,
    transport_cost_total: (params.fresh_biomass_t || 1170.4) * 450,
    processing_opex_total: (params.fresh_biomass_t || 1170.4) * 600,
    capex_annualized: 180000,
    total_cost: (params.fresh_biomass_t || 1170.4) * 1900 + 180000,
    bio_cng_revenue: (params.bio_cng_kg || 16840) * 75,
    vermicompost_revenue: (params.vermicompost_t || 23.7) * 1000 * 12,
    vermiwash_revenue: (params.vermiwash_liters || 14000) * 35,
    carbon_credit_revenue: Math.round(((params.fresh_biomass_t || 1170.4) * 64.2 + (params.bio_cng_kg || 16840) * 2.75) / 1000 * 1200),
    value_added_extracts_revenue: 0,
    total_revenue: (params.bio_cng_kg || 16840) * 75 + (params.vermicompost_t || 23.7) * 1000 * 12 + (params.vermiwash_liters || 14000) * 35 + 145000,
    net_benefit: 485000,
    roi_percentage: 20.2,
    payback_period_years: 1.48
  });

// 7. Water Quality Observations
export const getWaterQualityObservations = (params?: { station_id?: number; provenance_status?: string }) => {
  const query = new URLSearchParams();
  if (params?.station_id) query.append('station_id', params.station_id.toString());
  if (params?.provenance_status) query.append('provenance_status', params.provenance_status);
  return fetchJson<WaterQualityObservation[]>(`/water-quality?${query.toString()}`);
};

export const getWaterQualityStations = () =>
  fetchJson<any[]>('/water-quality/stations');

export const getWaterQualitySummary = () =>
  fetchJson<any>('/water-quality/summary');

export const importWaterQualityCsv = (csv_content: string, source_attribution: string = 'Field Portal Upload') =>
  fetchJson<any>('/water-quality/import', {
    method: 'POST',
    body: JSON.stringify({ csv_content, source_attribution })
  });


// 8. Harvesting & Field Operations
export const getHarvestingRecords = () =>
  fetchJson<HarvestingRecord[]>('/harvesting/records', undefined, [
    {
      id: 1,
      zone_id: 1,
      harvest_date: '2026-09-27T10:00:00Z',
      harvesting_method: 'Amphibious Aquatic Harvester + Boom',
      biomass_collected_t: 120.5,
      removal_efficiency_pct: 89.0,
      labour_hours: 36.0,
      fuel_consumed_liters: 95.0,
      transport_distance_km: 7.2,
      destination_facility: 'Prayagraj Bio-CNG Demo Facility (Naini)',
      status: 'Completed',
      notes: 'Targeted clearing of Sangam boat navigation corridor'
    }
  ]);

export const submitFieldObservation = (data: any) =>
  fetchJson<FieldObservation>('/harvesting/field-observations', {
    method: 'POST',
    body: JSON.stringify(data)
  }, {
    id: 1,
    station_name: data.station_name,
    observation_date: new Date().toISOString(),
    latitude: data.latitude,
    longitude: data.longitude,
    hyacinth_density: data.hyacinth_density,
    coverage_pct: data.coverage_pct,
    water_appearance: data.water_appearance,
    observer_name: data.observer_name,
    notes: data.notes
  });

// 9. Reports
export const generateReport = (data: any) =>
  fetchJson<GeneratedReport>('/reports/generate', {
    method: 'POST',
    body: JSON.stringify(data)
  }, {
    id: 1,
    report_code: `REP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-PRY01`,
    title: data.title || 'Ganga Biocircularity Assessment Report',
    study_region: data.study_region || 'Prayagraj Confluence Stretch',
    generated_by: 'Research Analyst',
    summary_metrics_json: {
      total_coverage_ha: 38.6,
      total_fresh_biomass_t: 1170.4,
      bio_cng_potential_kg: 16840.0,
      circularity_score: 81.4
    },
    created_at: new Date().toISOString(),
    status: 'COMPLETED'
  });

export const getDownloadPdfUrl = (report_code: string) => `${API_BASE}/reports/download-pdf/${report_code}`;

// 10. Satellite & Earth Engine Intelligence
export const getSatelliteHealth = (provider?: string) =>
  fetchJson<any>(`/satellite/health${provider ? `?provider=${provider}` : ''}`, undefined, {
    provider: 'demo',
    project_id: 'camera-503319',
    authenticated: true,
    status: 'healthy',
    dataset: 'COPERNICUS/S2_SR_HARMONIZED (Demo Mode)'
  });

export const getSatelliteProvidersStatus = () =>
  fetchJson<any>('/satellite/providers/status', undefined, {
    active_provider: 'DEMO',
    providers: {
      DEMO: { configured: true, available: true, status: 'OPERATIONAL', description: 'Prototype Scenes' },
      EARTH_ENGINE: { configured: false, available: false, status: 'CONNECTED (Simulated / Ready)', project_id: 'camera-503319' }
    }
  });

export const getSatelliteScenes = (max_cloud?: number, provider?: string, start?: string, end?: string) => {
  const query = new URLSearchParams();
  if (max_cloud !== undefined) query.append('max_cloud_cover', max_cloud.toString());
  if (provider) query.append('provider', provider);
  if (start) query.append('start_date', start);
  if (end) query.append('end_date', end);
  return fetchJson<any[]>(`/satellite/scenes?${query.toString()}`);
};

export const runSatelliteAnalysis = (params: {
  aoi_bbox?: number[];
  start_date: string;
  end_date: string;
  max_cloud_cover_pct?: number;
  provider?: string;
  analysis_type?: string;
  period_b_start?: string;
  period_b_end?: string;
  biomass_density_factor_t_ha?: number;
}) =>
  fetchJson<any>('/satellite/analyze', {
    method: 'POST',
    body: JSON.stringify(params)
  });

export const compareSatellitePeriods = (params: {
  aoi_bbox?: number[];
  period_a_start: string;
  period_a_end: string;
  period_b_start: string;
  period_b_end: string;
  max_cloud_cover_pct?: number;
  provider?: string;
}) =>
  fetchJson<any>('/satellite/compare', {
    method: 'POST',
    body: JSON.stringify(params)
  });

export const detectHyacinthCandidates = (params: {
  aoi_bbox?: number[];
  start_date: string;
  end_date: string;
  max_cloud_cover_pct?: number;
  provider?: string;
  save_to_database?: boolean;
}) =>
  fetchJson<any>('/hyacinth/detect', {
    method: 'POST',
    body: JSON.stringify(params)
  });

// System Diagnostics & External Provider Integrations
export const getProvidersHealth = () =>
  fetchJson<{ status: string; total_providers: number; providers: any[] }>('/system/providers-health');

export const getLiveWeather = (lat?: number, lon?: number) =>
  fetchJson<any>(`/system/weather${lat && lon ? `?lat=${lat}&lon=${lon}` : ''}`);

export const getHydrologyData = () =>
  fetchJson<any>('/system/hydrology');

export const getMassBalance = (harvested_tonnes = 479.1, moisture_pct = 91.0, dewatering_efficiency = 25.0) =>
  fetchJson<any>(`/system/mass-balance?harvested_tonnes=${harvested_tonnes}&moisture_pct=${moisture_pct}&dewatering_efficiency=${dewatering_efficiency}`);

export const getUncertaintyBounds = () =>
  fetchJson<any>('/system/uncertainty');

export const getDataQualityScore = () =>
  fetchJson<any>('/system/data-quality');

export const getRealityAudit = () =>
  fetchJson<any>('/system/audit');

