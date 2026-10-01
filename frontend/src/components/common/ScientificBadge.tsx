import React from 'react';
import { ProvenanceType } from '../../types';

interface ScientificBadgeProps {
  type: ProvenanceType;
  label?: string;
  size?: 'sm' | 'md';
}

export const ScientificBadge: React.FC<ScientificBadgeProps> = ({ type, label, size = 'sm' }) => {
  const styles: Record<ProvenanceType, { bg: string; text: string; border: string; defaultLabel: string }> = {
    OBSERVED: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      defaultLabel: 'OBSERVED DATA'
    },
    ESTIMATED: {
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-200',
      defaultLabel: 'ESTIMATED'
    },
    MODELED: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      defaultLabel: 'BIO-MODELED'
    },
    DEMO: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      defaultLabel: 'PROTOTYPE DATA'
    }
  };

  const current = styles[type] || styles.DEMO;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center font-mono font-semibold tracking-wider rounded-md border ${current.bg} ${current.text} ${current.border} ${padding}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
      {label || current.defaultLabel}
    </span>
  );
};
