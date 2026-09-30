import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { KPIGrid } from '../components/dashboard/KPIGrid';
import { MonitoringMap } from '../components/dashboard/MonitoringMap';
import { TimeSeriesChart } from '../components/dashboard/TimeSeriesChart';
import { CircularPathway } from '../components/dashboard/CircularPathway';
import { ImpactCards } from '../components/dashboard/ImpactCards';
import { EconomicsSummary } from '../components/dashboard/EconomicsSummary';
import type { MonitoringZone } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Download, RefreshCw } from 'lucide-react';
import { StatusTag } from '../components/ui/StatusTag';

interface DashboardPageProps {
  onNavigateToModule: (moduleId: string) => void;
  onSelectZone: (zone: MonitoringZone) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateToModule,
  onSelectZone
}) => {
  return (
    <PageContainer
      title="Ganga River Resource Intelligence"
      subtitle="Monitor invasive water hyacinth, quantify biomass resources and visualize their potential for circular bioeconomy applications across the Prayagraj confluence."
      badge={<StatusTag type="active" customText="Live Intelligence Feed" />}
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => window.location.reload()}
          >
            Refresh Telemetry
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={() => onNavigateToModule('reports')}
          >
            Export Dossier
          </Button>
        </>
      }
    >
      {/* 1. KPI Cards Grid */}
      <section aria-label="Key Performance Indicators">
        <KPIGrid />
      </section>

      {/* 2. Hero Map Section */}
      <section aria-label="Geospatial River Map">
        <MonitoringMap 
          onSelectZoneForAnalysis={(zone) => {
            onSelectZone(zone);
            onNavigateToModule('biomass');
          }}
        />
      </section>

      {/* 3. Time Series Dynamics Chart */}
      <section aria-label="Temporal Biomass Evolution">
        <TimeSeriesChart />
      </section>

      {/* 4. Circular Bioeconomy Valorization Pathway */}
      <section aria-label="Circular Recovery Cascade">
        <CircularPathway />
      </section>

      {/* 5. Ecological Impact & Economics Double Grid */}
      <div className="grid grid-cols-1 gap-6">
        <ImpactCards />
        <EconomicsSummary />
      </div>
    </PageContainer>
  );
};
