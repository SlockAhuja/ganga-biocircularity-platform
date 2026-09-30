import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { StatusTag } from '../components/ui/StatusTag';
import { mockEnvironmentalImpact } from '../data/mockData';
import { 
  Globe2, 
  Trash2, 
  Sprout, 
  Fish, 
  CheckCircle2, 
  Leaf
} from 'lucide-react';
import { 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const mockEcoRadar = [
  { metric: 'Dissolved O₂ Restoration', score: 88, baseline: 35 },
  { metric: 'Algal Bloom Suppression', score: 92, baseline: 25 },
  { metric: 'Benthic Light Penetration', score: 84, baseline: 30 },
  { metric: 'Fish Diversity Index', score: 78, baseline: 40 },
  { metric: 'River Flow Velocity', score: 72, baseline: 45 },
  { metric: 'Nutrient Assimilation', score: 90, baseline: 20 },
];

export const EnvironmentPage: React.FC = () => {
  return (
    <PageContainer
      title="Ecosystem Restoration & Environmental Impact Assessment"
      subtitle="Quantifying greenhouse gas avoidance, eutrophication reversal, and benthic biodiversity recovery across the Ganga basin."
      badge={<StatusTag type="simulated" customText="ISO 14044 LCA Model" />}
    >
      {/* 5 Core Environmental Impact Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* GHG Reduction */}
        <Card className="p-4 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>GHG AVOIDED</span>
            <Globe2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockEnvironmentalImpact.ghgReduction.value} <span className="text-xs font-normal text-ink-500">{mockEnvironmentalImpact.ghgReduction.unit}</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Fugitive CH₄ Methane Cap
          </div>
        </Card>

        {/* Waste Diversion */}
        <Card className="p-4 border-l-4 border-l-skywater-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>RIVER MASS CLEARED</span>
            <Trash2 className="w-4 h-4 text-skywater-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockEnvironmentalImpact.wasteDiversion.value} <span className="text-xs font-normal text-ink-500">{mockEnvironmentalImpact.wasteDiversion.unit}</span>
          </div>
          <div className="text-[11px] text-skywater-700 font-medium mt-1">
            Invasive mat extraction
          </div>
        </Card>

        {/* Nitrogen Recovery */}
        <Card className="p-4 border-l-4 border-l-ganga-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>NITROGEN (N) RECOVERY</span>
            <Sprout className="w-4 h-4 text-ganga-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockEnvironmentalImpact.nitrogenRecovery.value} <span className="text-xs font-normal text-ink-500">{mockEnvironmentalImpact.nitrogenRecovery.unit}</span>
          </div>
          <div className="text-[11px] text-ganga-800 font-medium mt-1">
            Reversed Eutrophication
          </div>
        </Card>

        {/* Phosphorus Recovery */}
        <Card className="p-4 border-l-4 border-l-amberalert">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>PHOSPHORUS (P)</span>
            <Leaf className="w-4 h-4 text-amberalert" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockEnvironmentalImpact.phosphorusRecovery.value} <span className="text-xs font-normal text-ink-500">{mockEnvironmentalImpact.phosphorusRecovery.unit}</span>
          </div>
          <div className="text-[11px] text-amber-800 font-medium mt-1">
            Soil Conditioner Feedstock
          </div>
        </Card>

        {/* Biodiversity Index */}
        <Card className="p-4 border-l-4 border-l-teal-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>BIODIVERSITY INDEX</span>
            <Fish className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            0.78 <span className="text-xs font-normal text-ink-500">/ 1.0</span>
          </div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Moderate-High Recovery
          </div>
        </Card>
      </div>

      {/* Radar & Comparative Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multi-Dimensional Ecological Health Radar */}
        <Card className="p-5">
          <CardHeader
            title="Ecosystem Restoration Radar (Before vs After Harvesting)"
            subtitle="Evaluating river rehabilitation metrics relative to choked baseline"
          />

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={mockEcoRadar}>
                <PolarGrid stroke="#E3EAE5" />
                <PolarAngleAxis dataKey="metric" stroke="#66736B" fontSize={10} />
                <PolarRadiusAxis stroke="#66736B" fontSize={10} angle={30} domain={[0, 100]} />
                <Radar name="Post-Intervention (Target)" dataKey="score" stroke="#2E7D5B" fill="#2E7D5B" fillOpacity={0.4} />
                <Radar name="Baseline (Infested River)" dataKey="baseline" stroke="#D96B6B" fill="#D96B6B" fillOpacity={0.25} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: '1px solid #E3EAE5', fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Carbon Abatement Attribution */}
        <Card className="p-5">
          <CardHeader
            title="Carbon Footprint Mitigation Breakdown"
            subtitle="Annualized emissions avoided across circular pathway steps"
          />

          <div className="space-y-3 mt-2">
            {[
              { label: 'Avoided River Methane Outgassing', val: '265 tCO₂e', pct: 63, color: 'bg-emerald-500' },
              { label: 'Fossil Diesel Replacement by Bio-CNG', val: '104 tCO₂e', pct: 25, color: 'bg-ganga-500' },
              { label: 'Synthetic Fertilizer Displacement', val: '52 tCO₂e', pct: 12, color: 'bg-skywater-500' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-ink-50/60 rounded-xl border border-ink-100">
                <div className="flex justify-between items-center text-xs font-semibold text-ink-900 mb-1">
                  <span>{item.label}</span>
                  <span className="font-mono text-ganga-800">{item.val} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-ink-200 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              Meets <strong>UN Sustainable Development Goals</strong>: SDG 6 (Clean Water), SDG 7 (Clean Energy), and SDG 13 (Climate Action).
            </span>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
