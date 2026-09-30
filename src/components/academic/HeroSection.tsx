import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Globe2, 
  Award, 
  FileText,
  Users,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../ui/Button';
import { researcherProfile } from '../../data/researchData';

interface HeroSectionProps {
  onExploreResearch: () => void;
  onExploreGangaPlatform: () => void;
  onProposeCollaboration: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreResearch,
  onExploreGangaPlatform,
  onProposeCollaboration
}) => {
  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-16 sm:py-24 border-b border-slate-200/80 overflow-hidden">
      {/* Subtle Background Geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Institutional Badge */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs text-slate-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-mono text-slate-500">ACADEMIC & RESEARCH INITIATIVE</span>
            <span className="text-slate-300">|</span>
            <span className="text-blue-800 font-semibold">Advancing High-Frequency Electromagnetics & Applied AI</span>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-sans">
            Pioneering Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700">Metamaterials, Flexible Antennas</span> & Applied Bio-Geospatial Systems
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl font-normal">
            Bridging fundamental electromagnetic physics, wearable conformal RF engineering, and interdisciplinary Earth Observation intelligence. Fostering collaborative academic ecosystems, student research mentorship, and high-impact funded joint proposals across global universities.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Button
              variant="primary"
              size="lg"
              onClick={onExploreResearch}
              className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Explore Research Domains
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onExploreGangaPlatform}
              className="bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400"
              icon={<Globe2 className="w-4 h-4 text-emerald-700" />}
            >
              🌿 Ganga Biocircularity Platform (Live Demo)
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onProposeCollaboration}
              className="bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100"
              icon={<Users className="w-4 h-4 text-blue-700" />}
            >
              Academic Collaboration
            </Button>
          </div>
        </div>

        {/* Quantitative Research Impact Metrics Grid */}
        <div className="mt-14 pt-10 border-t border-slate-200/90 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-500">Publications</span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans">{researcherProfile.publicationsCount}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">IEEE / Elsevier / Nature</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-500">Citations</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans">{researcherProfile.citationsCount}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">h-Index: {researcherProfile.hIndex}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-500">Patents</span>
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans">{researcherProfile.patentsCount}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Published & Granted</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-500">R&D Grants</span>
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans">{researcherProfile.projectsFunding}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Funded Projects</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-500">Postdoc Tenure</span>
              <Globe2 className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans">SeoulTech</div>
            <p className="text-[11px] text-slate-500 mt-0.5">South Korea (BK21)</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-500">Doctoral Alma Mater</span>
              <ShieldCheck className="w-4 h-4 text-slate-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-sans">BITS Pilani</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Ph.D. in Electromagnetics</p>
          </div>
        </div>
      </div>
    </section>
  );
};
