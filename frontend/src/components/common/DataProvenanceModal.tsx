import React from 'react';
import { X, Database, Globe, AlertCircle, ShieldAlert, Cpu } from 'lucide-react';

interface DataProvenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataProvenanceModal: React.FC<DataProvenanceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-river-100 text-river-800 rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Data Provenance, Quality & Limitations</h3>
              <p className="text-xs text-slate-500">Transparent registry of observational feeds, prototype data, and scientific assumptions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Data Sources Table */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <Globe className="w-4 h-4 text-confluence-700" />
              <span>Configured Data Sources & Feeds</span>
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="p-2.5">Domain</th>
                    <th className="p-2.5">Data Source / Provider</th>
                    <th className="p-2.5">Spatial/Temporal Resolution</th>
                    <th className="p-2.5">Classification State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900 font-sans">Satellite Imagery</td>
                    <td className="p-2.5">Copernicus Sentinel-2 MSI L2A</td>
                    <td className="p-2.5">10m / 5-day revisit</td>
                    <td className="p-2.5 text-sky-700">Prototype / Research Feed</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900 font-sans">River & Ghat GIS</td>
                    <td className="p-2.5">Survey of India / OpenStreetMap River Channel</td>
                    <td className="p-2.5">Vector Polygon / LineString</td>
                    <td className="p-2.5 text-emerald-700">Validated Geodesic</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900 font-sans">Water Quality</td>
                    <td className="p-2.5">CPCB Real-Time Water Quality Network + Field Probes</td>
                    <td className="p-2.5">Hourly Telemetry / Grab Samples</td>
                    <td className="p-2.5 text-emerald-700">Calibrated Telemetry</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900 font-sans">Heavy Metals</td>
                    <td className="p-2.5">Inductively Coupled Plasma Mass Spectrometry (ICP-MS)</td>
                    <td className="p-2.5">Monthly Lab Assays</td>
                    <td className="p-2.5 text-purple-700">Laboratory Assay</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900 font-sans">Economic Baselines</td>
                    <td className="p-2.5">Ministry of Petroleum & Natural Gas SATAT Scheme</td>
                    <td className="p-2.5">Commercial Tariff ₹75/kg</td>
                    <td className="p-2.5 text-slate-700">Policy Benchmark</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Limitations */}
          <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wide mb-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Current Research Limitations</span>
            </div>
            <ul className="text-xs text-amber-800 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>
                <strong>Cloud Penetration:</strong> Optical Sentinel-2 MSI data is subject to cloud masking during monsoon surges (July–September). Future expansion will incorporate Sentinel-1 SAR backscatter fusion.
              </li>
              <li>
                <strong>Mixed Pixels:</strong> Near riverbanks, mixed pixels of emergent grasses (e.g., <em>Phragmites</em>) and hyacinth may reduce classification specificity without field ground-truthing.
              </li>
              <li>
                <strong>Heavy Metal Dilution:</strong> Vermicompost heavy metal safety must strictly meet Fertilizer Control Order (FCO) 1985 guidelines prior to field application.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold shadow-xs"
          >
            Close Provenance Panel
          </button>
        </div>
      </div>
    </div>
  );
};
