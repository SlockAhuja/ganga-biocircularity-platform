import React from 'react';
import { UserRole } from '../../types';
import { Shield, UserCheck, Wrench, Eye } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { role: 'RESEARCHER', label: 'Researcher', icon: <UserCheck className="w-3.5 h-3.5" />, desc: 'Full Modeling & Export' },
    { role: 'ADMIN', label: 'Admin', icon: <Shield className="w-3.5 h-3.5" />, desc: 'System Configuration' },
    { role: 'FIELD_OPERATOR', label: 'Field Operator', icon: <Wrench className="w-3.5 h-3.5" />, desc: 'Harvest & GPS Logger' },
    { role: 'VIEWER', label: 'Viewer', icon: <Eye className="w-3.5 h-3.5" />, desc: 'Read-only Access' }
  ];

  return (
    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
      {roles.map((r) => (
        <button
          key={r.role}
          onClick={() => onRoleChange(r.role)}
          title={`${r.label}: ${r.desc}`}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
            currentRole === r.role
              ? 'bg-white text-confluence-800 shadow-xs border border-slate-200/80 font-semibold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          {r.icon}
          <span>{r.label}</span>
        </button>
      ))}
    </div>
  );
};
