import React from 'react';
import { BiomassAssessment, HyacinthZone } from '../types';
import { BiomassOverview } from '../components/biomass/BiomassOverview';
import { Leaf, Info } from 'lucide-react';

interface BiomassViewProps {
  assessments: BiomassAssessment[];
  zones: HyacinthZone[];
  selectedZone: HyacinthZone | null;
  onSelectZone: (zone: HyacinthZone) => void;
}

export const BiomassView: React.FC<BiomassViewProps> = ({
  assessments,
  zones,
  selectedZone,
  onSelectZone
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-900 text-base">Biomass Intelligence & Allometric Quantification</h3>
              <span className="text-[10px] font-mono bg-confluence-50 text-confluence-800 px-2 py-0.5 rounded font-semibold border border-confluence-200">
                v1.2-Allometric-TS-VS
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Proximate analysis, moisture ratios, volatile solids, and spatial distribution across Prayagraj reaches
            </p>
          </div>
        </div>
      </div>

      <BiomassOverview
        assessments={assessments}
        zones={zones}
        selectedZone={selectedZone}
        onSelectZone={onSelectZone}
      />
    </div>
  );
};
