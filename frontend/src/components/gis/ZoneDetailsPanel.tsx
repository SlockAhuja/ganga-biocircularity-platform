import React from 'react';
import { HyacinthZone, BiomassAssessment } from '../../types';
import { ScientificBadge } from '../common/ScientificBadge';
import { Leaf, Zap, BarChart2, ShieldCheck, MapPin, X, ArrowRight } from 'lucide-react';

interface ZoneDetailsPanelProps {
  zone: HyacinthZone | null;
  biomass: BiomassAssessment | null;
  onClose: () => void;
  onSendToSimulator: (freshBiomassT: number) => void;
  onNavigateToBiomass: () => void;
}

export const ZoneDetailsPanel: React.FC<ZoneDetailsPanelProps> = ({
  zone,
  biomass,
  onClose,
  onSendToSimulator,
  onNavigateToBiomass
}) => {
  if (!zone) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col items-center justify-center text-center text-slate-400 min-h-[400px]">
        <MapPin className="w-10 h-10 mb-2 text-slate-300 stroke-1" />
        <h4 className="font-bold text-slate-700 text-sm">No Zone Selected</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
          Click any hyacinth polygon on the GIS map to inspect spatial biomass and recovery metrics.
        </p>
      </div>
    );
  }

  const freshBiomass = biomass ? biomass.fresh_biomass_total_t : (zone.area_ha * 32.0);
  const drySolids = biomass ? biomass.total_solids_t : (freshBiomass * 0.09);
  const volatileSolids = biomass ? biomass.volatile_solids_t : (drySolids * 0.80);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-confluence-700 bg-confluence-50 px-2 py-0.5 rounded border border-confluence-200">
                {zone.zone_code}
              </span>
              <ScientificBadge type="ESTIMATED" label={`${(zone.classification_confidence * 100).toFixed(0)}% Conf.`} />
            </div>
            <h3 className="font-bold text-slate-900 text-base mt-1.5">{zone.name}</h3>
            <p className="text-xs text-slate-500">Prayagraj Confluence Reach</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-500 block uppercase font-sans">Surface Area</span>
            <span className="text-base font-bold text-slate-900">{zone.area_ha.toFixed(2)}</span>
            <span className="text-slate-500 text-[11px] ml-1">ha</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-500 block uppercase font-sans">Hyacinth Coverage</span>
            <span className="text-base font-bold text-slate-900">{zone.coverage_pct.toFixed(1)}</span>
            <span className="text-slate-500 text-[11px] ml-1">%</span>
          </div>

          <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
            <span className="text-[10px] text-emerald-800 block uppercase font-sans font-bold">Fresh Biomass</span>
            <span className="text-base font-bold text-emerald-950">{freshBiomass.toFixed(1)}</span>
            <span className="text-emerald-700 text-[11px] ml-1">t</span>
          </div>

          <div className="bg-sky-50/60 p-2.5 rounded-xl border border-sky-100">
            <span className="text-[10px] text-sky-800 block uppercase font-sans font-bold">Dry Solids (TS)</span>
            <span className="text-base font-bold text-sky-950">{drySolids.toFixed(2)}</span>
            <span className="text-sky-700 text-[11px] ml-1">t</span>
          </div>
        </div>

        {/* Remote Sensing Details */}
        <div className="mt-4 p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Density Classification:</span>
            <span className="font-bold text-slate-900">{zone.density_class}</span>
          </div>
          <div className="flex justify-between items-center font-mono text-[11px]">
            <span className="text-slate-500">Spectral Mean NDVI:</span>
            <span className="text-emerald-700 font-semibold">{zone.spectral_indices?.ndvi_mean ?? 0.72}</span>
          </div>
          <div className="flex justify-between items-center font-mono text-[11px]">
            <span className="text-slate-500">Spectral Mean MNDWI:</span>
            <span className="text-river-700 font-semibold">{zone.spectral_indices?.mndwi_mean ?? -0.44}</span>
          </div>
          <div className="flex justify-between items-center font-mono text-[11px]">
            <span className="text-slate-500">Satellite Source:</span>
            <span className="text-slate-700 truncate max-w-[140px]">{zone.data_source}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => onSendToSimulator(freshBiomass)}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 bg-confluence-700 hover:bg-confluence-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Simulate Bio-CNG & Recovery</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </button>

        <button
          onClick={onNavigateToBiomass}
          className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>View Detailed Biomass Profile</span>
        </button>
      </div>
    </div>
  );
};
