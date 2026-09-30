import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Building2, 
  Clock, 
  Globe2, 
  CheckCircle2
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { researcherProfile } from '../../data/researchData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    role: 'Faculty Member / Professor',
    interestArea: 'Joint Research / Publications',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          institution: '',
          role: 'Faculty Member / Professor',
          interestArea: 'Joint Research / Publications',
          message: ''
        });
      }, 4000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" size="md" className="mb-3">
            Institutional Communications
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
            Connect & Initiate Academic Collaboration
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Reach out for research collaboration proposals, keynote / guest lectures, FDP invitations, student research internships, or joint funding inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Direct Contact Details & Research Lab Info */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Laboratory Address & Info
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Research Laboratory</span>
                    <span>Department of Electronics & Communication Engineering</span>
                    <span className="text-slate-500 block mt-0.5">Pune / Pilani, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 flex-shrink-0">
                    <Mail className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Primary Communication</span>
                    <span className="font-mono">{researcherProfile.email}</span>
                    <span className="font-mono text-slate-500 block text-[11px]">{researcherProfile.alternateEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 flex-shrink-0">
                    <Globe2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Scholarly Profiles</span>
                    <span className="text-blue-700">IEEE Xplore • Google Scholar • ResearchGate</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 flex-shrink-0">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Response Protocol</span>
                    <span>Academic & institutional inquiries typically reviewed within 24–48 hours.</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Verification Seal */}
            <div className="p-4 bg-blue-50/80 border border-blue-200/90 rounded-2xl text-xs text-blue-900">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-blue-700" />
                Verified Researcher Credentials
              </div>
              <p className="text-[11px] leading-relaxed text-blue-800">
                Senior Member, IEEE (AP-S & MTT-S) • Ph.D. BITS Pilani • Post-Doc SeoulTech (South Korea).
              </p>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Collaboration Proposal Form
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Please complete the fields below to dispatch an initial collaboration statement.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Prof. / Dr. / Mr. Ananya Roy"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Official Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@university.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      University / Institution *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., MIT-ADT / IIT / BITS / Overseas University"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Professional Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
                    >
                      <option>Faculty Member / Professor</option>
                      <option>Research Scholar / Ph.D. Candidate</option>
                      <option>Postgraduate / M.Tech Student</option>
                      <option>Undergraduate B.Tech Student</option>
                      <option>Industry R&D Lead / Scientist</option>
                      <option>University Administrator / Dean</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Collaboration Focus Area *
                  </label>
                  <select
                    value={formData.interestArea}
                    onChange={(e) => setFormData({ ...formData, interestArea: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
                  >
                    <option>Joint Research / Publications</option>
                    <option>Joint Grant Proposal (DST, CSIR, International)</option>
                    <option>Faculty Exchange / Guest Lecture Invitation</option>
                    <option>Student Research Internship Inquiry</option>
                    <option>Workshops & FDP Co-Hosting</option>
                    <option>Ganga Biocircularity Platform Partnership</option>
                    <option>Other Interdisciplinary Synergy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Proposal Summary / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly outline your research background, proposed scope of synergy, and timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Button
                    variant="primary"
                    size="md"
                    loading={loading}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Submit Proposal
                  </Button>

                  {isSubmitted && (
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Thank you! Your collaboration proposal has been recorded.</span>
                    </div>
                  )}
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
