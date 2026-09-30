import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { researcherProfile } from '../../data/researchData';

export const Footer: React.FC<{
  onNavigate: (sectionId: string) => void;
  onOpenGanga: () => void;
}> = ({ onNavigate, onOpenGanga }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-14 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-base">
                Ψ
              </div>
              <span className="font-bold text-white text-base tracking-tight font-sans">
                ADVANCED ELECTROMAGNETICS & INTERDISCIPLINARY LAB
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-[11px]">
              Dedicated to high-frequency metamaterials, conformal wearable antenna engineering, next-generation 5G/6G wireless systems, and the Ganga Biocircularity satellite intelligence initiative.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              Lead PI: {researcherProfile.fullName} • Ph.D. (BITS Pilani), Postdoc (SeoulTech)
            </div>
          </div>

          {/* Quick Sitemap */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">Home Overview</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">Academic & Lab Vision</button></li>
              <li><button onClick={() => onNavigate('research')} className="hover:text-white transition-colors cursor-pointer">10 Core Research Thrusts</button></li>
              <li><button onClick={() => onNavigate('profile')} className="hover:text-white transition-colors cursor-pointer">Research Profile</button></li>
              <li><button onClick={() => onNavigate('collaboration')} className="hover:text-white transition-colors cursor-pointer">Academic Collaboration</button></li>
              <li><button onClick={() => onNavigate('partners')} className="hover:text-white transition-colors cursor-pointer">Institutional Synergies</button></li>
              <li><button onClick={() => onNavigate('publications')} className="hover:text-white transition-colors cursor-pointer">Scholarly Publications & Patents</button></li>
            </ul>
          </div>

          {/* Initiatives & Portals */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 font-mono">
              Flagship Portals
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button 
                  onClick={onOpenGanga} 
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🌿 Ganga Biocircularity Platform</span>
                </button>
              </li>
              <li><span className="text-slate-500">Sentinel-2 Multi-Spectral Telemetry</span></li>
              <li><span className="text-slate-500">Wearable PDMS Bio-Antenna Testbed</span></li>
              <li><span className="text-slate-500">Reconfigurable Metasurface Simulation</span></li>
              <li className="pt-2"><button onClick={() => onNavigate('contact')} className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">Contact Desk & Grants</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Academic Integrity Disclaimer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Advanced Electromagnetics & Ganga Biocircularity Research Group.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              Academic & Research Transparency Guaranteed
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
