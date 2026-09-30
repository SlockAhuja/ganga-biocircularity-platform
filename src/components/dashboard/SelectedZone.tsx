import React from 'react';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';
import type { MonitoringZone } from '../../data/mockData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface SelectedZoneProps {
  zone: MonitoringZone | null;
  onClose: () => void;
  onViewDetailedAnalysis?: (zone: MonitoringZone) => void;
}

export const SelectedZone: React.FC<SelectedZoneProps> = ({
  zone,
  onClose,
  onViewDetailedAnalysis
}) => {
  if (!zone) return null;

  const densityBadgeVariant = 
    zone.densityLevel === 'Very High' ? 'danger' :
    zone.densityLevel === 'High' ? 'warning' :
    zone.densityLevel === 'Moderate' ? 'secondary' : 'success';

  return (
    <div className="absolute top-4 right-4 z-20 w-80 sm:w-88 bg-white/95 backdrop-blur-md border border-ink-100 rounded-xl shadow-elevated p-4 text-xs animate-in fade-in slide-in-from-right-2 duration-200 pointer-events-auto">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-ink-100">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-ink-900 text-sm">{zone.name}</h4>
            <Badge variant={densityBadgeVariant} size="sm">
              {zone.densityLevel}
            </Badge>
          </div>
          <p className="text-[11px] text-ink-500 font-medium mt-0.5">{zone.sector}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 my-3.5">
        <div className="bg-ink-50/70 p-2.5 rounded-lg border border-ink-100">
          <div className="text-[10px] uppercase font-mono text-ink-400 font-medium">Total Area</div>
          <div className="text-base font-bold text-ink-900 mt-0.5">{zone.totalAreaHa} <span className="text-xs font-normal text-ink-500">ha</span></div>
        </div>

        <div className="bg-ink-50/70 p-2.5 rounded-lg border border-ink-100">
          <div className="text-[10px] uppercase font-mono text-ink-400 font-medium">Hyacinth Coverage</div>
          <div className="text-base font-bold text-ganga-700 mt-0.5">{zone.hyacinthAreaHa} <span className="text-xs font-normal text-ink-500">ha</span></div>
        </div>

        <div className="bg-ink-50/70 p-2.5 rounded-lg border border-ink-100">
          <div className="text-[10px] uppercase font-mono text-ink-400 font-medium">Coverage Density</div>
          <div className="text-base font-bold text-ink-900 mt-0.5">{zone.coverageDensityPercent}%</div>
          <div className="w-full bg-ink-200 h-1 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="bg-ganga-500 h-full rounded-full" 
              style={{ width: `${zone.coverageDensityPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-ink-50/70 p-2.5 rounded-lg border border-ink-100">
          <div className="text-[10px] uppercase font-mono text-ink-400 font-medium">Estimated Biomass</div>
          <div className="text-base font-bold text-amberalert mt-0.5">{zone.estimatedBiomassTonnes} <span className="text-xs font-normal text-ink-500">tonnes</span></div>
        </div>
      </div>

      {/* Secondary Bio-Physical Indices */}
      <div className="bg-ganga-50/60 border border-ganga-100 rounded-lg p-2.5 mb-3 space-y-1.5 text-[11px]">
        <div className="flex items-center justify-between text-ink-700">
          <span className="flex items-center gap-1.5 text-ganga-800">
            <ShieldCheck className="w-3.5 h-3.5 text-ganga-600" />
            Detection Confidence
          </span>
          <span className="font-mono font-bold text-ganga-800">{zone.detectionConfidencePercent}%</span>
        </div>
        <div className="flex items-center justify-between text-ink-600">
          <span>NDVI / NDWI Indices</span>
          <span className="font-mono text-[10px]">{zone.ndviMean} / {zone.ndwiMean}</span>
        </div>
        <div className="flex items-center justify-between text-ink-600">
          <span>Current Velocity / Depth</span>
          <span className="font-mono text-[10px]">{zone.waterVelocity} m/s • {zone.waterDepth}m</span>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        variant="primary"
        size="sm"
        className="w-full justify-between"
        onClick={() => onViewDetailedAnalysis?.(zone)}
        icon={<ArrowRight className="w-3.5 h-3.5" />}
        iconPosition="right"
      >
        <span>View Detailed Analysis</span>
      </Button>

      <div className="mt-2 text-center">
        <span className="text-[9px] font-mono text-ink-400">
          ● SIMULATED SATELLITE ESTIMATION (10M MESH)
        </span>
      </div>
    </div>
  );
};
