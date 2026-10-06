import React from 'react';
import {
  Waves,
  Leaf,
  Flame,
  RefreshCw,
  Trees,
  ShieldCheck,
  ArrowRight,
  Database,
  Satellite,
  Compass,
  FileText,
  CheckCircle2,
  ExternalLink,
  Users,
  Mail,
  MapPin,
  Sparkles
} from 'lucide-react';

interface LandingPageViewProps {
  onEnterPlatform: () => void;
  onOpenLogin: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onEnterPlatform,
  onOpenLogin
}) => {
  return (
    <div className="min-h-screen bg-[#F6FAF7] text-[#17211B] flex flex-col font-sans">
      {/* Top Header / Public Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#DFE8E2] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2E7D5B] to-[#59A978] flex items-center justify-center text-white shadow-xs">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-[#17211B]">
                  BioRiver
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#2E7D5B] border border-[#59A978]/30">
                  Ganga Biocircularity
                </span>
              </div>
              <p className="text-[11px] text-[#68756D] font-medium hidden sm:block">
                Ganga Biocircularity Intelligence Platform
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-[#68756D]">
            <a href="#about" className="hover:text-[#2E7D5B] transition-colors">About</a>
            <a href="#problem" className="hover:text-[#2E7D5B] transition-colors">The Problem</a>
            <a href="#platform" className="hover:text-[#2E7D5B] transition-colors">Platform</a>
            <a href="#project" className="hover:text-[#2E7D5B] transition-colors">Ganga Project</a>
            <a href="#technology" className="hover:text-[#2E7D5B] transition-colors">Technology</a>
            <a href="#circularity" className="hover:text-[#2E7D5B] transition-colors">Bioeconomy</a>
            <a href="#impact" className="hover:text-[#2E7D5B] transition-colors">Impact</a>
            <a href="#partners" className="hover:text-[#2E7D5B] transition-colors">Partners</a>
            <a href="#contact" className="hover:text-[#2E7D5B] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 text-xs font-bold text-[#2E7D5B] hover:text-[#17211B] transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onEnterPlatform}
              className="px-4 py-2.5 bg-[#2E7D5B] hover:bg-[#246549] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
            >
              <span>OPEN PLATFORM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 px-6 border-b border-[#DFE8E2] bg-gradient-to-b from-white via-[#F6FAF7] to-[#EAF5EE]/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EAF5EE] border border-[#59A978]/40 text-[#2E7D5B] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pioneering Riverine Ecological Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#17211B] tracking-tight leading-[1.15]">
              Transforming Invasive Hyacinth into <span className="text-[#2E7D5B]">Clean Energy & Circular Wealth</span>
            </h1>

            <p className="text-base sm:text-lg text-[#68756D] leading-relaxed max-w-2xl font-normal">
              BioRiver combines satellite remote sensing, high-resolution GIS spatial intelligence, anaerobic digestion modeling, and vermicompost nutrient recovery to revitalize the sacred Ganga river basin.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onEnterPlatform}
                className="px-6 py-3.5 bg-[#2E7D5B] hover:bg-[#246549] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center space-x-2"
              >
                <span>Launch Scientific Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#platform"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-[#17211B] font-bold text-sm rounded-xl border border-[#DFE8E2] shadow-xs transition-all"
              >
                Explore Scientific Workflow
              </a>
            </div>

            {/* Trust & Scientific Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#DFE8E2]">
              <div>
                <span className="text-2xl font-black text-[#17211B]">38.6 ha</span>
                <p className="text-xs text-[#68756D]">Monitored Reach (Prayagraj)</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#2E7D5B]">16,840 kg</span>
                <p className="text-xs text-[#68756D]">Bio-CNG Recovery Potential</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#4B8DB8]">121.4 t</span>
                <p className="text-xs text-[#68756D]">CO₂e Avoided Annually</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 border border-[#DFE8E2] shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#2E7D5B]" />
                  <span className="text-xs font-bold text-[#17211B]">Prayagraj Confluence Reach</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EAF5EE] text-[#2E7D5B] font-bold">
                  Sentinel-2 Live Processed
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="bg-[#F6FAF7] p-3.5 rounded-2xl border border-[#DFE8E2]">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#68756D]">Target Species:</span>
                    <span className="font-bold text-[#17211B]">Eichhornia crassipes</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-[#68756D]">Detection Method:</span>
                    <span className="font-bold text-[#2E7D5B]">MNDWI + NDVI Thresholding</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-[#68756D]">Primary Embayments:</span>
                    <span className="font-bold text-[#17211B]">Sangam, Phaphamau, Naini</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#EDF6FB] p-3 rounded-2xl border border-[#4B8DB8]/20">
                    <span className="text-[10px] text-[#4B8DB8] font-bold uppercase block">BMP Yield</span>
                    <span className="text-lg font-black text-[#17211B]">245</span>
                    <span className="text-[10px] text-[#68756D] ml-1">mL CH₄/g VS</span>
                  </div>
                  <div className="bg-[#EAF5EE] p-3 rounded-2xl border border-[#59A978]/20">
                    <span className="text-[10px] text-[#2E7D5B] font-bold uppercase block">Compost Output</span>
                    <span className="text-lg font-black text-[#17211B]">23.7</span>
                    <span className="text-[10px] text-[#68756D] ml-1">tonnes NPK</span>
                  </div>
                </div>

                <button
                  onClick={onEnterPlatform}
                  className="w-full py-3 bg-[#17211B] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <span>Access Research Workbench</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 7 Core Questions Section */}
      <section className="py-16 px-6 bg-white border-b border-[#DFE8E2]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#2E7D5B]">
              Core Scientific Mandate
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#17211B]">
              The Seven Fundamental River Questions
            </h2>
            <p className="text-sm text-[#68756D]">
              BioRiver is engineered specifically to answer every critical operational question across the riverine bioeconomy value chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                q: "1. WHERE is water hyacinth located?",
                desc: "High-resolution satellite observation and GIS polygons map every floating mat across river segments.",
                icon: <MapPin className="w-5 h-5 text-[#2E7D5B]" />,
                color: "bg-[#EAF5EE]"
              },
              {
                q: "2. WHAT is happening in the river?",
                desc: "Multi-parameter water quality tracking (DO, BOD, COD, pH, TSS, heavy metals) captures ecosystem response.",
                icon: <Waves className="w-5 h-5 text-[#4B8DB8]" />,
                color: "bg-[#EDF6FB]"
              },
              {
                q: "3. HOW MUCH biomass exists?",
                desc: "Allometric quantification models calculate fresh biomass, dry matter, and volatile solids with confidence intervals.",
                icon: <Leaf className="w-5 h-5 text-[#2E7D5B]" />,
                color: "bg-[#EAF5EE]"
              },
              {
                q: "4. HOW MUCH can be harvested?",
                desc: "Field operations and mechanical harvesting logistics calculate realistic recovery efficiency and routing.",
                icon: <Compass className="w-5 h-5 text-[#E4A044]" />,
                color: "bg-amber-50"
              },
              {
                q: "5. WHAT resources can be recovered?",
                desc: "Anaerobic co-digestion and vermicomposting calculate Bio-CNG, vermiwash, and enriched organic fertilizers.",
                icon: <Flame className="w-5 h-5 text-[#2E7D5B]" />,
                color: "bg-[#EAF5EE]"
              },
              {
                q: "6. WHAT is the environmental & economic impact?",
                desc: "Rigorous IPCC Tier-2 LCA and economic cost-benefit models evaluate avoided methane, carbon credits, and ROI.",
                icon: <Trees className="w-5 h-5 text-[#59A978]" />,
                color: "bg-[#EAF5EE]"
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[#DFE8E2] bg-[#F6FAF7] hover:bg-white hover:shadow-md transition-all space-y-3">
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-base text-[#17211B]">{item.q}</h3>
                <p className="text-xs text-[#68756D] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-16 px-6 bg-[#F6FAF7] border-b border-[#DFE8E2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-wider text-[#D96B6B]">
              Ecological Threat
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#17211B]">
              The Water Hyacinth Crisis in River Ganga
            </h2>
            <p className="text-sm text-[#68756D] leading-relaxed">
              <strong>Eichhornia crassipes</strong> (water hyacinth) is one of the world's most aggressive invasive aquatic plants. In the nutrient-dense waters of the Ganga basin, its exponential doubling rate causes severe ecological and economic damage:
            </p>

            <ul className="space-y-3 text-xs text-[#17211B]">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#D96B6B] mt-1 shrink-0" />
                <span><strong>Severe Dissolved Oxygen Depletion:</strong> Massive mats block sunlight and air exchange, causing fish mortality and hypoxification.</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#D96B6B] mt-1 shrink-0" />
                <span><strong>Methane Emissions from Rotting Biomass:</strong> Decomposing hyacinth on riverbeds releases potent greenhouse gases directly into the atmosphere.</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#D96B6B] mt-1 shrink-0" />
                <span><strong>Navigation & Ghat Obstruction:</strong> Mats choke irrigation channels, river ferry lanes, and holy bathing ghats in pilgrimage centers like Prayagraj.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white p-8 rounded-3xl border border-[#DFE8E2] shadow-sm space-y-6">
              <h3 className="font-extrabold text-lg text-[#17211B]">
                The BioRiver Solution: Circular Bioeconomy
              </h3>
              <p className="text-xs text-[#68756D] leading-relaxed">
                Rather than treating water hyacinth solely as a waste disposal problem, BioRiver unlocks its high biomethane potential (BMP) and rich nutrient profile, transforming invasive biomass into green transport fuel and organic soil enhancers.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#EAF5EE] border border-[#59A978]/30 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2E7D5B]">1. Rapid Detection & Harvesting</span>
                  <span className="text-[#68756D]">Sentinel-2 Remote Sensing</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#EDF6FB] border border-[#4B8DB8]/30 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#4B8DB8]">2. Anaerobic Biomethane Recovery</span>
                  <span className="text-[#68756D]">SATAT Bio-CNG Standards</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#EAF5EE] border border-[#59A978]/30 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2E7D5B]">3. Fortified Vermicomposting</span>
                  <span className="text-[#68756D]">Zero-Waste Digestate Upcycling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Circular Bioeconomy Process Workflow */}
      <section id="circularity" className="py-16 px-6 bg-white border-b border-[#DFE8E2]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#2E7D5B]">
              End-to-End Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#17211B]">
              The 10-Stage Circular Bioeconomy Flow
            </h2>
            <p className="text-sm text-[#68756D]">
              From satellite detection in the Ganga river to value-added organic fertilizers in local agriculture.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center">
            {[
              { num: "01", name: "Ganga River", desc: "Invasive Mat Detection" },
              { num: "02", name: "Water Hyacinth", desc: "Biomass Estimation" },
              { num: "03", name: "Harvesting", desc: "Mechanical Extraction" },
              { num: "04", name: "Dewatering", desc: "Solid Separation" },
              { num: "05", name: "Characterization", desc: "TS / VS Analysis" },
              { num: "06", name: "Digestion", desc: "Anaerobic Bioreactors" },
              { num: "07", name: "Bio-CNG", desc: "Green Transport Fuel" },
              { num: "08", name: "Digestate", desc: "Organic Feedstock" },
              { num: "09", name: "Vermicompost", desc: "Eisenia fetida Action" },
              { num: "10", name: "Impact", desc: "Carbon & Economic Net" }
            ].map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F6FAF7] border border-[#DFE8E2] space-y-1.5 hover:border-[#2E7D5B] transition-all">
                <span className="text-xs font-mono font-black text-[#2E7D5B]">{step.num}</span>
                <h4 className="font-bold text-xs text-[#17211B]">{step.name}</h4>
                <p className="text-[10px] text-[#68756D]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#17211B] via-[#1d513a] to-[#2E7D5B] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Explore the BioRiver Platform?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Access the full scientific workbench with interactive GIS mapping, satellite scene analytics, biomass quantification, bioenergy simulators, and automated PDF report generation.
          </p>
          <div className="pt-2">
            <button
              onClick={onEnterPlatform}
              className="px-8 py-4 bg-white text-[#17211B] hover:bg-emerald-50 font-black text-sm rounded-xl shadow-xl transition-all inline-flex items-center space-x-2"
            >
              <span>ENTER BIORIVER PLATFORM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t border-[#DFE8E2] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-[#68756D]">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-[#2E7D5B]" />
              <span className="font-bold text-base text-[#17211B]">BioRiver</span>
            </div>
            <p className="leading-relaxed">
              Ganga Biocircularity Intelligence Platform. Developed for scientific river management, satellite biomass quantification, and clean bioenergy transition.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#17211B] uppercase tracking-wider text-[11px]">Primary Domains</h4>
            <ul className="space-y-1 font-mono text-[11px]">
              <li><a href="https://bioriver.in" className="hover:text-[#2E7D5B]">https://bioriver.in</a> (Public)</li>
              <li><a href="https://app.bioriver.in" className="hover:text-[#2E7D5B]">https://app.bioriver.in</a> (App)</li>
              <li><a href="https://api.bioriver.in" className="hover:text-[#2E7D5B]">https://api.bioriver.in</a> (API)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#17211B] uppercase tracking-wider text-[11px]">Key Methodologies</h4>
            <ul className="space-y-1">
              <li>Sentinel-2 MNDWI/NDVI Remote Sensing</li>
              <li>Allometric Biomass Quantification (TS/VS)</li>
              <li>Anaerobic Digestion BMP Modeling</li>
              <li>IPCC Tier-2 LCA Carbon Accounting</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#17211B] uppercase tracking-wider text-[11px]">Contact & Research</h4>
            <p>Prayagraj Confluence Research Station, Uttar Pradesh, India.</p>
            <p className="font-mono text-[11px] text-[#2E7D5B]">research@bioriver.in</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <span>&copy; {new Date().getFullYear()} BioRiver Platform. Open Research & Biocircularity Consortium.</span>
          <span className="mt-2 sm:mt-0 font-mono">Prayagraj Study Area: WGS84 Geodesic PostGIS</span>
        </div>
      </footer>
    </div>
  );
};
