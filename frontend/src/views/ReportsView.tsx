import React from 'react';
import { HyacinthZone } from '../types';
import { ReportGenerator } from '../components/reports/ReportGenerator';

interface ReportsViewProps {
  zones: HyacinthZone[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ zones }) => {
  return (
    <div className="space-y-6">
      <ReportGenerator zones={zones} />
    </div>
  );
};
