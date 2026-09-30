import { useState } from 'react';
import { AcademicPortalHome } from './pages/AcademicPortalHome';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import type { PageId } from './components/layout/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { RiverMonitoringPage } from './pages/RiverMonitoringPage';
import { BiomassPage } from './pages/BiomassPage';
import { BioenergyPage } from './pages/BioenergyPage';
import { EnvironmentPage } from './pages/EnvironmentPage';
import { EconomicsPage } from './pages/EconomicsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { mockMonitoringZones } from './data/mockData';
import type { MonitoringZone } from './data/mockData';
import { Menu, X, ArrowLeft } from 'lucide-react';

export function App() {
  const [viewMode, setViewMode] = useState<'academic' | 'ganga-dashboard'>('academic');
  const [currentGangaPage, setCurrentGangaPage] = useState<PageId>('dashboard');
  const [selectedZone, setSelectedZone] = useState<MonitoringZone | null>(mockMonitoringZones[0]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const handleSelectGangaPage = (page: PageId) => {
    setCurrentGangaPage(page);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderGangaPage = () => {
    switch (currentGangaPage) {
      case 'dashboard':
        return (
          <DashboardPage
            onNavigateToModule={(moduleId) => handleSelectGangaPage(moduleId as PageId)}
            onSelectZone={setSelectedZone}
          />
        );
      case 'river-monitoring':
        return <RiverMonitoringPage />;
      case 'biomass':
        return <BiomassPage selectedZone={selectedZone} />;
      case 'bioenergy':
        return <BioenergyPage />;
      case 'environment':
        return <EnvironmentPage />;
      case 'economics':
        return <EconomicsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <DashboardPage
            onNavigateToModule={(moduleId) => handleSelectGangaPage(moduleId as PageId)}
            onSelectZone={setSelectedZone}
          />
        );
    }
  };

  if (viewMode === 'academic') {
    return (
      <AcademicPortalHome
        onOpenGangaPlatform={() => {
          setViewMode('ganga-dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // Live Ganga Biocircularity Platform View with Navigation Back to Portal
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-ganga-100 selection:text-ganga-900 font-sans">
      {/* Return to Academic Portal Switcher Bar */}
      <div className="bg-slate-900 text-white px-4 py-2 border-b border-slate-800 text-xs flex items-center justify-between z-40 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setViewMode('academic');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer font-medium border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Academic & Research Portal</span>
          </button>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="hidden sm:inline-block text-slate-300 font-mono text-[11px]">
            Initiative PI: Dr. Praveen Kumar Sharma (BITS Pilani / SeoulTech)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono">
            ● GIS LIVE DEMO MODE
          </span>
        </div>
      </div>

      {/* Ganga Platform Header */}
      <Header />

      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden bg-white border-b border-ink-100 px-4 py-2 flex items-center justify-between z-20">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-ink-700 p-1.5 rounded-lg bg-ink-50 border border-ink-100 cursor-pointer"
        >
          {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Ganga Navigation Menu</span>
        </button>
        <span className="text-xs font-mono font-medium text-ganga-700 capitalize">
          {currentGangaPage.replace('-', ' ')}
        </span>
      </div>

      {/* Main Container Layout */}
      <div className="flex-1 flex relative">
        {/* Desktop Left Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            currentPage={currentGangaPage}
            onSelectPage={handleSelectGangaPage}
          />
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <div 
              className="fixed inset-0 bg-ink-900/40 backdrop-blur-xs transition-opacity" 
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 bg-white z-50 h-full shadow-2xl flex flex-col">
              <Sidebar
                currentPage={currentGangaPage}
                onSelectPage={handleSelectGangaPage}
              />
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-65px)]">
          {renderGangaPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
