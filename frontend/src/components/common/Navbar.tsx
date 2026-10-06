import React from 'react';
import { UserRole } from '../../types';
import { RoleSwitcher } from './RoleSwitcher';
import { BookOpen, Database, Sparkles, MapPin, Globe, Leaf } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenMethodology: () => void;
  onOpenProvenance: () => void;
  onGoToPublicSite: () => void;
  selectedRegion: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  onOpenMethodology,
  onOpenProvenance,
  onGoToPublicSite,
  selectedRegion
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#DFE8E2] px-6 py-3 flex items-center justify-between">
      {/* Brand & Region Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2E7D5B] to-[#59A978] flex items-center justify-center text-white shadow-xs font-bold text-lg">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-[#17211B]">BioRiver</span>
              <span className="text-[10px] font-mono font-bold bg-[#EAF5EE] text-[#2E7D5B] px-1.5 py-0.5 rounded border border-[#59A978]/30">
                GANGA BIOCIRCULARITY
              </span>
            </div>
            <p className="text-[11px] text-[#68756D] font-medium -mt-0.5">
              Ganga Biocircularity Intelligence Platform
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center pl-4 border-l border-[#DFE8E2] space-x-2 text-xs">
          <MapPin className="w-3.5 h-3.5 text-[#2E7D5B]" />
          <span className="font-semibold text-[#17211B]">{selectedRegion}</span>
        </div>
      </div>

      {/* Center Mode / Status */}
      <div className="hidden md:flex items-center space-x-2 bg-[#F6FAF7] px-3.5 py-1.5 rounded-full border border-[#DFE8E2] text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-[#2E7D5B] live-pulse"></span>
        <span className="font-semibold text-[#17211B]">DEMO MODE (Prayagraj Confluence)</span>
        <span className="text-slate-300">|</span>
        <span className="text-[#68756D]">Sentinel-2 MSI 10m WGS84</span>
      </div>

      {/* Right Controls: Public Site, Methodology, Provenance, Role Switcher */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onGoToPublicSite}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#DFE8E2] bg-white hover:bg-slate-50 text-[#17211B] text-xs font-semibold transition-colors shadow-xs"
          title="View public BioRiver landing page"
        >
          <Globe className="w-3.5 h-3.5 text-[#4B8DB8]" />
          <span className="hidden sm:inline">bioriver.in</span>
        </button>

        <button
          onClick={onOpenMethodology}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#DFE8E2] bg-white hover:bg-slate-50 text-[#17211B] text-xs font-semibold transition-colors shadow-xs"
          title="Inspect scientific calculation formulas"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#2E7D5B]" />
          <span className="hidden sm:inline">Methodology</span>
        </button>

        <button
          onClick={onOpenProvenance}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#DFE8E2] bg-white hover:bg-slate-50 text-[#17211B] text-xs font-semibold transition-colors shadow-xs"
          title="Data sources, sensors, and limitations"
        >
          <Database className="w-3.5 h-3.5 text-[#4B8DB8]" />
          <span className="hidden sm:inline">Data Sources</span>
        </button>

        <RoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />
      </div>
    </header>
  );
};
