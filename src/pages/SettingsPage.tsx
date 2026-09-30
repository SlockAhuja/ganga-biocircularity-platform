import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { StatusTag } from '../components/ui/StatusTag';
import { Button } from '../components/ui/Button';
import { mockSystemTelemetry } from '../data/mockData';
import { 
  Satellite, 
  Check, 
  Layers,
  Radio
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [satelliteSource, setSatelliteSource] = useState('Sentinel-2B MSI (ESA Copernicus)');
  const [bandCombination, setBandCombination] = useState('B8-B4-B3 (NIR False Color / Macrophyte Index)');
  const [cloudThreshold, setCloudThreshold] = useState(15);
  const [dataSimulationMode, setDataSimulationMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <PageContainer
      title="Satellite Telemetry & Platform Configuration"
      subtitle="Sensory parameters, Earth observation ingestion pipelines, and multi-spectral index calibration settings."
      badge={<StatusTag type="active" customText="Satellite Pipeline Active" />}
    >
      {/* Active Sensor Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ganga-100 text-ganga-700">
              <Satellite className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-ink-400">Primary Earth Sensor</div>
              <div className="text-sm font-bold text-ink-900">{mockSystemTelemetry.activeSatellite}</div>
              <div className="text-[11px] text-ganga-700 font-medium">Revisit Interval: 5 Days</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-skywater-100 text-skywater-700">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-ink-400">Spatial Mesh Resolution</div>
              <div className="text-sm font-bold text-ink-900">{mockSystemTelemetry.resolution}</div>
              <div className="text-[11px] text-skywater-700 font-medium">L2A Bottom-of-Atmosphere (BOA)</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-ink-400">Target Confluence AOI</div>
              <div className="text-sm font-bold text-ink-900">{mockSystemTelemetry.location}</div>
              <div className="text-[11px] text-ink-500 font-mono">{mockSystemTelemetry.coordinates}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sensor Ingestion Configuration */}
      <Card className="p-6">
        <CardHeader
          title="Earth Observation & Spectral Model Settings"
          subtitle="Configure optical processing criteria for water hyacinth segmentation"
        />

        <div className="space-y-5 mt-2">
          {/* Constellation Source */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5">
              Earth Observation Constellation / Mission
            </label>
            <select
              value={satelliteSource}
              onChange={(e) => setSatelliteSource(e.target.value)}
              className="w-full text-xs bg-ink-50/70 border border-ink-100 rounded-lg p-2.5 text-ink-900 focus:bg-white focus:border-ganga-500 outline-none"
            >
              <option>Sentinel-2B MSI (ESA Copernicus) - 10m Optical</option>
              <option>Sentinel-2A MSI (ESA Copernicus) - 10m Optical</option>
              <option>Landsat-9 OLI-2 (NASA / USGS) - 30m Optical</option>
              <option>PlanetScope SuperDove (Planet Labs) - 3m Commercial</option>
            </select>
          </div>

          {/* Band Combination */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5">
              Spectral Index Formulation
            </label>
            <select
              value={bandCombination}
              onChange={(e) => setBandCombination(e.target.value)}
              className="w-full text-xs bg-ink-50/70 border border-ink-100 rounded-lg p-2.5 text-ink-900 focus:bg-white focus:border-ganga-500 outline-none"
            >
              <option>B8-B4-B3 (NIR False Color / Macrophyte Index)</option>
              <option>NDVI (Normalized Difference Vegetation Index: (B8-B4)/(B8+B4))</option>
              <option>NDWI (Normalized Difference Water Index: (B3-B8)/(B3+B8))</option>
              <option>FAI (Floating Algae Index: NIR - (RED + (SWIR-RED)*lambda))</option>
            </select>
          </div>

          {/* Cloud Cover Threshold */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-ink-700">
                Max Allowable Cloud Obscuration: <span className="font-mono text-ganga-700 font-bold">{cloudThreshold}%</span>
              </label>
              <span className="text-[11px] text-ink-400">Current Scene Cloud Cover: 4.2%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={cloudThreshold}
              onChange={(e) => setCloudThreshold(Number(e.target.value))}
              className="w-full accent-ganga-500 cursor-pointer"
            />
          </div>

          {/* Simulation Toggle */}
          <div className="pt-3 border-t border-ink-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-ink-900">Phase 1 Simulated / Demo Data Mode</div>
              <div className="text-[11px] text-ink-500">
                Uses centralized high-accuracy calibrated research benchmarks prior to GEE backend hookup.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={dataSimulationMode} 
                onChange={(e) => setDataSimulationMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-ink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-ink-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ganga-600"></div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between">
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            icon={<Check className="w-4 h-4" />}
          >
            Apply Configuration
          </Button>

          {saved && (
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              Settings updated successfully.
            </span>
          )}
        </div>
      </Card>
    </PageContainer>
  );
};
