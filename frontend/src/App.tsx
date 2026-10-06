import React, { useState, useEffect } from 'react';
import {
  UserRole,
  HyacinthZone,
  MonitoringStation,
  RiverSegment,
  BiomassAssessment,
  CircularityScore,
  EnvironmentalImpact,
  WaterQualityObservation,
  HarvestingRecord,
  FieldObservation
} from './types';
import {
  getRiverSegments,
  getMonitoringStations,
  getHyacinthZones,
  getBiomassAssessments,
  getCircularityScore,
  getEnvironmentalImpact,
  getWaterQualityObservations,
  getHarvestingRecords,
  submitFieldObservation
} from './services/api';
import { Navbar } from './components/common/Navbar';
import { Sidebar, TabKey } from './components/common/Sidebar';
import { MethodologyModal } from './components/common/MethodologyModal';
import { DataProvenanceModal } from './components/common/DataProvenanceModal';
import { LoginModal } from './components/common/LoginModal';

// Views
import { LandingPageView } from './views/LandingPageView';
import { DashboardView } from './views/DashboardView';
import { GisView } from './views/GisView';
import { SatelliteView } from './views/SatelliteView';
import { FieldOpsView } from './views/FieldOpsView';
import { BiomassView } from './views/BiomassView';
import { HarvestingView } from './views/HarvestingView';
import { BioenergyView } from './views/BioenergyView';
import { ProductsView } from './views/ProductsView';
import { WaterQualityView } from './views/WaterQualityView';
import { EnvironmentView } from './views/EnvironmentView';
import { EconomicsView } from './views/EconomicsView';
import { CircularityView } from './views/CircularityView';
import { ReportsView } from './views/ReportsView';
import { DataExplorerView } from './views/DataExplorerView';
import { MethodologyView } from './views/MethodologyView';
import { AdminView } from './views/AdminView';

export function App() {
  const isPublicLandingHost = typeof window !== 'undefined' && (
    window.location.hostname === 'bioriver.in' ||
    window.location.hostname === 'www.bioriver.in' ||
    window.location.search.includes('view=landing')
  );
  const [viewMode, setViewMode] = useState<'app' | 'landing'>(isPublicLandingHost ? 'landing' : 'app');
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('RESEARCHER');
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isProvenanceOpen, setIsProvenanceOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Core Data States
  const [zones, setZones] = useState<HyacinthZone[]>([]);
  const [stations, setStations] = useState<MonitoringStation[]>([]);
  const [segments, setSegments] = useState<RiverSegment[]>([]);
  const [assessments, setAssessments] = useState<BiomassAssessment[]>([]);
  const [waterObs, setWaterObs] = useState<WaterQualityObservation[]>([]);
  const [harvestingLogs, setHarvestingLogs] = useState<HarvestingRecord[]>([]);
  const [fieldObs, setFieldObs] = useState<FieldObservation[]>([]);
  const [circularity, setCircularity] = useState<CircularityScore>({
    assessment_name: 'Prayagraj Circularity Assessment',
    overall_circularity_score: 81.4,
    biomass_recovery_subscore: 84.5,
    resource_conversion_subscore: 88.5,
    nutrient_recovery_subscore: 82.0,
    waste_diversion_subscore: 92.0,
    energy_recovery_subscore: 78.0,
    methodology_version: 'v1.0-Circularity-Index-Prayagraj'
  });
  const [impact, setImpact] = useState<EnvironmentalImpact>({
    assessment_name: 'LCA Environmental Impact Model',
    ghg_avoidance_kg_co2e: 121400.0,
    waste_diverted_t: 1170.4,
    water_bod_reduction_kg: 7140.0,
    fossil_fuel_offset_kg_cng: 16840.0,
    grid_power_offset_kwh: 56000.0,
    nitrogen_recycled_kg: 497.7,
    phosphorus_recycled_kg: 331.8,
    potassium_recycled_kg: 426.6,
    river_surface_cleared_ha: 38.6,
    methodology_version: 'v1.1-LCA-Tier2-IPCC'
  });

  // Selected Zone & Simulator Biomass sync
  const [selectedZone, setSelectedZone] = useState<HyacinthZone | null>(null);
  const [simulationBiomass, setSimulationBiomass] = useState<number>(518.0);

  useEffect(() => {
    // Load initial data concurrently
    Promise.all([
      getRiverSegments(),
      getMonitoringStations(),
      getHyacinthZones(),
      getBiomassAssessments(),
      getCircularityScore(),
      getEnvironmentalImpact(),
      getWaterQualityObservations(),
      getHarvestingRecords()
    ]).then(([segs, stns, zns, bioAss, circ, imp, wObs, hRecs]) => {
      setSegments(segs);
      setStations(stns);
      setZones(zns);
      setAssessments(bioAss);
      setCircularity(circ);
      setImpact(imp);
      setWaterObs(wObs);
      setHarvestingLogs(hRecs);

      // Default selection to first zone (Sangam Embayment)
      if (zns.length > 0) {
        setSelectedZone(zns[0]);
      }
    });
  }, []);

  const handleSelectZone = (zone: HyacinthZone) => {
    setSelectedZone(zone);
    const biomassT = zone ? zone.area_ha * 32.0 : 500;
    setSimulationBiomass(biomassT);
  };

  const handleSendToSimulator = (biomassT: number) => {
    setSimulationBiomass(biomassT);
    setActiveTab('bioenergy');
  };

  const handleSubmitFieldObservation = async (formData: any) => {
    const newObs = await submitFieldObservation(formData);
    setFieldObs((prev) => [newObs, ...prev]);
  };

  if (viewMode === 'landing') {
    return (
      <>
        <LandingPageView
          onEnterPlatform={() => setViewMode('app')}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
          onLoginSuccess={() => {
            setIsLoginOpen(false);
            setViewMode('app');
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6FAF7] flex flex-col font-sans text-[#17211B]">
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenProvenance={() => setIsProvenanceOpen(true)}
        onGoToPublicSite={() => setViewMode('landing')}
        selectedRegion="Prayagraj Confluence"
      />

      {/* Main Shell: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          selectedZoneCode={selectedZone?.zone_code}
        />

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              zones={zones}
              stations={stations}
              segments={segments}
              assessments={assessments}
              circularity={circularity}
              impact={impact}
              selectedZone={selectedZone}
              onSelectZone={handleSelectZone}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'gis' && (
            <GisView
              zones={zones}
              stations={stations}
              segments={segments}
              assessments={assessments}
              selectedZone={selectedZone}
              onSelectZone={handleSelectZone}
              onSendToSimulator={handleSendToSimulator}
              onNavigateToBiomass={() => setActiveTab('biomass')}
            />
          )}

          {activeTab === 'satellite' && (
            <SatelliteView />
          )}

          {activeTab === 'fieldOps' && (
            <FieldOpsView
              stations={stations}
              zones={zones}
              observations={fieldObs}
              onSubmitObservation={handleSubmitFieldObservation}
            />
          )}

          {activeTab === 'biomass' && (
            <BiomassView
              assessments={assessments}
              zones={zones}
              selectedZone={selectedZone}
              onSelectZone={handleSelectZone}
            />
          )}

          {activeTab === 'harvesting' && (
            <HarvestingView
              records={harvestingLogs}
              observations={fieldObs}
              zones={zones}
              onSubmitObservation={handleSubmitFieldObservation}
            />
          )}

          {activeTab === 'bioenergy' && (
            <BioenergyView simulationBiomass={simulationBiomass} />
          )}

          {activeTab === 'products' && (
            <ProductsView />
          )}

          {activeTab === 'waterQuality' && (
            <WaterQualityView observations={waterObs} stations={stations} />
          )}

          {activeTab === 'environment' && (
            <EnvironmentView impact={impact} />
          )}

          {activeTab === 'economics' && (
            <EconomicsView simulationBiomass={simulationBiomass} />
          )}

          {activeTab === 'circularity' && (
            <CircularityView scoreData={circularity} />
          )}

          {activeTab === 'reports' && (
            <ReportsView zones={zones} />
          )}

          {activeTab === 'dataExplorer' && (
            <DataExplorerView
              zones={zones}
              stations={stations}
              assessments={assessments}
              harvestingLogs={harvestingLogs}
              waterObs={waterObs}
            />
          )}

          {activeTab === 'methodology' && (
            <MethodologyView />
          )}

          {activeTab === 'admin' && (
            <AdminView currentRole={currentRole} />
          )}
        </main>
      </div>

      {/* Methodology & Provenance & Login Modals */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
      <DataProvenanceModal
        isOpen={isProvenanceOpen}
        onClose={() => setIsProvenanceOpen(false)}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onLoginSuccess={() => {
          setIsLoginOpen(false);
          setViewMode('app');
        }}
      />
    </div>
  );
}
