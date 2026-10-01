import React, { ReactNode } from 'react';
import { ScientificBadge } from './ScientificBadge';
import { ProvenanceType } from '../../types';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  subtitle?: string;
  provenance?: ProvenanceType;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlight?: boolean;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  subtitle,
  provenance = 'ESTIMATED',
  trend,
  highlight = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-5 border transition-all duration-200 ${
        highlight
          ? 'border-confluence-500 ring-2 ring-confluence-100 shadow-sm'
          : 'border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow'
      } ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-confluence-700">
            {icon}
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 tracking-wide uppercase">{title}</span>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
              {unit && <span className="text-sm font-semibold text-slate-500">{unit}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 truncate max-w-[180px]">{subtitle || 'Ganga Basin Scope'}</span>
        <ScientificBadge type={provenance} />
      </div>

      {trend && (
        <div className="mt-2 text-xs flex items-center space-x-1">
          <span className={`font-semibold ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend.value}
          </span>
          <span className="text-slate-400">vs historical baseline</span>
        </div>
      )}
    </div>
  );
};
