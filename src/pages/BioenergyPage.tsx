import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { StatusTag } from '../components/ui/StatusTag';
import { mockBioenergyData } from '../data/mockData';
import { 
  Flame, 
  Zap, 
  Fuel, 
  Gauge, 
  Clock, 
  Thermometer, 
  Layers
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

const mockBiogasKinetics = [
  { day: 'Day 1', methane: 15, biogas: 80, codReduction: 10 },
  { day: 'Day 5', methane: 38, biogas: 420, codReduction: 32 },
  { day: 'Day 10', methane: 55, biogas: 980, codReduction: 54 },
  { day: 'Day 15', methane: 62, biogas: 1540, codReduction: 68 },
  { day: 'Day 20', methane: 63, biogas: 1780, codReduction: 75 },
  { day: 'Day 25', methane: 62.4, biogas: 1845, codReduction: 81 },
];

export const BioenergyPage: React.FC = () => {
  return (
    <PageContainer
      title="Bioenergy & Bio-Methane Potential Assessment"
      subtitle="Anaerobic digestion stoichiometry, methane purification kinetics, and clean vehicular Bio-CNG equivalent yields."
      badge={<StatusTag type="simulated" customText="AD Bioreactor Simulation" />}
    >
      {/* 4 Hero Energy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Biogas Production */}
        <Card className="p-4 border-t-4 border-t-amberalert">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>DAILY BIOGAS YIELD</span>
            <Flame className="w-4 h-4 text-amberalert" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockBioenergyData.dailyBiogasProduction.toLocaleString()} <span className="text-xs font-normal text-ink-500">m³ / day</span>
          </div>
          <div className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded w-fit font-medium mt-1">
            Yield: {mockBioenergyData.biogasYieldPerTonVS} m³ / t VS
          </div>
        </Card>

        {/* Methane Purity */}
        <Card className="p-4 border-t-4 border-t-ganga-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>METHANE PURITY (CH₄)</span>
            <Gauge className="w-4 h-4 text-ganga-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockBioenergyData.methanePurity}%
          </div>
          <div className="text-[11px] text-ganga-800 bg-ganga-50 px-2 py-0.5 rounded w-fit font-medium mt-1">
            CO₂: 34.5% • H₂S &lt; 200 ppm
          </div>
        </Card>

        {/* Bio-CNG Equivalent */}
        <Card className="p-4 border-t-4 border-t-skywater-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>BIO-CNG EQUIVALENT</span>
            <Fuel className="w-4 h-4 text-skywater-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockBioenergyData.bioCngEquivalent} <span className="text-xs font-normal text-ink-500">kg / day</span>
          </div>
          <div className="text-[11px] text-skywater-800 bg-skywater-50 px-2 py-0.5 rounded w-fit font-medium mt-1">
            Replaces ~1,100 L Diesel/day
          </div>
        </Card>

        {/* Electricity Potential */}
        <Card className="p-4 border-t-4 border-t-indigo-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>POWER GENERATION</span>
            <Zap className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockBioenergyData.electricityPotential.toLocaleString()} <span className="text-xs font-normal text-ink-500">kWh / day</span>
          </div>
          <div className="text-[11px] text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded w-fit font-medium mt-1">
            Thermal: {mockBioenergyData.thermalOutput} GJ / day
          </div>
        </Card>
      </div>

      {/* Bioreactor Kinetics & Operating Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kinetic Curve */}
        <Card className="lg:col-span-2 p-5">
          <CardHeader
            title="Anaerobic Digestion Cumulative Yield Kinetics"
            subtitle="25-Day Hydraulic Retention Time (HRT) biomethane accumulation profile"
            badge={<StatusTag type="simulated" />}
          />

          <div className="h-64 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockBiogasKinetics} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="bioGasFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E6A23C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E6A23C" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E3EAE5" />
                <XAxis dataKey="day" stroke="#66736B" fontSize={11} />
                <YAxis stroke="#66736B" fontSize={11} unit=" m³" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: '1px solid #E3EAE5', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="biogas" name="Cumulative Biogas (m³)" stroke="#E6A23C" strokeWidth={2.5} fill="url(#bioGasFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Operating Conditions & Vessel Specifications */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <CardHeader
              title="Bioreactor Specifications"
              subtitle="CSTR Mesophilic Parameters"
            />

            <div className="space-y-3 text-xs mt-2">
              <div className="p-2.5 rounded-lg bg-ink-50/70 border border-ink-100 flex items-center justify-between">
                <span className="text-ink-600 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-amberalert" />
                  Digestion Temp
                </span>
                <span className="font-mono font-bold text-ink-900">{mockBioenergyData.operatingTemp}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-ink-50/70 border border-ink-100 flex items-center justify-between">
                <span className="text-ink-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-skywater-600" />
                  Retention Time
                </span>
                <span className="font-mono font-bold text-ink-900">{mockBioenergyData.retentionTimeDays} Days HRT</span>
              </div>

              <div className="p-2.5 rounded-lg bg-ink-50/70 border border-ink-100 flex items-center justify-between">
                <span className="text-ink-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-ganga-600" />
                  Reactor Volume
                </span>
                <span className="font-mono font-bold text-ink-900">{mockBioenergyData.digesterCapacity}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ink-100 text-[10px] text-ink-400 font-mono">
            ● SIMULATED MESOPHILIC METHANATION MODEL
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
