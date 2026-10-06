import React from 'react';
import {
  Package,
  Leaf,
  Flame,
  Droplets,
  DollarSign,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { ScientificBadge } from '../components/common/ScientificBadge';

export const ProductsView: React.FC = () => {
  const products = [
    {
      id: 'prod_biocng',
      name: 'Purified Bio-CNG (CBG)',
      category: 'Renewable Transport Fuel',
      standard: 'IS 16087 / SATAT Specification',
      methanePurity: '96.2% CH₄',
      productionPer1000t: '14,380 kg',
      marketPrice: '₹72.00 / kg',
      revenuePotential: '₹1,035,360',
      description: 'Compressed Bio-Gas purified via water scrubbing & PSA membrane separation, suitable for automotive and commercial cylinder grid injection.',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      color: 'bg-amber-50 border-amber-200'
    },
    {
      id: 'prod_vermicompost',
      name: 'Fortified Hyacinth Vermicompost',
      category: 'Enriched Organic Fertilizer',
      standard: 'FCO 1985 Organic Fertilizer Schedule',
      methanePurity: 'NPK: 2.1% - 1.4% - 1.8%',
      productionPer1000t: '23.7 tonnes',
      marketPrice: '₹8,500 / tonne',
      revenuePotential: '₹201,450',
      description: 'Digestate co-composted with cow dung and converted by Eisenia fetida earthworms into humus-rich soil conditioner with high microbial activity.',
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-50 border-emerald-200'
    },
    {
      id: 'prod_vermiwash',
      name: 'Bioactive Vermiwash Extract',
      category: 'Liquid Bio-Stimulant & Foliar Spray',
      standard: 'Certified Organic Input',
      methanePurity: 'Auxins + Cytokinins enriched',
      productionPer1000t: '14,000 Liters',
      marketPrice: '₹25.00 / Liter',
      revenuePotential: '₹350,000',
      description: 'Coelomic fluid and mucus excretion leachate rich in plant growth hormones, macro-micronutrients, and antagonistic enzymes against fungal pathogens.',
      icon: <Droplets className="w-5 h-5 text-sky-600" />,
      color: 'bg-sky-50 border-sky-200'
    },
    {
      id: 'prod_biofertilizer',
      name: 'Mineralized Liquid Digestate',
      category: 'Direct Fertigation Nutrient Solution',
      standard: 'Liquid Bio-Nutrient Standards',
      methanePurity: 'High Available Ammoniacal-N',
      productionPer1000t: '820,000 Liters',
      marketPrice: '₹0.50 / Liter',
      revenuePotential: '₹410,000',
      description: 'Centrate fraction from anaerobic digester post-screw press dewatering, rich in soluble mineralized nitrogen and potassium for drip fertigation.',
      icon: <Package className="w-5 h-5 text-teal-600" />,
      color: 'bg-teal-50 border-teal-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#DFE8E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#EAF5EE] text-[#2E7D5B] rounded-2xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-[#17211B]">
                Value-Added Resource Recovery & Products
              </h2>
              <span className="text-[10px] font-mono bg-[#EAF5EE] text-[#2E7D5B] px-2 py-0.5 rounded font-bold border border-[#59A978]/30">
                Zero-Waste Bioeconomy
              </span>
            </div>
            <p className="text-xs text-[#68756D] mt-0.5">
              High-value bio-derived products manufactured from harvested Ganga hyacinth and digestate streams.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ScientificBadge type="MODELED" />
          <span className="text-xs font-mono text-[#68756D]">Prices: Demo Reference (UP Market)</span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#DFE8E2] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#68756D] tracking-wider block">
            Gross Recoverable Value
          </span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-2xl font-black text-[#2E7D5B]">₹1,996,810</span>
            <span className="text-xs text-[#68756D]">/ 1,000 t Fresh Biomass</span>
          </div>
          <p className="text-[11px] text-[#68756D] mt-1">Multi-product cascading revenue model</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#DFE8E2] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#68756D] tracking-wider block">
            Total Material Upcycling
          </span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-2xl font-black text-[#17211B]">98.4%</span>
            <span className="text-xs text-[#68756D]">Zero Residue to Landfill</span>
          </div>
          <p className="text-[11px] text-[#68756D] mt-1">Digestate and effluent fully valorized</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#DFE8E2] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#68756D] tracking-wider block">
            Nutrient Recycled (N-P-K)
          </span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-2xl font-black text-[#4B8DB8]">1,256 kg</span>
            <span className="text-xs text-[#68756D]">Essential Plant Nutrients</span>
          </div>
          <p className="text-[11px] text-[#68756D] mt-1">Displacing synthetic chemical fertilizers</p>
        </div>
      </div>

      {/* Products Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-3xl border border-[#DFE8E2] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#2E7D5B] transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-2xl border ${prod.color}`}>
                    {prod.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#17211B]">{prod.name}</h3>
                    <span className="text-xs text-[#68756D]">{prod.category}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                  {prod.standard}
                </span>
              </div>

              <p className="text-xs text-[#68756D] leading-relaxed">
                {prod.description}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
                <div className="bg-[#F6FAF7] p-2.5 rounded-xl border border-[#DFE8E2]">
                  <span className="text-[9px] text-[#68756D] font-sans block">Yield (1,000t)</span>
                  <span className="font-bold text-[#17211B]">{prod.productionPer1000t}</span>
                </div>
                <div className="bg-[#F6FAF7] p-2.5 rounded-xl border border-[#DFE8E2]">
                  <span className="text-[9px] text-[#68756D] font-sans block">Unit Price</span>
                  <span className="font-bold text-[#17211B]">{prod.marketPrice}</span>
                </div>
                <div className="bg-[#EAF5EE] p-2.5 rounded-xl border border-[#59A978]/30">
                  <span className="text-[9px] text-[#2E7D5B] font-sans block font-bold">Gross Revenue</span>
                  <span className="font-black text-[#2E7D5B]">{prod.revenuePotential}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#68756D]">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B]" />
                <span className="text-[11px]">Quality Benchmark Verified</span>
              </span>
              <span className="font-mono text-[11px] text-[#17211B] font-bold">{prod.methanePurity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
