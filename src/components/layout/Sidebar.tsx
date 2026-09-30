import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Sprout, 
  Flame, 
  Globe2, 
  CircleDollarSign, 
  FileText, 
  Settings, 
  Satellite, 
  ChevronRight
} from 'lucide-react';
import clsx from 'clsx';
import { StatusTag } from '../ui/StatusTag';

export type PageId = 
  | 'dashboard' 
  | 'river-monitoring' 
  | 'biomass' 
  | 'bioenergy' 
  | 'environment' 
  | 'economics' 
  | 'reports' 
  | 'settings';

interface SidebarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
}) => {
  const navItems: {
    id: PageId;
    label: string;
    icon: React.ElementType;
    badge?: string;
    description: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Intelligence overview & KPIs'
    },
    {
      id: 'river-monitoring',
      label: 'River Map',
      icon: Map,
      badge: 'Live GIS',
      description: 'Ganga & Yamuna reaches'
    },
    {
      id: 'biomass',
      label: 'Biomass Assessment',
      icon: Sprout,
      description: 'Physicochemical profile'
    },
    {
      id: 'bioenergy',
      label: 'Bioenergy Potential',
      icon: Flame,
      badge: '3.2M m³',
      description: 'Biogas & Bio-CNG yields'
    },
    {
      id: 'environment',
      label: 'Environmental Impact',
      icon: Globe2,
      description: 'LCA & GHG mitigation'
    },
    {
      id: 'economics',
      label: 'Circular Economics',
      icon: CircleDollarSign,
      description: 'Financial feasibility model'
    },
    {
      id: 'reports',
      label: 'Reports & Export',
      icon: FileText,
      description: 'Scientific PDF dossier'
    },
    {
      id: 'settings',
      label: 'Satellite & Config',
      icon: Settings,
      description: 'Sensors & mock modes'
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-ink-100 flex flex-col justify-between h-[calc(100vh-65px)] sticky top-[65px] select-none">
      {/* Top Nav List */}
      <div className="p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-semibold text-ink-400 uppercase tracking-wider font-mono">
          Analytical Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={clsx(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-medium transition-all group relative cursor-pointer",
                isActive
                  ? "bg-ganga-50 text-ganga-800 font-semibold shadow-xs"
                  : "text-ink-700 hover:bg-ink-50/80 hover:text-ink-900"
              )}
            >
              {/* Left active marker indicator */}
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-ganga-600 rounded-r-full" />
              )}

              <div className="flex items-center gap-3">
                <div className={clsx(
                  "p-1.5 rounded-lg transition-colors",
                  isActive ? "bg-ganga-500 text-white" : "bg-ink-50 text-ink-500 group-hover:text-ink-800"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs leading-none font-sans flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className={clsx(
                        "text-[9px] px-1.5 py-0.2 rounded-full font-mono",
                        isActive ? "bg-ganga-200 text-ganga-800" : "bg-skywater-100 text-skywater-700"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-ink-400 mt-1 font-normal truncate max-w-[130px]">
                    {item.description}
                  </div>
                </div>
              </div>

              <ChevronRight className={clsx(
                "w-3.5 h-3.5 transition-transform",
                isActive ? "text-ganga-600 translate-x-0.5" : "text-ink-300 opacity-0 group-hover:opacity-100"
              )} />
            </button>
          );
        })}
      </div>

      {/* Bottom Mission Card */}
      <div className="p-3 border-t border-ink-100 bg-background/50 space-y-3">
        <div className="p-3 bg-white border border-ganga-200/70 rounded-xl shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono font-semibold text-ganga-700 uppercase tracking-wider flex items-center gap-1">
              <Satellite className="w-3 h-3 text-ganga-600" />
              Sentinel-2 MSI
            </span>
            <StatusTag type="demo" className="text-[8px] py-0" />
          </div>
          <div className="text-xs font-semibold text-ink-800">
            Prayagraj Reach (10m)
          </div>
          <p className="text-[10px] text-ink-500 mt-0.5 leading-snug">
            Multi-spectral macrophyte detection calibrated for Ganga-Yamuna confluence.
          </p>
          <div className="mt-2.5 pt-2 border-t border-ink-100 flex items-center justify-between text-[10px] text-ink-600 font-mono">
            <span>Revisit: 5 Days</span>
            <span className="text-ganga-700 font-semibold">93.4% Acc</span>
          </div>
        </div>

        <div className="px-2 text-[10px] text-ink-400 flex items-center justify-between">
          <span>Phase 1 — Frontend Mock</span>
          <span className="font-mono">v1.0.4</span>
        </div>
      </div>
    </aside>
  );
};
