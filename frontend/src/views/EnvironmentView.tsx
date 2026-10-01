import React from 'react';
import { EnvironmentalImpact } from '../types';
import { GHGImpactCard } from '../components/environment/GHGImpactCard';

interface EnvironmentViewProps {
  impact: EnvironmentalImpact;
}

export const EnvironmentView: React.FC<EnvironmentViewProps> = ({ impact }) => {
  return (
    <div className="space-y-6">
      <GHGImpactCard impact={impact} />
    </div>
  );
};
