import React from 'react';
import {
  LayoutDashboard,
  Map,
  Satellite,
  Tractor,
  Leaf,
  Zap,
  Package,
  Droplets,
  Trees,
  TrendingUp,
  RefreshCw,
  FileText,
  Database,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

export type TabKey =
  | 'dashboard'
  | 'gis'
  | 'satellite'
  | 'fieldOps'
  | 'biomass'
  | 'harvesting'
  | 'bioenergy'
  | 'products'
  | 'waterQuality'
  | 'environment'
  | 'economics'
  | 'circularity'
  | 'reports'
  | 'dataExplorer'
  | 'methodology'
  | 'admin';

interface SidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  selectedZoneCode?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, selectedZoneCode }) => {
  const groups = [
    {
      title: 'Core Intelligence',
      items: [
        { key: 'dashboard' as TabKey, label: 'Executive Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { key: 'gis' as TabKey, label: 'River GIS Studio', icon: <Map className="w-4 h-4" />, badge: 'WGS84' },
        { key: 'satellite' as TabKey, label: 'Satellite Earth Obs', icon: <Satellite className="w-4 h-4" />, badge: 'MSI 10m' }
      ]
    },
    {
      title: 'Biomass & Field Ops',
      items: [
        { key: 'fieldOps' as TabKey, label: 'Field Operations', icon: <Tractor className="w-4 h-4" /> },
        { key: 'biomass' as TabKey, label: 'Biomass Quantification', icon: <Leaf className="w-4 h-4" /> },
        { key: 'harvesting' as TabKey, label: 'Harvesting Logistics', icon: <Tractor className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Resource Recovery',
      items: [
        { key: 'bioenergy' as TabKey, label: 'Bioenergy Simulator', icon: <Zap className="w-4 h-4" />, badge: 'SATAT' },
        { key: 'products' as TabKey, label: 'Products & Compost', icon: <Package className="w-4 h-4" /> },
        { key: 'waterQuality' as TabKey, label: 'Water Quality & Metals', icon: <Droplets className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Impact & Economics',
      items: [
        { key: 'environment' as TabKey, label: 'Environmental LCA', icon: <Trees className="w-4 h-4" /> },
        { key: 'economics' as TabKey, label: 'Economic Valuation', icon: <TrendingUp className="w-4 h-4" /> },
        { key: 'circularity' as TabKey, label: 'Circularity Flow', icon: <RefreshCw className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Research & Governance',
      items: [
        { key: 'reports' as TabKey, label: 'Scientific Reports', icon: <FileText className="w-4 h-4" />, badge: 'PDF' },
        { key: 'dataExplorer' as TabKey, label: 'Data Explorer', icon: <Database className="w-4 h-4" /> },
        { key: 'methodology' as TabKey, label: 'Research Methodology', icon: <BookOpen className="w-4 h-4" /> },
        { key: 'admin' as TabKey, label: 'System Admin', icon: <ShieldCheck className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#DFE8E2] flex flex-col justify-between p-4 shrink-0 min-h-[calc(100vh-61px)] overflow-y-auto">
      <div className="space-y-5">
        {groups.map((grp, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#68756D] px-3">
              {grp.title}
            </span>
            <nav className="mt-1 space-y-0.5">
              {grp.items.map((item) => {
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => onSelectTab(item.key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#EAF5EE] text-[#2E7D5B] border border-[#59A978]/40 shadow-xs'
                        : 'text-[#68756D] hover:text-[#17211B] hover:bg-[#F6FAF7] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={isActive ? 'text-[#2E7D5B]' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          isActive
                            ? 'bg-[#2E7D5B] text-white'
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
        ))}

        {/* Focus Zone Indicator */}
        {selectedZoneCode && (
          <div className="p-3 bg-[#EAF5EE] rounded-2xl border border-[#59A978]/30 text-xs">
            <span className="text-[9px] uppercase font-bold text-[#2E7D5B] tracking-wider">
              Active Focus Reach
            </span>
            <div className="font-bold text-[#17211B] mt-0.5 flex items-center justify-between">
              <span>{selectedZoneCode}</span>
              <span className="text-[9px] font-mono bg-[#2E7D5B] text-white px-1.5 py-0.5 rounded font-bold">
                Synced
              </span>
            </div>
            <p className="text-[10px] text-[#68756D] mt-0.5">Calculations synced across all modules</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-[#DFE8E2] space-y-1 text-[10px] text-[#68756D]">
        <div className="flex justify-between items-center">
          <span>Prayagraj Study:</span>
          <span className="font-mono text-[#17211B] font-bold">25.426°N, 81.884°E</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Platform Release:</span>
          <span className="font-mono text-[#2E7D5B] font-bold">v1.0-Production</span>
        </div>
      </div>
    </aside>
  );
};
