import React from 'react';
import { UserRole } from '../../types';
import { RoleSwitcher } from './RoleSwitcher';
import { BookOpen, Database, Sparkles, MapPin, Radio } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenMethodology: () => void;
  onOpenProvenance: () => void;
  selectedRegion: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  onOpenMethodology,
  onOpenProvenance,
  selectedRegion
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-3 flex items-center justify-between">
      {/* Brand & Region Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-confluence-700 to-emerald-500 flex items-center justify-center text-white shadow-sm font-bold text-lg">
            🌿
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900">GANGA BIOCIRCULARITY</span>
              <span className="text-[10px] font-mono font-bold bg-confluence-100 text-confluence-800 px-1.5 py-0.5 rounded border border-confluence-200">
                RESEARCH PLATFORM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium -mt-0.5">
              Satellite + GIS + Biomass + Bioenergy + Circular Economy
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center pl-4 border-l border-slate-200 space-x-2 text-xs">
          <MapPin className="w-3.5 h-3.5 text-confluence-700" />
          <span className="font-semibold text-slate-700">{selectedRegion}</span>
        </div>
      </div>

      {/* Center Mode / Status */}
      <div className="hidden md:flex items-center space-x-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse"></span>
        <span className="font-semibold text-slate-800">DEMONSTRATION & PROTOTYPE MODE</span>
        <span className="text-slate-400">|</span>
        <span className="text-slate-600">Sentinel-2 MSI 10m</span>
      </div>

      {/* Right Controls: Methodology, Provenance, Role Switcher */}
      <div className="flex items-center space-x-2.5">
        <button
          onClick={onOpenMethodology}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-xs"
          title="Inspect scientific calculation formulas"
        >
          <BookOpen className="w-3.5 h-3.5 text-confluence-700" />
          <span className="hidden sm:inline">Methodology</span>
        </button>

        <button
          onClick={onOpenProvenance}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-xs"
          title="Data sources, sensors, and limitations"
        >
          <Database className="w-3.5 h-3.5 text-river-700" />
          <span className="hidden sm:inline">Data Sources</span>
        </button>

        <RoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />
      </div>
    </header>
  );
};
