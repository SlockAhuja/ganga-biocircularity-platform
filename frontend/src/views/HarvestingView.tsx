import React from 'react';
import { HarvestingRecord, FieldObservation, HyacinthZone } from '../types';
import { HarvestingTracker } from '../components/operations/HarvestingTracker';

interface HarvestingViewProps {
  records: HarvestingRecord[];
  observations: FieldObservation[];
  zones: HyacinthZone[];
  onSubmitObservation: (data: any) => Promise<void>;
}

export const HarvestingView: React.FC<HarvestingViewProps> = ({
  records,
  observations,
  zones,
  onSubmitObservation
}) => {
  return (
    <div className="space-y-6">
      <HarvestingTracker
        records={records}
        observations={observations}
        zones={zones}
        onSubmitObservation={onSubmitObservation}
      />
    </div>
  );
};
