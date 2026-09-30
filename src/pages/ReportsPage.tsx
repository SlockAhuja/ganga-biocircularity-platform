import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusTag } from '../components/ui/StatusTag';
import { Badge } from '../components/ui/Badge';
import { 
  FileText, 
  Download, 
  Calendar, 
  MapPin, 
  Layers, 
  Printer, 
  Check
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [location, setLocation] = useState('Prayagraj - Triveni Sangam Confluence Reach');
  const [dateRange, setDateRange] = useState('Last 30 Days (24 Apr - 24 May 2026)');
  const [analysisType, setAnalysisType] = useState('Comprehensive Bioeconomy & Satellite Dossier');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport(true);
    }, 1000);
  };

  const handleDownload = (format: string) => {
    setDownloadSuccess(format);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const pastReports = [
    {
      id: 'REP-2026-05-24',
      title: 'Prayagraj Confluence Biocircularity Executive Summary',
      date: '24 May 2026',
      size: '4.2 MB',
      type: 'PDF Dossier',
      status: 'Ready'
    },
    {
      id: 'REP-2026-05-18',
      title: 'Sentinel-2 L2A Water Hyacinth Area & Optical Density Log',
      date: '18 May 2026',
      size: '8.7 MB',
      type: 'GeoJSON + PDF',
      status: 'Ready'
    },
    {
      id: 'REP-2026-05-10',
      title: 'Anaerobic Digestion Kinetic & Bio-CNG Yield Model',
      date: '10 May 2026',
      size: '2.1 MB',
      type: 'XLSX + PDF',
      status: 'Ready'
    },
    {
      id: 'REP-2026-04-30',
      title: 'Monthly River Water Quality & Eutrophication Index Review',
      date: '30 Apr 2026',
      size: '3.6 MB',
      type: 'PDF Dossier',
      status: 'Ready'
    }
  ];

  return (
    <PageContainer
      title="Scientific Reports & Policy Intelligence Generator"
      subtitle="Export multi-spectral GIS overlays, biomass quantification matrices, and circular economic feasibility analyses for institutional stakeholders."
      badge={<StatusTag type="simulated" customText="Report Automation Engine" />}
    >
      {/* Report Config Form */}
      <Card className="p-6">
        <CardHeader
          title="Configure Custom Intelligence Dossier"
          subtitle="Select spatial boundaries, temporal intervals, and analytical modules"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
          {/* Location Selector */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-ganga-600" />
              Monitoring Location / River Reach
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs bg-ink-50/70 border border-ink-100 rounded-lg p-2.5 text-ink-900 focus:bg-white focus:border-ganga-500 outline-none"
            >
              <option>Prayagraj - Triveni Sangam Confluence Reach (18.5 km)</option>
              <option>Rasoolabad Ghat Upstream Reach</option>
              <option>Daraganj Embankment & Inflow Canal</option>
              <option>Naini Yamuna Confluence Bank</option>
              <option>Entire Upper-Middle Ganga Basin (Macro-Grid)</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-skywater-600" />
              Temporal Coverage / Revisit Pass
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full text-xs bg-ink-50/70 border border-ink-100 rounded-lg p-2.5 text-ink-900 focus:bg-white focus:border-ganga-500 outline-none"
            >
              <option>Last 30 Days (24 Apr - 24 May 2026)</option>
              <option>Latest Satellite Acquisition (24 May 2026)</option>
              <option>Q2 2026 Full Seasonal Cycle</option>
              <option>Year-to-Date (Jan - May 2026)</option>
              <option>Custom Date Range</option>
            </select>
          </div>

          {/* Analysis Type */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amberalert" />
              Analytical Scope & Modules
            </label>
            <select
              value={analysisType}
              onChange={(e) => setAnalysisType(e.target.value)}
              className="w-full text-xs bg-ink-50/70 border border-ink-100 rounded-lg p-2.5 text-ink-900 focus:bg-white focus:border-ganga-500 outline-none"
            >
              <option>Comprehensive Bioeconomy & Satellite Dossier</option>
              <option>Biomass Density & Harvest Yield Forecasting Only</option>
              <option>River Hydro-Quality & Sensor Station Logs</option>
              <option>Financial Feasibility & Unit Economics Model</option>
              <option>Life Cycle Carbon (LCA) & GHG Abatement Audit</option>
            </select>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 pt-4 border-t border-ink-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-ink-500 font-mono">
            Output Format: <strong className="text-ink-800">High-Resolution Scientific PDF (with GeoTIFF metadata)</strong>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              loading={isGenerating}
              onClick={handleGenerate}
              icon={<FileText className="w-4 h-4" />}
            >
              Generate Report
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleDownload('PDF')}
              icon={<Download className="w-4 h-4" />}
            >
              Export PDF
            </Button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Dossier successfully synthesized for institutional dissemination. (Simulated {downloadSuccess} Export)</span>
          </div>
        )}
      </Card>

      {/* Generated Report Preview (When active) */}
      {generatedReport && (
        <Card className="p-6 border-2 border-ganga-400/80 bg-gradient-to-b from-ganga-50/20 to-white animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start justify-between pb-4 border-b border-ink-100 flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="md">Generated Dossier</Badge>
                <span className="font-mono text-xs text-ink-500">ID: REP-GB-20260524-PRAYAG</span>
              </div>
              <h3 className="text-lg font-bold text-ink-900 mt-1">
                Ganga River Water Hyacinth Biocircularity & Yield Assessment Report
              </h3>
              <p className="text-xs text-ink-500">
                Spatial Reach: {location} • Window: {dateRange}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" icon={<Printer className="w-3.5 h-3.5" />} onClick={() => window.print()}>
                Print
              </Button>
              <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={() => handleDownload('PDF')}>
                Download Signed PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
            <div className="p-3 bg-white border border-ink-100 rounded-xl">
              <div className="text-[10px] uppercase font-mono text-ink-400">Total Macrophyte Coverage</div>
              <div className="text-xl font-bold text-ganga-800 mt-0.5">38.6 ha</div>
              <div className="text-[10px] text-ink-500">93.4% Sentinel Confidence</div>
            </div>
            <div className="p-3 bg-white border border-ink-100 rounded-xl">
              <div className="text-[10px] uppercase font-mono text-ink-400">Harvestable Biomass Yield</div>
              <div className="text-xl font-bold text-amberalert mt-0.5">8,450 kg/day</div>
              <div className="text-[10px] text-ink-500">72.3% Volatile Solids</div>
            </div>
            <div className="p-3 bg-white border border-ink-100 rounded-xl">
              <div className="text-[10px] uppercase font-mono text-ink-400">Monthly Net Valorization</div>
              <div className="text-xl font-bold text-skywater-700 mt-0.5">₹5.35 Lakh</div>
              <div className="text-[10px] text-ink-500">2.8-Year Payback Period</div>
            </div>
          </div>

          <div className="text-xs text-ink-600 bg-white p-4 rounded-xl border border-ink-100 space-y-2">
            <h5 className="font-bold text-ink-900">Executive Summary & Scientific Recommendation:</h5>
            <p className="leading-relaxed">
              Based on Sentinel-2 multi-spectral surface reflectance analysis, significant invasive macrophyte growth (38.6 ha) is concentrated in the Triveni Sangam confluence and Daraganj embankment backwaters. Recommended action: Deploy amphibious skimmers at Zone 07 and Zone 05, routing raw fresh biomass to the 500 m³ continuous anaerobic digestion facility in Naini for Bio-CNG bottling and vermicompost enrichment.
            </p>
          </div>
        </Card>
      )}

      {/* Archived Reports Table */}
      <Card className="p-5">
        <CardHeader
          title="Historical Intelligence Dossier Archive"
          subtitle="Previously compiled analytical evaluations and satellite monitoring logs"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ink-100 text-ink-500 font-mono text-[11px] bg-ink-50/50">
                <th className="p-3">Dossier Title</th>
                <th className="p-3">Identifier</th>
                <th className="p-3">Generated Date</th>
                <th className="p-3">File Size</th>
                <th className="p-3">Data Format</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {pastReports.map((report) => (
                <tr key={report.id} className="hover:bg-ganga-50/30 transition-colors">
                  <td className="p-3 font-semibold text-ink-900 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-ganga-600 flex-shrink-0" />
                    <span>{report.title}</span>
                  </td>
                  <td className="p-3 font-mono text-ink-500">{report.id}</td>
                  <td className="p-3 text-ink-600">{report.date}</td>
                  <td className="p-3 font-mono text-ink-500">{report.size}</td>
                  <td className="p-3 font-medium text-ink-700">{report.type}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDownload('PDF')}
                      className="inline-flex items-center gap-1 text-ganga-700 hover:text-ganga-900 font-medium hover:underline cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
};
