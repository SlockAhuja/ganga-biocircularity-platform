import React from 'react';
import { 
  Satellite, 
  Sprout, 
  Flame, 
  Recycle, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const GangaPlatformIntegrationSection: React.FC<{
  onLaunchFullPlatform: () => void;
}> = ({ onLaunchFullPlatform }) => {
  return (
    <section id="ganga-initiative" className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-semibold mb-3 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              FLAGSHIP INTERDISCIPLINARY INITIATIVE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
              🌿 Ganga Biocircularity Intelligence Platform
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Satellite-Based Water Hyacinth Monitoring, Biomass Assessment & Circular Resource Recovery across the Prayagraj Confluence (18.5 km stretch).
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={onLaunchFullPlatform}
            className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-md flex-shrink-0"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Launch Interactive Intelligence Portal
          </Button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-emerald-800 font-semibold uppercase">Daily Extraction</span>
                <Sprout className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 font-sans">8,450 <span className="text-xs font-normal text-slate-500">kg/day</span></div>
              <p className="text-xs text-slate-500 mt-1">Harvestable wet macrophyte mass</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sky-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-sky-800 font-semibold uppercase">Satellite Coverage</span>
                <Satellite className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 font-sans">38.6 <span className="text-xs font-normal text-slate-500">ha</span></div>
              <p className="text-xs text-slate-500 mt-1">Sentinel-2 10m Multi-Spectral</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-amber-800 font-semibold uppercase">Clean Bio-CNG</span>
                <Flame className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 font-sans">920 <span className="text-xs font-normal text-slate-500">kg/day</span></div>
              <p className="text-xs text-slate-500 mt-1">1,845 m³/day raw biogas yield</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-indigo-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-indigo-800 font-semibold uppercase">Net Benefit</span>
                <Recycle className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 font-sans">₹5.35 <span className="text-xs font-normal text-slate-500">Lakh/mo</span></div>
              <p className="text-xs text-slate-500 mt-1">2.8-Year commercial payback</p>
            </div>
          </div>
        </div>

        {/* Interactive Preview Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">Phase 1 Complete</Badge>
                <span className="text-xs font-mono text-slate-400">Prayagraj Confluence Reach • 25.4358° N, 81.8463° E</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Explore the Multi-Spectral Detection Map, AD Kinetics & Water Quality Sensor Matrix
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                The platform seamlessly models the entire resource cascade from satellite macrophyte detection to harvesting, screw-press dewatering, mesophilic anaerobic digestion, Bio-CNG bottling, and vermicompost enrichment.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Live GIS Hydrography Overlay
                </span>
                <span className="flex items-center gap-1.5 text-sky-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Sensor Buoys (pH, DO, BOD, COD, TSS)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Automated PDF Policy Report Generator
                </span>
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col items-center justify-center p-6 bg-slate-800/90 rounded-2xl border border-slate-700 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center text-2xl mb-3">
                🌿
              </div>
              <h4 className="font-bold text-white text-base">Interactive Web App</h4>
              <p className="text-[11px] text-slate-400 mt-1 mb-4">
                Full standalone analytical suite built into this repository.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={onLaunchFullPlatform}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs cursor-pointer"
              >
                Open Dashboard Mode
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
