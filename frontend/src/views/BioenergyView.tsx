import React from 'react';
import { ResourceSimulator } from '../components/bioenergy/ResourceSimulator';

interface BioenergyViewProps {
  simulationBiomass: number;
}

export const BioenergyView: React.FC<BioenergyViewProps> = ({ simulationBiomass }) => {
  return (
    <div className="space-y-6">
      <ResourceSimulator initialBiomass={simulationBiomass} />
    </div>
  );
};
