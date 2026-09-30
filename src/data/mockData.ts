export interface MonitoringZone {
  id: string;
  name: string;
  sector: string;
  coordinates: [number, number]; // [lat, lng]
  polyCoords: [number, number][];
  totalAreaHa: number;
  hyacinthAreaHa: number;
  coverageDensityPercent: number;
  estimatedBiomassTonnes: number;
  detectionConfidencePercent: number;
  densityLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  ndviMean: number;
  ndwiMean: number;
  lastUpdated: string;
  riskAssessment: 'Nominal' | 'Watch' | 'Critical';
  waterVelocity: number; // m/s
  waterDepth: number; // m
}

export interface WaterQualityStation {
  id: string;
  name: string;
  stationCode: string;
  coordinates: [number, number];
  ph: number;
  do: number; // Dissolved Oxygen mg/L
  bod: number; // Biochemical Oxygen Demand mg/L
  cod: number; // Chemical Oxygen Demand mg/L
  tss: number; // Total Suspended Solids mg/L
  nitrates: number; // mg/L
  phosphates: number; // mg/L
  temperature: number; // °C
  wqi: number; // Water Quality Index (0-100)
  status: 'Good' | 'Moderate' | 'Poor' | 'Critical';
}

export const mockSystemTelemetry = {
  platformName: "GANGA BIOCIRCULARITY",
  subTitle: "Intelligence Platform",
  tagline: "Satellite-Based Water Hyacinth Monitoring, Biomass Assessment & Circular Resource Recovery",
  location: "Prayagraj, Uttar Pradesh",
  state: "Uttar Pradesh",
  region: "Northern Gangetic Plain (Triveni Sangam)",
  coordinates: "25.4358° N, 81.8463° E",
  activeSatellite: "Sentinel-2B / MSI (ESA Copernicus)",
  resolution: "10m Multispectral",
  orbitPassTime: "10:30 AM IST (Revisit: 5 Days)",
  cloudCover: "4.2%",
  processingLevel: "L2A - Bottom-of-Atmosphere (BOA)",
  lastAcquisitionDate: "24 May 2026",
  systemStatus: "ACTIVE",
  isSimulated: true
};

export const mockKPIData = {
  biomassMonitored: {
    value: "8,450",
    unit: "kg/day",
    trend: "+12.4%",
    period: "vs last week",
    icon: "Sprout",
    label: "Biomass Monitored",
    description: "Daily harvestable fresh water hyacinth mass"
  },
  hyacinthCoverage: {
    value: "38.6",
    unit: "ha",
    trend: "+4.1%",
    period: "30-day expansion",
    icon: "Droplets",
    label: "Hyacinth Coverage",
    description: "Total detected floating macrophyte surface"
  },
  biogasPotential: {
    value: "3.2M",
    unit: "m³",
    trend: "+8.9%",
    period: "annualized yield",
    icon: "Flame",
    label: "Biogas Potential",
    description: "Anaerobic digestion biomethane capacity"
  },
  resourceRecovery: {
    value: "78.6",
    unit: "%",
    trend: "+5.2%",
    period: "circular efficiency",
    icon: "Recycle",
    label: "Resource Recovery",
    description: "Organic solids diverted to value streams"
  },
  ghgReduction: {
    value: "421",
    unit: "tCO₂e",
    trend: "-18.3%",
    period: "methane offset",
    icon: "Globe2",
    label: "GHG Reduction",
    description: "Prevented fugitive aquatic emissions"
  },
  economicValue: {
    value: "₹12.85",
    unit: "Lakh",
    trend: "+15.0%",
    period: "gross monthly",
    icon: "IndianRupee",
    label: "Estimated Economic Value",
    description: "Aggregated bio-CNG & organic fertilizer revenue"
  }
};

export const mockMonitoringZones: MonitoringZone[] = [
  {
    id: "zone-07",
    name: "Monitoring Zone 07",
    sector: "Triveni Sangam Confluence Reach",
    coordinates: [25.4298, 81.8845],
    polyCoords: [
      [25.4330, 81.8790],
      [25.4345, 81.8885],
      [25.4260, 81.8910],
      [25.4245, 81.8815]
    ],
    totalAreaHa: 18.42,
    hyacinthAreaHa: 11.83,
    coverageDensityPercent: 64.2,
    estimatedBiomassTonnes: 126.3,
    detectionConfidencePercent: 93.4,
    densityLevel: "High",
    ndviMean: 0.74,
    ndwiMean: -0.38,
    lastUpdated: "Today, 06:00 UTC",
    riskAssessment: "Critical",
    waterVelocity: 0.42,
    waterDepth: 4.8
  },
  {
    id: "zone-03",
    name: "Monitoring Zone 03",
    sector: "Shastri Bridge Downstream",
    coordinates: [25.4412, 81.8720],
    polyCoords: [
      [25.4450, 81.8680],
      [25.4465, 81.8760],
      [25.4370, 81.8780],
      [25.4360, 81.8700]
    ],
    totalAreaHa: 14.20,
    hyacinthAreaHa: 8.95,
    coverageDensityPercent: 63.0,
    estimatedBiomassTonnes: 94.8,
    detectionConfidencePercent: 91.8,
    densityLevel: "High",
    ndviMean: 0.71,
    ndwiMean: -0.32,
    lastUpdated: "Today, 06:00 UTC",
    riskAssessment: "Watch",
    waterVelocity: 0.55,
    waterDepth: 6.2
  },
  {
    id: "zone-01",
    name: "Monitoring Zone 01",
    sector: "Rasoolabad Ghat Upstream",
    coordinates: [25.4780, 81.8490],
    polyCoords: [
      [25.4810, 81.8450],
      [25.4820, 81.8540],
      [25.4740, 81.8550],
      [25.4730, 81.8460]
    ],
    totalAreaHa: 12.10,
    hyacinthAreaHa: 4.15,
    coverageDensityPercent: 34.3,
    estimatedBiomassTonnes: 44.2,
    detectionConfidencePercent: 95.1,
    densityLevel: "Moderate",
    ndviMean: 0.52,
    ndwiMean: -0.15,
    lastUpdated: "Today, 06:00 UTC",
    riskAssessment: "Nominal",
    waterVelocity: 0.78,
    waterDepth: 7.5
  },
  {
    id: "zone-05",
    name: "Monitoring Zone 05",
    sector: "Daraganj Embankment Channel",
    coordinates: [25.4485, 81.8890],
    polyCoords: [
      [25.4520, 81.8850],
      [25.4530, 81.8940],
      [25.4440, 81.8950],
      [25.4430, 81.8860]
    ],
    totalAreaHa: 16.80,
    hyacinthAreaHa: 13.65,
    coverageDensityPercent: 81.25,
    estimatedBiomassTonnes: 148.5,
    detectionConfidencePercent: 96.2,
    densityLevel: "Very High",
    ndviMean: 0.82,
    ndwiMean: -0.49,
    lastUpdated: "Today, 06:00 UTC",
    riskAssessment: "Critical",
    waterVelocity: 0.28,
    waterDepth: 3.6
  },
  {
    id: "zone-09",
    name: "Monitoring Zone 09",
    sector: "Naini Yamuna Side Confluence",
    coordinates: [25.4190, 81.8650],
    polyCoords: [
      [25.4220, 81.8610],
      [25.4235, 81.8700],
      [25.4150, 81.8710],
      [25.4140, 81.8620]
    ],
    totalAreaHa: 9.50,
    hyacinthAreaHa: 1.80,
    coverageDensityPercent: 18.9,
    estimatedBiomassTonnes: 19.1,
    detectionConfidencePercent: 89.6,
    densityLevel: "Low",
    ndviMean: 0.38,
    ndwiMean: -0.05,
    lastUpdated: "Today, 06:00 UTC",
    riskAssessment: "Nominal",
    waterVelocity: 0.85,
    waterDepth: 8.1
  }
];

export const mockTimeSeriesData = [
  { month: "Apr", hyacinthArea: 22.4, biomass: 4850, waterCoverage: 98.2, ndvi: 0.58 },
  { month: "May", hyacinthArea: 29.1, biomass: 6200, waterCoverage: 94.6, ndvi: 0.64 },
  { month: "Jun", hyacinthArea: 38.6, biomass: 8450, waterCoverage: 89.4, ndvi: 0.74 },
  { month: "Jul", hyacinthArea: 44.8, biomass: 9800, waterCoverage: 85.1, ndvi: 0.79 },
  { month: "Aug", hyacinthArea: 36.2, biomass: 7900, waterCoverage: 91.0, ndvi: 0.69 },
  { month: "Sep", hyacinthArea: 26.5, biomass: 5600, waterCoverage: 96.5, ndvi: 0.61 }
];

export const mockWaterQualityStations: WaterQualityStation[] = [
  {
    id: "st-01",
    name: "Rasoolabad Ghat",
    stationCode: "UP-GNG-01",
    coordinates: [25.4780, 81.8490],
    ph: 7.8,
    do: 6.4,
    bod: 3.8,
    cod: 18.2,
    tss: 42.0,
    nitrates: 1.8,
    phosphates: 0.28,
    temperature: 28.5,
    wqi: 76,
    status: "Good"
  },
  {
    id: "st-02",
    name: "Shastri Bridge Midstream",
    stationCode: "UP-GNG-02",
    coordinates: [25.4412, 81.8720],
    ph: 7.4,
    do: 4.8,
    bod: 6.4,
    cod: 29.5,
    tss: 68.0,
    nitrates: 3.4,
    phosphates: 0.55,
    temperature: 29.1,
    wqi: 61,
    status: "Moderate"
  },
  {
    id: "st-03",
    name: "Triveni Sangam Point",
    stationCode: "UP-GNG-03",
    coordinates: [25.4298, 81.8845],
    ph: 7.1,
    do: 3.9,
    bod: 8.9,
    cod: 38.0,
    tss: 94.0,
    nitrates: 4.9,
    phosphates: 0.82,
    temperature: 29.8,
    wqi: 48,
    status: "Poor"
  },
  {
    id: "st-04",
    name: "Daraganj Embankment",
    stationCode: "UP-GNG-04",
    coordinates: [25.4485, 81.8890],
    ph: 6.9,
    do: 3.1,
    bod: 11.2,
    cod: 49.0,
    tss: 112.0,
    nitrates: 6.2,
    phosphates: 1.15,
    temperature: 30.2,
    wqi: 36,
    status: "Critical"
  },
  {
    id: "st-05",
    name: "Naini Yamuna Confluence",
    stationCode: "UP-YMN-01",
    coordinates: [25.4190, 81.8650],
    ph: 7.6,
    do: 5.6,
    bod: 4.9,
    cod: 24.0,
    tss: 54.0,
    nitrates: 2.5,
    phosphates: 0.39,
    temperature: 28.9,
    wqi: 69,
    status: "Moderate"
  }
];

export const mockBiomassCharacteristics = {
  freshBiomassPerDay: "8,450 kg/day",
  moistureContent: 92.1,
  totalSolids: 7.9,
  volatileSolids: 72.3, // % of TS
  fixedCarbon: 14.2,
  ashContent: 13.5,
  carbonToNitrogenRatio: 24.6,
  cellulosePercent: 28.4,
  hemicellulosePercent: 33.1,
  ligninPercent: 9.8,
  calorificValue: "14.8 MJ/kg (dry)",
  harvestEfficiency: 88.5
};

export const mockBioenergyData = {
  biogasYieldPerTonVS: 385, // m³ / ton Volatile Solids
  dailyBiogasProduction: 1845, // m³ / day
  methanePurity: 62.4, // % CH4
  bioCngEquivalent: 920, // kg / day
  electricityPotential: 3680, // kWh / day
  thermalOutput: 38.6, // GJ / day
  retentionTimeDays: 25,
  operatingTemp: "37.5 °C (Mesophilic AD)",
  digesterCapacity: "500 m³ Continuous Stirred-Tank"
};

export const mockEnvironmentalImpact = {
  ghgReduction: { value: 421, unit: "tCO₂e / yr", target: 500, percent: 84.2 },
  wasteDiversion: { value: 125.4, unit: "tonnes / mo", target: 150, percent: 83.6 },
  nitrogenRecovery: { value: 142.8, unit: "kg / day", target: 160, percent: 89.2 },
  phosphorusRecovery: { value: 72.8, unit: "kg / day", target: 85, percent: 85.6 },
  waterQualityImprovement: "+28.4% DO Elevation",
  biodiversityIndex: "0.78 (Moderate-High Recovery)",
  surfaceAreaRestored: "38.6 ha"
};

export const mockEconomicFeasibility = {
  estimatedMonthlyBenefit: "₹5.35 Lakh",
  grossAnnualRevenue: "₹64.2 Lakh",
  paybackPeriod: "2.8 Years",
  irrPercent: "28.4%",
  breakdown: [
    { category: "Bio-CNG & Clean Energy", amount: 485000, percentage: 38, fill: "#2E7D5B" },
    { category: "Organic Bio-Fertilizer", amount: 395000, percentage: 31, fill: "#4A90C2" },
    { category: "Humic & Fulvic Acid Extracts", amount: 245000, percentage: 19, fill: "#E6A23C" },
    { category: "Carbon Offset Credits", amount: 160000, percentage: 12, fill: "#64AC8B" }
  ],
  costs: [
    { name: "Collection & River Skimming", amount: 145000, fill: "#D96B6B" },
    { name: "Dewatering & Pre-Treatment", amount: 85000, fill: "#E6A23C" },
    { name: "AD Bioreactor Operations", amount: 95000, fill: "#4A90C2" },
    { name: "Logistics & Distribution", amount: 45000, fill: "#66736B" }
  ]
};

export const mockBioeconomyPathway = [
  {
    step: 1,
    id: "river",
    title: "Ganga River Monitoring",
    subtitle: "Prayagraj Reach (10m Resolution)",
    icon: "Waves",
    badge: "Input Stream",
    color: "skywater",
    stats: "38.6 ha Detected"
  },
  {
    step: 2,
    id: "detection",
    title: "Sentinel-2 Multi-Index Detection",
    subtitle: "NDVI, NDWI & FAI Spectral Classifiers",
    icon: "Satellite",
    badge: "93.4% Confidence",
    color: "ganga",
    stats: "10-Band Analysis"
  },
  {
    step: 3,
    id: "harvesting",
    title: "Eco-Harvesting & Skimming",
    subtitle: "Targeted Amphibious Biomass Harvesters",
    icon: "Combine",
    badge: "8,450 kg/day",
    color: "ganga",
    stats: "Zero Bycatch Protocol"
  },
  {
    step: 4,
    id: "dewatering",
    title: "Mechanical Dewatering",
    subtitle: "Screw Press Moisture Reduction (92% → 65%)",
    icon: "Filter",
    badge: "Volume Reduction 70%",
    color: "skywater",
    stats: "Effluent Recycled"
  },
  {
    step: 5,
    id: "characterization",
    title: "Biomass Characterization",
    subtitle: "C/N Ratio 24.6 Optimization & Maceration",
    icon: "FlaskConical",
    badge: "72.3% Volatile Solids",
    color: "ganga",
    stats: "Enzymatic Pre-treatment"
  },
  {
    step: 6,
    id: "digestion",
    title: "Anaerobic Co-Digestion",
    subtitle: "Mesophilic Continuous Bioreactor (37°C)",
    icon: "Flame",
    badge: "385 m³/t VS Yield",
    color: "amberalert",
    stats: "62.4% CH₄ Purity"
  },
  {
    step: 7,
    id: "biogas",
    title: "Purified Biogas / Bio-CNG",
    subtitle: "Gas Scrubbing & Bottling",
    icon: "Fuel",
    badge: "920 kg/day CNG",
    color: "ganga",
    stats: "Grid & Vehicle Ready"
  }
];

export const mockDigestateBranches = [
  {
    path: "Branch A: Vermicomposting",
    products: [
      { name: "Enriched Organic Fertilizer", yield: "3.4 tonnes/day", npk: "3.2 : 1.8 : 2.4", market: "Soil Enrichment" },
      { name: "Potted Plant Bio-Compost", yield: "1.2 tonnes/day", npk: "High Organic Matter", market: "Horticulture" }
    ]
  },
  {
    path: "Branch B: High-Value Biochemicals",
    products: [
      { name: "Liquid Humic Acid (12% Ext.)", yield: "180 Litres/day", purity: "Premium Agricultural Grade", market: "Crop Booster" },
      { name: "Fulvic Acid Chelate", yield: "65 Litres/day", purity: "Water Soluble Fraction", market: "Micro-nutrient Carrier" },
      { name: "Lignocellulosic Soil Conditioner", yield: "850 kg/day", purity: "High Porosity Fiber", market: "Erosion Control" }
    ]
  }
];
