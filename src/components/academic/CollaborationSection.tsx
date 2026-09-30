import React from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileSpreadsheet, 
  Presentation, 
  Award, 
  Microscope,
  CheckCircle2, 
  ArrowRight, 
  Send
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { academicCollaborationData } from '../../data/researchData';

export const CollaborationSection: React.FC<{ onProposeCollaboration: () => void }> = ({
  onProposeCollaboration
}) => {
  const getCollabIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-5 h-5 text-blue-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-indigo-600" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-amber-600" />;
      case 'Presentation': return <Presentation className="w-5 h-5 text-purple-600" />;
      case 'Award': return <Award className="w-5 h-5 text-teal-600" />;
      case 'Microscope': return <Microscope className="w-5 h-5 text-rose-600" />;
      default: return <Users className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="collaboration" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" size="md" className="mb-3">
            Academic & Institutional Engagement
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
            Collaborative Modalities & Engagement Framework
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Open for synergistic academic partnerships, sponsored grant co-investigation, student research fellowships, and faculty exchange programs.
          </p>
        </div>

        {/* 7 Modalities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicCollaborationData.map((activity) => (
            <Card 
              key={activity.id} 
              className="p-6 bg-slate-50/40 border-slate-200 hover:border-blue-300 hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    {getCollabIcon(activity.icon)}
                  </div>
                  <Badge variant="neutral" size="sm">
                    {activity.category}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {activity.title}
                </h3>
                <div className="text-[11px] text-blue-700 font-medium mt-0.5 mb-2.5">
                  Target: {activity.targetAudience}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {activity.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] uppercase font-mono font-semibold text-slate-400">Target Deliverables</div>
                  <ul className="space-y-1">
                    {activity.deliverables.map((del, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Engagement Channel */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-mono truncate max-w-[170px]">
                  {activity.applicationMode}
                </span>
                <button
                  onClick={onProposeCollaboration}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Callout Banner */}
        <div className="mt-14 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-semibold text-blue-300 uppercase tracking-wider">
              Institutional & Research Proposals Welcome
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Interested in Co-Authoring a Joint Grant or Hosting a Workshop?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
              We actively welcome inquiries from university departments, research centers, and faculty members for joint proposal development (DST-SERB, CSIR, ISRO, Indo-French/Korean funds).
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={onProposeCollaboration}
            className="bg-white text-slate-900 hover:bg-slate-100 font-semibold shadow-md whitespace-nowrap"
            icon={<Send className="w-4 h-4 text-blue-700" />}
          >
            Submit Collaboration Proposal
          </Button>
        </div>
      </div>
    </section>
  );
};
