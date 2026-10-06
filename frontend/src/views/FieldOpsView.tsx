import React, { useState } from 'react';
import {
  Tractor,
  MapPin,
  Calendar,
  User,
  Droplets,
  Camera,
  PlusCircle,
  CheckCircle2,
  ListFilter,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { MonitoringStation, HyacinthZone, FieldObservation } from '../types';
import { ScientificBadge } from '../components/common/ScientificBadge';

interface FieldOpsViewProps {
  stations: MonitoringStation[];
  zones: HyacinthZone[];
  observations: FieldObservation[];
  onSubmitObservation: (obs: any) => void;
}

export const FieldOpsView: React.FC<FieldOpsViewProps> = ({
  stations,
  zones,
  observations,
  onSubmitObservation
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'form' | 'history'>('form');
  const [selectedStationId, setSelectedStationId] = useState<number>(stations[0]?.id || 1);
  const [observerName, setObserverName] = useState<string>('Dr. S. Kumar (Prayagraj Field Team)');
  const [hyacinthDensity, setHyacinthDensity] = useState<'Low' | 'Medium' | 'High' | 'Very High'>('High');
  const [estimatedCoverage, setEstimatedCoverage] = useState<number>(75);
  const [waterAppearance, setWaterAppearance] = useState<string>('Greenish tint, dense macrophyte clustering');
  const [ph, setPh] = useState<number>(7.4);
  const [doVal, setDoVal] = useState<number>(5.2);
  const [notes, setNotes] = useState<string>('Field survey conducted via motorboat near Sangam ghats. Active vegetative propagation noted.');
  const [photoSelected, setPhotoSelected] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stn = stations.find((s) => s.id === selectedStationId) || stations[0];
    const newObs: FieldObservation = {
      id: Date.now(),
      station_name: stn.name,
      observation_date: new Date().toISOString().split('T')[0],
      latitude: stn.latitude,
      longitude: stn.longitude,
      observer_name: observerName,
      hyacinth_density: hyacinthDensity,
      coverage_pct: estimatedCoverage,
      water_appearance: waterAppearance,
      notes: notes,
      ph_field: ph,
      do_field: doVal,
      photo_urls: photoSelected ? ['photo_sangam_oct2026.jpg'] : []
    };

    onSubmitObservation(newObs);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setActiveSubTab('history');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#EAF5EE] text-[#2E7D5B] rounded-2xl">
            <Tractor className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-[#17211B]">
                Field Operations & Ground Truth Monitoring
              </h2>
              <span className="text-[10px] font-mono bg-[#EAF5EE] text-[#2E7D5B] px-2 py-0.5 rounded font-bold border border-[#59A978]/30">
                Mobile-Ready Portal
              </span>
            </div>
            <p className="text-xs text-[#68756D] mt-0.5">
              Direct field logging for river ground teams, boat operators, and water quality sampling stations.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('form')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'form'
                ? 'bg-white text-[#2E7D5B] shadow-xs'
                : 'text-[#68756D] hover:text-[#17211B]'
            }`}
          >
            New Observation Form
          </button>
          <button
            onClick={() => setActiveSubTab('history')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'history'
                ? 'bg-white text-[#2E7D5B] shadow-xs'
                : 'text-[#68756D] hover:text-[#17211B]'
            }`}
          >
            Observation History ({observations.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'form' ? (
        /* Form Section */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-[#17211B]">Field Survey & Water Sampling Form</h3>
                <ScientificBadge type="OBSERVED" />
              </div>

              {/* Station & Observer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#17211B]">Monitoring Station</label>
                  <select
                    value={selectedStationId}
                    onChange={(e) => setSelectedStationId(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#DFE8E2] text-xs font-semibold text-[#17211B] focus:border-[#2E7D5B] focus:outline-none"
                  >
                    {stations.map((stn) => (
                      <option key={stn.id} value={stn.id}>
                        {stn.name} ({stn.latitude.toFixed(3)}°N, {stn.longitude.toFixed(3)}°E)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#17211B]">Observer / Team Lead</label>
                  <input
                    type="text"
                    value={observerName}
                    onChange={(e) => setObserverName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DFE8E2] text-xs font-semibold text-[#17211B] focus:border-[#2E7D5B] focus:outline-none"
                    placeholder="Enter researcher or operator name"
                    required
                  />
                </div>
              </div>

              {/* Hyacinth Density & Coverage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#17211B]">Observed Hyacinth Density</label>
                  <select
                    value={hyacinthDensity}
                    onChange={(e) => setHyacinthDensity(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-[#DFE8E2] text-xs font-semibold text-[#17211B] focus:border-[#2E7D5B] focus:outline-none"
                  >
                    <option value="Low">Low (&lt; 10 kg/m² fresh)</option>
                    <option value="Medium">Medium (10 - 25 kg/m² fresh)</option>
                    <option value="High">High (25 - 40 kg/m² fresh)</option>
                    <option value="Very High">Very High (&gt; 40 kg/m² fresh)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#17211B]">
                    <span>Estimated Visual Coverage</span>
                    <span className="text-[#2E7D5B]">{estimatedCoverage}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={estimatedCoverage}
                    onChange={(e) => setEstimatedCoverage(Number(e.target.value))}
                    className="w-full accent-[#2E7D5B] cursor-pointer"
                  />
                </div>
              </div>

              {/* Water Quality Parameters */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-[#17211B] block">
                  Field Multi-Probe Parameters
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#F6FAF7] rounded-xl border border-[#DFE8E2]">
                    <span className="text-[10px] text-[#68756D] font-bold block">Field pH Value</span>
                    <input
                      type="number"
                      step="0.1"
                      value={ph}
                      onChange={(e) => setPh(Number(e.target.value))}
                      className="w-full mt-1 font-bold text-sm bg-transparent border-b border-[#2E7D5B] focus:outline-none"
                    />
                  </div>
                  <div className="p-3 bg-[#F6FAF7] rounded-xl border border-[#DFE8E2]">
                    <span className="text-[10px] text-[#68756D] font-bold block">Field DO (mg/L)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={doVal}
                      onChange={(e) => setDoVal(Number(e.target.value))}
                      className="w-full mt-1 font-bold text-sm bg-transparent border-b border-[#2E7D5B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Water Appearance & Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17211B]">Water Appearance & Physical Conditions</label>
                <input
                  type="text"
                  value={waterAppearance}
                  onChange={(e) => setWaterAppearance(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#DFE8E2] text-xs text-[#17211B] focus:border-[#2E7D5B] focus:outline-none"
                  placeholder="e.g. Moderate turbidity, slow flow velocity"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17211B]">Field Survey Notes & Log</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#DFE8E2] text-xs text-[#17211B] focus:border-[#2E7D5B] focus:outline-none"
                  placeholder="Additional observations, boat route, harvesting recommendations..."
                />
              </div>

              {/* Photo Upload Attachment */}
              <div className="p-4 bg-[#F6FAF7] rounded-2xl border border-dashed border-[#DFE8E2] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-xl border border-[#DFE8E2] text-[#2E7D5B]">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#17211B] block">Attach Geo-Tagged Site Photo</span>
                    <span className="text-[10px] text-[#68756D]">
                      {photoSelected ? 'photo_sangam_oct2026.jpg attached (Demo Local Storage)' : 'Supports JPG, PNG with EXIF GPS metadata'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoSelected(!photoSelected)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DFE8E2] bg-white hover:bg-slate-50 text-[#17211B]"
                >
                  {photoSelected ? 'Remove' : 'Select Photo'}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#2E7D5B] hover:bg-[#246549] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Save Observation & Record Ground Truth</span>
              </button>

              {submitSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Field observation recorded successfully in database!</span>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-[#DFE8E2] shadow-xs space-y-4">
              <h4 className="font-bold text-sm text-[#17211B]">Active Prayagraj Stations</h4>
              <div className="space-y-2">
                {stations.map((stn) => (
                  <div key={stn.id} className="p-3 rounded-2xl bg-[#F6FAF7] border border-[#DFE8E2] text-xs">
                    <div className="flex justify-between items-center font-bold text-[#17211B]">
                      <span>{stn.name}</span>
                      <span className="text-[10px] font-mono text-[#2E7D5B]">{stn.station_code}</span>
                    </div>
                    <p className="text-[10px] font-mono text-[#68756D] mt-1">
                      {stn.latitude.toFixed(4)}°N, {stn.longitude.toFixed(4)}°E
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* History Section */
        <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-[#17211B]">Logged Field Observations</h3>
            <span className="text-xs font-mono text-[#68756D]">{observations.length} Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DFE8E2] text-[#68756D] uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Station</th>
                  <th className="py-2.5 px-3">Observer</th>
                  <th className="py-2.5 px-3">Density</th>
                  <th className="py-2.5 px-3">Coverage</th>
                  <th className="py-2.5 px-3">Field pH</th>
                  <th className="py-2.5 px-3">Field DO</th>
                  <th className="py-2.5 px-3">Photo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E2]">
                {observations.map((obs, idx) => (
                  <tr key={idx} className="hover:bg-[#F6FAF7]">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#17211B]">{obs.observation_date}</td>
                    <td className="py-2.5 px-3">{obs.station_name}</td>
                    <td className="py-2.5 px-3 text-[#68756D]">{obs.observer_name}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#2E7D5B] font-bold text-[10px]">
                        {obs.hyacinth_density}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold">{obs.coverage_pct}%</td>
                    <td className="py-2.5 px-3 font-mono">{obs.ph_field ?? 7.4}</td>
                    <td className="py-2.5 px-3 font-mono">{obs.do_field ?? 5.2}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] font-mono text-[#2E7D5B] font-bold">ATTACHED</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
