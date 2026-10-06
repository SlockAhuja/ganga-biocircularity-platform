import React from 'react';
import {
  BookOpen,
  Calculator,
  Layers,
  Flame,
  Leaf,
  Trees,
  RefreshCw,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';

export const MethodologyView: React.FC = () => {
  const sections = [
    {
      id: 'gis-area',
      title: '1. GIS Geodesic Spatial Area Quantification',
      icon: <Layers className="w-5 h-5 text-[#4B8DB8]" />,
      formula: 'Area_{geodesic} = \\oint_{Polygon} R^2 \\cos(\\phi) d\\phi d\\lambda',
      description: 'Polygon areas drawn or extracted from Sentinel-2 vectors are projected onto the WGS84 (EPSG:4326) ellipsoid using PostGIS geodesic algorithms (ST_Area(geography)), converting square meters into hectares (1 ha = 10,000 m²).',
      assumptions: [
        'Coordinate Reference System: EPSG:4326 (WGS84 Lat/Lon)',
        'Geodesic distortion correction applied for river reaches',
        'Polygon vertices validated for clockwise ring closure'
      ],
      references: 'Karney, C.F.F. (2013). Algorithms for geodesics. Journal of Geodesy, 87(1), 43-55.'
    },
    {
      id: 'biomass',
      title: '2. Allometric Hyacinth Biomass Quantification',
      icon: <Leaf className="w-5 h-5 text-[#2E7D5B]" />,
      formula: 'Biomass_{fresh} (t) = Area (ha) \\times \\left(\\frac{Coverage\\%}{100}\\right) \\times \\rho_{density} (t/ha)',
      description: 'Calculates fresh weight, dry matter (Total Solids), volatile organic solids, and recoverable yield based on density classification (Low: 8 t/ha, Medium: 18 t/ha, High: 32 t/ha, Very High: 48 t/ha).',
      assumptions: [
        'Moisture Content: 91.0% - 93.0% (Average 91.0%)',
        'Total Solids (TS): 9.0% of fresh biomass',
        'Volatile Solids (VS): 80.0% of Total Solids',
        'Mechanical Collection Efficiency: 85.0%'
      ],
      references: 'Gunnarsson, C.C., & Petersen, C.M. (2007). Water hyacinths as a resource in agriculture and energy production: a review. Waste Management, 27(1), 117-129.'
    },
    {
      id: 'bioenergy',
      title: '3. Anaerobic Digestion & Bio-CNG Yield Modeling',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      formula: 'Biogas (m^3) = VS_{avail} (kg) \\times \\frac{BMP (mL/g VS)}{1000} \\times \\eta_{digestion}',
      description: 'Predicts biomethane generation from anaerobic digestion. Purified Bio-CNG is calculated assuming 96.0% CH₄ purity and density of 0.717 kg/m³ under standard SATAT guidelines.',
      assumptions: [
        'Biochemical Methane Potential (BMP): 245 mL CH₄ / g VS',
        'Raw Biogas Methane Content: 62.0% CH₄',
        'Digestion Process Efficiency: 88.0%',
        'Purification & Compression Loss: 5.0%'
      ],
      references: 'Kumar, S., & Ghosh, P.C. (2019). Anaerobic digestion of water hyacinth: Bioenergy potential and nutrient recovery in India. Renewable Energy, 138, 412-421.'
    },
    {
      id: 'vermicompost',
      title: '4. Digestate Vermicomposting & Nutrient Upcycling',
      icon: <RefreshCw className="w-5 h-5 text-[#2E7D5B]" />,
      formula: 'Vermicompost (t) = Digestate (t) \\times (1 - Loss_{moisture}) \\times \\eta_{conversion}',
      description: 'Solid digestate fraction from screw-press dewatering is vermicomposted with Eisenia fetida earthworms to produce pathogen-free, high-NPK organic manure and vermiwash extract.',
      assumptions: [
        'Compost yield factor: ~3.0% of fresh hyacinth input (23.7 t per 1,000 t fresh)',
        'Nitrogen content (N): 2.1% dry weight',
        'Phosphorus content (P₂O₅): 1.4% dry weight',
        'Potassium content (K₂O): 1.8% dry weight',
        'Vermiwash extraction: ~14.0 L / tonne fresh biomass'
      ],
      references: 'Gupta, R., & Garg, V.K. (2008). Stabilization of water hyacinth by vermicomposting. Bioresource Technology, 99(18), 8605-8612.'
    },
    {
      id: 'lca',
      title: '5. Environmental Life Cycle Carbon Accounting (LCA)',
      icon: <Trees className="w-5 h-5 text-emerald-600" />,
      formula: 'GHG_{avoided} = GHG_{methane\\_prevented} + GHG_{cng\\_offset} + GHG_{grid\\_offset}',
      description: 'Calculates net carbon mitigation by preventing natural anaerobic decaying of rotting weed in the Ganga riverbed and displacing fossil diesel/CNG and coal grid power.',
      assumptions: [
        'Decay Methane Emission Factor: 0.082 kg CH₄ / kg dry biomass rotted in water',
        'Methane Global Warming Potential (GWP₁₀₀): 28.0 kg CO₂e / kg CH₄ (IPCC AR6)',
        'Fossil Fuel Displacement Factor: 2.75 kg CO₂e / kg Bio-CNG utilized',
        'BOD Load Reduction: 185 kg BOD prevented per hectare cleared'
      ],
      references: 'IPCC (2019). Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories: Waste & Wetlands.'
    },
    {
      id: 'circularity',
      title: '6. Five-Pillar Circularity Index (0 - 100)',
      icon: <FileCheck className="w-5 h-5 text-[#2E7D5B]" />,
      formula: 'CI = 0.25 \\cdot S_{biomass} + 0.25 \\cdot S_{conversion} + 0.20 \\cdot S_{nutrient} + 0.15 \\cdot S_{waste} + 0.15 \\cdot S_{energy}',
      description: 'Synthesizes mass balance, energetic recovery efficiency, nutrient circularity, and landfill diversion into an objective 0 to 100 index with full sub-score transparency.',
      assumptions: [
        'Biomass Recovery Subscore (Weight: 25%)',
        'Resource Conversion Subscore (Weight: 25%)',
        'Nutrient Upcycling Subscore (Weight: 20%)',
        'Waste Diversion Subscore (Weight: 15%)',
        'Energy Generation Subscore (Weight: 15%)'
      ],
      references: 'Ellen MacArthur Foundation (2015). Circularity Indicators: An Approach to Measuring Circularity.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#EAF5EE] text-[#2E7D5B] rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-[#17211B]">
                Scientific Methodology & Mathematical Formulation
              </h2>
              <span className="text-[10px] font-mono bg-[#EAF5EE] text-[#2E7D5B] px-2 py-0.5 rounded font-bold border border-[#59A978]/30">
                v1.2 Peer-Reviewed Basis
              </span>
            </div>
            <p className="text-xs text-[#68756D] mt-0.5">
              Transparent equations, standard emission factors, conversion constants, and peer-reviewed literature citations.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-[#68756D]">Prayagraj Ganga Baseline</span>
        </div>
      </div>

      {/* Methodology Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white rounded-3xl border border-[#DFE8E2] p-6 shadow-xs space-y-4 hover:border-[#2E7D5B] transition-all"
          >
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <div className="p-2 bg-[#F6FAF7] rounded-xl border border-[#DFE8E2]">
                {sec.icon}
              </div>
              <h3 className="font-bold text-sm text-[#17211B]">{sec.title}</h3>
            </div>

            {/* Formula Code Box */}
            <div className="p-3 bg-[#F6FAF7] rounded-xl border border-[#DFE8E2] font-mono text-xs text-[#2E7D5B] font-bold overflow-x-auto">
              <code>{sec.formula}</code>
            </div>

            <p className="text-xs text-[#68756D] leading-relaxed">
              {sec.description}
            </p>

            {/* Assumptions List */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#17211B]">
                Model Parameters & Assumptions:
              </span>
              <ul className="space-y-1 text-[11px] text-[#68756D]">
                {sec.assumptions.map((asm, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] mt-0.5 shrink-0" />
                    <span>{asm}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Citation Reference */}
            <div className="pt-3 border-t border-slate-100 text-[10px] text-[#68756D]">
              <span className="font-bold text-[#17211B]">Reference: </span>
              <span>{sec.references}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
