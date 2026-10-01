import React from 'react';
import { EconomicBreakdown } from '../components/economics/EconomicBreakdown';

interface EconomicsViewProps {
  simulationBiomass: number;
}

export const EconomicsView: React.FC<EconomicsViewProps> = ({ simulationBiomass }) => {
  return (
    <div className="space-y-6">
      <EconomicBreakdown initialBiomass={simulationBiomass} />
    </div>
  );
};
