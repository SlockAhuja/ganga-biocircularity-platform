import React, { useState } from 'react';
import { HyacinthZone } from '../../types';
import { generateReport, getDownloadPdfUrl } from '../../services/api';
import { FileText, Download, CheckCircle2, ShieldCheck, Printer, Sparkles, Loader2 } from 'lucide-react';

interface ReportGeneratorProps {
  zones: HyacinthZone[];
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ zones }) => {
  const [reportTitle, setReportTitle] = useState('Prayagraj Regional Ganga Biocircularity Assessment Report');
  const [studyRegion, setStudyRegion] = useState('Prayagraj Confluence Reach (Phaphamau to Arail Ghat)');
  const [selectedZones, setSelectedZones] = useState<number[]>(zones.map((z) => z.id));
  const [customNotes, setCustomNotes] = useState(
    'Conducted under the National Mission for Clean Ganga research directive. All bioenergy calculations utilize mesophilic CSTR kinetics with heavy metal phytoremediation verification.'
  );

  const [sections, setSections] = useState<Record<string, boolean>>({
    'Executive Summary & Indicator Scorecard': true,
    'GIS & Satellite Spatial Distribution (Sentinel-2)': true,
    'Biomass Quantification & Proximate Composition': true,
    'Bioenergy, Bio-CNG & Electrical Potential': true,
    'Circularity Transformation Flow & 5-Pillar Score': true,
    'Environmental LCA & Carbon Avoidance': true,
    'Techno-Economic Valuation & ROI': true,
    'Scientific Methodology & Limitations': true
  });

  const [generating, setGenerating] = useState(false);
  const [lastGeneratedReportCode, setLastGeneratedReportCode] = useState<string | null>(null);

  const handleToggleZone = (id: number) => {
    setSelectedZones((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSection = (sec: string) => {
    setSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      const activeSections = Object.keys(sections).filter((k) => sections[k]);
      const res = await generateReport({
        title: reportTitle,
        study_region: studyRegion,
        zone_ids: selectedZones,
        include_sections: activeSections,
        custom_notes: customNotes
      });
      setLastGeneratedReportCode(res.report_code);
    } catch (err) {
      console.error('Report error:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (lastGeneratedReportCode) {
      window.open(getDownloadPdfUrl(lastGeneratedReportCode), '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-slate-900 text-base">Scientific Report Generator & PDF Exporter</h3>
            <span className="text-[10px] font-mono bg-confluence-100 text-confluence-800 px-2 py-0.5 rounded font-semibold">
              Research Publication Grade
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compile spatial GIS maps, biomass quantification, bioenergy kinetics, LCA, and economics into formal PDF reports
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Cols: Configuration Settings */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
            Report Scope & Metadata Configuration
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Document Title</label>
              <input
                type="text"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-semibold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Study Geographic Region</label>
              <input
                type="text"
                value={studyRegion}
                onChange={(e) => setStudyRegion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
              />
            </div>

            {/* Hyacinth Zones Inclusion */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">
                Include Detected Hyacinth Zones ({selectedZones.length} / {zones.length} Selected)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {zones.map((z) => {
                  const isChecked = selectedZones.includes(z.id);
                  return (
                    <label
                      key={z.id}
                      className={`p-2.5 rounded-lg border flex items-center space-x-2 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-confluence-50 border-confluence-300 text-confluence-950 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleZone(z.id)}
                        className="rounded text-confluence-600 focus:ring-confluence-500"
                      />
                      <span className="truncate text-[11px]">{z.zone_code}: {z.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Sections Checklist */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">
                Analytical Modules to Include in Report
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.keys(sections).map((sec) => (
                  <label
                    key={sec}
                    className={`p-2.5 rounded-lg border flex items-center space-x-2 cursor-pointer transition-all ${
                      sections[sec]
                        ? 'bg-slate-50 border-confluence-200 text-slate-900 font-medium'
                        : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={sections[sec]}
                      onChange={() => handleToggleSection(sec)}
                      className="rounded text-confluence-600 focus:ring-confluence-500"
                    />
                    <span className="text-[11px]">{sec}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Executive Notes & Policy Context</label>
              <textarea
                rows={3}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 leading-relaxed"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Right 1-Col: Live Document Compilation & PDF Action */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-confluence-700" />
              <span>Compilation Status</span>
            </h4>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Document Type:</span>
                <span className="font-bold text-slate-900">Research Assessment PDF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Classification Version:</span>
                <span className="font-mono font-bold text-confluence-800">v2.4-Sentinel-2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kinetic Model:</span>
                <span className="font-mono font-bold text-confluence-800">v1.4-AD-Biogas-CSTR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active Zones:</span>
                <span className="font-bold text-slate-900">{selectedZones.length} Zones Included</span>
              </div>
            </div>

            {lastGeneratedReportCode && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Report Successfully Generated</span>
                </div>
                <div className="font-mono text-[11px] text-emerald-800">
                  ID: {lastGeneratedReportCode}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100">
            <button
              onClick={handleGenerateReport}
              disabled={generating}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-confluence-700 hover:bg-confluence-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Compiling Scientific Data...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Compile & Generate Report</span>
                </>
              )}
            </button>

            {lastGeneratedReportCode && (
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Scientific PDF Document</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
