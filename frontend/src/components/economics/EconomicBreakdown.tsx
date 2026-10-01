import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { EconomicMetric } from '../../types';
import { calculateEconomics } from '../../services/api';
import { MetricCard } from '../common/MetricCard';
import { TrendingUp, DollarSign, PieChart, Coins, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface EconomicBreakdownProps {
  initialBiomass?: number;
}

export const EconomicBreakdown: React.FC<EconomicBreakdownProps> = ({ initialBiomass = 1170.4 }) => {
  const [freshBiomassT, setFreshBiomassT] = useState<number>(initialBiomass);
  const [cngPrice, setCngPrice] = useState<number>(75.0);
  const [vermiPrice, setVermiPrice] = useState<number>(12.0);
  const [vermiwashPrice, setVermiwashPrice] = useState<number>(35.0);

  const [econResult, setEconResult] = useState<EconomicMetric | null>(null);

  useEffect(() => {
    calculateEconomics({
      fresh_biomass_t: freshBiomassT,
      bio_cng_kg: Math.round(freshBiomassT * 14.4),
      vermicompost_t: Number((freshBiomassT * 0.0202).toFixed(2)),
      vermiwash_liters: Math.round(freshBiomassT * 12.0),
      bio_cng_price_per_kg: cngPrice,
      vermicompost_price_per_kg: vermiPrice,
      vermiwash_price_per_liter: vermiwashPrice
    }).then(setEconResult);
  }, [freshBiomassT, cngPrice, vermiPrice, vermiwashPrice]);

  const costBreakdownData = [
    {
      name: 'Operations',
      Harvesting: econResult?.harvesting_cost_total ?? 0,
      Transport: econResult?.transport_cost_total ?? 0,
      Processing: econResult?.processing_opex_total ?? 0,
      Capex: econResult?.capex_annualized ?? 0
    }
  ];

  const revenueBreakdownData = [
    {
      name: 'Revenue',
      BioCNG: econResult?.bio_cng_revenue ?? 0,
      Vermicompost: econResult?.vermicompost_revenue ?? 0,
      Vermiwash: econResult?.vermiwash_revenue ?? 0,
      CarbonCredits: econResult?.carbon_credit_revenue ?? 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-slate-900 text-base">Techno-Economic Valuation & Financial Feasibility</h3>
            <span className="text-[10px] font-mono bg-confluence-100 text-confluence-800 px-2 py-0.5 rounded font-semibold">
              Currency: INR (₹)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational expenditure (OPEX) vs multi-stream commercial product revenue and capital payback
          </p>
        </div>
      </div>

      {/* 4 Financial Key Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Annual Revenue"
          value={`₹ ${econResult ? (econResult.total_revenue / 100000).toFixed(2) : '0'}`}
          unit="Lakh"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          subtitle="Bio-CNG, Fertilizer & Vermiwash"
          provenance="MODELED"
        />

        <MetricCard
          title="Total Operating Cost"
          value={`₹ ${econResult ? (econResult.total_cost / 100000).toFixed(2) : '0'}`}
          unit="Lakh"
          icon={<Coins className="w-5 h-5 text-amber-600" />}
          subtitle="Harvesting, Transport & Plant Opex"
          provenance="MODELED"
        />

        <MetricCard
          title="Net Annual Profit"
          value={`₹ ${econResult ? (econResult.net_benefit / 100000).toFixed(2) : '0'}`}
          unit="Lakh"
          icon={<DollarSign className="w-5 h-5 text-confluence-700" />}
          subtitle={`ROI: ${econResult?.roi_percentage.toFixed(1) ?? '20'}%`}
          provenance="MODELED"
          highlight={true}
        />

        <MetricCard
          title="Capital Payback Period"
          value={econResult?.payback_period_years.toFixed(2) ?? '1.5'}
          unit="Years"
          icon={<PieChart className="w-5 h-5 text-sky-600" />}
          subtitle="Pilot plant capex amortized"
          provenance="MODELED"
        />
      </div>

      {/* Cost & Revenue Breakdown Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Streams */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">Cost Breakdown (INR ₹)</h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-600 font-sans">Mechanical Weed Harvesting (₹850/t):</span>
              <span className="font-bold text-slate-900">₹ {econResult?.harvesting_cost_total.toLocaleString() ?? '0'}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-600 font-sans">Dewatering & Transport Haulage (₹450/t):</span>
              <span className="font-bold text-slate-900">₹ {econResult?.transport_cost_total.toLocaleString() ?? '0'}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-600 font-sans">Digester & Vermicompost OPEX (₹600/t):</span>
              <span className="font-bold text-slate-900">₹ {econResult?.processing_opex_total.toLocaleString() ?? '0'}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
              <span className="text-slate-600 font-sans">Annualized Plant CAPEX Amortization:</span>
              <span className="font-bold text-slate-900">₹ {econResult?.capex_annualized.toLocaleString() ?? '0'}</span>
            </div>
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">Commercial Revenue Streams (INR ₹)</h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex justify-between">
              <span className="text-emerald-900 font-sans">Bio-CNG Gas Sales (@ ₹75/kg SATAT):</span>
              <span className="font-bold text-emerald-950">₹ {econResult?.bio_cng_revenue.toLocaleString() ?? '0'}</span>
            </div>
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex justify-between">
              <span className="text-emerald-900 font-sans">Packaged Vermicompost (@ ₹12/kg):</span>
              <span className="font-bold text-emerald-950">₹ {econResult?.vermicompost_revenue.toLocaleString() ?? '0'}</span>
            </div>
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex justify-between">
              <span className="text-emerald-900 font-sans">Liquid Vermiwash Foliar Spray (@ ₹35/L):</span>
              <span className="font-bold text-emerald-950">₹ {econResult?.vermiwash_revenue.toLocaleString() ?? '0'}</span>
            </div>
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex justify-between">
              <span className="text-emerald-900 font-sans">Voluntary Carbon Offsets (@ ₹1,200/t CO₂e):</span>
              <span className="font-bold text-emerald-950">₹ {econResult?.carbon_credit_revenue.toLocaleString() ?? '0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
