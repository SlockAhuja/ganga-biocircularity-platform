import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { Globe2, Trash2, Sprout, Activity } from 'lucide-react';
import { StatusTag } from '../ui/StatusTag';

export const ImpactCards: React.FC = () => {
  const chartData = [
    { name: 'GHG Offset', current: 421, max: 500, unit: 'tCO₂e', fill: '#2E7D5B' },
    { name: 'Waste Diverted', current: 125.4, max: 150, unit: 'Tonnes', fill: '#4A90C2' },
    { name: 'Nitrogen (N)', current: 142.8, max: 160, unit: 'kg/d', fill: '#64AC8B' },
    { name: 'Phosphorus (P)', current: 72.8, max: 85, unit: 'kg/d', fill: '#E6A23C' }
  ];

  return (
    <Card className="p-5">
      <CardHeader
        title="Environmental Life Cycle Assessment (LCA) Impact"
        subtitle="Ecosystem benefits quantified through macrophyte removal and carbon sequestration"
        badge={<StatusTag type="simulated" customText="LCA Impact Assessment" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {/* Metric 1: GHG Reduction */}
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-semibold text-emerald-800">GHG Avoidance</span>
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Globe2 className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-ink-900 font-sans">421 <span className="text-xs font-normal text-ink-500">tCO₂e / yr</span></div>
            <p className="text-[11px] text-ink-500 mt-0.5">Avoided fugitive anaerobic river emissions</p>
          </div>
          <div className="w-full bg-emerald-200/70 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '84.2%' }} />
          </div>
          <div className="mt-1.5 text-[10px] text-emerald-700 font-mono font-medium flex justify-between">
            <span>Progress to Target</span>
            <span>84.2% (Target: 500)</span>
          </div>
        </div>

        {/* Metric 2: Waste Diversion */}
        <div className="bg-skywater-50/60 border border-skywater-100 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-semibold text-skywater-800">River Mass Diverted</span>
            <div className="p-1.5 rounded-lg bg-skywater-100 text-skywater-800">
              <Trash2 className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-ink-900 font-sans">125.4 <span className="text-xs font-normal text-ink-500">Tonnes / mo</span></div>
            <p className="text-[11px] text-ink-500 mt-0.5">Floating choke mass extracted</p>
          </div>
          <div className="w-full bg-skywater-200/70 h-1.5 rounded-full overflow-hidden">
            <div className="bg-skywater-600 h-full rounded-full" style={{ width: '83.6%' }} />
          </div>
          <div className="mt-1.5 text-[10px] text-skywater-700 font-mono font-medium flex justify-between">
            <span>Extraction Rate</span>
            <span>83.6% of Monthly Inflow</span>
          </div>
        </div>

        {/* Metric 3: Nutrient Recovery */}
        <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-semibold text-amber-800">Nutrients Recycled</span>
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-ink-900 font-sans">215.6 <span className="text-xs font-normal text-ink-500">kg / day</span></div>
            <p className="text-[11px] text-ink-500 mt-0.5">142.8kg N + 72.8kg P redirected</p>
          </div>
          <div className="w-full bg-amber-200/70 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amberalert h-full rounded-full" style={{ width: '87.5%' }} />
          </div>
          <div className="mt-1.5 text-[10px] text-amber-800 font-mono font-medium flex justify-between">
            <span>Eutrophication Shield</span>
            <span>High Abatement</span>
          </div>
        </div>

        {/* Metric 4: Water Quality Improvement */}
        <div className="bg-ganga-50/60 border border-ganga-100 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-semibold text-ganga-800">River Oxygenation</span>
            <div className="p-1.5 rounded-lg bg-ganga-100 text-ganga-800">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-ink-900 font-sans">+28.4% <span className="text-xs font-normal text-ink-500">DO Lift</span></div>
            <p className="text-[11px] text-ink-500 mt-0.5">Restored sunlight & benthic airflow</p>
          </div>
          <div className="w-full bg-ganga-200/70 h-1.5 rounded-full overflow-hidden">
            <div className="bg-ganga-600 h-full rounded-full" style={{ width: '92.0%' }} />
          </div>
          <div className="mt-1.5 text-[10px] text-ganga-800 font-mono font-medium flex justify-between">
            <span>Aquatic Health Index</span>
            <span>0.78 (Improving)</span>
          </div>
        </div>
      </div>

      {/* Mini Comparative Bar Breakdown */}
      <div className="mt-5 pt-4 border-t border-ink-100">
        <div className="text-xs font-semibold text-ink-800 mb-2">
          Target Achievement by Ecological Dimension
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis type="number" tickLine={false} stroke="#66736B" fontSize={11} />
              <YAxis dataKey="name" type="category" tickLine={false} stroke="#66736B" fontSize={11} />
              <Tooltip
                formatter={(value: any, _name: any, props: any) => [
                  `${value} ${props.payload.unit} (Target: ${props.payload.max})`,
                  'Quantified Value'
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid #E3EAE5',
                  fontSize: '11px'
                }}
              />
              <Bar dataKey="current" radius={[0, 4, 4, 0]} barSize={16}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
