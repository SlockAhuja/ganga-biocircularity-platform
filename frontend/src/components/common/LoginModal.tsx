import React, { useState } from 'react';
import {
  X,
  Lock,
  User,
  ShieldCheck,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { loginApi } from '../../services/api';
import { UserRole } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onRoleChange,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState<string>('researcher@bioriver.in');
  const [password, setPassword] = useState<string>('bioriver2026');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (role: UserRole, defaultEmail: string) => {
    onRoleChange(role);
    setEmail(defaultEmail);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await loginApi(email, password);
      if (res && res.role) {
        onRoleChange(res.role as UserRole);
      }
      onLoginSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full border border-[#DFE8E2] shadow-2xl p-6 space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2E7D5B] to-[#59A978] flex items-center justify-center text-white">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#17211B]">Sign In to BioRiver</h3>
              <p className="text-[11px] text-[#68756D]">Scientific Platform Access</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-[#17211B] hover:bg-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Quick-Switch Credentials */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#68756D] block">
            Demo Mode Quick-Fill Roles:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { role: 'ADMIN' as UserRole, email: 'admin@bioriver.in', label: 'Lead Admin' },
              { role: 'RESEARCHER' as UserRole, email: 'researcher@bioriver.in', label: 'Researcher' },
              { role: 'FIELD_OPERATOR' as UserRole, email: 'operator@bioriver.in', label: 'Field Operator' },
              { role: 'ANALYST' as UserRole, email: 'analyst@bioriver.in', label: 'Policy Analyst' }
            ].map((preset) => {
              const isSelected = currentRole === preset.role;
              return (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => handleSelectPreset(preset.role, preset.email)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#EAF5EE] border-[#59A978] text-[#2E7D5B] font-bold shadow-xs'
                      : 'bg-[#F6FAF7] border-[#DFE8E2] text-[#17211B] hover:border-slate-300'
                  }`}
                >
                  <span className="block font-bold text-xs">{preset.label}</span>
                  <span className="text-[10px] text-[#68756D] font-mono block truncate">{preset.email}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#17211B]">Email Address</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#F6FAF7] border border-[#DFE8E2] rounded-xl text-xs font-mono text-[#17211B] focus:border-[#2E7D5B] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#17211B]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#F6FAF7] border border-[#DFE8E2] rounded-xl text-xs text-[#17211B] focus:border-[#2E7D5B] focus:outline-none"
                required
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#2E7D5B] hover:bg-[#246549] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In & Open Platform'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 text-center">
          <span className="text-[11px] text-[#68756D]">
            Demo Mode Enabled | Passwords pre-configured in local seed
          </span>
        </div>
      </div>
    </div>
  );
};
