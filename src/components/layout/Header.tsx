import React from 'react';
import { MapPin, Calendar, Clock, Bell, Search } from 'lucide-react';
import { StatusTag } from '../ui/StatusTag';

interface HeaderProps {
  onSearch?: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-ink-100 px-6 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ganga-500 to-ganga-700 flex items-center justify-center text-white shadow-sm ring-2 ring-ganga-100">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-ink-900 tracking-tight text-lg sm:text-xl font-sans">
                  GANGA BIOCIRCULARITY
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-ganga-100 text-ganga-700 border border-ganga-200">
                  v1.0-alpha
                </span>
              </div>
              <p className="text-xs text-ink-500 font-medium tracking-wide">
                Intelligence Platform <span className="text-ink-300">•</span> Satellite-Based Water Hyacinth Monitoring & Circular Recovery
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search & Global Filters */}
        <div className="hidden lg:flex items-center max-w-xs w-full">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search zones, sensors, reports..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-ink-50/70 hover:bg-ink-50 focus:bg-white border border-ink-100 focus:border-ganga-400 rounded-lg outline-none transition-all placeholder:text-ink-400"
            />
          </div>
        </div>

        {/* Right: Location, Datetime & Status */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Location Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-ink-50/80 border border-ink-100 rounded-lg text-xs font-medium text-ink-700">
            <MapPin className="w-3.5 h-3.5 text-ganga-600" />
            <span>Prayagraj, Uttar Pradesh</span>
          </div>

          {/* Temporal Status */}
          <div className="hidden xl:flex items-center gap-3 text-xs text-ink-600 border-l border-ink-100 pl-4">
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-skywater-600" />
              <span>24 May 2026</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-500">
              <Clock className="w-3.5 h-3.5 text-ink-400" />
              <span>10:30 AM IST</span>
            </div>
          </div>

          {/* Satellite Telemetry Indicator */}
          <div className="hidden sm:flex items-center gap-2">
            <StatusTag type="active" customText="System Active" />
            <StatusTag type="sentinel" customText="Sentinel-2B (10m)" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 border-l border-ink-100 pl-3">
            <button 
              title="Telemetry Alerts"
              className="p-2 rounded-lg text-ink-500 hover:text-ink-800 hover:bg-ink-50 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amberalert" />
            </button>
            <div className="flex items-center gap-2 pl-1">
              <div className="w-8 h-8 rounded-full bg-ganga-100 border border-ganga-300 flex items-center justify-center text-ganga-800 font-semibold text-xs">
                GB
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
