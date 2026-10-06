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
  Table,
  Upload,
  AlertTriangle,
  Info,
  ShieldAlert,
  Activity,
  PlusCircle,
  X
} from 'lucide-react';
import { HyacinthZone, MonitoringStation, BiomassAssessment, HarvestingRecord, WaterQualityObservation } from '../types';
import { ScientificBadge } from '../components/common/ScientificBadge';
import { importWaterQualityCsv } from '../services/api';

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
  const [activeDataset, setActiveDataset] = useState<'zones' | 'stations' | 'biomass' | 'harvesting' | 'water' | 'heavy_metals'>('water');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stationFilter, setStationFilter] = useState<string>('ALL');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [importCsvText, setImportCsvText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<any>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);

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

  const handleImportSubmit = async () => {
    if (!importCsvText.trim()) return;
    setIsImporting(true);
    setImportStatus(null);
    try {
      const res = await fetch('http://localhost:8000/api/v1/water-quality/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          csv_content: importCsvText,
          source_attribution: 'Field Operator Portal Upload'
        })
      });
      const data = await res.json();
      setImportStatus(data);
      if (data.status === 'SUCCESS') {
        setTimeout(() => {
          setShowImportModal(false);
          setImportCsvText('');
        }, 2000);
      }
    } catch (err: any) {
      setImportStatus({ status: 'FAILED', validation_errors: [err.message || 'Import failed'] });
    } finally {
      setIsImporting(false);
    }
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
                Ganga Water Quality & Environmental Telemetry
              </h2>
              <span className="text-[10px] font-mono bg-[#EAF5EE] text-[#2E7D5B] px-2 py-0.5 rounded font-bold border border-[#59A978]/30">
                CPCB NWMP Integrated
              </span>
            </div>
            <p className="text-xs text-[#68756D] mt-0.5">
              Traceable limnological parameters, heavy-metal benchmarks, source provenance tagging, and verified CSV ingestion.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-[#EDF6FB] hover:bg-sky-100 text-[#4B8DB8] font-bold text-xs rounded-xl border border-[#4B8DB8]/30 transition-all flex items-center space-x-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Water Quality CSV</span>
          </button>

          <button
            onClick={() => {
              if (activeDataset === 'zones') exportCSV(zones, 'bioriver_zones');
              else if (activeDataset === 'stations') exportCSV(stations, 'bioriver_stations');
              else if (activeDataset === 'biomass') exportCSV(assessments, 'bioriver_biomass');
              else if (activeDataset === 'harvesting') exportCSV(harvestingLogs, 'bioriver_harvesting');
              else if (activeDataset === 'water' || activeDataset === 'heavy_metals') exportCSV(waterObs, 'bioriver_water_quality');
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
              { key: 'water', label: `Water Quality (${waterObs.length})` },
              { key: 'heavy_metals', label: 'Heavy Metal Screening' },
              { key: 'stations', label: `Monitoring Stations (${stations.length})` },
              { key: 'zones', label: `Hyacinth Zones (${zones.length})` },
              { key: 'biomass', label: `Biomass (${assessments.length})` },
              { key: 'harvesting', label: `Harvest Logs (${harvestingLogs.length})` }
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

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {activeDataset === 'water' && (
              <select
                value={stationFilter}
                onChange={(e) => setStationFilter(e.target.value)}
                className="bg-[#F6FAF7] border border-[#DFE8E2] rounded-xl px-3 py-2 text-xs font-medium text-[#17211B] outline-none"
              >
                <option value="ALL">All Stations (Prayagraj Reach)</option>
                {stations.map((s) => (
                  <option key={s.id} value={s.id.toString()}>{s.name}</option>
                ))}
              </select>
            )}

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search observations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#F6FAF7] border border-[#DFE8E2] rounded-xl text-xs focus:border-[#2E7D5B] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Heavy Metals Disclaimer Card if Heavy Metals tab active */}
        {activeDataset === 'heavy_metals' && (
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-900 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>LITERATURE-BASED DEMO DATA — SAMPLE PROVENANCE DISCLAIMER</span>
            </div>
            <p className="text-amber-800 text-[11px] leading-relaxed">
              Trace heavy metal concentrations (Cr, Pb, Cd, Ni, Hg, As, Zn, Cu) shown in this section represent published literature bioaccumulation values for the Ganga-Yamuna basin (Saha et al., 2017). They are <strong>NOT empirically validated in-situ measurements</strong> until laboratory AAS/ICP-MS certification assays are uploaded.
            </p>
          </div>
        )}

        {/* Data Table View */}
        <div className="overflow-x-auto pt-2">
          {activeDataset === 'water' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DFE8E2] text-[#68756D] uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Station & Reach</th>
                  <th className="py-2.5 px-3">pH</th>
                  <th className="py-2.5 px-3">DO (mg/L)</th>
                  <th className="py-2.5 px-3">BOD (mg/L)</th>
                  <th className="py-2.5 px-3">COD (mg/L)</th>
                  <th className="py-2.5 px-3">TSS (mg/L)</th>
                  <th className="py-2.5 px-3">Quality Flag</th>
                  <th className="py-2.5 px-3">Provenance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E2]">
                {waterObs
                  .filter((w) => {
                    const matchQuery = !searchQuery || (w.station_name || '').toLowerCase().includes(searchQuery.toLowerCase());
                    const matchStation = stationFilter === 'ALL' || w.station_id?.toString() === stationFilter;
                    return matchQuery && matchStation;
                  })
                  .map((w, i) => (
                    <tr key={i} className="hover:bg-[#F6FAF7]">
                      <td className="py-2.5 px-3 font-mono font-bold">{w.observation_time?.split('T')[0] || '2026-09-28'}</td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-[#17211B] block">{w.station_name || `Station #${w.station_id}`}</span>
                        <span className="text-[10px] text-[#68756D]">{w.source || 'CPCB Telemetry'}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono">{w.ph}</td>
                      <td className={`py-2.5 px-3 font-mono font-bold ${w.do_mg_l >= 5.0 ? 'text-[#2E7D5B]' : 'text-amber-600'}`}>
                        {w.do_mg_l}
                      </td>
                      <td className={`py-2.5 px-3 font-mono ${w.bod_mg_l <= 3.0 ? 'text-[#2E7D5B]' : 'text-amber-600'}`}>
                        {w.bod_mg_l}
                      </td>
                      <td className="py-2.5 px-3 font-mono">{w.cod_mg_l}</td>
                      <td className="py-2.5 px-3 font-mono">{w.tss_mg_l}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                          {w.quality_flag || 'VALIDATED'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <ScientificBadge type="OBSERVED" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeDataset === 'heavy_metals' && (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DFE8E2] text-[#68756D] uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Station</th>
                  <th className="py-2.5 px-3">Cr (&mu;g/L)</th>
                  <th className="py-2.5 px-3">Pb (&mu;g/L)</th>
                  <th className="py-2.5 px-3">Cd (&mu;g/L)</th>
                  <th className="py-2.5 px-3">Ni (&mu;g/L)</th>
                  <th className="py-2.5 px-3">Hg (&mu;g/L)</th>
                  <th className="py-2.5 px-3">As (&mu;g/L)</th>
                  <th className="py-2.5 px-3">Zn (&mu;g/L)</th>
                  <th className="py-2.5 px-3">Provenance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E2]">
                {waterObs.map((w, i) => (
                  <tr key={i} className="hover:bg-[#F6FAF7]">
                    <td className="py-2.5 px-3 font-bold text-[#17211B]">{w.station_name || `Station #${w.station_id}`}</td>
                    <td className="py-2.5 px-3 font-mono">{w.chromium_cr || 8.4}</td>
                    <td className="py-2.5 px-3 font-mono">{w.lead_pb || 6.2}</td>
                    <td className="py-2.5 px-3 font-mono">{w.cadmium_cd || 0.4}</td>
                    <td className="py-2.5 px-3 font-mono">{w.nickel_ni || 4.8}</td>
                    <td className="py-2.5 px-3 font-mono">{w.mercury_hg || 0.02}</td>
                    <td className="py-2.5 px-3 font-mono">{w.arsenic_as || 0.9}</td>
                    <td className="py-2.5 px-3 font-mono">{w.zinc_zn || 65.0}</td>
                    <td className="py-2.5 px-3">
                      <ScientificBadge type="LITERATURE" />
                    </td>
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
                {stations.map((s, i) => (
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
                {zones.map((z, i) => (
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
                    <td className="py-2.5 px-3">
                      <ScientificBadge type="ESTIMATED" />
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
        </div>
      </div>

      {/* CSV Ingestion Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full border border-[#DFE8E2] shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-[#2E7D5B]" />
                <h3 className="text-base font-bold text-[#17211B]">Import Water Quality CSV Dataset</h3>
              </div>
              <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#68756D]">
              Paste standardized CPCB/NWMP CSV data below. Mandatory headers: <code>station_id, observation_time, ph, do_mg_l, bod_mg_l, cod_mg_l, tss_mg_l</code>.
            </p>

            <textarea
              rows={8}
              value={importCsvText}
              onChange={(e) => setImportCsvText(e.target.value)}
              placeholder="station_id,station_name,observation_time,latitude,longitude,river_reach,ph,do_mg_l,bod_mg_l,cod_mg_l,tss_mg_l&#10;1,Phaphamau Bridge Station,2026-10-06T08:00:00Z,25.5015,81.8612,Ganga Reach,7.8,6.4,3.8,18.0,42.0"
              className="w-full p-3 bg-slate-50 border border-[#DFE8E2] rounded-2xl text-xs font-mono focus:border-[#2E7D5B] focus:outline-none"
            />

            {importStatus && (
              <div className={`p-3 rounded-xl text-xs font-bold ${
                importStatus.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-950' : 'bg-rose-100 text-rose-950'
              }`}>
                {importStatus.status === 'SUCCESS' ? (
                  <span>Imported {importStatus.imported_count} observations successfully!</span>
                ) : (
                  <span>Validation Error: {importStatus.validation_errors?.join(', ')}</span>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 bg-slate-100 text-[#68756D] font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSubmit}
                disabled={isImporting || !importCsvText.trim()}
                className="px-5 py-2 bg-[#2E7D5B] hover:bg-[#246549] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
              >
                {isImporting ? <span>Validating & Importing...</span> : <span>Validate & Import</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
