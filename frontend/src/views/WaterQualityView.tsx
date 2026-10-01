import React from 'react';
import { WaterQualityObservation, MonitoringStation } from '../types';
import { WaterQualityDashboard } from '../components/waterQuality/WaterQualityDashboard';

interface WaterQualityViewProps {
  observations: WaterQualityObservation[];
  stations: MonitoringStation[];
}

export const WaterQualityView: React.FC<WaterQualityViewProps> = ({ observations, stations }) => {
  return (
    <div className="space-y-6">
      <WaterQualityDashboard observations={observations} stations={stations} />
    </div>
  );
};
