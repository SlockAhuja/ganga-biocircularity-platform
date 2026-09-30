import React, { useState } from 'react';
import { 
  Waves, 
  Satellite, 
  Combine, 
  Filter, 
  FlaskConical, 
  Flame, 
  Fuel, 
  ArrowRight, 
  Sparkles, 
  Boxes,
  Leaf
} from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { mockBioeconomyPathway } from '../../data/mockData';
import { Badge } from '../ui/Badge';
import { StatusTag } from '../ui/StatusTag';

export const CircularPathway: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="w-5 h-5 text-skywater-600" />;
      case 'Satellite': return <Satellite className="w-5 h-5 text-ganga-600" />;
      case 'Combine': return <Combine className="w-5 h-5 text-emerald-600" />;
      case 'Filter': return <Filter className="w-5 h-5 text-skywater-600" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-violet-600" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amberalert" />;
      case 'Fuel': return <Fuel className="w-5 h-5 text-ganga-700" />;
      default: return <Sparkles className="w-5 h-5 text-ganga-600" />;
    }
  };

  return (
    <Card className="p-5 overflow-hidden">
      <CardHeader
        title="Circular Bioeconomy Resource Recovery Cascade"
        subtitle="End-to-End Valorization Flow: From River Macrophyte Extraction to Clean Energy & High-Value Biochemicals"
        badge={<StatusTag type="simulated" customText="Zero-Waste Valorization Flow" />}
      />

      {/* Primary Linear Upstream to Biogas Pipeline */}
      <div className="relative mt-2 pb-6 overflow-x-auto">
        <div className="flex items-stretch gap-2 min-w-[900px] xl:min-w-full">
          {mockBioeconomyPathway.map((stage, idx) => {
            const isSelected = activeStep === stage.step;
            return (
              <React.Fragment key={stage.id}>
                {/* Process Node */}
                <div 
                  onClick={() => setActiveStep(stage.step)}
                  className={`flex-1 p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-ganga-50/70 border-ganga-500 shadow-card ring-1 ring-ganga-400' 
                      : 'bg-white border-ink-100 hover:border-ganga-200 hover:bg-ink-50/50'
                  }`}
                >
                  <div>
                    {/* Top step badge & icon */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                        isSelected ? 'bg-ganga-600 text-white' : 'bg-ink-100 text-ink-600'
                      }`}>
                        {stage.step}
                      </span>
                      <div className="p-1.5 rounded-lg bg-white border border-ink-100 shadow-xs">
                        {getStepIcon(stage.icon)}
                      </div>
                    </div>

                    <h4 className="font-bold text-ink-900 text-xs tracking-tight line-clamp-1">
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-ink-500 mt-1 line-clamp-2 leading-tight">
                      {stage.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-ink-100/70 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-ganga-700 bg-ganga-100/80 px-1.5 py-0.5 rounded">
                      {stage.badge}
                    </span>
                  </div>
                </div>

                {/* Arrow connector */}
                {idx < mockBioeconomyPathway.length - 1 && (
                  <div className="flex items-center justify-center text-ink-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Branching Cascade for Digestate By-products */}
      <div className="mt-2 pt-5 border-t border-ink-100 bg-ink-50/40 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-ganga-100 text-ganga-800">
              <Boxes className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-ink-900 text-sm">
                Anaerobic Digestate Cascading Valorization Streams
              </h4>
              <p className="text-xs text-ink-500">
                Post-methanation residue valorization into high-yield organic biofertilizers & soil amendments
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md font-semibold">
            100% Circular Diversion
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          {/* Branch A: Vermicomposting */}
          <div className="bg-white border border-ink-100 rounded-xl p-4 shadow-subtle hover:border-ganga-300 transition-all">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-ink-50">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-ink-900 text-xs uppercase tracking-wider">
                  Branch A: Vermicomposting Cascade
                </span>
              </div>
              <Badge variant="success" size="sm">High N-P-K</Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/50 border border-emerald-100/60">
                <div>
                  <div className="font-semibold text-ink-900">Enriched Organic Fertilizer</div>
                  <div className="text-[11px] text-ink-500">NPK Ratio: 3.2 : 1.8 : 2.4 (Soil-ready)</div>
                </div>
                <div className="text-right font-mono font-bold text-emerald-800">
                  3.4 tonnes/day
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-ink-50/60 border border-ink-100">
                <div>
                  <div className="font-semibold text-ink-900">Potted Plant Bio-Compost</div>
                  <div className="text-[11px] text-ink-500">Urban Agriculture & Nursery Potting Substrate</div>
                </div>
                <div className="text-right font-mono font-bold text-ink-700">
                  1.2 tonnes/day
                </div>
              </div>
            </div>
          </div>

          {/* Branch B: High-Value Biochemicals */}
          <div className="bg-white border border-ink-100 rounded-xl p-4 shadow-subtle hover:border-amber-300 transition-all">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-ink-50">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-amberalert" />
                <span className="font-bold text-ink-900 text-xs uppercase tracking-wider">
                  Branch B: High-Value Biochemicals & Conditioners
                </span>
              </div>
              <Badge variant="warning" size="sm">Value Multiplier</Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/50 border border-amber-100/60">
                <div>
                  <div className="font-semibold text-ink-900">Liquid Humic Acid (12% Ext.)</div>
                  <div className="text-[11px] text-ink-500">Root-zone biostimulant for horticulture</div>
                </div>
                <div className="text-right font-mono font-bold text-amber-800">
                  180 L / day
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-skywater-50/50 border border-skywater-100/60">
                <div>
                  <div className="font-semibold text-ink-900">Fulvic Acid & Lignocellulosic Fiber</div>
                  <div className="text-[11px] text-ink-500">Soil moisture retainer & erosion preventer</div>
                </div>
                <div className="text-right font-mono font-bold text-skywater-800">
                  65 L + 850 kg/day
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
