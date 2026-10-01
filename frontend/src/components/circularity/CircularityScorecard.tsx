import React from 'react';
import { CircularityScore } from '../../types';
import { RefreshCw, CheckCircle2, Shield, Flame, Sprout, Trash2, BatteryCharging } from 'lucide-react';

interface CircularityScorecardProps {
  scoreData: CircularityScore;
}

export const CircularityScorecard: React.FC<CircularityScorecardProps> = ({ scoreData }) => {
  const pillars = [
    {
      title: 'Biomass Recovery',
      score: scoreData.biomass_recovery_subscore,
      weight: '25%',
      icon: <Sprout className="w-4 h-4 text-emerald-600" />,
      desc: 'Selective mechanical harvesting of aquatic mats'
    },
    {
      title: 'Resource Conversion',
      score: scoreData.resource_conversion_subscore,
      weight: '25%',
      icon: <Flame className="w-4 h-4 text-amber-600" />,
      desc: 'Volatile solids conversion to biomethane & fertilizer'
    },
    {
      title: 'Nutrient Recovery',
      score: scoreData.nutrient_recovery_subscore,
      weight: '20%',
      icon: <RefreshCw className="w-4 h-4 text-sky-600" />,
      desc: 'Plant-available NPK recycled into local agricultural soils'
    },
    {
      title: 'Waste Diversion',
      score: scoreData.waste_diversion_subscore,
      weight: '15%',
      icon: <Trash2 className="w-4 h-4 text-confluence-700" />,
      desc: 'Zero-landfill digestate and effluent recycling'
    },
    {
      title: 'Energy Recovery',
      score: scoreData.energy_recovery_subscore,
      weight: '15%',
      icon: <BatteryCharging className="w-4 h-4 text-purple-600" />,
      desc: 'Green electricity and compressed Bio-CNG displacement'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-slate-900 text-base">Regional Circularity Index Scorecard</h3>
            <span className="text-[10px] font-mono bg-confluence-100 text-confluence-800 px-2 py-0.5 rounded font-semibold">
              {scoreData.methodology_version}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent composite metric evaluating circular bio-utilization across 5 defined pillars
          </p>
        </div>

        {/* Big Overall Circularity Number */}
        <div className="flex items-center space-x-3 bg-confluence-50/80 px-4 py-2.5 rounded-2xl border border-confluence-200 shrink-0">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-confluence-800">
              Circularity Index
            </span>
            <div className="flex items-baseline space-x-1 justify-center">
              <span className="text-3xl font-extrabold text-confluence-950">
                {scoreData.overall_circularity_score}
              </span>
              <span className="text-xs font-bold text-confluence-700">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Pillars Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {pillars.map((p) => (
          <div key={p.title} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-xs">
                {p.icon}
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">Weight: {p.weight}</span>
            </div>

            <div>
              <span className="font-bold text-slate-900 text-xs block">{p.title}</span>
              <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{p.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-200/60">
              <div className="flex justify-between text-xs font-mono font-bold mb-1">
                <span className="text-slate-500 text-[10px]">Pillar Score</span>
                <span className="text-confluence-900">{p.score.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-confluence-700 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${p.score}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
