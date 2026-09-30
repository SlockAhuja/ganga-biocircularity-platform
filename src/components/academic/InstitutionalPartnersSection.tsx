import React, { useState } from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  Info
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { institutionalPartnersData } from '../../data/researchData';

export const InstitutionalPartnersSection: React.FC<{ onProposePartner: () => void }> = ({
  onProposePartner
}) => {
  const [filterTier, setFilterTier] = useState<string>('All');

  const tiers = [
    'All',
    'Existing Association',
    'Proposed Collaboration',
    'Potential Collaboration'
  ];

  const filteredPartners = filterTier === 'All'
    ? institutionalPartnersData
    : institutionalPartnersData.filter(p => p.category === filterTier);

  return (
    <section id="partners" className="py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="primary" size="md" className="mb-3">
            Academic Ecosystem & Global Linkages
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
            Institutional Partners & Synergies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Collaborating with leading Indian premier institutions, CSIR national laboratories, and European / East Asian universities.
          </p>

          {/* Academic Integrity Disclaimer Callout */}
          <div className="mt-4 p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-center justify-center gap-2 max-w-2xl mx-auto">
            <Info className="w-4 h-4 text-blue-700 flex-shrink-0" />
            <span>
              <strong>Transparency Statement:</strong> Institutional relationships are strictly classified into <em>Existing Associations</em>, <em>Proposed Collaborations</em>, and <em>Potential Collaborations</em>.
            </span>
          </div>
        </div>

        {/* Tier Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                filterTier === tier
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => {
            const badgeVariant = 
              partner.category === 'Existing Association' ? 'success' :
              partner.category === 'Proposed Collaboration' ? 'info' : 'neutral';

            return (
              <Card 
                key={partner.id} 
                className="p-6 bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between hover:shadow-card"
              >
                <div>
                  {/* Top Bar with Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-sm text-slate-800 font-mono shadow-xs">
                      {partner.logoText}
                    </div>
                    <Badge variant={badgeVariant} size="sm">
                      {partner.category}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {partner.name}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{partner.location}, {partner.country}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {partner.description}
                  </p>

                  {/* Collaboration Scopes */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[10px] uppercase font-mono font-semibold text-slate-400">Collaboration Focus</div>
                    <ul className="space-y-1">
                      {partner.collaborationScopes.map((scope, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{scope}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="truncate max-w-[190px] font-mono text-[11px]">
                    {partner.keyContacts}
                  </span>
                  <button
                    onClick={onProposePartner}
                    className="text-blue-700 hover:text-blue-900 font-semibold cursor-pointer"
                  >
                    Connect
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
