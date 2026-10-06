import React, { useState } from 'react';
import {
  Database,
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  CheckCircle2,
  Table
} from 'lucide-react';
import { HyacinthZone, MonitoringStation, BiomassAssessment, HarvestingRecord, WaterQualityObservation } from '../types';

interface DataExplorerViewProps {
  zones: HyacinthZone[];
  stations: MonitoringStation[];
  assessments: BiomassAssessment[];
  harvestingLogs: HarvestingRecord[];
  waterObs: WaterQualityObservation[];
}

export const DataExplorerView: React.FC<DataExplorerViewProps> = ({
  zones,
  stations,
  assessments,
  harvestingLogs,
  waterObs
}) => {
  const [activeDataset, setActiveDataset] = useState<'zones' | 'stations' | 'biomass' | 'harvesting' | 'water'>('zones');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const exportCSV = (data: any[], filename: string) => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]).filter((k) => typeof data[0][k] !== 'object').join(',');
    const rows = data.map((obj) =>
      Object.keys(obj)
        .filter((k) => typeof obj[k] !== 'object')
        .map((k) => `"${obj[k]}"`)
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const exportGeoJSON = (zonesList: HyacinthZone[]) => {
    const featureCollection = {
      type: 'FeatureCollection',
      features: zonesList.map((z) => ({
        type: 'Feature',
        properties: {
          zone_code: z.zone_code,
          name: z.name,
          density_class: z.density_class,
          area_ha: z.area_ha,
          coverage_pct: z.coverage_pct,
          confidence: z.classification_confidence
        },
        geometry: z.geometry_geojson
      }))
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(featureCollection, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'bioriver_hyacinth_zones.geojson');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.removeChild(downloadAnchor);

    setDownloadSuccess('bioriver_hyacinth_zones.geojson');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#EAF5EE] text-[#2E7D5B] rounded-2xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-[#17211B]">
                Scientific Data Explorer & Query Workbench
              </h2>
              <span className="text-[10px] font-mono bg-[#EAF5EE] text-[#2E7D5B] px-2 py-0.5 rounded font-bold border border-[#59A978]/30">
                PostGIS Schema Export
              </span>
            </div>
            <p className="text-xs text-[#68756D] mt-0.5">
              Inspect tabular scientific records, apply multi-parameter filters, and export high-fidelity CSV and GeoJSON.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {activeDataset === 'zones' && (
            <button
              onClick={() => exportGeoJSON(zones)}
              className="px-4 py-2 bg-[#EDF6FB] hover:bg-sky-100 text-[#4B8DB8] font-bold text-xs rounded-xl border border-[#4B8DB8]/30 transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export GeoJSON</span>
            </button>
          )}

          <button
            onClick={() => {
              if (activeDataset === 'zones') exportCSV(zones, 'bioriver_zones');
              else if (activeDataset === 'stations') exportCSV(stations, 'bioriver_stations');
              else if (activeDataset === 'biomass') exportCSV(assessments, 'bioriver_biomass');
              else if (activeDataset === 'harvesting') exportCSV(harvestingLogs, 'bioriver_harvesting');
              else if (activeDataset === 'water') exportCSV(waterObs, 'bioriver_water_quality');
            }}
            className="px-4 py-2 bg-[#2E7D5B] hover:bg-[#246549] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 bg-emerald-100 text-emerald-950 rounded-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Successfully exported {downloadSuccess}!</span>
        </div>
      )}

      {/* Dataset Switcher Tabs & Search Filter */}
      <div className="bg-white p-5 rounded-3xl border border-[#DFE8E2] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-2xl">
            {[
              { key: 'zones', label: `Hyacinth Zones (${zones.length})` },
              { key: 'stations', label: `Stations (${stations.length})` },
              { key: 'biomass', label: `Biomass (${assessments.length})` },
              { key: 'harvesting', label: `Harvest Logs (${harvestingLogs.length})` },
              { key: 'water', label: `Water Quality (${waterObs.length})` }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveDataset(tab.key as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeDataset === tab.key
                    ? 'bg-white text-[#2E7D5B] shadow-xs'
                    : 'text-[#68756D] hover:text-[#17211B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F6FAF7] border border-[#DFE8E2] rounded-xl text-xs focus:border-[#2E7D5B] focus:outline-none"
            />
          </div>
        </div>

        {/* Data Table View */}
        <div className="overflow-x-auto pt-2">
          {activeDataset === 'zones' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DFE8E2] text-[#68756D] uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Zone Code</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Density Class</th>
                  <th className="py-2.5 px-3">Area (ha)</th>
                  <th className="py-2.5 px-3">Coverage</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3">Provenance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E2]">
                {zones
                  .filter((z) => !searchQuery || z.zone_code.toLowerCase().includes(searchQuery.toLowerCase()) || z.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((z, i) => (
                    <tr key={i} className="hover:bg-[#F6FAF7]">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#17211B]">{z.zone_code}</td>
                      <td className="py-2.5 px-3">{z.name}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#2E7D5B] font-bold text-[10px]">
                          {z.density_class}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold">{z.area_ha.toFixed(2)}</td>
                      <td className="py-2.5 px-3 font-mono">{z.coverage_pct}%</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#2E7D5B]">{(z.classification_confidence * 100).toFixed(0)}%</td>
                      <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500">OBSERVED</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeDataset === 'stations' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DFE8E2] text-[#68756D] uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Station Name</th>
                  <th className="py-2.5 px-3">Latitude</th>
                  <th className="py-2.5 px-3">Longitude</th>
                  <th className="py-2.5 px-3">River Reach</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E2]">
                {stations
                  .filter((s) => !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.station_code.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((s, i) => (
                    <tr key={i} className="hover:bg-[#F6FAF7]">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#2E7D5B]">{s.station_code}</td>
                      <td className="py-2.5 px-3 font-bold">{s.name}</td>
                      <td className="py-2.5 px-3 font-mono">{s.latitude.toFixed(4)}°N</td>
                      <td className="py-2.5 px-3 font-mono">{s.longitude.toFixed(4)}°E</td>
                      <td className="py-2.5 px-3">{s.river || 'Ganga River'}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeDataset === 'biomass' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DFE8E2] text-[#68756D] uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Assessment Code</th>
                  <th className="py-2.5 px-3">Area (ha)</th>
                  <th className="py-2.5 px-3">Fresh Biomass (t)</th>
                  <th className="py-2.5 px-3">Total Solids (t)</th>
                  <th className="py-2.5 px-3">Volatile Solids (t)</th>
                  <th className="py-2.5 px-3">Recoverable (t)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E2]">
                {assessments.map((a, i) => (
                  <tr key={i} className="hover:bg-[#F6FAF7]">
                    <td className="py-2.5 px-3 font-bold">{a.assessment_code}</td>
                    <td className="py-2.5 px-3 font-mono">{a.area_ha.toFixed(2)}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#2E7D5B]">{a.fresh_biomass_total_t.toFixed(1)}</td>
                    <td className="py-2.5 px-3 font-mono">{a.total_solids_t.toFixed(1)}</td>
                    <td className="py-2.5 px-3 font-mono">{a.volatile_solids_t.toFixed(1)}</td>
                    <td className="py-2.5 px-3 font-mono font-bold">{a.recoverable_biomass_t.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeDataset === 'harvesting' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DFE8E2] text-[#68756D] uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Zone ID</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Biomass Collected (t)</th>
                  <th className="py-2.5 px-3">Efficiency</th>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E2]">
                {harvestingLogs.map((h, i) => (
                  <tr key={i} className="hover:bg-[#F6FAF7]">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#17211B]">Zone #{h.zone_id}</td>
                    <td className="py-2.5 px-3 font-mono">{h.harvest_date}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#2E7D5B]">{h.biomass_collected_t.toFixed(1)}</td>
                    <td className="py-2.5 px-3 font-mono font-bold">{h.removal_efficiency_pct}%</td>
                    <td className="py-2.5 px-3">{h.harvesting_method}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {h.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeDataset === 'water' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DFE8E2] text-[#68756D] uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Station</th>
                  <th className="py-2.5 px-3">pH</th>
                  <th className="py-2.5 px-3">DO (mg/L)</th>
                  <th className="py-2.5 px-3">BOD (mg/L)</th>
                  <th className="py-2.5 px-3">COD (mg/L)</th>
                  <th className="py-2.5 px-3">TSS (mg/L)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E2]">
                {waterObs.map((w, i) => (
                  <tr key={i} className="hover:bg-[#F6FAF7]">
                    <td className="py-2.5 px-3 font-mono font-bold">{w.observation_time?.split('T')[0] || '2026-10-01'}</td>
                    <td className="py-2.5 px-3">{w.station_name || `Station #${w.station_id}`}</td>
                    <td className="py-2.5 px-3 font-mono">{w.ph}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#4B8DB8]">{w.do_mg_l}</td>
                    <td className="py-2.5 px-3 font-mono">{w.bod_mg_l}</td>
                    <td className="py-2.5 px-3 font-mono">{w.cod_mg_l}</td>
                    <td className="py-2.5 px-3 font-mono">{w.tss_mg_l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
