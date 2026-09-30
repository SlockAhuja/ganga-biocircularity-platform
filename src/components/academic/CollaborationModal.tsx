import React, { useState } from 'react';
import { X, Send, Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface CollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledArea?: string;
}

export const CollaborationModal: React.FC<CollaborationModalProps> = ({
  isOpen,
  onClose,
  prefilledArea = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    activityType: prefilledArea || 'Joint Research Project',
    notes: ''
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-mono font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            ACADEMIC COLLABORATION DESK
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Propose Research or Academic Engagement
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Initiate a collaborative project, faculty exchange, workshop, or grant proposal with Dr. Praveen Kumar Sharma's research group.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Name & Designation *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Ramesh Gupta (Associate Professor)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="ramesh@institute.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              University / Institute / Organization *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. IIT Delhi / CSIR / Foreign University"
              value={formData.affiliation}
              onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Collaboration Modality *
            </label>
            <select
              value={formData.activityType}
              onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
            >
              <option>Joint Research Project / Publication</option>
              <option>Sponsored Grant Proposal (DST / CSIR / International)</option>
              <option>Faculty Visiting / Sabbatical Stay</option>
              <option>Student Research Internship</option>
              <option>Workshop / FDP Masterclass Co-Hosting</option>
              <option>Ganga Biocircularity Platform Partnership</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Proposed Scope / Timeline
            </label>
            <textarea
              rows={3}
              placeholder="Brief details about proposed topic, shared equipment requirements, or funding scope..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              size="md"
              loading={loading}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Submit Proposal
            </Button>
          </div>

          {sent && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Collaboration proposal dispatched successfully!</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
