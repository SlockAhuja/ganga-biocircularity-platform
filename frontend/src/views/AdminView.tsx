import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Settings,
  Database,
  Cpu,
  RefreshCw,
  PlusCircle,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { UserRole } from '../types';

interface AdminViewProps {
  currentRole: UserRole;
}

export const AdminView: React.FC<AdminViewProps> = ({ currentRole }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'projects' | 'factors' | 'jobs'>('factors');
  const [notification, setNotification] = useState<string | null>(null);

  const [factors, setFactors] = useState([
    { key: 'BMP_DEFAULT', label: 'Biochemical Methane Potential (BMP)', value: '245', unit: 'mL CH₄/g VS', source: 'ICAR-CIFRI / Prayagraj 2024 Study' },
    { key: 'MOISTURE_RATIO', label: 'Water Hyacinth Moisture Ratio', value: '91.0', unit: '%', source: 'Wet-weight laboratory oven drying (105°C)' },
    { key: 'TS_VS_RATIO', label: 'Volatile Solids (VS) in Total Solids', value: '80.0', unit: '%', source: 'Loss on Ignition (550°C muffle furnace)' },
    { key: 'GWP_CH4', label: 'Methane GWP100 Emission Factor', value: '28.0', unit: 'kg CO₂e/kg CH₄', source: 'IPCC AR6 Climate Assessment' },
    { key: 'CNG_BENCHMARK_PRICE', label: 'Bio-CNG SATAT Benchmark Price', value: '72.00', unit: '₹ / kg', source: 'MoPNG SATAT Scheme 2024' },
    { key: 'COMPOST_PRICE', label: 'Enriched Vermicompost Market Price', value: '8.50', unit: '₹ / kg', source: 'UP State Organic Agriculture Board' }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Lead Architect', email: 'admin@bioriver.in', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2026-10-06 09:30' },
    { id: 2, name: 'Senior Limnologist', email: 'researcher@bioriver.in', role: 'RESEARCHER', status: 'ACTIVE', lastLogin: '2026-10-06 08:45' },
    { id: 3, name: 'Ganga Field Lead', email: 'operator@bioriver.in', role: 'FIELD_OPERATOR', status: 'ACTIVE', lastLogin: '2026-10-05 17:20' },
    { id: 4, name: 'Policy & LCA Analyst', email: 'analyst@bioriver.in', role: 'ANALYST', status: 'ACTIVE', lastLogin: '2026-10-04 11:15' }
  ]);

  const [jobs, setJobs] = useState([
    { id: 'JOB-9021', name: 'Sentinel-2 Tile MSI Level-2A Orthorectification', status: 'COMPLETED', progress: 100, elapsed: '4.2s', timestamp: '2026-10-06 10:15' },
    { id: 'JOB-9022', name: 'WGS84 Geodesic Polygon Area Recalculation', status: 'COMPLETED', progress: 100, elapsed: '0.8s', timestamp: '2026-10-06 10:22' },
    { id: 'JOB-9023', name: 'Automated Multi-Reach PDF Report Compilation', status: 'COMPLETED', progress: 100, elapsed: '2.1s', timestamp: '2026-10-06 10:45' }
  ]);

  const handleUpdateFactor = (key: string, newVal: string) => {
    setFactors((prev) =>
      prev.map((f) => (f.key === key ? { ...f, value: newVal } : f))
    );
    setNotification(`Successfully updated factor ${key} to ${newVal}`);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#EAF5EE] text-[#2E7D5B] rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-[#17211B]">
                System Administration & Scientific Governance
              </h2>
              <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold border border-purple-200">
                Current Role: {currentRole}
              </span>
            </div>
            <p className="text-xs text-[#68756D] mt-0.5">
              Manage scientific reference factors, calibration constants, user access control, and asynchronous processing jobs.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-2xl">
          {[
            { key: 'factors', label: 'Reference Factors' },
            { key: 'users', label: 'User Roles' },
            { key: 'projects', label: 'Projects & Reaches' },
            { key: 'jobs', label: 'Background Jobs' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-[#2E7D5B] shadow-xs'
                  : 'text-[#68756D] hover:text-[#17211B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-100 text-emerald-950 rounded-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{notification}</span>
        </div>
      )}

      {/* Reference Factors Tab */}
      {activeTab === 'factors' && (
        <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-[#17211B]">Scientific Calibration & Conversion Constants</h3>
              <p className="text-xs text-[#68756D]">
                These configurable parameters dictate the formulas across Biomass, Bioenergy, Vermicompost, and LCA engines.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#2E7D5B] font-bold bg-[#EAF5EE] px-2 py-0.5 rounded">
              Zero Hardcoding Rule
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {factors.map((f) => (
              <div key={f.key} className="p-4 rounded-2xl bg-[#F6FAF7] border border-[#DFE8E2] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#2E7D5B] font-bold">{f.key}</span>
                  <span className="text-[10px] font-mono text-[#68756D]">{f.unit}</span>
                </div>
                <h4 className="font-bold text-xs text-[#17211B]">{f.label}</h4>
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={f.value}
                    onBlur={(e) => handleUpdateFactor(f.key, e.target.value)}
                    className="w-32 p-2 bg-white border border-[#DFE8E2] rounded-xl text-xs font-mono font-bold text-[#17211B] focus:border-[#2E7D5B] focus:outline-none"
                  />
                  <span className="text-xs font-mono text-[#68756D]">{f.unit}</span>
                </div>
                <p className="text-[10px] text-[#68756D] pt-1">
                  <strong>Source:</strong> {f.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-[#17211B]">System Users & Role-Based Access Control (RBAC)</h3>
            <span className="text-xs font-mono text-[#68756D]">{users.length} Active Accounts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DFE8E2] text-[#68756D] uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E2]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F6FAF7]">
                    <td className="py-2.5 px-3 font-bold text-[#17211B]">{u.name}</td>
                    <td className="py-2.5 px-3 font-mono text-[#68756D]">{u.email}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold text-[10px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                        {u.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[#68756D]">{u.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projects & Reaches Tab */}
      {activeTab === 'projects' && (
        <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-[#17211B]">Multi-River Project Registry</h3>
              <p className="text-xs text-[#68756D]">BioRiver modular architecture enables extension to other river basins.</p>
            </div>
            <button className="px-3.5 py-1.5 bg-[#2E7D5B] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add New River Project</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#EAF5EE] border border-[#59A978]/40 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#2E7D5B]">ACTIVE STUDY: Ganga River Basin</span>
              <span className="text-[10px] font-mono bg-[#2E7D5B] text-white px-2 py-0.5 rounded font-bold">
                DEFAULT_REGION
              </span>
            </div>
            <p className="text-xs text-[#17211B]">
              <strong>Focal Node:</strong> Prayagraj Confluence (Sangam, Phaphamau, Naini, Daraganj, Jhunsi)
            </p>
            <p className="text-[11px] text-[#68756D]">
              Coordinates: 25.426°N, 81.884°E | Monitored Reach: 38.6 Hectares | PostGIS WGS84 Geodesic
            </p>
          </div>
        </div>
      )}

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-[#17211B]">Asynchronous Processing Queue & Jobs</h3>
            <span className="text-xs font-mono text-[#68756D]">{jobs.length} Completed</span>
          </div>

          <div className="space-y-3">
            {jobs.map((j) => (
              <div key={j.id} className="p-3.5 rounded-2xl bg-[#F6FAF7] border border-[#DFE8E2] flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-[#2E7D5B]">{j.id}</span>
                    <span className="font-bold text-[#17211B]">{j.name}</span>
                  </div>
                  <span className="text-[10px] text-[#68756D] mt-1 block">Completed at {j.timestamp} ({j.elapsed})</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                  {j.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
