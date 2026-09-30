import React, { useState, useRef } from 'react';
import { 
  Compass, 
  Sparkles
} from 'lucide-react';
import clsx from 'clsx';
import { MapControls } from './MapControls';
import type { BaseMapStyle, LayerVisibility } from './MapControls';
import { MapLegend } from './MapLegend';
import { SelectedZone } from './SelectedZone';
import { mockMonitoringZones, mockWaterQualityStations } from '../../data/mockData';
import type { MonitoringZone, WaterQualityStation } from '../../data/mockData';
import { StatusTag } from '../ui/StatusTag';

interface MonitoringMapProps {
  onSelectZoneForAnalysis?: (zone: MonitoringZone) => void;
  className?: string;
  initialSelectedZoneId?: string;
}

export const MonitoringMap: React.FC<MonitoringMapProps> = ({
  onSelectZoneForAnalysis,
  className = '',
  initialSelectedZoneId = 'zone-07'
}) => {
  const [baseMap, setBaseMap] = useState<BaseMapStyle>('satellite');
  const [layers, setLayers] = useState<LayerVisibility>({
    water: true,
    vegetation: true,
    hyacinth: true,
    density: true,
    sampling: true
  });
  
  const [selectedZone, setSelectedZone] = useState<MonitoringZone | null>(() => {
    return mockMonitoringZones.find(z => z.id === initialSelectedZoneId) || mockMonitoringZones[0];
  });
  const [hoveredZone, setHoveredZone] = useState<MonitoringZone | null>(null);
  const [hoveredStation, setHoveredStation] = useState<WaterQualityStation | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(13.5);
  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number }>({ lat: 25.4358, lng: 81.8463 });

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const toggleLayer = (layerKey: keyof LayerVisibility) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 17));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 10));
  const handleResetCenter = () => {
    setZoomLevel(13.5);
    setSelectedZone(mockMonitoringZones[0]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    // Map bounding box for Prayagraj confluence
    const lat = 25.4650 - yRatio * (25.4650 - 25.4100);
    const lng = 81.8200 + xRatio * (81.9100 - 81.8200);
    setMouseCoords({ lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)) });
  };

  // SVG coordinate converter for Prayagraj region
  // Bounds: Lat [25.4100, 25.4650], Lng [81.8200, 81.9100]
  const toSvgCoords = (lat: number, lng: number) => {
    const minLat = 25.4100, maxLat = 25.4650;
    const minLng = 81.8200, maxLng = 81.9100;
    const x = ((lng - minLng) / (maxLng - minLng)) * 1000;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 600;
    return { x, y };
  };

  const getDensityColor = (level: string, opacity: number = 0.8) => {
    switch (level) {
      case 'Very High': return `rgba(217, 107, 107, ${opacity})`;
      case 'High': return `rgba(249, 115, 22, ${opacity})`;
      case 'Moderate': return `rgba(230, 162, 60, ${opacity})`;
      default: return `rgba(46, 125, 91, ${opacity})`;
    }
  };

  return (
    <div className={clsx("relative bg-white border border-ink-100 rounded-2xl shadow-card overflow-hidden flex flex-col", className)}>
      {/* Map Card Header */}
      <div className="px-5 py-3.5 border-b border-ink-100 flex items-center justify-between bg-white z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-bold text-ink-900 text-base font-sans">
              Ganga River Monitoring Map
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-md font-medium bg-skywater-100 text-skywater-800 border border-skywater-200">
              Prayagraj • Uttar Pradesh
            </span>
            <StatusTag type="simulated" customText="Multi-Spectral Macrophyte Layer" />
          </div>
          <p className="text-xs text-ink-500 font-normal mt-0.5">
            Triveni Sangam Confluence Reach (18.5 km Stretch) — Sentinel-2 L2A Normalized Difference Indices
          </p>
        </div>

        {/* Live coordinate HUD */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-ink-500 bg-ink-50/80 px-3 py-1.5 rounded-lg border border-ink-100">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-ganga-600" />
            {mouseCoords.lat}° N, {mouseCoords.lng}° E
          </span>
          <span className="text-ink-300">|</span>
          <span>Zoom: {zoomLevel.toFixed(1)}x</span>
          <span className="text-ink-300">|</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            10m Mesh
          </span>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div 
        ref={mapContainerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-[520px] lg:h-[580px] bg-[#E8EFF1] overflow-hidden select-none cursor-crosshair"
      >
        {/* Floating Controls */}
        <MapControls
          baseMap={baseMap}
          onBaseMapChange={setBaseMap}
          layers={layers}
          onToggleLayer={toggleLayer}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetCenter={handleResetCenter}
          onMeasureToggle={() => setIsMeasuring(!isMeasuring)}
          isMeasuring={isMeasuring}
          onDrawToggle={() => setIsDrawing(!isDrawing)}
          isDrawing={isDrawing}
        />

        {/* Floating Legend */}
        <MapLegend />

        {/* Floating Selected Zone Inspector */}
        {selectedZone && (
          <SelectedZone
            zone={selectedZone}
            onClose={() => setSelectedZone(null)}
            onViewDetailedAnalysis={(z) => onSelectZoneForAnalysis?.(z)}
          />
        )}

        {/* Measurement / Drawing Tool Banner */}
        {(isMeasuring || isDrawing) && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-ink-900/90 text-white text-xs px-4 py-1.5 rounded-full backdrop-blur-md shadow-elevated flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amberalert animate-spin" />
            {isMeasuring ? "Measurement Mode: Click on river channel points to calculate surface distance" : "ROI Polygon Drawer: Click on map to trace custom harvesting perimeter"}
          </div>
        )}

        {/* Base Map Graphic Vector Simulation */}
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full object-cover transition-all duration-300"
          style={{
            transform: `scale(${zoomLevel / 13.5})`,
            transformOrigin: '50% 50%'
          }}
        >
          <defs>
            {/* Satellite Terrain Gradient */}
            <linearGradient id="satLand" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={baseMap === 'satellite' ? '#d4dfd8' : baseMap === 'terrain' ? '#e5dec9' : '#f4f7f5'} />
              <stop offset="100%" stopColor={baseMap === 'satellite' ? '#c3d3c8' : baseMap === 'terrain' ? '#d9ceb4' : '#eaf0ec'} />
            </linearGradient>

            {/* River Water Texture */}
            <linearGradient id="gangaWater" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={baseMap === 'satellite' ? '#2b5876' : '#5b9bd5'} />
              <stop offset="50%" stopColor={baseMap === 'satellite' ? '#35688a' : '#4a90c2'} />
              <stop offset="100%" stopColor={baseMap === 'satellite' ? '#204661' : '#3978a8'} />
            </linearGradient>

            <linearGradient id="yamunaWater" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={baseMap === 'satellite' ? '#1f435b' : '#336b94'} />
              <stop offset="100%" stopColor={baseMap === 'satellite' ? '#2b5876' : '#4a90c2'} />
            </linearGradient>

            {/* Density Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Land Surface */}
          <rect width="1000" height="600" fill="url(#satLand)" />

          {/* Grid lines for scientific geospatial grid */}
          <g opacity={baseMap === 'satellite' ? "0.15" : "0.08"} stroke="#17211B" strokeWidth="1" strokeDasharray="4 4">
            <line x1="100" y1="0" x2="100" y2="600" />
            <line x1="300" y1="0" x2="300" y2="600" />
            <line x1="500" y1="0" x2="500" y2="600" />
            <line x1="700" y1="0" x2="700" y2="600" />
            <line x1="900" y1="0" x2="900" y2="600" />
            <line x1="0" y1="100" x2="1000" y2="100" />
            <line x1="0" y1="200" x2="1000" y2="200" />
            <line x1="0" y1="300" x2="1000" y2="300" />
            <line x1="0" y1="400" x2="1000" y2="400" />
            <line x1="0" y1="500" x2="1000" y2="500" />
          </g>

          {/* Riparian Vegetation Layer (NDVI) */}
          {layers.vegetation && (
            <g opacity="0.45">
              <path d="M 0 160 Q 200 170 350 210 Q 550 260 700 310 L 720 280 Q 550 220 330 150 Q 150 110 0 100 Z" fill="#2E7D5B" />
              <path d="M 280 430 Q 420 420 580 390 Q 720 380 900 370 L 920 410 Q 720 420 560 440 Q 380 470 250 500 Z" fill="#64AC8B" />
              <path d="M 600 80 Q 750 110 880 180 Q 950 230 1000 280 L 1000 240 Q 920 180 800 110 Q 680 60 550 40 Z" fill="#2E7D5B" />
            </g>
          )}

          {/* Ganga River Main Stream Channel (Water Layer) */}
          {layers.water && (
            <g>
              <path 
                d="M 0 490 C 180 480 340 460 520 410 C 620 380 690 350 760 340 L 780 380 C 700 400 600 435 480 480 C 300 540 120 570 0 570 Z" 
                fill="url(#yamunaWater)" 
                opacity="0.95"
              />
              
              <path 
                d="M 50 0 C 160 80 280 150 420 220 C 580 300 680 330 760 340 C 850 350 940 370 1000 410 L 1000 490 C 920 440 820 420 740 400 C 650 380 540 330 380 260 C 230 190 120 100 0 0 Z" 
                fill="url(#gangaWater)" 
                opacity="0.95"
              />

              <path 
                d="M 620 340 C 660 330 710 335 735 348 C 720 365 670 372 630 360 Z" 
                fill={baseMap === 'satellite' ? '#cfc1a5' : '#e6decb'} 
                stroke="#b8a786" 
                strokeWidth="1"
              />

              <g stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="6 8">
                <path d="M 120 40 Q 240 120 370 190" fill="none" />
                <path d="M 450 240 Q 600 310 740 345" fill="none" />
                <path d="M 180 510 Q 380 470 560 420" fill="none" />
                <path d="M 780 360 Q 880 380 980 430" fill="none" />
              </g>
            </g>
          )}

          {/* Hyacinth Detection Zones & Floating Mats */}
          {layers.hyacinth && (
            <g id="hyacinth-detections">
              {mockMonitoringZones.map((zone) => {
                const center = toSvgCoords(zone.coordinates[0], zone.coordinates[1]);
                const isSelected = selectedZone?.id === zone.id;
                const isHovered = hoveredZone?.id === zone.id;
                const color = getDensityColor(zone.densityLevel);

                const polyPoints = zone.polyCoords.map(c => {
                  const pt = toSvgCoords(c[0], c[1]);
                  return `${pt.x},${pt.y}`;
                }).join(' ');

                return (
                  <g 
                    key={zone.id} 
                    className="cursor-pointer transition-all duration-150"
                    onClick={() => setSelectedZone(zone)}
                    onMouseEnter={() => setHoveredZone(zone)}
                    onMouseLeave={() => setHoveredZone(null)}
                  >
                    <polygon
                      points={polyPoints}
                      fill={color}
                      fillOpacity={isSelected ? 0.75 : isHovered ? 0.65 : 0.45}
                      stroke={isSelected ? '#17211B' : '#FFFFFF'}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      strokeDasharray={isSelected ? 'none' : '3 2'}
                      filter={isSelected ? "url(#glow)" : undefined}
                    />

                    <circle
                      cx={center.x}
                      cy={center.y}
                      r={isSelected ? 9 : 6}
                      fill={color}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    {zone.riskAssessment === 'Critical' && (
                      <circle
                        cx={center.x}
                        cy={center.y}
                        r={isSelected ? 16 : 12}
                        fill="none"
                        stroke={color}
                        strokeWidth="1.5"
                        opacity="0.8"
                        className="animate-ping origin-center"
                        style={{ transformOrigin: `${center.x}px ${center.y}px` }}
                      />
                    )}

                    <g transform={`translate(${center.x + 10}, ${center.y - 10})`}>
                      <rect
                        x="0"
                        y="0"
                        width={zone.name.length * 6.5 + 24}
                        height="18"
                        rx="4"
                        fill="rgba(23, 33, 27, 0.85)"
                        stroke="rgba(255, 255, 255, 0.4)"
                        strokeWidth="0.5"
                      />
                      <text
                        x="6"
                        y="12"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontFamily="Inter, sans-serif"
                        fontWeight="600"
                      >
                        {zone.name.replace('Monitoring ', '')} • {zone.coverageDensityPercent}%
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          )}

          {/* Water Quality Buoy / Sensor Stations Layer */}
          {layers.sampling && (
            <g id="water-stations">
              {mockWaterQualityStations.map((station) => {
                const pt = toSvgCoords(station.coordinates[0], station.coordinates[1]);
                const isHovered = hoveredStation?.id === station.id;
                
                return (
                  <g 
                    key={station.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredStation(station)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    <rect
                      x={pt.x - 7}
                      y={pt.y - 7}
                      width="14"
                      height="14"
                      rx="3"
                      fill="#7C3AED"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      transform={`rotate(45, ${pt.x}, ${pt.y})`}
                    />
                    <circle cx={pt.x} cy={pt.y} r="2" fill="#FFFFFF" />

                    {isHovered && (
                      <g transform={`translate(${pt.x + 12}, ${pt.y - 28})`}>
                        <rect
                          x="0"
                          y="0"
                          width="140"
                          height="44"
                          rx="6"
                          fill="#17211B"
                          opacity="0.95"
                        />
                        <text x="8" y="14" fill="#A4CFEE" fontSize="9" fontWeight="600">
                          {station.stationCode} : {station.name}
                        </text>
                        <text x="8" y="27" fill="#FFFFFF" fontSize="9">
                          DO: {station.do} mg/L • pH: {station.ph}
                        </text>
                        <text x="8" y="38" fill="#E6A23C" fontSize="8" fontFamily="monospace">
                          BOD: {station.bod} | WQI: {station.wqi}/100
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* Confluence Name & Geographic Landmark Labels */}
          <g fontFamily="Inter, sans-serif" fontWeight="700" opacity="0.8">
            <text x="745" y="335" fill="#17211B" fontSize="11" letterSpacing="0.5">
              TRIVENI SANGAM
            </text>
            <text x="210" y="110" fill="#285880" fontSize="10" fontWeight="600">
              GANGA RIVER (MAIN STEM)
            </text>
            <text x="180" y="470" fill="#285880" fontSize="10" fontWeight="600">
              YAMUNA RIVER
            </text>
            <text x="450" y="180" fill="#66736B" fontSize="9" fontWeight="500">
              Rasoolabad Ghat Reach
            </text>
            <text x="730" y="270" fill="#66736B" fontSize="9" fontWeight="500">
              Daraganj Embankment
            </text>
            <text x="430" y="470" fill="#66736B" fontSize="9" fontWeight="500">
              Naini Industrial Bank
            </text>
          </g>
        </svg>

        {/* Map Bottom Status Bar */}
        <div className="absolute bottom-2 right-4 z-10 flex items-center gap-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] text-ink-500 font-mono border border-ink-100">
          <span>ESA Sentinel-2 MSI L2A</span>
          <span>•</span>
          <span>CRS: EPSG:4326 (WGS84)</span>
          <span>•</span>
          <span className="text-ganga-700 font-medium">Calibrated for Water Hyacinth (E. crassipes)</span>
        </div>
      </div>
    </div>
  );
};
