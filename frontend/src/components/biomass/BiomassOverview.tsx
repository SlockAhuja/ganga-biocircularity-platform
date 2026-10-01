import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { BiomassAssessment, HyacinthZone } from '../../types';
import { MetricCard } from '../common/MetricCard';
import { Leaf, Scale, Droplet, Sparkles, Activity } from 'lucide-react';

interface BiomassOverviewProps {
  assessments: BiomassAssessment[];
  zones: HyacinthZone[];
  selectedZone: HyacinthZone | null;
  onSelectZone: (zone: HyacinthZone) => void;
}

export const BiomassOverview: React.FC<BiomassOverviewProps> = ({
  assessments,
  zones,
  selectedZone,
  onSelectZone
}) => {
  // Aggregate Metrics
  const totalFreshBiomass = assessments.reduce((acc, a) => acc + a.fresh_biomass_total_t, 0);
  const totalDrySolids = assessments.reduce((acc, a) => acc + a.total_solids_t, 0);
  const totalVolatileSolids = assessments.reduce((acc, a) => acc + a.volatile_solids_t, 0);
  const totalRecoverable = assessments.reduce((acc, a) => acc + a.recoverable_biomass_t, 0);
  const totalArea = zones.reduce((acc, z) => acc + z.area_ha, 0);

  // Bar chart data by zone
  const chartData = zones.map((z) => {
    const ass = assessments.find((a) => a.assessment_code.includes(z.zone_code)) || {
      fresh_biomass_total_t: z.area_ha * 32.0,
      total_solids_t: z.area_ha * 32.0 * 0.09,
      recoverable_biomass_t: z.area_ha * 32.0 * 0.85
    };
    return {
      name: z.zone_code,
      fullName: z.name,
      freshBiomass: ass.fresh_biomass_total_t,
      drySolids: ass.total_solids_t,
      recoverable: ass.recoverable_biomass_t,
      areaHa: z.area_ha
    };
  });

  // Pie Composition Data
  const compositionData = [
    { name: 'Moisture Content (H₂O)', value: 91.0, color: '#0284c7' },
    { name: 'Volatile Digestible Organics (VS)', value: 7.2, color: '#0f766e' },
    { name: 'Inert Mineral Ash / Residue', value: 1.8, color: '#94a3b8' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Fresh Biomass"
          value={totalFreshBiomass.toFixed(1)}
          unit="tonnes"
          icon={<Leaf className="w-5 h-5" />}
          subtitle={`Across ${totalArea.toFixed(1)} ha surface area`}
          provenance="ESTIMATED"
        />

        <MetricCard
          title="Total Dry Solids (TS)"
          value={totalDrySolids.toFixed(1)}
          unit="tonnes"
          icon={<Scale className="w-5 h-5" />}
          subtitle="9.0% average dry matter yield"
          provenance="ESTIMATED"
        />

        <MetricCard
          title="Volatile Solids (VS)"
          value={totalVolatileSolids.toFixed(1)}
          unit="tonnes"
          icon={<Sparkles className="w-5 h-5" />}
          subtitle="80% volatile fraction of dry solids"
          provenance="MODELED"
        />

        <MetricCard
          title="Recoverable Biomass"
          value={totalRecoverable.toFixed(1)}
          unit="tonnes"
          icon={<Activity className="w-5 h-5" />}
          subtitle="85% mechanical harvesting recovery"
          provenance="MODELED"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spatial Distribution Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Spatial Biomass Quantification by Zone</h3>
              <p className="text-xs text-slate-500">Fresh biomass vs recoverable feedstock (Tonnes)</p>
            </div>
            <span className="text-[10px] font-mono bg-confluence-50 text-confluence-800 px-2 py-0.5 rounded font-semibold border border-confluence-200">
              Sentinel-2 Linked
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="freshBiomass" name="Fresh Biomass (t)" fill="#0f766e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="recoverable" name="Recoverable (t)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="drySolids" name="Dry Solids (TS, t)" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Proximate Composition Pie Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm">Biomass Proximate Composition</h3>
              <Droplet className="w-4 h-4 text-river-600" />
            </div>
            <p className="text-xs text-slate-500 mb-4">Laboratory moisture & organic distribution</p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={compositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {compositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => `${val}%`}
                    contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
            {compositionData.map((c) => (
              <div key={c.name} className="flex justify-between items-center">
                <span className="flex items-center space-x-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }}></span>
                  <span className="truncate max-w-[160px]">{c.name}</span>
                </span>
                <span className="font-mono font-bold text-slate-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone Selector Grid */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-3">Zone-by-Zone Biomass Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {zones.map((z) => {
            const isSelected = selectedZone?.id === z.id;
            const ass = assessments.find((a) => a.assessment_code.includes(z.zone_code));
            const freshT = ass ? ass.fresh_biomass_total_t : (z.area_ha * 32.0);

            return (
              <div
                key={z.id}
                onClick={() => onSelectZone(z)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-confluence-500 bg-confluence-50/60 ring-2 ring-confluence-200'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-confluence-800 text-xs">{z.zone_code}</span>
                  <span className="text-[10px] font-semibold text-slate-500">{z.density_class}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs mt-1 truncate">{z.name}</h4>
                <div className="mt-2 pt-2 border-t border-slate-200/60 flex justify-between items-baseline text-xs font-mono">
                  <span className="text-slate-500">Fresh:</span>
                  <span className="font-bold text-slate-900">{freshT.toFixed(1)} t</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
