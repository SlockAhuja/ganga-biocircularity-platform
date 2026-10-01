import React from 'react';
import { Package, Sprout, Droplets, Sparkles, Check, ArrowUpRight } from 'lucide-react';

export const ValueAddedProducts: React.FC = () => {
  const products = [
    {
      name: 'Purified Bio-CNG Fuel',
      category: 'Renewable Clean Transport & Cooking Fuel',
      yieldEst: '16.8 tonnes / harvest batch',
      marketRate: '₹ 75 / kg (SATAT Benchmark)',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      specs: '95% pure CH₄ compressed to 200 bar, sulfur-free alternative to fossil LPG/CNG.'
    },
    {
      name: 'Fortified Vermicompost',
      category: 'High-Grade Cast Bio-Fertilizer',
      yieldEst: '23.7 tonnes / batch',
      marketRate: '₹ 12 / kg',
      icon: <Sprout className="w-5 h-5 text-emerald-600" />,
      specs: 'Enriched in organic carbon (SOC >16%), nitrogen (2.1%), phosphorus (1.4%), potassium (1.8%).'
    },
    {
      name: 'Liquid Vermiwash Extract',
      category: 'Organic Foliar Spray & Pest Repellent',
      yieldEst: '14,000 Liters / batch',
      marketRate: '₹ 35 / Liter',
      icon: <Droplets className="w-5 h-5 text-sky-600" />,
      specs: 'Contains earthworm coelomic fluid, auxins, cytokinins, and bioavailable micronutrients.'
    },
    {
      name: 'Humic & Fulvic Bio-Stimulant',
      category: 'Premium Soil Conditioner Extract',
      yieldEst: '1,200 Liters / batch',
      marketRate: '₹ 180 / Liter',
      icon: <Package className="w-5 h-5 text-indigo-600" />,
      specs: 'High cation exchange capacity (CEC), enhances root uptake and drought tolerance in agricultural crops.'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Value-Added Commercial Product Portfolio</h3>
          <p className="text-xs text-slate-500">High-value revenue streams manufactured from circular hyacinth processing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.name} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/90 flex flex-col justify-between space-y-3 hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  {p.icon}
                </div>
                <span className="text-[10px] font-mono font-bold bg-slate-200/60 text-slate-700 px-2 py-0.5 rounded">
                  Commercial
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm mt-3">{p.name}</h4>
              <span className="text-[11px] font-medium text-confluence-700 block">{p.category}</span>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{p.specs}</p>
            </div>

            <div className="pt-3 border-t border-slate-200/70 space-y-1 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500 text-[11px]">Est. Production:</span>
                <span className="font-bold text-slate-900">{p.yieldEst}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-[11px]">Tariff Value:</span>
                <span className="font-bold text-emerald-700">{p.marketRate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
