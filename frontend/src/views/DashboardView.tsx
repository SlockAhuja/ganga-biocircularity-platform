import React from 'react';
import {
  HyacinthZone,
  MonitoringStation,
  RiverSegment,
  BiomassAssessment,
  BioenergyAssessment,
  CircularityScore,
  EnvironmentalImpact
} from '../types';
import { MetricCard } from '../components/common/MetricCard';
import { ScientificBadge } from '../components/common/ScientificBadge';
import { RiverMap } from '../components/gis/RiverMap';
import {
  Waves,
  Leaf,
  Flame,
  RefreshCw,
  Trees,
  TrendingUp,
  MapPin,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface DashboardViewProps {
  zones: HyacinthZone[];
  stations: MonitoringStation[];
  segments: RiverSegment[];
  assessments: BiomassAssessment[];
  circularity: CircularityScore;
  impact: EnvironmentalImpact;
  selectedZone: HyacinthZone | null;
  onSelectZone: (zone: HyacinthZone) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  zones,
  stations,
  segments,
  assessments,
  circularity,
  impact,
  selectedZone,
  onSelectZone,
  onNavigateTab
}) => {
  const totalCoverageHa = zones.reduce((acc, z) => acc + z.area_ha, 0);
  const totalFreshBiomass = assessments.reduce((acc, a) => acc + a.fresh_biomass_total_t, 0);
  const totalBioCngKg = Math.round(totalFreshBiomass * 14.38);

  return (
    <div className="space-y-6">
      {/* Platform Executive Header */}
      <div className="bg-gradient-to-r from-confluence-900 via-confluence-800 to-river-900 rounded-3xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-confluence-700/80 text-confluence-100 text-[11px] font-mono font-bold tracking-wider uppercase border border-confluence-600/60">
              Prayagraj Confluence Intelligence
            </span>
            <span className="text-xs text-confluence-200">Ganga-Yamuna River Basin</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            🌿 Ganga Biocircularity Platform
          </h2>
          <p className="text-xs sm:text-sm text-confluence-100/80 max-w-2xl leading-relaxed">
            Satellite-derived aquatic hyacinth quantification, anaerobic bioenergy conversion, and zero-waste circular fertilizer recovery for the sacred Ganga basin.
          </p>
        </div>

        {/* Quick Workflow Jumper */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('gis')}
            className="px-4 py-2.5 bg-white text-confluence-950 hover:bg-confluence-50 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center space-x-1.5"
          >
            <span>Explore GIS Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigateTab('bioenergy')}
            className="px-4 py-2.5 bg-confluence-700/60 hover:bg-confluence-700 text-white rounded-xl font-bold text-xs border border-confluence-600 transition-all flex items-center space-x-1.5"
          >
            <span>Simulate Bio-CNG</span>
          </button>
        </div>
      </div>

      {/* Top Core Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Hyacinth Coverage"
          value={totalCoverageHa.toFixed(1)}
          unit="ha"
          icon={<Waves className="w-5 h-5 text-river-600" />}
          subtitle="5 Primary Prayagraj Zones"
          provenance="OBSERVED"
          trend={{ value: '-8.2%', isPositive: true }}
          onClick={() => onNavigateTab('gis')}
        />

        <MetricCard
          title="Estimated Biomass"
          value={totalFreshBiomass.toFixed(0)}
          unit="tonnes"
          icon={<Leaf className="w-5 h-5 text-emerald-600" />}
          subtitle="Fresh Eichhornia crassipes"
          provenance="ESTIMATED"
          onClick={() => onNavigateTab('biomass')}
        />

        <MetricCard
          title="Bio-CNG Potential"
          value={totalBioCngKg.toLocaleString()}
          unit="kg"
          icon={<Flame className="w-5 h-5 text-amber-600" />}
          subtitle="SATAT green transport fuel"
          provenance="MODELED"
          onClick={() => onNavigateTab('bioenergy')}
        />

        <MetricCard
          title="Circularity Score"
          value={`${circularity.overall_circularity_score}`}
          unit="/ 100"
          icon={<RefreshCw className="w-5 h-5 text-confluence-700" />}
          subtitle="5-Pillar Integrated Index"
          provenance="MODELED"
          highlight={true}
          onClick={() => onNavigateTab('circularity')}
        />
      </div>

      {/* Interactive Map Section */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-900 text-base">Live River Spatial Intelligence Map</h3>
              <span className="text-[10px] font-mono bg-confluence-100 text-confluence-800 px-2 py-0.5 rounded font-semibold">
                WGS84 Geodesic
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Interactive Sentinel-2 detected hyacinth zones, water monitoring stations, and river reach lines
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('gis')}
            className="text-xs font-bold text-confluence-800 hover:text-confluence-900 flex items-center space-x-1"
          >
            <span>Full GIS Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <RiverMap
          zones={zones}
          stations={stations}
          segments={segments}
          selectedZone={selectedZone}
          onSelectZone={onSelectZone}
          height="440px"
        />
      </div>

      {/* 2-Column Insights: Circular Transformation & Environmental LCA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Circularity Summary Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-confluence-700" />
                <h4 className="font-bold text-slate-900 text-sm">Circular Bioeconomy Transformation</h4>
              </div>
              <ScientificBadge type="MODELED" />
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Harvesting {totalFreshBiomass.toFixed(0)} tonnes of floating weed diverts rotting organic matter from riverbeds, manufacturing <strong>{totalBioCngKg.toLocaleString()} kg Bio-CNG</strong> and <strong>23.7 tonnes of fortified vermicompost</strong>.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-mono text-center">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-sans block">Vermiwash</span>
                <span className="font-bold text-slate-900">14,000 L</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-sans block">Power Output</span>
                <span className="font-bold text-slate-900">56,000 kWh</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-sans block">Recycled NPK</span>
                <span className="font-bold text-confluence-800">1,256 kg</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('circularity')}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5"
          >
            <span>View Full 10-Stage Circular Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Environmental LCA Summary Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Trees className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-sm">Environmental & Carbon Avoidance</h4>
              </div>
              <ScientificBadge type="MODELED" />
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Phytoremediation and mechanical weed recovery clear <strong>{impact.river_surface_cleared_ha.toFixed(1)} ha</strong> of river surface, reducing BOD load and preventing potent anaerobic methane venting.
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono text-center">
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-emerald-800 font-sans font-bold block uppercase">GHG Avoidance</span>
                <span className="text-base font-extrabold text-emerald-950">{impact.ghg_avoidance_kg_co2e.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-700 ml-1">kg CO₂e</span>
              </div>
              <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-100">
                <span className="text-[10px] text-sky-800 font-sans font-bold block uppercase">BOD Removed</span>
                <span className="text-base font-extrabold text-sky-950">{impact.water_bod_reduction_kg.toLocaleString()}</span>
                <span className="text-[10px] text-sky-700 ml-1">kg BOD</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('environment')}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Inspect Life Cycle Assessment (LCA)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
