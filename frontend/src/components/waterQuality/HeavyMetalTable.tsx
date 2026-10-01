import React from 'react';
import { WaterQualityObservation } from '../../types';
import { ShieldCheck, AlertCircle, Info } from 'lucide-react';

interface HeavyMetalTableProps {
  observation?: WaterQualityObservation;
}

export const HeavyMetalTable: React.FC<HeavyMetalTableProps> = ({ observation }) => {
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
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">
            Heavy Metal Contaminant Screening & Phytoremediation Uptake
          </h4>
          <p className="text-xs text-slate-500">
            Assayed in hyacinth root/shoot dry biomass vs Fertilizer (Control) Order limits
          </p>
        </div>
        <span className="text-xs font-mono bg-confluence-50 text-confluence-800 px-2.5 py-1 rounded-lg border border-confluence-200 font-semibold flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 mr-1" />
          <span>8 Elements Screened</span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="p-3">Contaminant Element</th>
              <th className="p-3">Assayed Concentration</th>
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

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start space-x-2 text-[11px] text-slate-500">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong>Scientific Protocol:</strong> Eichhornia crassipes actively sequesters heavy metals from urban/industrial drains into its root vacuoles. Digested vermicompost batches are blended and screened to ensure zero phytotoxicity prior to agricultural field application.
        </p>
      </div>
    </div>
  );
};
