import React from 'react';
import { EnvironmentalImpact } from '../../types';
import { MetricCard } from '../common/MetricCard';
import { Trees, CloudRain, Droplet, Sparkles, Wind, ShieldCheck, Check } from 'lucide-react';

interface GHGImpactCardProps {
  impact: EnvironmentalImpact;
}

export const GHGImpactCard: React.FC<GHGImpactCardProps> = ({ impact }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-slate-900 text-base">Environmental Life Cycle Assessment (LCA) Impact</h3>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
              Tier-2 IPCC LCA Method
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Quantified greenhouse gas avoidance, river BOD load reduction, and mineral fertilizer displacement
          </p>
        </div>
      </div>

      {/* 4 Core Environmental Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total GHG Avoidance"
          value={impact.ghg_avoidance_kg_co2e.toLocaleString()}
          unit="kg CO₂e"
          icon={<Wind className="w-5 h-5 text-emerald-600" />}
          subtitle="Avoided riverbed decay + fossil offsets"
          provenance="MODELED"
        />

        <MetricCard
          title="River Surface Restored"
          value={impact.river_surface_cleared_ha.toFixed(1)}
          unit="ha"
          icon={<Trees className="w-5 h-5 text-confluence-700" />}
          subtitle="Re-oxygenated aquatic corridor"
          provenance="ESTIMATED"
        />

        <MetricCard
          title="River BOD Load Removed"
          value={impact.water_bod_reduction_kg.toLocaleString()}
          unit="kg BOD"
          icon={<Droplet className="w-5 h-5 text-sky-600" />}
          subtitle="Biochemical oxygen preservation"
          provenance="MODELED"
        />

        <MetricCard
          title="Fossil CNG Displaced"
          value={impact.fossil_fuel_offset_kg_cng.toLocaleString()}
          unit="kg"
          icon={<Sparkles className="w-5 h-5 text-amber-600" />}
          subtitle="Displaced vehicular emissions"
          provenance="MODELED"
        />
      </div>

      {/* GHG Avoidance Multi-Stream Breakdown Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h4 className="font-bold text-slate-900 text-sm">Carbon Avoidance Streams Decomposition</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 space-y-1">
            <span className="text-[10px] font-sans font-bold text-emerald-800 uppercase block">
              1. Avoided Riverbed Anaerobic Decay
            </span>
            <span className="text-xl font-bold text-emerald-950">
              {Math.round(impact.waste_diverted_t * 64.2).toLocaleString()} kg CO₂e
            </span>
            <p className="text-[11px] font-sans text-slate-500 pt-1">
              Factor: 64.2 kg CO₂e / tonne fresh biomass diverted from rotting into methane at the river bottom.
            </p>
          </div>

          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100 space-y-1">
            <span className="text-[10px] font-sans font-bold text-amber-800 uppercase block">
              2. Fossil CNG Vehicle Displacement
            </span>
            <span className="text-xl font-bold text-amber-950">
              {Math.round(impact.fossil_fuel_offset_kg_cng * 2.75).toLocaleString()} kg CO₂e
            </span>
            <p className="text-[11px] font-sans text-slate-500 pt-1">
              Factor: 2.75 kg CO₂e per kg of compressed Bio-CNG substituting petroleum-derived fuels.
            </p>
          </div>

          <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-100 space-y-1">
            <span className="text-[10px] font-sans font-bold text-sky-800 uppercase block">
              3. Grid Electricity Offset
            </span>
            <span className="text-xl font-bold text-sky-950">
              {Math.round(impact.grid_power_offset_kwh * 0.82).toLocaleString()} kg CO₂e
            </span>
            <p className="text-[11px] font-sans text-slate-500 pt-1">
              Factor: 0.82 kg CO₂e / kWh displacing regional thermal coal-heavy electrical grid power.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
