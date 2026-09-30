import React, { useState } from 'react';
import { 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Line,
  ComposedChart
} from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { mockTimeSeriesData } from '../../data/mockData';
import { StatusTag } from '../ui/StatusTag';

export const TimeSeriesChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'all' | 'area' | 'biomass'>('all');

  return (
    <Card className="p-5">
      <CardHeader
        title="Hyacinth Distribution & Biomass Dynamics Over Time"
        subtitle="6-Month Multi-Temporal Trend for Prayagraj River Stretch (Apr – Sep)"
        badge={<StatusTag type="simulated" customText="Multi-Temporal Sentinel-2 Trend" />}
        action={
          <div className="flex items-center gap-1.5 bg-ink-50 p-1 rounded-lg text-xs">
            <button
              onClick={() => setActiveMetric('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMetric === 'all' 
                  ? 'bg-white text-ganga-800 shadow-xs font-semibold' 
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              All Metrics
            </button>
            <button
              onClick={() => setActiveMetric('area')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMetric === 'area' 
                  ? 'bg-white text-ganga-800 shadow-xs font-semibold' 
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              Hyacinth Area (ha)
            </button>
            <button
              onClick={() => setActiveMetric('biomass')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMetric === 'biomass' 
                  ? 'bg-white text-ganga-800 shadow-xs font-semibold' 
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              Biomass (kg/d)
            </button>
          </div>
        }
      />

      <div className="h-[280px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={mockTimeSeriesData}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="hyacinthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D5B" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2E7D5B" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="biomassGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E6A23C" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#E6A23C" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E3EAE5" vertical={false} />
            
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              stroke="#66736B" 
              fontSize={12}
              fontFamily="Inter, sans-serif"
            />
            
            <YAxis 
              yAxisId="left"
              tickLine={false} 
              stroke="#66736B" 
              fontSize={11}
              fontFamily="JetBrains Mono, monospace"
              unit=" ha"
            />

            <YAxis 
              yAxisId="right"
              orientation="right"
              tickLine={false} 
              stroke="#66736B" 
              fontSize={11}
              fontFamily="JetBrains Mono, monospace"
              unit=" kg"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                borderRadius: '8px',
                border: '1px solid #E3EAE5',
                boxShadow: '0 4px 12px rgba(23, 33, 27, 0.08)',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif'
              }}
              formatter={(value: any, name: any) => {
                if (name === 'Hyacinth Area') return [`${value} ha`, name];
                if (name === 'Harvestable Biomass') return [`${value} kg/day`, name];
                if (name === 'Water Open Surface') return [`${value}%`, name];
                return [value, name];
              }}
            />

            <Legend 
              wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
              iconType="circle"
            />

            {(activeMetric === 'all' || activeMetric === 'area') && (
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="hyacinthArea"
                name="Hyacinth Area"
                stroke="#2E7D5B"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#hyacinthGradient)"
              />
            )}

            {(activeMetric === 'all' || activeMetric === 'biomass') && (
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="biomass"
                name="Harvestable Biomass"
                stroke="#E6A23C"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#biomassGradient)"
              />
            )}

            {activeMetric === 'all' && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="waterCoverage"
                name="Water Open Surface (%)"
                stroke="#4A90C2"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#4A90C2' }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-ink-50 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-ink-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ganga-600" />
          <span>Peak Proliferation: <strong className="text-ink-900 font-semibold">July (44.8 ha)</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amberalert" />
          <span>Max Daily Yield: <strong className="text-ink-900 font-semibold">9,800 kg/day</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-skywater-500" />
          <span>Harvest Clearance Target: <strong className="text-ink-900 font-semibold">&gt; 90% Surface</strong></span>
        </div>
      </div>
    </Card>
  );
};
