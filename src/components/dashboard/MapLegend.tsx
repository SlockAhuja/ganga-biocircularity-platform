import React from 'react';

export const MapLegend: React.FC = () => {
  const densityLevels = [
    { label: 'Low (<25%)', color: 'bg-emerald-500', border: 'border-emerald-600' },
    { label: 'Moderate (25-50%)', color: 'bg-amber-400', border: 'border-amber-500' },
    { label: 'High (50-75%)', color: 'bg-orange-500', border: 'border-orange-600' },
    { label: 'Very High (>75%)', color: 'bg-rose-500', border: 'border-rose-600' }
  ];

  return (
    <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md border border-ink-100/90 rounded-xl shadow-card p-3 pointer-events-auto text-xs max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-500">
          Hyacinth Density (FAI/NDVI)
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {densityLevels.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${item.color} border ${item.border} shadow-xs flex-shrink-0`} />
            <span className="text-[11px] font-medium text-ink-700">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 pt-2 border-t border-ink-100 flex items-center justify-between text-[10px] text-ink-400">
        <span>Confluence Stretch: 18.5 km</span>
        <span className="font-mono">Spatial Res: 10m</span>
      </div>
    </div>
  );
};
