import React from 'react';
import { 
  Target, 
  Compass, 
  Users2, 
  CheckCircle2, 
  Microscope
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const AboutSection: React.FC<{ onExploreCollab: () => void }> = ({ onExploreCollab: _onExploreCollab }) => {
  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" size="md" className="mb-3">
            Academic & Institutional Vision
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
            Transforming Fundamental Electromagnetics into Scalable Societal & Industrial Solutions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            A research and collaboration initiative dedicated to high-frequency wireless innovation, conformal wearable sensors, AI-accelerated electromagnetic modeling, and sustainable interdisciplinary bio-geospatial platforms.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Research Purpose */}
          <Card className="p-6 bg-slate-50/50 border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Purpose & Mission
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To conduct world-class scientific inquiry into engineered electromagnetic materials, flexible conformal electronics, and 5G/6G communication systems while generating peer-reviewed publications and IP with international academic partners.
              </p>
            </div>
            <ul className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Q1/Q2 IEEE & Elsevier Journal Publications</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Patented wearable health & RF architectures</span>
              </li>
            </ul>
          </Card>

          {/* Pillar 2: Institutional Vision */}
          <Card className="p-6 bg-slate-50/50 border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Institutional Vision
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To build vibrant, cross-disciplinary bridges linking Indian academic institutions (IITs, BITS, MIT-ADT, CSIR labs) with premier international research universities in South Korea, France, and Europe through structured bilateral frameworks.
              </p>
            </div>
            <ul className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Bilateral faculty & student exchanges</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Shared computational & testbed infrastructure</span>
              </li>
            </ul>
          </Card>

          {/* Pillar 3: Collaboration Objectives */}
          <Card className="p-6 bg-slate-50/50 border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Collaboration Objectives
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Empowering engineering students and early-career faculty through hands-on full-wave simulation workshops (CST Studio, HFSS), sponsored R&D proposal co-authoring, and interdisciplinary flagship initiatives.
              </p>
            </div>
            <ul className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Sponsored project grants (DST, CSIR, NRF)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Industry-ready student internships & mentoring</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Laboratory & Measurement Capabilities */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-medium mb-3">
                <Microscope className="w-3.5 h-3.5" />
                LABORATORY CAPABILITIES
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Comprehensive RF, Metamaterial & Sensor Characterization Testbed
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Equipped with simulation suites and advanced high-frequency hardware for complete lifecycle prototyping from analytical design to measurement.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
                <div className="font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  EM Full-Wave Solvers
                </div>
                <p className="text-slate-400 text-[11px]">
                  CST Studio Suite, Ansys HFSS, Keysight ADS, MATLAB Optimization Toolboxes for complex 3D structures.
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
                <div className="font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  RF Measurement & VNA
                </div>
                <p className="text-slate-400 text-[11px]">
                  Vector Network Analyzers (VNA up to 40 GHz), Spectrum Analyzers, Noise Figure Analyzers, Anechoic Chamber testing.
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
                <div className="font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Flexible Prototyping & Printing
                </div>
                <p className="text-slate-400 text-[11px]">
                  Conductive ink screen printing, PDMS polymer molding, laser micro-machining, substrate dielectric probe kits.
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
                <div className="font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Geospatial & Edge Compute
                </div>
                <p className="text-slate-400 text-[11px]">
                  Sentinel-2 Multi-Spectral Ingestion, GPU workstations for Deep Learning EM surrogate modeling and river hydrography.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
