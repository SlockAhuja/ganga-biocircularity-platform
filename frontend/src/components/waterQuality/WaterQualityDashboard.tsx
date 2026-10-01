import React, { useState } from 'react';
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
import { WaterQualityObservation, MonitoringStation } from '../../types';
import { MetricCard } from '../common/MetricCard';
import { HeavyMetalTable } from './HeavyMetalTable';
import { Droplets, Activity, Thermometer, ShieldAlert, Waves, CheckCircle } from 'lucide-react';

interface WaterQualityDashboardProps {
  observations: WaterQualityObservation[];
  stations: MonitoringStation[];
}

export const WaterQualityDashboard: React.FC<WaterQualityDashboardProps> = ({
  observations,
  stations
}) => {
  const [selectedStationId, setSelectedStationId] = useState<number>(1);

  const activeObservation =
    observations.find((o) => o.station_id === selectedStationId) || observations[0];

  // Time-series mock data for historical water quality trend
  const trendData = [
    { time: '06:00', do: 6.8, bod: 3.2, ph: 7.6, temp: 23.8 },
    { time: '08:00', do: 6.4, bod: 3.8, ph: 7.8, temp: 24.5 },
    { time: '10:00', do: 5.9, bod: 4.4, ph: 7.9, temp: 25.4 },
    { time: '12:00', do: 5.2, bod: 5.1, ph: 8.1, temp: 26.8 },
    { time: '14:00', do: 4.9, bod: 5.8, ph: 8.0, temp: 27.2 },
    { time: '16:00', do: 5.5, bod: 4.9, ph: 7.8, temp: 26.5 },
    { time: '18:00', do: 6.1, bod: 4.2, ph: 7.7, temp: 25.1 }
  ];

  return (
    <div className="space-y-6">
      {/* Top Station Selector Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-slate-900 text-base">Ganga & Yamuna Hydrological Water Quality</h3>
            <span className="text-[10px] font-mono bg-river-100 text-river-800 px-2 py-0.5 rounded font-semibold">
              CPCB Real-Time Standards
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous physicochemical telemetry & heavy metal bio-accumulation parameters
          </p>
        </div>

        {/* Station Selector Dropdown/Pills */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Monitoring Reach:</span>
          <select
            value={selectedStationId}
            onChange={(e) => setSelectedStationId(Number(e.target.value))}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-confluence-500"
          >
            {stations.map((stn) => (
              <option key={stn.id} value={stn.id}>
                {stn.name} ({stn.station_code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Physicochemical 5 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <MetricCard
          title="pH Level"
          value={activeObservation?.ph ?? 7.8}
          unit="pH"
          icon={<Droplets className="w-5 h-5 text-confluence-700" />}
          subtitle="Ref: 6.5 - 8.5"
          provenance="OBSERVED"
        />

        <MetricCard
          title="Dissolved Oxygen (DO)"
          value={activeObservation?.do_mg_l ?? 6.4}
          unit="mg/L"
          icon={<Waves className="w-5 h-5 text-river-600" />}
          subtitle="Desirable: >5.0 mg/L"
          provenance="OBSERVED"
        />

        <MetricCard
          title="BOD (5-Day)"
          value={activeObservation?.bod_mg_l ?? 3.8}
          unit="mg/L"
          icon={<Activity className="w-5 h-5 text-amber-600" />}
          subtitle="Standard: <3.0 mg/L"
          provenance="OBSERVED"
        />

        <MetricCard
          title="COD"
          value={activeObservation?.cod_mg_l ?? 18.2}
          unit="mg/L"
          icon={<ShieldAlert className="w-5 h-5 text-purple-600" />}
          subtitle="Standard: <10.0 mg/L"
          provenance="OBSERVED"
        />

        <MetricCard
          title="Water Temperature"
          value={activeObservation?.temperature_c ?? 24.5}
          unit="°C"
          icon={<Thermometer className="w-5 h-5 text-rose-500" />}
          subtitle="Ambient River Thermal"
          provenance="OBSERVED"
        />
      </div>

      {/* Time-Series Trend Line Chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Diurnal DO & BOD Fluctuation Profile</h4>
            <p className="text-xs text-slate-500">Dissolved Oxygen (mg/L) vs Biochemical Oxygen Demand under hyacinth mats</p>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">
            Last 12 Hours
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
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
              <Line type="monotone" dataKey="do" name="Dissolved Oxygen (DO mg/L)" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="bod" name="Biochemical Oxygen Demand (BOD mg/L)" stroke="#ea580c" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="ph" name="pH Level" stroke="#0f766e" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heavy Metals Contaminant Table Component */}
      <HeavyMetalTable observation={activeObservation} />
    </div>
  );
};
