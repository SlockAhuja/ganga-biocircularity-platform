import React from 'react';
import { 
  Layers, 
  Eye, 
  Plus, 
  Minus, 
  Crosshair, 
  Ruler, 
  Pentagon
} from 'lucide-react';
import clsx from 'clsx';

export type BaseMapStyle = 'satellite' | 'terrain' | 'standard';

export interface LayerVisibility {
  water: boolean;
  vegetation: boolean;
  hyacinth: boolean;
  density: boolean;
  sampling: boolean;
}

interface MapControlsProps {
  baseMap: BaseMapStyle;
  onBaseMapChange: (style: BaseMapStyle) => void;
  layers: LayerVisibility;
  onToggleLayer: (layerKey: keyof LayerVisibility) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetCenter: () => void;
  onMeasureToggle?: () => void;
  isMeasuring?: boolean;
  onDrawToggle?: () => void;
  isDrawing?: boolean;
}

export const MapControls: React.FC<MapControlsProps> = ({
  baseMap,
  onBaseMapChange,
  layers,
  onToggleLayer,
  onZoomIn,
  onZoomOut,
  onResetCenter,
  onMeasureToggle,
  isMeasuring = false,
  onDrawToggle,
  isDrawing = false,
}) => {
  return (
    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-auto">
      {/* Layer Selector & Toggles Panel */}
      <div className="bg-white/95 backdrop-blur-md border border-ink-100/90 rounded-xl shadow-card p-3 w-56 text-xs transition-all">
        {/* Base Map Mode */}
        <div className="mb-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-ink-400 font-semibold mb-1.5 flex items-center justify-between">
            <span>Map Layers</span>
            <Layers className="w-3 h-3 text-ink-400" />
          </div>
          <div className="grid grid-cols-3 gap-1 bg-ink-50 p-1 rounded-lg">
            {(['satellite', 'terrain', 'standard'] as BaseMapStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => onBaseMapChange(style)}
                className={clsx(
                  "py-1 px-1.5 rounded-md text-[11px] font-medium capitalize text-center transition-all cursor-pointer",
                  baseMap === style
                    ? "bg-white text-ganga-700 shadow-xs font-semibold"
                    : "text-ink-600 hover:text-ink-900"
                )}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Analysis Layers */}
        <div className="pt-2 border-t border-ink-100">
          <div className="text-[10px] font-mono uppercase tracking-wider text-ink-400 font-semibold mb-2 flex items-center justify-between">
            <span>Analysis Layers</span>
            <Eye className="w-3 h-3 text-ink-400" />
          </div>
          
          <div className="space-y-1.5">
            {[
              { key: 'water' as const, label: 'Water Body (NDWI)', color: 'accent-skywater-500' },
              { key: 'vegetation' as const, label: 'Riparian Flora (NDVI)', color: 'accent-emerald-500' },
              { key: 'hyacinth' as const, label: 'Hyacinth Detection', color: 'accent-ganga-500' },
              { key: 'density' as const, label: 'Density Heatmap', color: 'accent-amberalert' },
              { key: 'sampling' as const, label: 'Sensor Stations', color: 'accent-violet-500' }
            ].map((item) => (
              <label 
                key={item.key} 
                className="flex items-center gap-2 cursor-pointer text-ink-700 hover:text-ink-900 select-none py-0.5"
              >
                <input
                  type="checkbox"
                  checked={layers[item.key]}
                  onChange={() => onToggleLayer(item.key)}
                  className={`w-3.5 h-3.5 rounded text-ganga-600 focus:ring-ganga-500 border-ink-200 cursor-pointer ${item.color}`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Tools (Zoom, Measure, Locate) */}
      <div className="bg-white/95 backdrop-blur-md border border-ink-100/90 rounded-xl shadow-card p-1 flex items-center gap-1 w-fit">
        <button
          onClick={onZoomIn}
          title="Zoom in"
          className="p-1.5 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onZoomOut}
          title="Zoom out"
          className="p-1.5 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-50 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-ink-200 mx-0.5" />
        <button
          onClick={onResetCenter}
          title="Locate Confluence Center (Prayagraj)"
          className="p-1.5 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-50 transition-colors"
        >
          <Crosshair className="w-4 h-4 text-ganga-600" />
        </button>
        <button
          onClick={onMeasureToggle}
          title="Measure distance / area"
          className={clsx(
            "p-1.5 rounded-lg transition-colors",
            isMeasuring ? "bg-ganga-100 text-ganga-800" : "text-ink-600 hover:text-ink-900 hover:bg-ink-50"
          )}
        >
          <Ruler className="w-4 h-4" />
        </button>
        <button
          onClick={onDrawToggle}
          title="Draw Area (ROI)"
          className={clsx(
            "p-1.5 rounded-lg transition-colors",
            isDrawing ? "bg-ganga-100 text-ganga-800" : "text-ink-600 hover:text-ink-900 hover:bg-ink-50"
          )}
        >
          <Pentagon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
