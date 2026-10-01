import React from 'react';
import { X, BookOpen, Calculator, Layers, Flame, RefreshCw, Scale } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-confluence-100 text-confluence-800 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Scientific Methodology & Mathematical Formulas</h3>
              <p className="text-xs text-slate-500">Peer-reviewed bioeconomy formulas & remote sensing equations</p>
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
          {/* Section 1: Remote Sensing */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/30">
            <div className="flex items-center space-x-2 text-confluence-800 font-semibold mb-2">
              <Layers className="w-4 h-4" />
              <h4>1. Satellite Spectral Indices & Hyacinth Detection</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900">NDVI (Normalized Difference Veg. Index):</span>
                <p className="mt-1 text-confluence-700 font-semibold">NDVI = (NIR - RED) / (NIR + RED)</p>
                <p className="text-[11px] text-slate-500 mt-1">Sentinel-2 Band 8 (NIR 842nm) and Band 4 (Red 665nm).</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900">MNDWI (Modified Water Index):</span>
                <p className="mt-1 text-river-700 font-semibold">MNDWI = (GREEN - SWIR1) / (GREEN + SWIR1)</p>
                <p className="text-[11px] text-slate-500 mt-1">Masks water surface; hyacinth canopy exhibits negative MNDWI on water.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Biomass Quantification */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/30">
            <div className="flex items-center space-x-2 text-confluence-800 font-semibold mb-2">
              <Calculator className="w-4 h-4" />
              <h4>2. Allometric Biomass Quantification</h4>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 font-mono text-xs">
              <div>
                <span className="text-slate-500">Fresh Biomass (Tonnes): </span>
                <span className="font-bold text-slate-900">M_fresh = Area (ha) × (Coverage% / 100) × ρ_density</span>
                <p className="text-[11px] text-slate-500">where ρ_density = 17 to 35 t/ha fresh matter based on classification class.</p>
              </div>
              <div>
                <span className="text-slate-500">Total Dry Solids (TS): </span>
                <span className="font-bold text-slate-900">TS = M_fresh × (1 - Moisture%) = M_fresh × 0.09</span>
              </div>
              <div>
                <span className="text-slate-500">Volatile Solids (VS): </span>
                <span className="font-bold text-slate-900">VS = TS × 0.80</span>
                <p className="text-[11px] text-slate-500">80% of dry solids represents combustible/digestible organic fraction.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Anaerobic Digestion & Bio-CNG */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/30">
            <div className="flex items-center space-x-2 text-confluence-800 font-semibold mb-2">
              <Flame className="w-4 h-4" />
              <h4>3. Biochemical Methane Potential & Bio-CNG Yield</h4>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 font-mono text-xs">
              <div>
                <span className="text-slate-500">Methane Output: </span>
                <span className="font-bold text-slate-900">V_CH4 (m³) = VS (kg) × BMP × η_conversion</span>
                <p className="text-[11px] text-slate-500">BMP benchmark = 0.28 m³ CH₄/kg VS; η_conversion = 85%.</p>
              </div>
              <div>
                <span className="text-slate-500">Bio-CNG Compressed: </span>
                <span className="font-bold text-slate-900">Mass_CNG (kg) = V_CH4 × 0.717 kg/m³ × 0.95 (purification)</span>
              </div>
            </div>
          </div>

          {/* Section 4: Circularity Score & LCA */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/30">
            <div className="flex items-center space-x-2 text-confluence-800 font-semibold mb-2">
              <RefreshCw className="w-4 h-4" />
              <h4>4. Multi-Pillar Circularity Score Index</h4>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 font-mono text-xs">
              <p className="font-bold text-slate-900">
                Score = 0.25·S_harvest + 0.25·S_conversion + 0.20·S_nutrient + 0.15·S_waste_diversion + 0.15·S_energy
              </p>
              <p className="text-[11px] text-slate-500 mt-2">
                Transparent 0-100 composite index weighted across invasive weed removal, bio-resource conversion, agricultural nutrient return, landfill avoidance, and fossil fuel replacement.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-confluence-700 hover:bg-confluence-800 text-white rounded-lg text-xs font-semibold shadow-xs"
          >
            Close Methodology
          </button>
        </div>
      </div>
    </div>
  );
};
