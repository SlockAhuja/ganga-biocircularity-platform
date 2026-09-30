import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { researcherProfile } from '../../data/researchData';

export const ResearchProfileSection: React.FC<{ onContact: () => void }> = ({ onContact }) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'awards' | 'memberships'>('experience');

  return (
    <section id="profile" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card Header */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Profile Avatar / Seal */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-1 shadow-md flex-shrink-0">
                <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white text-3xl font-mono font-bold">
                  PI
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
                    {researcherProfile.fullName}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Ph.D. (BITS Pilani) • Postdoc (SeoulTech)
                  </span>
                </div>

                <p className="text-sm text-blue-300 font-medium mt-1">
                  {researcherProfile.designation}
                </p>
                
                <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  {researcherProfile.specialization}
                </p>

                <div className="mt-3 flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    {researcherProfile.location}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    {researcherProfile.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={onContact}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md justify-center"
              >
                Contact Research Group
              </Button>
              <a
                href="#publications"
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 text-center border border-slate-700 transition-colors"
              >
                View 45+ Publications
              </a>
            </div>
          </div>
        </div>

        {/* Narrative Biography */}
        <div className="mb-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Executive Research Biography
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {researcherProfile.aboutSummary}
          </p>
        </div>

        {/* Tabbed Interactive Curriculum Details */}
        <div className="space-y-6">
          {/* Tabs Control */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
            {[
              { id: 'experience' as const, label: 'Professional Experience', icon: Briefcase },
              { id: 'education' as const, label: 'Academic Qualifications', icon: GraduationCap },
              { id: 'awards' as const, label: 'Honors & Fellowships', icon: Award },
              { id: 'memberships' as const, label: 'Professional Memberships', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          {activeTab === 'experience' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {researcherProfile.professionalExperience.map((exp, idx) => (
                <Card key={idx} className="p-6 bg-white border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-1">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{exp.role}</h4>
                      <p className="text-xs text-blue-800 font-medium">{exp.institution} {exp.location && `• ${exp.location}`}</p>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-150">
              {researcherProfile.academicQualifications.map((edu, idx) => (
                <Card key={idx} className="p-6 bg-white border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                      <span>{edu.year}</span>
                      <Badge variant="primary" size="sm">Verified Degree</Badge>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{edu.degree}</h4>
                    <p className="text-xs font-semibold text-blue-700 mb-2">{edu.institution} • {edu.location}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Focus / Thesis:</strong> {edu.focus}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'awards' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-150">
              {researcherProfile.awardsAndHonors.map((award, idx) => (
                <Card key={idx} className="p-5 bg-white border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">{award.year}</div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">{award.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{award.issuer}</p>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'memberships' && (
            <Card className="p-6 bg-white border-slate-200 animate-in fade-in duration-150">
              <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Professional Learned Societies & Fellowships
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {researcherProfile.professionalMemberships.map((mem, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2.5 text-xs font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{mem}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};
