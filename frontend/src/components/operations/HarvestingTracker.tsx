import React, { useState } from 'react';
import { HarvestingRecord, FieldObservation, HyacinthZone } from '../../types';
import { Tractor, Plus, MapPin, Calendar, Clock, Fuel, CheckCircle2, Send } from 'lucide-react';

interface HarvestingTrackerProps {
  records: HarvestingRecord[];
  observations: FieldObservation[];
  zones: HyacinthZone[];
  onSubmitObservation: (data: any) => Promise<void>;
}

export const HarvestingTracker: React.FC<HarvestingTrackerProps> = ({
  records,
  observations,
  zones,
  onSubmitObservation
}) => {
  // Form state
  const [stationName, setStationName] = useState('Sangam Confluence Left Bank');
  const [latitude, setLatitude] = useState(25.4285);
  const [longitude, setLongitude] = useState(81.8910);
  const [density, setDensity] = useState('Very High');
  const [coveragePct, setCoveragePct] = useState(85);
  const [appearance, setAppearance] = useState('Dense floating mat with deep root entanglement');
  const [observerName, setObserverName] = useState('Field Officer Verma');
  const [notes, setNotes] = useState('Mechanical harvester boom deployed; clearing main boating fairway.');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmitObservation({
        station_name: stationName,
        latitude,
        longitude,
        hyacinth_density: density,
        coverage_pct: coveragePct,
        water_appearance: appearance,
        observer_name: observerName,
        notes
      });
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Mechanical Harvesting Operations & Field Surveys</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Log amphibious weed skimmer operations, fuel consumption, and ground-truth GPS survey entries
          </p>
        </div>
        <span className="text-xs font-mono bg-confluence-100 text-confluence-800 px-2.5 py-1 rounded-lg font-semibold">
          Fleet: 4 Amphibious Skimmers Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Cols: Harvesting Operations Log Table */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-sm">Completed Harvesting Records</h4>
            <span className="text-xs text-slate-500">{records.length} Recorded Operations</span>
          </div>

          <div className="space-y-3">
            {records.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 space-y-2.5 text-xs transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                      <Tractor className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-bold text-slate-900">{r.harvesting_method}</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    {r.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-slate-700 pt-1">
                  <div className="bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Biomass Cleared</span>
                    <span className="font-bold text-slate-900 text-sm">{r.biomass_collected_t} t</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Removal Eff.</span>
                    <span className="font-bold text-confluence-800 text-sm">{r.removal_efficiency_pct}%</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Fuel Consumed</span>
                    <span className="font-bold text-amber-700 text-sm">{r.fuel_consumed_liters} L</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block font-sans">Haul Distance</span>
                    <span className="font-bold text-sky-700 text-sm">{r.transport_distance_km} km</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                  <span>Destination: {r.destination_facility}</span>
                  <span>{new Date(r.harvest_date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1-Col: Field Observation Ground-Truthing Form */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <MapPin className="w-4 h-4 text-confluence-700" />
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Log Field Ground-Truth Survey</h4>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Station / Reach Name</label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-confluence-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">GPS Lat (°N)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">GPS Lng (°E)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Density Class</label>
                <select
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5"
                >
                  <option value="Very High">Very High</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Coverage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={coveragePct}
                  onChange={(e) => setCoveragePct(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Water Appearance / Weed State</label>
              <input
                type="text"
                value={appearance}
                onChange={(e) => setAppearance(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Observer Name</label>
              <input
                type="text"
                value={observerName}
                onChange={(e) => setObserverName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Field Operational Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
              ></textarea>
            </div>

            {successMsg && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 text-xs flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Field observation logged and synced with GIS database!</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-confluence-700 hover:bg-confluence-800 text-white rounded-xl font-semibold transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Transmitting...' : 'Submit Ground-Truth Observation'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
