import React, { useState } from 'react';
import {
  Waves,
  Leaf,
  Tractor,
  Droplets,
  Microscope,
  Flame,
  Sparkles,
  RefreshCw,
  Sprout,
  Package,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';

interface StageDetail {
  id: string;
  step: number;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
  color: string;
  technicalSpecs: {
    input: string;
    process: string;
    efficiency: string;
    output: string;
    scientificNote: string;
  };
}

export const CircularFlowDiagram: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-ad');

  const stages: StageDetail[] = [
    {
      id: 'stage-ganga',
      step: 1,
      title: 'Ganga River Ecosystem',
      shortDesc: 'Prayagraj River Channel & Confluence',
      icon: <Waves className="w-5 h-5" />,
      color: 'bg-river-600 text-white',
      technicalSpecs: {
        input: 'Nutrient-rich river water with upstream agricultural runoffs',
        process: 'River monitoring via Sentinel-2 satellite and CPCB telemetry nodes',
        efficiency: 'Continuous spatial coverage',
        output: 'Spatial zone delineations & water quality baselines',
        scientificNote: 'High nitrate/phosphate influx triggers rapid seasonal hyacinth proliferation.'
      }
    },
    {
      id: 'stage-hyacinth',
      step: 2,
      title: 'Invasive Hyacinth Bloom',
      shortDesc: 'Eichhornia crassipes dense mats',
      icon: <Leaf className="w-5 h-5" />,
      color: 'bg-emerald-600 text-white',
      technicalSpecs: {
        input: 'Dissolved nutrients & solar radiation',
        process: 'High photosynthetic growth rate doubling every 7-12 days',
        efficiency: '32 tonnes/ha fresh yield biomass',
        output: 'Dense floating vegetative mats with 91% moisture and 9% total solids',
        scientificNote: 'Uncontrolled mats block sunlight and cause hypoxic dead zones upon riverbed decay.'
      }
    },
    {
      id: 'stage-harvest',
      step: 3,
      title: 'Targeted Harvesting',
      shortDesc: 'Mechanical weed booms & skimmers',
      icon: <Tractor className="w-5 h-5" />,
      color: 'bg-amber-600 text-white',
      technicalSpecs: {
        input: 'Detected hyacinth zones (e.g. Sangam & Curzon reaches)',
        process: 'Amphibious harvesting boats with front-loading conveyor cutters',
        efficiency: '85-89% collection efficiency',
        output: 'Harvested fresh weed delivered to riverside collection staging',
        scientificNote: 'Avoids chemical herbicides which harm non-target river aquatic biota.'
      }
    },
    {
      id: 'stage-dewater',
      step: 4,
      title: 'Mechanical Dewatering',
      shortDesc: 'Screw-press liquid separation',
      icon: <Droplets className="w-5 h-5" />,
      color: 'bg-sky-600 text-white',
      technicalSpecs: {
        input: 'Fresh water hyacinth (91% moisture)',
        process: 'Mechanical screw press reduction to ~80-84% moisture',
        efficiency: '35% reduction in transport volume and hauling emissions',
        output: 'Dewatered solid cake + nutrient-rich plant juice effluent',
        scientificNote: 'Dewatering drastically cuts downstream transport fuel consumption and carbon footprint.'
      }
    },
    {
      id: 'stage-characterize',
      step: 5,
      title: 'Biomass Characterization',
      shortDesc: 'TS, VS, C:N & ICP-MS Testing',
      icon: <Microscope className="w-5 h-5" />,
      color: 'bg-indigo-600 text-white',
      technicalSpecs: {
        input: 'Dewatered composite samples',
        process: 'Standard proximate analysis and ICP-MS heavy metals assay',
        efficiency: 'C:N ratio calibrated to 24.5',
        output: 'Batch verification for volatile solids and regulatory threshold safety',
        scientificNote: 'Ensures feed C:N ratio is optimum for methanogenic microbial consortia.'
      }
    },
    {
      id: 'stage-ad',
      step: 6,
      title: 'Anaerobic Digestion',
      shortDesc: 'CSTR Bioreactor at 37°C',
      icon: <Flame className="w-5 h-5" />,
      color: 'bg-orange-600 text-white',
      technicalSpecs: {
        input: 'Characterized hyacinth solids + starter inoculum slurry',
        process: 'Mesophilic anaerobic digestion (Hydrolysis -> Acidogenesis -> Methanogenesis)',
        efficiency: '0.28 m³ CH₄ / kg VS biochemical methane potential',
        output: 'Raw biogas (62% CH₄, 38% CO₂) + nutrient-rich digestate',
        scientificNote: 'Hydraulic retention time (HRT) maintained at 25-30 days with continuous agitation.'
      }
    },
    {
      id: 'stage-biogas',
      step: 7,
      title: 'Bio-CNG Purification',
      shortDesc: 'Membrane scrubbing & compression',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'bg-amber-500 text-white',
      technicalSpecs: {
        input: 'Raw biogas stream (62% CH₄)',
        process: 'Pressure Swing Adsorption (PSA) or membrane gas scrubbing to remove CO₂/H₂S',
        efficiency: '95% pure biomethane compressed to 200 bar',
        output: 'SATAT-grade Bio-CNG for vehicular fuel & green cooking',
        scientificNote: 'Displaces 2.75 kg CO₂e fossil emissions per kg Bio-CNG utilized.'
      }
    },
    {
      id: 'stage-digestate',
      step: 8,
      title: 'Digestate Separation',
      shortDesc: 'Solid-Liquid bio-slurry split',
      icon: <RefreshCw className="w-5 h-5" />,
      color: 'bg-teal-600 text-white',
      technicalSpecs: {
        input: 'AD bioreactor digestate effluent',
        process: 'Decanter centrifuge splitting solid fibrous cake from liquid filtrate',
        efficiency: '85% total mass recovery into circular products',
        output: 'Solid bio-fraction (compost substrate) & liquid extract',
        scientificNote: 'Zero-waste discharge policy ensures complete utilization of all digestate fractions.'
      }
    },
    {
      id: 'stage-vermi',
      step: 9,
      title: 'Vermicomposting',
      shortDesc: 'Eisenia foetida earthworm beds',
      icon: <Sprout className="w-5 h-5" />,
      color: 'bg-emerald-700 text-white',
      technicalSpecs: {
        input: 'Solid digestate cake blended with agricultural straw',
        process: '45-day vermicomposting with red wriggler earthworms (Eisenia foetida)',
        efficiency: '45% dry weight conversion yield',
        output: 'Premium cast organic vermicompost + Vermiwash liquid',
        scientificNote: 'Earthworm digestion accelerates humification and enriches plant-available NPK.'
      }
    },
    {
      id: 'stage-products',
      step: 10,
      title: 'Value-Added Bio-Products',
      shortDesc: 'Humic, Fulvic, Vermiwash & Soil Conditioner',
      icon: <Package className="w-5 h-5" />,
      color: 'bg-confluence-800 text-white',
      technicalSpecs: {
        input: 'Refined vermicompost & vermiwash extracts',
        process: 'Alkaline extraction, microfiltration, and bio-enrichment formulation',
        efficiency: '100% agricultural value recovery',
        output: 'Humic acids, Fulvic acids, Liquid Vermiwash, Organic bio-fertilizer',
        scientificNote: 'Enhances soil organic carbon (SOC) and reduces chemical pesticide dependency in Ganga basin farms.'
      }
    }
  ];

  const activeStage = stages.find((s) => s.id === selectedStageId) || stages[5];

  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base">Ganga River Circular Bioeconomy Transformation Pipeline</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          End-to-end multi-stage cascade from invasive weed detection to renewable energy and high-value bio-fertilizers. Click any stage to inspect technical parameters.
        </p>

        {/* Pipeline Horizontal Flow */}
        <div className="mt-6 flex items-center justify-between overflow-x-auto pb-4 pt-2 gap-2">
          {stages.map((stg, index) => {
            const isSelected = selectedStageId === stg.id;
            return (
              <React.Fragment key={stg.id}>
                <div
                  onClick={() => setSelectedStageId(stg.id)}
                  className={`flex flex-col items-center shrink-0 cursor-pointer transition-all ${
                    isSelected ? 'scale-105' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ minWidth: '90px' }}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs transition-all ${
                      stg.color
                    } ${
                      isSelected
                        ? 'ring-4 ring-confluence-200 ring-offset-2 scale-110 shadow-md'
                        : 'border border-slate-200'
                    }`}
                  >
                    {stg.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 mt-2">STEP 0{stg.step}</span>
                  <span
                    className={`text-[11px] font-bold text-center mt-0.5 max-w-[85px] leading-tight line-clamp-2 ${
                      isSelected ? 'text-confluence-900' : 'text-slate-700'
                    }`}
                  >
                    {stg.title}
                  </span>
                </div>

                {index < stages.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mx-0.5" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Technical Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${activeStage.color}`}>
              {activeStage.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold bg-confluence-50 text-confluence-800 px-2 py-0.5 rounded border border-confluence-200">
                  STAGE 0{activeStage.step}
                </span>
                <span className="text-xs font-bold text-slate-500">{activeStage.shortDesc}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-1">{activeStage.title}</h4>
            </div>
          </div>
          <span className="text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            <span>Operational Stage</span>
          </span>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Input Stream</span>
            <p className="font-medium text-slate-900 mt-1">{activeStage.technicalSpecs.input}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Unit Operation & Mechanism</span>
            <p className="font-medium text-slate-900 mt-1">{activeStage.technicalSpecs.process}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Recovery / Efficiency Metric</span>
            <p className="font-mono font-bold text-confluence-800 mt-1">{activeStage.technicalSpecs.efficiency}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Output Product</span>
            <p className="font-medium text-slate-900 mt-1">{activeStage.technicalSpecs.output}</p>
          </div>
        </div>

        {/* Scientific Note */}
        <div className="mt-4 p-3.5 bg-confluence-50/50 rounded-xl border border-confluence-200/60 flex items-start space-x-2 text-xs text-confluence-900">
          <Info className="w-4 h-4 text-confluence-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Research Note: </span>
            <span>{activeStage.technicalSpecs.scientificNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
