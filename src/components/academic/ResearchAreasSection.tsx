import React, { useState } from 'react';
import { 
  Radio, 
  Activity, 
  Cpu, 
  Layers, 
  Grid, 
  Wifi, 
  Sparkles, 
  Gauge, 
  Zap, 
  Globe2, 
  ArrowRight
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { researchAreasData } from '../../data/researchData';
import type { ResearchArea } from '../../data/researchData';
import { Button } from '../ui/Button';

export const ResearchAreasSection: React.FC<{
  onSelectArea: (area: ResearchArea) => void;
  onOpenGanga: () => void;
}> = ({ onSelectArea, onOpenGanga }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Electromagnetics',
    'Materials',
    'Next-Gen Wireless',
    'Applied AI & Interdisciplinary'
  ];

  const filteredAreas = selectedCategory === 'All' 
    ? researchAreasData 
    : researchAreasData.filter(a => a.category === selectedCategory);

  const getAreaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-5 h-5 text-blue-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-indigo-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-amber-600" />;
      case 'Grid': return <Grid className="w-5 h-5 text-teal-600" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-sky-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-rose-600" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-emerald-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-600" />;
      case 'Globe2': return <Globe2 className="w-5 h-5 text-emerald-700" />;
      default: return <Radio className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="research" className="py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Badge variant="primary" size="md" className="mb-2">
              Scientific Domains & Specializations
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
              Core Research Areas & Thrusts
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Spanning high-frequency electromagnetic engineering, artificial metasurfaces, flexible wearable electronics, and applied bio-geospatial platforms.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Research Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAreas.map((area) => {
            const isGanga = area.id === 'interdisciplinary-biocircularity';
            return (
              <Card 
                key={area.id} 
                className={`p-6 border transition-all duration-200 hover:shadow-card flex flex-col justify-between ${
                  isGanga ? 'border-emerald-300 bg-gradient-to-br from-white to-emerald-50/30 ring-1 ring-emerald-400/40' : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                      {getAreaIcon(area.icon)}
                    </div>
                    <Badge 
                      variant={isGanga ? 'success' : 'neutral'} 
                      size="sm"
                    >
                      {area.category}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {area.title}
                  </h3>
                  <p className="text-xs font-medium text-blue-700 mt-0.5 mb-2.5">
                    {area.tagline}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {area.description}
                  </p>

                  {/* Key Topics Tags */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[10px] uppercase font-mono font-semibold text-slate-400">Key Research Topics</div>
                    <div className="flex flex-wrap gap-1.5">
                      {area.keyTopics.map((topic, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-mono">
                    Active Projects: <strong className="text-slate-800">{area.activeProjectsCount}</strong>
                  </div>

                  {isGanga ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={onOpenGanga}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs cursor-pointer"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                      iconPosition="right"
                    >
                      Launch Live GIS
                    </Button>
                  ) : (
                    <button
                      onClick={() => onSelectArea(area)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
                    >
                      <span>Details & Scope</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
