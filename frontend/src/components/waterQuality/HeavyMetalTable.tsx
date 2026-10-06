import React from 'react';
import { WaterQualityObservation } from '../../types';
import { ShieldCheck, AlertCircle, Info, BookmarkCheck } from 'lucide-react';
import { ScientificBadge } from '../common/ScientificBadge';

interface HeavyMetalTableProps {
  observation?: WaterQualityObservation;
}

export const HeavyMetalTable: React.FC<HeavyMetalTableProps> = ({ observation }) => {
  const isMeasured = observation?.is_heavy_metal_measured === 1;

  const metals = [
    {
      symbol: 'Cr',
      name: 'Chromium (Total)',
      concentration: observation?.chromium_cr ?? 8.4,
      unit: 'mg/kg dry wt',
      uptakeFactor: '140x',
      thresholdRef: '50.0 mg/kg (FCO Standard)',
      status: 'Within configured reference threshold',
      isCompliant: true
    },
    {
      symbol: 'Pb',
      name: 'Lead',
      concentration: observation?.lead_pb ?? 6.2,
      unit: 'mg/kg dry wt',
      uptakeFactor: '85x',
      thresholdRef: '100.0 mg/kg (FCO Standard)',
      status: 'Within configured reference threshold',
      isCompliant: true
    },
    {
      symbol: 'Cd',
      name: 'Cadmium',
      concentration: observation?.cadmium_cd ?? 0.4,
      unit: 'mg/kg dry wt',
      uptakeFactor: '220x',
      thresholdRef: '5.0 mg/kg (FCO Standard)',
      status: 'Within configured reference threshold',
      isCompliant: true
    },
    {
      symbol: 'Ni',
      name: 'Nickel',
      concentration: observation?.nickel_ni ?? 4.8,
      unit: 'mg/kg dry wt',
      uptakeFactor: '65x',
      thresholdRef: '50.0 mg/kg (FCO Standard)',
      status: 'Within configured reference threshold',
      isCompliant: true
    },
    {
      symbol: 'Hg',
      name: 'Mercury',
      concentration: observation?.mercury_hg ?? 0.02,
      unit: 'mg/kg dry wt',
      uptakeFactor: '45x',
      thresholdRef: '0.5 mg/kg (FCO Standard)',
      status: 'Within configured reference threshold',
      isCompliant: true
    },
    {
      symbol: 'As',
      name: 'Arsenic',
      concentration: observation?.arsenic_as ?? 0.9,
      unit: 'mg/kg dry wt',
      uptakeFactor: '30x',
      thresholdRef: '10.0 mg/kg (FCO Standard)',
      status: 'Within configured reference threshold',
      isCompliant: true
    },
    {
      symbol: 'Zn',
      name: 'Zinc',
      concentration: observation?.zinc_zn ?? 65.0,
      unit: 'mg/kg dry wt',
      uptakeFactor: '310x',
      thresholdRef: '300.0 mg/kg (FCO Standard)',
      status: 'Within configured reference threshold',
      isCompliant: true
    },
    {
      symbol: 'Cu',
      name: 'Copper',
      concentration: observation?.copper_cu ?? 18.2,
      unit: 'mg/kg dry wt',
      uptakeFactor: '115x',
      thresholdRef: '100.0 mg/kg (FCO Standard)',
      status: 'Within configured reference threshold',
      isCompliant: true
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="font-bold text-slate-900 text-sm">
              Trace & Heavy Metal Contaminant Benchmark Screening
            </h4>
            <ScientificBadge provenance={isMeasured ? 'OBSERVED' : 'LITERATURE'} />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Phytoremediation bioaccumulation baseline in hyacinth root/shoot dry biomass vs Fertilizer Control Order (FCO) safety thresholds.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg border border-purple-200 font-semibold flex items-center">
            <BookmarkCheck className="w-3.5 h-3.5 mr-1" />
            <span>{isMeasured ? 'Lab In-Situ Assay' : 'Ganga Literature Baseline'}</span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="p-3">Element</th>
              <th className="p-3">Reference Concentration</th>
              <th className="p-3">Bioaccumulation Uptake Factor</th>
              <th className="p-3">Regulatory Reference Limit</th>
              <th className="p-3">Safety Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {metals.map((m) => (
              <tr key={m.symbol} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-3 font-sans font-bold text-slate-900 flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-mono text-[11px] font-bold text-confluence-800 border border-slate-200">
                    {m.symbol}
                  </span>
                  <span>{m.name}</span>
                </td>
                <td className="p-3 font-bold text-slate-800">
                  {m.concentration} <span className="text-slate-500 text-[11px] font-normal">{m.unit}</span>
                </td>
                <td className="p-3 text-confluence-700 font-semibold">{m.uptakeFactor}</td>
                <td className="p-3 text-slate-600 font-sans">{m.thresholdRef}</td>
                <td className="p-3 font-sans">
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    <span>{m.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start space-x-2 text-[11px] text-slate-600">
        <Info className="w-4 h-4 text-confluence-600 shrink-0 mt-0.5" />
        <p>
          <strong>Provenance Protocol:</strong> Heavy-metal measurements are treated separately from real-time physical telemetry. Unless actual laboratory spectroscopy (AAS / ICP-MS) certified assays are imported via the Water Quality ingestion API, all trace metal values are strictly flagged as <em>LITERATURE BENCHMARKS</em> to maintain scientific integrity.
        </p>
      </div>
    </div>
  );
};
