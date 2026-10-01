import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Popup,
  Polyline,
  Polygon,
  useMapEvents,
  useMap
} from 'react-leaflet';
import { HyacinthZone, MonitoringStation, RiverSegment } from '../../types';
import { MeasurementTool } from './MeasurementTool';
import { Layers, Eye, Map as MapIcon, Satellite, Mountain } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface RiverMapProps {
  zones: HyacinthZone[];
  stations: MonitoringStation[];
  segments: RiverSegment[];
  selectedZone: HyacinthZone | null;
  onSelectZone: (zone: HyacinthZone) => void;
  height?: string;
}

// Basemaps configurations
const BASEMAPS = {
  standard: {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    icon: <MapIcon className="w-3.5 h-3.5" />
  },
  satellite: {
    name: 'ESRI Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    icon: <Satellite className="w-3.5 h-3.5" />
  },
  terrain: {
    name: 'Topographic',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)',
    icon: <Mountain className="w-3.5 h-3.5" />
  }
};

// Map click handler for drawing tool
const DrawingLayer: React.FC<{
  mode: 'none' | 'polygon' | 'distance';
  points: [number, number][];
  onAddPoint: (point: [number, number]) => void;
}> = ({ mode, points, onAddPoint }) => {
  useMapEvents({
    click(e) {
      if (mode !== 'none') {
        onAddPoint([e.latlng.lat, e.latlng.lng]);
      }
    }
  });

  if (points.length === 0) return null;

  return (
    <>
      {points.map((pt, idx) => (
        <CircleMarker
          key={`draw-pt-${idx}`}
          center={pt}
          radius={5}
          pathOptions={{ color: '#0f766e', fillColor: '#14b8a6', fillOpacity: 0.9 }}
        />
      ))}
      {mode === 'distance' && points.length > 1 && (
        <Polyline positions={points} pathOptions={{ color: '#0284c7', weight: 3, dashArray: '6, 6' }} />
      )}
      {mode === 'polygon' && points.length > 2 && (
        <Polygon positions={points} pathOptions={{ color: '#0f766e', fillColor: '#2dd4bf', fillOpacity: 0.35, weight: 2 }} />
      )}
    </>
  );
};

export const RiverMap: React.FC<RiverMapProps> = ({
  zones,
  stations,
  segments,
  selectedZone,
  onSelectZone,
  height = '560px'
}) => {
  const [basemapKey, setBasemapKey] = useState<keyof typeof BASEMAPS>('satellite');
  const [showStations, setShowStations] = useState(true);
  const [showRiverSegments, setShowRiverSegments] = useState(true);
  const [showHyacinthZones, setShowHyacinthZones] = useState(true);

  // Measurement State
  const [measureMode, setMeasureMode] = useState<'none' | 'polygon' | 'distance'>('none');
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);
  const [calcAreaHa, setCalcAreaHa] = useState<number | null>(null);
  const [calcDistanceM, setCalcDistanceM] = useState<number | null>(null);
  const [estBiomassT, setEstBiomassT] = useState<number | null>(null);

  // Prayagraj coordinates center
  const centerLat = 25.4380;
  const centerLng = 81.8845;

  const handleAddPoint = (point: [number, number]) => {
    const updated = [...drawnPoints, point];
    setDrawnPoints(updated);

    if (measureMode === 'polygon' && updated.length >= 3) {
      // Calculate approximate spherical geodesic area
      let area = 0;
      const R = 6371008.8; // meters
      for (let i = 0; i < updated.length; i++) {
        const p1 = updated[i];
        const p2 = updated[(i + 1) % updated.length];
        const lat1 = (p1[0] * Math.PI) / 180;
        const lat2 = (p2[0] * Math.PI) / 180;
        const lng1 = (p1[1] * Math.PI) / 180;
        const lng2 = (p2[1] * Math.PI) / 180;
        area += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2));
      }
      area = Math.abs((area * R * R) / 2.0);
      const ha = area / 10000.0;
      setCalcAreaHa(ha);
      setEstBiomassT(ha * 32.0);
    } else if (measureMode === 'distance' && updated.length >= 2) {
      let dist = 0;
      const R = 6371008.8;
      for (let i = 0; i < updated.length - 1; i++) {
        const lat1 = (updated[i][0] * Math.PI) / 180;
        const lat2 = (updated[i + 1][0] * Math.PI) / 180;
        const dLat = lat2 - lat1;
        const dLng = ((updated[i + 1][1] - updated[i][1]) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        dist += R * c;
      }
      setCalcDistanceM(dist);
    }
  };

  const handleClearDraw = () => {
    setDrawnPoints([]);
    setCalcAreaHa(null);
    setCalcDistanceM(null);
    setEstBiomassT(null);
  };

  const getZoneColor = (density: string, isSelected: boolean) => {
    if (isSelected) return '#f59e0b'; // Gold border for selected
    switch (density) {
      case 'Very High':
        return '#dc2626'; // Red
      case 'High':
        return '#ea580c'; // Orange
      case 'Moderate':
        return '#ca8a04'; // Amber
      case 'Low':
      default:
        return '#16a34a'; // Green
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900" style={{ height }}>
      {/* Map Element */}
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url={BASEMAPS[basemapKey].url}
          attribution={BASEMAPS[basemapKey].attribution}
        />

        {/* River Segments */}
        {showRiverSegments &&
          segments.map((seg) => {
            const coords = seg.geometry_geojson?.coordinates?.map((c: [number, number]) => [c[1], c[0]]) || [];
            const isGanga = seg.river.toLowerCase().includes('ganga');
            return (
              <Polyline
                key={`seg-${seg.id}`}
                positions={coords}
                pathOptions={{
                  color: isGanga ? '#0284c7' : '#0d9488',
                  weight: isGanga ? 6 : 4,
                  opacity: 0.85
                }}
              >
                <Popup>
                  <div className="p-2 text-xs">
                    <span className="font-bold text-slate-900 block">{seg.name}</span>
                    <span className="text-slate-500">Length: {seg.length_km} km | Priority: {seg.monitoring_priority}</span>
                  </div>
                </Popup>
              </Polyline>
            );
          })}

        {/* Hyacinth Zones Polygons */}
        {showHyacinthZones &&
          zones.map((zone) => {
            const isSelected = selectedZone?.id === zone.id;
            const coords = zone.geometry_geojson?.coordinates?.[0]?.map((c: [number, number]) => [c[1], c[0]]) || [];
            const color = getZoneColor(zone.density_class, isSelected);

            return (
              <Polygon
                key={`zone-${zone.id}`}
                positions={coords}
                pathOptions={{
                  color: isSelected ? '#f59e0b' : color,
                  fillColor: color,
                  fillOpacity: isSelected ? 0.65 : 0.45,
                  weight: isSelected ? 3.5 : 2
                }}
                eventHandlers={{
                  click: () => onSelectZone(zone)
                }}
              >
                <Popup>
                  <div className="p-2.5 text-xs space-y-1">
                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="font-mono font-bold text-confluence-800">{zone.zone_code}</span>
                      <span className="font-semibold text-slate-700">{zone.density_class} Density</span>
                    </div>
                    <span className="font-bold text-slate-900 block pt-0.5">{zone.name}</span>
                    <div className="grid grid-cols-2 gap-1 text-[11px] pt-1 font-mono">
                      <span>Area: {zone.area_ha} ha</span>
                      <span>Biomass: {(zone.area_ha * 32).toFixed(0)} t</span>
                    </div>
                    <button
                      onClick={() => onSelectZone(zone)}
                      className="w-full mt-2 py-1 bg-confluence-700 hover:bg-confluence-800 text-white rounded text-[11px] font-semibold"
                    >
                      Inspect Zone
                    </button>
                  </div>
                </Popup>
              </Polygon>
            );
          })}

        {/* Monitoring Stations */}
        {showStations &&
          stations.map((stn) => (
            <CircleMarker
              key={`stn-${stn.id}`}
              center={[stn.latitude, stn.longitude]}
              radius={7}
              pathOptions={{
                color: '#ffffff',
                fillColor: '#0284c7',
                fillOpacity: 1,
                weight: 2
              }}
            >
              <Popup>
                <div className="p-2.5 text-xs space-y-1">
                  <span className="font-mono text-[10px] text-sky-700 font-bold block">{stn.station_code}</span>
                  <span className="font-bold text-slate-900 block">{stn.name}</span>
                  <span className="text-slate-500 text-[11px] block">{stn.station_type}</span>
                  <div className="text-[11px] font-mono text-slate-700 pt-1">
                    Coordinates: {stn.latitude.toFixed(4)}°N, {stn.longitude.toFixed(4)}°E
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {/* Drawing Layer for Measurement Tool */}
        <DrawingLayer mode={measureMode} points={drawnPoints} onAddPoint={handleAddPoint} />
      </MapContainer>

      {/* Measurement HUD Tool on Top Left */}
      <MeasurementTool
        mode={measureMode}
        onSetMode={setMeasureMode}
        pointsCount={drawnPoints.length}
        calculatedAreaHa={calcAreaHa}
        calculatedDistanceM={calcDistanceM}
        estimatedBiomassT={estBiomassT}
        onClear={handleClearDraw}
      />

      {/* Layer Toggles & Basemap Switcher on Top Right */}
      <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200/90 shadow-md text-xs space-y-2">
        <div className="flex items-center space-x-1.5 font-bold text-slate-800 border-b border-slate-100 pb-1.5">
          <Layers className="w-3.5 h-3.5 text-confluence-700" />
          <span>Basemap & Layers</span>
        </div>

        {/* Basemap Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
          {(Object.keys(BASEMAPS) as (keyof typeof BASEMAPS)[]).map((key) => (
            <button
              key={key}
              onClick={() => setBasemapKey(key)}
              title={BASEMAPS[key].name}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                basemapKey === key
                  ? 'bg-white text-confluence-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {BASEMAPS[key].icon}
              <span className="capitalize">{key}</span>
            </button>
          ))}
        </div>

        {/* Layers Checkboxes */}
        <div className="space-y-1.5 pt-1 text-[11px] text-slate-700">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showHyacinthZones}
              onChange={(e) => setShowHyacinthZones(e.target.checked)}
              className="rounded text-confluence-600 focus:ring-confluence-500"
            />
            <span>Hyacinth Zones ({zones.length})</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showStations}
              onChange={(e) => setShowStations(e.target.checked)}
              className="rounded text-confluence-600 focus:ring-confluence-500"
            />
            <span>Monitoring Stations ({stations.length})</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showRiverSegments}
              onChange={(e) => setShowRiverSegments(e.target.checked)}
              className="rounded text-confluence-600 focus:ring-confluence-500"
            />
            <span>River Channels ({segments.length})</span>
          </label>
        </div>
      </div>

      {/* Legend on Bottom Left */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/90 shadow-xs text-[11px] space-y-1">
        <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">Density Classes</span>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>Very High</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span>High</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Moderate</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};
