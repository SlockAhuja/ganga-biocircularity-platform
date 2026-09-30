import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { StatusTag } from '../components/ui/StatusTag';
import { 
  mockBiomassCharacteristics, 
  mockMonitoringZones
} from '../data/mockData';
import type { MonitoringZone } from '../data/mockData';
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
import { 
  Sprout, 
  Droplet, 
  Flame, 
  Scale, 
  FlaskConical
} from 'lucide-react';

export const BiomassPage: React.FC<{ selectedZone?: MonitoringZone | null }> = ({ selectedZone: _selectedZone }) => {
  const proximateData = [
    { name: 'Volatile Solids', value: 72.3, fill: '#2E7D5B' },
    { name: 'Fixed Carbon', value: 14.2, fill: '#4A90C2' },
    { name: 'Ash / Inorganics', value: 13.5, fill: '#E6A23C' }
  ];

  const fiberComposition = [
    { name: 'Cellulose', value: 28.4, fill: '#2E7D5B' },
    { name: 'Hemicellulose', value: 33.1, fill: '#64AC8B' },
    { name: 'Lignin (Low)', value: 9.8, fill: '#E6A23C' },
    { name: 'Extractives & Protein', value: 28.7, fill: '#4A90C2' }
  ];

  const zoneYields = mockMonitoringZones.map(z => ({
    name: z.name.replace('Monitoring ', ''),
    biomass: z.estimatedBiomassTonnes,
    area: z.hyacinthAreaHa,
    density: z.coverageDensityPercent
  }));

  return (
    <PageContainer
      title="Water Hyacinth Biomass Characterization & Yield Assessment"
      subtitle="Physicochemical, lignocellulosic and proximate analysis of harvested Eichhornia crassipes for optimized bioconversion."
      badge={<StatusTag type="simulated" customText="Lab Proximate Analysis" />}
    >
      {/* Top 5 Core Scientific Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Fresh Biomass */}
        <Card className="p-4 border-l-4 border-l-ganga-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>FRESH BIOMASS</span>
            <Sprout className="w-4 h-4 text-ganga-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockBiomassCharacteristics.freshBiomassPerDay}
          </div>
          <div className="text-[11px] text-ink-500 mt-1">
            Harvestable Daily Inflow
          </div>
        </Card>

        {/* Moisture */}
        <Card className="p-4 border-l-4 border-l-skywater-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>MOISTURE CONTENT</span>
            <Droplet className="w-4 h-4 text-skywater-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockBiomassCharacteristics.moistureContent}%
          </div>
          <div className="text-[11px] text-skywater-700 font-medium mt-1">
            Screw-press target: 65%
          </div>
        </Card>

        {/* Total Solids */}
        <Card className="p-4 border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>TOTAL SOLIDS (TS)</span>
            <Scale className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockBiomassCharacteristics.totalSolids}%
          </div>
          <div className="text-[11px] text-ink-500 mt-1">
            Dry mass density fraction
          </div>
        </Card>

        {/* Volatile Solids */}
        <Card className="p-4 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>VOLATILE SOLIDS</span>
            <Flame className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockBiomassCharacteristics.volatileSolids}% <span className="text-xs font-normal text-ink-500">of TS</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            High Anaerobic Convertibility
          </div>
        </Card>

        {/* C/N Ratio */}
        <Card className="p-4 border-l-4 border-l-amberalert">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>C/N RATIO</span>
            <FlaskConical className="w-4 h-4 text-amberalert" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockBiomassCharacteristics.carbonToNitrogenRatio}
          </div>
          <div className="text-[11px] text-amber-800 font-medium mt-1">
            Optimal AD Window: 20-30
          </div>
        </Card>
      </div>

      {/* Two-Column Deep Characterization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proximate Analysis Breakdown */}
        <Card className="p-5">
          <CardHeader
            title="Proximate Solid State Analysis (Dry Basis)"
            subtitle="Compositional split of total organic dry matter"
          />

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={proximateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {proximateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${val}% (dry mass)`, 'Share']}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: '1px solid #E3EAE5', fontSize: '11px' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 text-xs text-ink-500 bg-ink-50 p-2.5 rounded-lg border border-ink-100 flex items-center justify-between">
            <span>Higher Heating Value (HHV):</span>
            <span className="font-mono font-bold text-ink-800">{mockBiomassCharacteristics.calorificValue}</span>
          </div>
        </Card>

        {/* Lignocellulosic Fiber Structure */}
        <Card className="p-5">
          <CardHeader
            title="Lignocellulosic Fiber Profiling"
            subtitle="Low lignin content facilitates rapid enzymatic hydrolysis"
          />

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fiberComposition}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 70, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" horizontal={false} />
                <XAxis type="number" stroke="#66736B" fontSize={10} unit="%" />
                <YAxis dataKey="name" type="category" stroke="#66736B" fontSize={10} />
                <Tooltip
                  formatter={(val) => [`${val}%`, 'Content']}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: '1px solid #E3EAE5', fontSize: '11px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
                  {fiberComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 text-xs text-ganga-800 bg-ganga-50 p-2.5 rounded-lg border border-ganga-100 flex items-center justify-between">
            <span>Biodegradability Index (BD):</span>
            <span className="font-mono font-bold">78.4% (Highly Digestible)</span>
          </div>
        </Card>
      </div>

      {/* Zone Yield Forecast */}
      <Card className="p-5">
        <CardHeader
          title="Spatial Biomass Distribution by Monitoring Zone"
          subtitle="Estimated harvestable tonnage and coverage across Ganga-Yamuna sectors"
        />

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={zoneYields}
              margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E3EAE5" />
              <XAxis dataKey="name" stroke="#66736B" fontSize={11} />
              <YAxis stroke="#66736B" fontSize={11} unit=" t" />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: '1px solid #E3EAE5', fontSize: '11px' }}
                formatter={(val) => [`${val} tonnes`, 'Harvestable Biomass']}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="biomass" name="Estimated Biomass (Tonnes)" fill="#2E7D5B" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </PageContainer>
  );
};
