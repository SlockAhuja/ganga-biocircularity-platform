import React from 'react';
import { Ruler, Square, Trash2, CheckCircle2 } from 'lucide-react';

interface MeasurementToolProps {
  mode: 'none' | 'polygon' | 'distance';
  onSetMode: (mode: 'none' | 'polygon' | 'distance') => void;
  pointsCount: number;
  calculatedAreaHa: number | null;
  calculatedDistanceM: number | null;
  estimatedBiomassT: number | null;
  onClear: () => void;
}

export const MeasurementTool: React.FC<MeasurementToolProps> = ({
  mode,
  onSetMode,
  pointsCount,
  calculatedAreaHa,
  calculatedDistanceM,
  estimatedBiomassT,
  onClear
}) => {
  return (
    <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200/90 shadow-md max-w-xs text-xs space-y-2.5">
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
        <span className="font-bold text-slate-900 flex items-center space-x-1.5">
          <Ruler className="w-3.5 h-3.5 text-confluence-700" />
          <span>Geodesic Measure & Draw</span>
        </span>
        {mode !== 'none' && (
          <span className="font-mono text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
            Active
          </span>
        )}
      </div>

      {/* Mode Selectors */}
      <div className="grid grid-cols-2 gap-1.5">
        <button
          onClick={() => onSetMode(mode === 'polygon' ? 'none' : 'polygon')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-lg font-semibold transition-all ${
            mode === 'polygon'
              ? 'bg-confluence-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Square className="w-3.5 h-3.5" />
          <span>Draw Area (ha)</span>
        </button>

        <button
          onClick={() => onSetMode(mode === 'distance' ? 'none' : 'distance')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-lg font-semibold transition-all ${
            mode === 'distance'
              ? 'bg-river-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>Distance (m)</span>
        </button>
      </div>

      {/* Measurement Status & Results */}
      {mode !== 'none' && (
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70 space-y-1 text-[11px]">
          <p className="text-slate-500">
            {mode === 'polygon'
              ? 'Click map points to define custom hyacinth boundary polygon.'
              : 'Click consecutive map points to calculate river stretch length.'}
          </p>
          <div className="flex justify-between font-mono text-slate-700 pt-1">
            <span>Vertices marked:</span>
            <span className="font-bold">{pointsCount}</span>
          </div>

          {calculatedAreaHa !== null && (
            <div className="pt-1 border-t border-slate-200 space-y-0.5 font-mono">
              <div className="flex justify-between text-confluence-900 font-bold">
                <span>Calculated Area:</span>
                <span>{calculatedAreaHa.toFixed(3)} ha</span>
              </div>
              {estimatedBiomassT !== null && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Est. Biomass (32t/ha):</span>
                  <span>{estimatedBiomassT.toFixed(1)} t</span>
                </div>
              )}
            </div>
          )}

          {calculatedDistanceM !== null && (
            <div className="pt-1 border-t border-slate-200 font-mono flex justify-between text-river-900 font-bold">
              <span>Total Distance:</span>
              <span>{(calculatedDistanceM / 1000).toFixed(2)} km ({calculatedDistanceM.toFixed(0)} m)</span>
            </div>
          )}

          <div className="pt-1.5 flex justify-end">
            <button
              onClick={onClear}
              className="flex items-center space-x-1 text-rose-600 hover:text-rose-700 font-semibold text-[11px]"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Drawing</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
