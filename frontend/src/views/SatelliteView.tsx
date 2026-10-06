import React, { useState } from 'react';
import {
  Satellite,
  Layers,
  Filter,
  Calendar,
  CloudSun,
  Activity,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Split,
  Eye,
  Info
} from 'lucide-react';
import { ScientificBadge } from '../components/common/ScientificBadge';

export const SatelliteView: React.FC = () => {
  const [selectedScene, setSelectedScene] = useState<string>('S2A_20261001_PRAYAGRAJ');
  const [selectedBandIndex, setSelectedBandIndex] = useState<'NDVI' | 'NDWI' | 'MNDWI' | 'RGB'>('NDVI');
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [beforeScene, setBeforeScene] = useState<string>('S2A_20260901_PRAYAGRAJ');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cloudFilter, setCloudFilter] = useState<number>(10);

  const scenes = [
    {
      id: 'S2A_20261001_PRAYAGRAJ',
      date: '2026-10-01',
      satellite: 'Sentinel-2A / MSI Level-2A',
      cloudCover: '2.4%',
      resolution: '10m / Ground Sampling',
      status: 'PROCESSED',
      estimatedHyacinthHa: 38.6,
      provider: 'Copernicus / DEMO Fallback'
    },
    {
      id: 'S2B_20260915_PRAYAGRAJ',
      date: '2026-09-15',
      satellite: 'Sentinel-2B / MSI Level-2A',
      cloudCover: '4.8%',
      resolution: '10m / Ground Sampling',
      status: 'PROCESSED',
      estimatedHyacinthHa: 42.1,
      provider: 'Copernicus / DEMO Fallback'
    },
    {
      id: 'S2A_20260901_PRAYAGRAJ',
      date: '2026-09-01',
      satellite: 'Sentinel-2A / MSI Level-2A',
      cloudCover: '7.1%',
      resolution: '10m / Ground Sampling',
      status: 'PROCESSED',
      estimatedHyacinthHa: 45.3,
      provider: 'Copernicus / DEMO Fallback'
    },
    {
      id: 'S2B_20260815_PRAYAGRAJ',
      date: '2026-08-15',
      satellite: 'Sentinel-2B / MSI Level-2A',
      cloudCover: '18.5%',
      resolution: '10m / Ground Sampling',
      status: 'CLOUD_REJECTED',
      estimatedHyacinthHa: 0,
      provider: 'Copernicus / DEMO Fallback'
    }
  ];

  const handleProcessScene = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1200);
  };

  const currentSceneData = scenes.find((s) => s.id === selectedScene) || scenes[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#EDF6FB] text-[#4B8DB8] rounded-2xl">
            <Satellite className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-[#17211B]">
                Satellite Remote Sensing & Earth Observation
              </h2>
              <span className="text-[10px] font-mono bg-[#EAF5EE] text-[#2E7D5B] px-2 py-0.5 rounded font-bold border border-[#59A978]/30">
                Sentinel-2 MSI
              </span>
            </div>
            <p className="text-xs text-[#68756D] mt-0.5">
              Automated cloud masking, spectral index extraction (NDVI, NDWI, MNDWI), and floating macrophyte classification.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex items-center space-x-1.5 ${
              comparisonMode
                ? 'bg-[#2E7D5B] text-white border-[#2E7D5B]'
                : 'bg-white text-[#17211B] border-[#DFE8E2] hover:bg-slate-50'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>{comparisonMode ? 'Single Scene View' : 'Before / After Comparison'}</span>
          </button>
        </div>
      </div>

      {/* Main Satellite Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Control & Scene Selector */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-[#DFE8E2] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[#17211B]">
                Scene Catalog (Prayagraj)
              </span>
              <span className="text-[10px] font-mono text-[#68756D]">{scenes.length} Scenes</span>
            </div>

            {/* Cloud Filter Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#68756D]">Max Cloud Cover:</span>
                <span className="font-mono font-bold text-[#17211B]">&le; {cloudFilter}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={cloudFilter}
                onChange={(e) => setCloudFilter(Number(e.target.value))}
                className="w-full accent-[#2E7D5B] cursor-pointer"
              />
            </div>

            {/* Scene List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {scenes.map((scene) => {
                const isSelected = selectedScene === scene.id;
                return (
                  <div
                    key={scene.id}
                    onClick={() => setSelectedScene(scene.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all text-xs ${
                      isSelected
                        ? 'bg-[#EAF5EE] border-[#59A978] shadow-xs'
                        : 'bg-white border-[#DFE8E2] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#17211B]">{scene.date}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          scene.status === 'PROCESSED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {scene.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#68756D] mt-1 font-mono">{scene.satellite}</p>
                    <div className="flex justify-between text-[10px] text-[#68756D] mt-2 pt-2 border-t border-slate-100">
                      <span>Cloud: {scene.cloudCover}</span>
                      <span className="font-bold text-[#2E7D5B]">{scene.estimatedHyacinthHa} ha Hyacinth</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleProcessScene}
              disabled={isProcessing}
              className="w-full py-2.5 bg-[#2E7D5B] hover:bg-[#246549] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'Running Index Classifier...' : 'Re-Process Spectral Bands'}</span>
            </button>
          </div>

          {/* Scientific Disclaimer Card */}
          <div className="p-4 bg-[#EDF6FB] rounded-2xl border border-[#4B8DB8]/30 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 text-[#4B8DB8] font-bold">
              <Info className="w-4 h-4" />
              <span>Scientific Note on Remote Sensing</span>
            </div>
            <p className="text-[#68756D] leading-relaxed text-[11px]">
              NDVI alone does not uniquely confirm water hyacinth. The BioRiver pipeline combines <strong>MNDWI water masking</strong> + <strong>NDVI dense vegetation filtering</strong> + <strong>spatial clustering</strong> to generate the <em>Estimated Water-Hyacinth Distribution</em>.
            </p>
          </div>
        </div>

        {/* Right Spectral Canvas / Analysis */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs space-y-5">
            {/* Spectral Band Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#17211B]">Active Band Index:</span>
                <div className="flex rounded-xl bg-slate-100 p-1">
                  {(['NDVI', 'NDWI', 'MNDWI', 'RGB'] as const).map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedBandIndex(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedBandIndex === idx
                          ? 'bg-white text-[#2E7D5B] shadow-xs'
                          : 'text-[#68756D] hover:text-[#17211B]'
                      }`}
                    >
                      {idx}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <ScientificBadge type="ESTIMATED" />
                <span className="text-[11px] font-mono text-[#68756D]">{currentSceneData.resolution}</span>
              </div>
            </div>

            {/* Satellite Canvas Visualization */}
            {!comparisonMode ? (
              <div className="relative rounded-2xl bg-gradient-to-tr from-slate-900 via-river-950 to-confluence-950 border border-slate-700 p-8 min-h-[380px] flex flex-col justify-between text-white overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold block">
                      Scene: {currentSceneData.id}
                    </span>
                    <span className="text-[10px] text-slate-300">Observation Date: {currentSceneData.date}</span>
                  </div>

                  <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-right">
                    <span className="text-[11px] font-mono text-sky-400 font-bold block">
                      Index Mode: {selectedBandIndex}
                    </span>
                    <span className="text-[10px] text-slate-300">Threshold: &gt; 0.42 (Dense Aquatic Mat)</span>
                  </div>
                </div>

                {/* Simulated Visual Earth Observation Overlay */}
                <div className="my-8 text-center space-y-3 z-10">
                  <div className="inline-block p-4 rounded-3xl bg-emerald-950/60 border border-emerald-500/40 backdrop-blur-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-sm font-bold text-emerald-200">
                        {currentSceneData.estimatedHyacinthHa} Hectares Detected Across 5 Reaches
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Spatial clustering indicates high density along Phaphamau Barrage Pool and Sangam confluence backwaters.
                  </p>
                </div>

                {/* Legend & Stats at Bottom */}
                <div className="flex flex-wrap items-center justify-between gap-2 z-10 pt-4 border-t border-slate-800 text-xs font-mono">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded bg-emerald-500" />
                      <span className="text-[11px] text-slate-300">High Density Hyacinth</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded bg-sky-600" />
                      <span className="text-[11px] text-slate-300">Clear Ganga Water</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">Provider: {currentSceneData.provider}</span>
                </div>
              </div>
            ) : (
              /* Before vs After Comparison Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-amber-400">BEFORE: 2026-09-01</span>
                    <span className="font-mono text-[10px] text-slate-400">Pre-Harvest</span>
                  </div>
                  <div className="h-44 bg-slate-800 rounded-xl flex items-center justify-center text-center p-4 border border-slate-700">
                    <div>
                      <span className="text-2xl font-black text-amber-400">45.3 ha</span>
                      <p className="text-xs text-slate-400 mt-1">High Weed Congestion (Sangam)</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">DO level suppressed (&lt; 4.8 mg/L) due to mat coverage.</p>
                </div>

                <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-emerald-400">AFTER: 2026-10-01</span>
                    <span className="font-mono text-[10px] text-slate-400">Post-Harvest</span>
                  </div>
                  <div className="h-44 bg-slate-800 rounded-xl flex items-center justify-center text-center p-4 border border-slate-700">
                    <div>
                      <span className="text-2xl font-black text-emerald-400">38.6 ha</span>
                      <p className="text-xs text-slate-400 mt-1">-6.7 ha (-14.8% reduction)</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">Surface re-aeration initiated in cleared backwaters.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
