import React from 'react';
import { 
  Sprout, 
  Droplets, 
  Flame, 
  Recycle, 
  Globe2, 
  IndianRupee,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Card } from '../ui/Card';
import { mockKPIData } from '../../data/mockData';

export const KPIGrid: React.FC = () => {
  const kpis = [
    {
      key: 'biomass',
      data: mockKPIData.biomassMonitored,
      icon: Sprout,
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-50 border-emerald-200',
      accentColor: 'border-l-emerald-500'
    },
    {
      key: 'coverage',
      data: mockKPIData.hyacinthCoverage,
      icon: Droplets,
      iconColor: 'text-skywater-700',
      iconBg: 'bg-skywater-50 border-skywater-200',
      accentColor: 'border-l-skywater-500'
    },
    {
      key: 'biogas',
      data: mockKPIData.biogasPotential,
      icon: Flame,
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-50 border-amber-200',
      accentColor: 'border-l-amber-500'
    },
    {
      key: 'recovery',
      data: mockKPIData.resourceRecovery,
      icon: Recycle,
      iconColor: 'text-ganga-700',
      iconBg: 'bg-ganga-50 border-ganga-200',
      accentColor: 'border-l-ganga-500'
    },
    {
      key: 'ghg',
      data: mockKPIData.ghgReduction,
      icon: Globe2,
      iconColor: 'text-teal-700',
      iconBg: 'bg-teal-50 border-teal-200',
      accentColor: 'border-l-teal-500'
    },
    {
      key: 'economic',
      data: mockKPIData.economicValue,
      icon: IndianRupee,
      iconColor: 'text-indigo-700',
      iconBg: 'bg-indigo-50 border-indigo-200',
      accentColor: 'border-l-indigo-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((item) => {
        const Icon = item.icon;
        const isNegative = item.data.trend.startsWith('-');
        return (
          <Card 
            key={item.key} 
            hoverEffect 
            className={`p-4 border-l-4 ${item.accentColor} transition-all duration-200 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-medium text-ink-500 uppercase tracking-wider font-mono">
                  {item.data.label}
                </span>
                <div className={`p-1.5 rounded-lg border ${item.iconBg} ${item.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold text-ink-900 tracking-tight font-sans">
                  {item.data.value}
                </span>
                <span className="text-xs font-semibold text-ink-500">
                  {item.data.unit}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-ink-50 flex items-center justify-between text-[11px]">
              <span className={`inline-flex items-center font-medium gap-0.5 ${
                isNegative ? 'text-emerald-600' : 'text-ganga-700'
              }`}>
                {isNegative ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <TrendingUp className="w-3 h-3" />
                )}
                {item.data.trend}
              </span>
              <span className="text-ink-400 font-normal">
                {item.data.period}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
