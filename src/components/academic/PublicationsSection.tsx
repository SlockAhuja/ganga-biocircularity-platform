import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { representativePublications } from '../../data/researchData';

export const PublicationsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const types = ['All', 'IEEE Journal / Transactions', 'Elsevier / Springer', 'Patent'];

  const filteredPubs = representativePublications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pub.journal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || pub.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <section id="publications" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <Badge variant="primary" size="md" className="mb-2">
              Scholarly Output & Intellectual Property
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
              Representative Publications & Patents
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Selected peer-reviewed research papers in high-impact IEEE Transactions, Elsevier materials journals, and granted intellectual property.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-slate-500 font-mono block">TOTAL OUTPUT</span>
              <span className="text-lg font-bold text-slate-900 font-sans">45+ Articles • 4 Patents</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, keyword, or journal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-4">
          {filteredPubs.map((pub) => (
            <Card 
              key={pub.id} 
              className={`p-6 bg-white border transition-all duration-150 hover:shadow-subtle ${
                pub.highlight ? 'border-blue-200/90 bg-gradient-to-r from-blue-50/10 to-white' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={pub.type === 'Patent' ? 'warning' : 'primary'} size="sm">
                      {pub.type}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">{pub.year}</span>
                    {pub.citations && (
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        {pub.citations} Citations
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {pub.title}
                  </h3>

                  <p className="text-xs text-slate-600">
                    <strong>Authors:</strong> {pub.authors}
                  </p>

                  <p className="text-xs font-semibold text-blue-800">
                    {pub.journal}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:self-center flex-shrink-0">
                  <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                    {pub.doi || 'Indexed'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
