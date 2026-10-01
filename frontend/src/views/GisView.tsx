import React from 'react';
import { HyacinthZone, MonitoringStation, RiverSegment, BiomassAssessment } from '../types';
import { RiverMap } from '../components/gis/RiverMap';
import { ZoneDetailsPanel } from '../components/gis/ZoneDetailsPanel';
import { Map, Layers, Ruler, Satellite, Info } from 'lucide-react';

interface GisViewProps {
  zones: HyacinthZone[];
  stations: MonitoringStation[];
  segments: RiverSegment[];
  assessments: BiomassAssessment[];
  selectedZone: HyacinthZone | null;
  onSelectZone: (zone: HyacinthZone) => void;
  onSendToSimulator: (biomassT: number) => void;
  onNavigateToBiomass: () => void;
}

export const GisView: React.FC<GisViewProps> = ({
  zones,
  stations,
  segments,
  assessments,
  selectedZone,
  onSelectZone,
  onSendToSimulator,
  onNavigateToBiomass
}) => {
  const selectedBiomass = selectedZone
    ? assessments.find((a) => a.assessment_code.includes(selectedZone.zone_code)) || null
    : null;

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-confluence-100 text-confluence-800 rounded-xl">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-900 text-base">River GIS Intelligence Studio</h3>
              <span className="text-[10px] font-mono bg-confluence-50 text-confluence-800 px-2 py-0.5 rounded font-semibold border border-confluence-200">
                Prayagraj Confluence
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Interactive Sentinel-2 surface classification, geodesic polygon area drawing, and spatial biomass quantification
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
          <Satellite className="w-3.5 h-3.5 text-confluence-700" />
          <span>Scene: S2B_MSIL2A_20260926</span>
        </div>
      </div>

      {/* Main Studio Grid: Map Center (lg:col-span-8) + Right Analysis Panel (lg:col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <RiverMap
            zones={zones}
            stations={stations}
            segments={segments}
            selectedZone={selectedZone}
            onSelectZone={onSelectZone}
            height="620px"
          />
        </div>

        <div className="lg:col-span-4">
          <ZoneDetailsPanel
            zone={selectedZone}
            biomass={selectedBiomass}
            onClose={() => onSelectZone(null as any)}
            onSendToSimulator={onSendToSimulator}
            onNavigateToBiomass={onNavigateToBiomass}
          />
        </div>
      </div>
    </div>
  );
};
