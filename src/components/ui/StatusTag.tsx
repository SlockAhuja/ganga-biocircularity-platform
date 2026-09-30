import React from 'react';
import clsx from 'clsx';

interface StatusTagProps {
  type?: 'demo' | 'simulated' | 'active' | 'sentinel' | 'calibrated';
  customText?: string;
  className?: string;
}

export const StatusTag: React.FC<StatusTagProps> = ({ 
  type = 'demo', 
  customText, 
  className = '' 
}) => {
  const configs = {
    demo: {
      dotColor: 'bg-amber-500',
      label: 'DEMO DATA',
      bg: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    simulated: {
      dotColor: 'bg-sky-500',
      label: 'SIMULATED ANALYSIS',
      bg: 'bg-sky-50 text-sky-800 border-sky-200'
    },
    active: {
      dotColor: 'bg-emerald-500 animate-pulse',
      label: 'SYSTEM ACTIVE',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    sentinel: {
      dotColor: 'bg-ganga-500',
      label: 'SENTINEL-2 L2A',
      bg: 'bg-ganga-50 text-ganga-800 border-ganga-200'
    },
    calibrated: {
      dotColor: 'bg-violet-500',
      label: 'ESA COPERNICUS MOCK',
      bg: 'bg-violet-50 text-violet-800 border-violet-200'
    }
  };

  const config = configs[type];
  const displayLabel = customText || config.label;

  return (
    <span className={clsx(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase border",
      config.bg,
      className
    )}>
      <span className={clsx("w-1.5 h-1.5 rounded-full", config.dotColor)} />
      {displayLabel}
    </span>
  );
};
