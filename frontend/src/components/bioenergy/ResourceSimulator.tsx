import React, { useState, useEffect } from 'react';
import { BioenergyAssessment } from '../../types';
import { simulateBioenergy } from '../../services/api';
import { MetricCard } from '../common/MetricCard';
import { ScientificBadge } from '../common/ScientificBadge';
import { Flame, Zap, Sparkles, RefreshCw, Sprout, Droplet, ArrowRight, Sliders, Check } from 'lucide-react';

interface ResourceSimulatorProps {
  initialBiomass?: number;
}

export const ResourceSimulator: React.FC<ResourceSimulatorProps> = ({ initialBiomass = 500 }) => {
  // Input parameters state
  const [biomassInput, setBiomassInput] = useState<number>(initialBiomass);
  const [moisturePct, setMoisturePct] = useState<number>(91.0);
  const [totalSolidsPct, setTotalSolidsPct] = useState<number>(9.0);
  const [volatileSolidsPct, setVolatileSolidsPct] = useState<number>(80.0);
  const [utilizationPct, setUtilizationPct] = useState<number>(85.0);
  const [scenario, setScenario] = useState<'Conservative' | 'Baseline' | 'Optimistic'>('Baseline');

  const [result, setResult] = useState<BioenergyAssessment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Sync initialBiomass updates if passed from GIS zone selection
  useEffect(() => {
    if (initialBiomass && initialBiomass > 0) {
      setBiomassInput(initialBiomass);
    }
  }, [initialBiomass]);

  // Run simulation whenever parameters change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    simulateBioenergy({
      biomass_input_t: biomassInput,
      moisture_content_pct: moisturePct,
      total_solids_pct: totalSolidsPct,
      volatile_solids_pct: volatileSolidsPct,
      utilization_pct: utilizationPct,
      scenario_type: scenario
    })
      .then((res) => {
        if (isMounted) {
          setResult(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Simulation error:', err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [biomassInput, moisturePct, totalSolidsPct, volatileSolidsPct, utilizationPct, scenario]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Scenario Selector */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-slate-900 text-base">Anaerobic Digestion & Resource Recovery Simulator</h3>
            <ScientificBadge type="MODELED" label="CSTR Dynamics" />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulate biomethane yields, compressed Bio-CNG, electrical power, and organic vermicompost
          </p>
        </div>

        {/* Scenario Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {(['Conservative', 'Baseline', 'Optimistic'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setScenario(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scenario === s
                  ? 'bg-white text-confluence-900 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Inputs & Key Result Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Control Sliders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-confluence-700" />
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Feedstock & Digestion Parameters</h4>
          </div>

          {/* Biomass Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-700">Harvested Fresh Biomass:</span>
              <span className="font-mono font-bold text-confluence-800">{biomassInput} tonnes</span>
            </div>
            <input
              type="range"
              min="10"
              max="2500"
              step="10"
              value={biomassInput}
              onChange={(e) => setBiomassInput(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-confluence-700"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>10 t</span>
              <span>1,250 t</span>
              <span>2,500 t</span>
            </div>
          </div>

          {/* Plant Utilization Efficiency */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-700">Conversion / Utilization:</span>
              <span className="font-mono font-bold text-confluence-800">{utilizationPct}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="1"
              value={utilizationPct}
              onChange={(e) => setUtilizationPct(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-confluence-700"
            />
          </div>

          {/* Moisture Content */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-700">Moisture Content:</span>
              <span className="font-mono font-bold text-confluence-800">{moisturePct}%</span>
            </div>
            <input
              type="range"
              min="85"
              max="95"
              step="0.5"
              value={moisturePct}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMoisturePct(val);
                setTotalSolidsPct(Number((100 - val).toFixed(1)));
              }}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-confluence-700"
            />
          </div>

          {/* Total Solids */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-700">Total Solids (TS):</span>
              <span className="font-mono font-bold text-confluence-800">{totalSolidsPct}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="15"
              step="0.5"
              value={totalSolidsPct}
              onChange={(e) => setTotalSolidsPct(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-confluence-700"
            />
          </div>

          {/* Volatile Solids */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-700">Volatile Solids (% of TS):</span>
              <span className="font-mono font-bold text-confluence-800">{volatileSolidsPct}%</span>
            </div>
            <input
              type="range"
              min="65"
              max="90"
              step="1"
              value={volatileSolidsPct}
              onChange={(e) => setVolatileSolidsPct(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-confluence-700"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
            <div className="flex justify-between font-mono text-slate-700">
              <span>Biochemical Methane Potential:</span>
              <span className="font-bold">{scenario === 'Conservative' ? '0.22' : scenario === 'Optimistic' ? '0.34' : '0.28'} m³/kg VS</span>
            </div>
            <div className="flex justify-between font-mono text-slate-700">
              <span>Methane Fraction in Biogas:</span>
              <span className="font-bold">{scenario === 'Conservative' ? '58%' : scenario === 'Optimistic' ? '65%' : '62%'}</span>
            </div>
          </div>
        </div>

        {/* Right 2-Cols: Real-Time Calculated Recovery Outputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <MetricCard
              title="Bio-CNG Potential"
              value={result ? result.bio_cng_potential_kg.toLocaleString() : '0'}
              unit="kg"
              icon={<Flame className="w-5 h-5 text-amber-600" />}
              subtitle="Compressed 95% pure CH₄"
              provenance="MODELED"
            />

            <MetricCard
              title="Biogas Volume"
              value={result ? result.biogas_volume_m3.toLocaleString() : '0'}
              unit="m³"
              icon={<Sparkles className="w-5 h-5 text-confluence-700" />}
              subtitle="Raw anaerobic biogas"
              provenance="MODELED"
            />

            <MetricCard
              title="Electrical Power"
              value={result ? result.electrical_energy_kwh.toLocaleString() : '0'}
              unit="kWh"
              icon={<Zap className="w-5 h-5 text-amber-500" />}
              subtitle="Co-generation 35% efficiency"
              provenance="MODELED"
            />

            <MetricCard
              title="Organic Vermicompost"
              value={result ? result.vermicompost_potential_t.toFixed(1) : '0'}
              unit="tonnes"
              icon={<Sprout className="w-5 h-5 text-emerald-600" />}
              subtitle="Post-digestate earthworm processing"
              provenance="MODELED"
            />

            <MetricCard
              title="Liquid Vermiwash"
              value={result ? result.liquid_vermiwash_liters.toLocaleString() : '0'}
              unit="liters"
              icon={<Droplet className="w-5 h-5 text-sky-600" />}
              subtitle="Organic foliar bio-stimulant"
              provenance="MODELED"
            />

            <MetricCard
              title="Total Digestate Outflow"
              value={result ? result.digestate_total_t.toFixed(1) : '0'}
              unit="tonnes"
              icon={<RefreshCw className="w-5 h-5 text-confluence-600" />}
              subtitle="Solid-liquid bio-slurry"
              provenance="MODELED"
            />
          </div>

          {/* Plant Mass Balance & Nutrient Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Recycled Agricultural Nutrients (NPK Return)
            </h4>
            <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-emerald-800 font-sans font-bold block uppercase">Nitrogen (N)</span>
                <span className="text-lg font-bold text-emerald-950">{result?.nitrogen_recovery_kg.toFixed(1) ?? '0'}</span>
                <span className="text-emerald-700 text-[11px] ml-1">kg</span>
              </div>

              <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-100">
                <span className="text-[10px] text-sky-800 font-sans font-bold block uppercase">Phosphorus (P₂O₅)</span>
                <span className="text-lg font-bold text-sky-950">{result?.phosphorus_recovery_kg.toFixed(1) ?? '0'}</span>
                <span className="text-sky-700 text-[11px] ml-1">kg</span>
              </div>

              <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-100">
                <span className="text-[10px] text-purple-800 font-sans font-bold block uppercase">Potassium (K₂O)</span>
                <span className="text-lg font-bold text-purple-950">{result?.potassium_recovery_kg.toFixed(1) ?? '0'}</span>
                <span className="text-purple-700 text-[11px] ml-1">kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
