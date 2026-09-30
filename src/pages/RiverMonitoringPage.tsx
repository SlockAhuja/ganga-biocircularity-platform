import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { StatusTag } from '../components/ui/StatusTag';
import { 
  mockWaterQualityStations
} from '../data/mockData';
import type { WaterQualityStation } from '../data/mockData';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from 'recharts';
import { 
  Droplet, 
  Activity, 
  FlaskConical, 
  Waves, 
  MapPin,
  Filter
} from 'lucide-react';

const mockTrendHistory = [
  { time: '06:00', do: 4.2, bod: 7.8, ph: 7.3, cod: 32 },
  { time: '08:00', do: 4.6, bod: 7.4, ph: 7.4, cod: 30 },
  { time: '10:00', do: 5.1, bod: 6.9, ph: 7.5, cod: 28 },
  { time: '12:00', do: 5.8, bod: 6.1, ph: 7.7, cod: 25 },
  { time: '14:00', do: 6.2, bod: 5.8, ph: 7.8, cod: 24 },
  { time: '16:00', do: 5.9, bod: 6.0, ph: 7.6, cod: 26 },
  { time: '18:00', do: 5.2, bod: 6.5, ph: 7.5, cod: 29 },
];

export const RiverMonitoringPage: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<WaterQualityStation>(mockWaterQualityStations[2]); // Triveni Sangam

  return (
    <PageContainer
      title="Ganga & Yamuna River Hydro-Quality Monitoring"
      subtitle="In-situ multi-sensor telemetry and remote sensing spectral optical depth analysis across Prayagraj river stretches."
      badge={<StatusTag type="simulated" customText="Multi-Sensor Hydro-Telemetry" />}
    >
      {/* Station Selector Bar */}
      <div className="bg-white border border-ink-100 rounded-xl p-3 shadow-subtle flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-ganga-600" />
          <span className="text-xs font-bold text-ink-800">Active Sensor Buoy:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {mockWaterQualityStations.map((station) => (
            <button
              key={station.id}
              onClick={() => setSelectedStation(station)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                selectedStation.id === station.id
                  ? 'bg-ganga-500 text-white shadow-xs font-semibold'
                  : 'bg-ink-50 text-ink-700 hover:bg-ink-100'
              }`}
            >
              <span>{station.name}</span>
              <span className={`w-2 h-2 rounded-full ${
                station.status === 'Good' ? 'bg-emerald-300' :
                station.status === 'Moderate' ? 'bg-amber-300' :
                station.status === 'Poor' ? 'bg-orange-300' : 'bg-rose-300'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Selected Station Core Water Quality Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* pH Card */}
        <Card className="p-4 border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>HYDROGEN ION (pH)</span>
            <FlaskConical className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {selectedStation.ph}
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit font-medium">
            Standard: 6.5 – 8.5 (Normal)
          </div>
        </Card>

        {/* DO Card */}
        <Card className="p-4 border-t-4 border-t-skywater-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>DISSOLVED OXYGEN (DO)</span>
            <Droplet className="w-4 h-4 text-skywater-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {selectedStation.do} <span className="text-xs font-normal text-ink-500">mg/L</span>
          </div>
          <div className="mt-2 text-[11px] text-skywater-800 bg-skywater-50 px-2 py-0.5 rounded w-fit font-medium">
            CPCB Target: &gt; 5.0 mg/L
          </div>
        </Card>

        {/* BOD Card */}
        <Card className="p-4 border-t-4 border-t-amberalert">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>BIOCHEM OXYGEN (BOD)</span>
            <Activity className="w-4 h-4 text-amberalert" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {selectedStation.bod} <span className="text-xs font-normal text-ink-500">mg/L</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded w-fit font-medium">
            CPCB Limit: &lt; 3.0 mg/L
          </div>
        </Card>

        {/* COD Card */}
        <Card className="p-4 border-t-4 border-t-indigo-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>CHEM OXYGEN (COD)</span>
            <Waves className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {selectedStation.cod} <span className="text-xs font-normal text-ink-500">mg/L</span>
          </div>
          <div className="mt-2 text-[11px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded w-fit font-medium">
            Organic load indicator
          </div>
        </Card>

        {/* TSS Card */}
        <Card className="p-4 border-t-4 border-t-rose-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>SUSPENDED SOLIDS (TSS)</span>
            <Filter className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {selectedStation.tss} <span className="text-xs font-normal text-ink-500">mg/L</span>
          </div>
          <div className="mt-2 text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded w-fit font-medium">
            Turbidity Optical Index
          </div>
        </Card>
      </div>

      {/* Real-time Water Quality Trends Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <CardHeader
            title={`Diurnal Quality Variation: ${selectedStation.name}`}
            subtitle="Continuous 12-Hour Telemetric Sensor Stream (Simulated)"
            badge={<StatusTag type="simulated" />}
          />

          <div className="h-64 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E3EAE5" />
                <XAxis dataKey="time" stroke="#66736B" fontSize={11} />
                <YAxis stroke="#66736B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    border: '1px solid #E3EAE5',
                    fontSize: '11px'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="do" name="Dissolved Oxygen (mg/L)" stroke="#4A90C2" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="bod" name="Biochem Demand (mg/L)" stroke="#E6A23C" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="ph" name="pH Value" stroke="#2E7D5B" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Station Health Summary & Water Quality Index */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <CardHeader
              title="Station Water Quality Index"
              subtitle={`CPCB Index: ${selectedStation.stationCode}`}
            />

            <div className="text-center py-4 bg-ink-50/60 rounded-xl border border-ink-100 mb-4">
              <div className="text-4xl font-extrabold text-ganga-800 font-mono">
                {selectedStation.wqi}
                <span className="text-sm font-normal text-ink-400"> / 100</span>
              </div>
              <div className="text-xs font-semibold text-ink-700 mt-1">
                Class: {selectedStation.status} Status
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-ink-50">
                <span className="text-ink-500">Nitrates (NO₃)</span>
                <span className="font-mono font-semibold">{selectedStation.nitrates} mg/L</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-ink-50">
                <span className="text-ink-500">Phosphates (PO₄)</span>
                <span className="font-mono font-semibold">{selectedStation.phosphates} mg/L</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-ink-50">
                <span className="text-ink-500">Water Temperature</span>
                <span className="font-mono font-semibold">{selectedStation.temperature} °C</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-500">Coordinates</span>
                <span className="font-mono text-[10px] text-ink-600">{selectedStation.coordinates[0]}° N, {selectedStation.coordinates[1]}° E</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ink-100 text-[10px] text-ink-400 font-mono">
            ● IN-SITU BUOY MOCK DATA (CALIBRATION PASS 2026-05)
          </div>
        </Card>
      </div>

      {/* All Stations Comparison Table */}
      <Card className="p-5">
        <CardHeader
          title="Prayagraj Stretch Comprehensive Station Matrix"
          subtitle="Cross-sectional comparative chemical and physical metrics"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ink-100 text-ink-500 font-mono text-[11px] bg-ink-50/50">
                <th className="p-3">Station Name</th>
                <th className="p-3">Code</th>
                <th className="p-3">pH</th>
                <th className="p-3">DO (mg/L)</th>
                <th className="p-3">BOD (mg/L)</th>
                <th className="p-3">COD (mg/L)</th>
                <th className="p-3">TSS (mg/L)</th>
                <th className="p-3">WQI Score</th>
                <th className="p-3">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {mockWaterQualityStations.map((st) => (
                <tr 
                  key={st.id} 
                  className={`hover:bg-ganga-50/40 transition-colors cursor-pointer ${
                    selectedStation.id === st.id ? 'bg-ganga-50/60 font-medium' : ''
                  }`}
                  onClick={() => setSelectedStation(st)}
                >
                  <td className="p-3 font-semibold text-ink-900">{st.name}</td>
                  <td className="p-3 font-mono text-ink-500">{st.stationCode}</td>
                  <td className="p-3 font-mono">{st.ph}</td>
                  <td className="p-3 font-mono font-semibold text-skywater-700">{st.do}</td>
                  <td className="p-3 font-mono text-amberalert">{st.bod}</td>
                  <td className="p-3 font-mono">{st.cod}</td>
                  <td className="p-3 font-mono">{st.tss}</td>
                  <td className="p-3 font-mono font-bold text-ganga-800">{st.wqi}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      st.status === 'Good' ? 'bg-emerald-100 text-emerald-800' :
                      st.status === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                      st.status === 'Poor' ? 'bg-orange-100 text-orange-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
};
