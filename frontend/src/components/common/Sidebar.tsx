import React from 'react';
import {
  LayoutDashboard,
  Map,
  Leaf,
  Zap,
  RefreshCw,
  Droplets,
  Tractor,
  Trees,
  TrendingUp,
  FileText
} from 'lucide-react';

export type TabKey =
  | 'dashboard'
  | 'gis'
  | 'biomass'
  | 'bioenergy'
  | 'circularity'
  | 'waterQuality'
  | 'harvesting'
  | 'environment'
  | 'economics'
  | 'reports';

interface SidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  selectedZoneCode?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, selectedZoneCode }) => {
  const navItems: { key: TabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'dashboard', label: 'Executive Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: 'gis', label: 'River GIS Intelligence', icon: <Map className="w-4 h-4" />, badge: 'Map-First' },
    { key: 'biomass', label: 'Biomass Intelligence', icon: <Leaf className="w-4 h-4" /> },
    { key: 'bioenergy', label: 'Bioenergy Simulator', icon: <Zap className="w-4 h-4" /> },
    { key: 'circularity', label: 'Circularity Flow', icon: <RefreshCw className="w-4 h-4" /> },
    { key: 'waterQuality', label: 'Ganga Water & Metals', icon: <Droplets className="w-4 h-4" /> },
    { key: 'harvesting', label: 'Harvest & Field Ops', icon: <Tractor className="w-4 h-4" /> },
    { key: 'environment', label: 'Environmental LCA', icon: <Trees className="w-4 h-4" /> },
    { key: 'economics', label: 'Economic Valuation', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'reports', label: 'Scientific Reports', icon: <FileText className="w-4 h-4" />, badge: 'PDF' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between p-4 shrink-0 min-h-[calc(100vh-61px)]">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
            Intelligence Modules
          </span>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onSelectTab(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-confluence-50 text-confluence-900 border border-confluence-200/70 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={isActive ? 'text-confluence-700' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-confluence-200/60 text-confluence-900 font-bold'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Context / Active Target */}
        {selectedZoneCode && (
          <div className="p-3 bg-confluence-50/70 rounded-xl border border-confluence-200 text-xs">
            <span className="text-[10px] uppercase font-bold text-confluence-800 tracking-wider">
              Active Focus Zone
            </span>
            <div className="font-bold text-slate-900 mt-0.5 flex items-center justify-between">
              <span>{selectedZoneCode}</span>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                Linked
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Calculations synced across all modules</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
        <div className="flex justify-between items-center">
          <span>Region Center:</span>
          <span className="font-mono text-slate-700">25.426°N, 81.884°E</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Platform Build:</span>
          <span className="font-mono text-slate-700">v1.0-research</span>
        </div>
      </div>
    </aside>
  );
};
