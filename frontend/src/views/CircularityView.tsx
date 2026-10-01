import React from 'react';
import { CircularityScore } from '../types';
import { CircularFlowDiagram } from '../components/circularity/CircularFlowDiagram';
import { CircularityScorecard } from '../components/circularity/CircularityScorecard';
import { ValueAddedProducts } from '../components/circularity/ValueAddedProducts';

interface CircularityViewProps {
  scoreData: CircularityScore;
}

export const CircularityView: React.FC<CircularityViewProps> = ({ scoreData }) => {
  return (
    <div className="space-y-6">
      <CircularFlowDiagram />
      <CircularityScorecard scoreData={scoreData} />
      <ValueAddedProducts />
    </div>
  );
};
