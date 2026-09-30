import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { StatusTag } from '../components/ui/StatusTag';
import { mockEconomicFeasibility } from '../data/mockData';
import { 
  IndianRupee, 
  TrendingUp, 
  Wallet, 
  Calculator
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  LineChart,
  Line
} from 'recharts';

const mockCashFlow = [
  { year: 'Year 0', net: -45.0, cumulative: -45.0 },
  { year: 'Year 1', net: 18.5, cumulative: -26.5 },
  { year: 'Year 2', net: 24.2, cumulative: -2.3 },
  { year: 'Year 3', net: 26.8, cumulative: 24.5 },
  { year: 'Year 4', net: 28.5, cumulative: 53.0 },
  { year: 'Year 5', net: 30.1, cumulative: 83.1 },
];

export const EconomicsPage: React.FC = () => {
  return (
    <PageContainer
      title="Circular Economy Financial Viability & Feasibility Model"
      subtitle="Capital expenditure amortization, recurring operations & maintenance costs, and multi-product revenue optimization."
      badge={<StatusTag type="demo" customText="Demo Financial Model" />}
    >
      {/* 4 Financial KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-ganga-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>NET MONTHLY BENEFIT</span>
            <IndianRupee className="w-4 h-4 text-ganga-600" />
          </div>
          <div className="text-2xl font-bold text-ganga-800 mt-2 font-sans">
            {mockEconomicFeasibility.estimatedMonthlyBenefit}
          </div>
          <div className="text-[11px] text-ganga-700 font-medium mt-1">
            After all OPEX deductions
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-skywater-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>GROSS ANNUAL VALUE</span>
            <Wallet className="w-4 h-4 text-skywater-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockEconomicFeasibility.grossAnnualRevenue}
          </div>
          <div className="text-[11px] text-skywater-700 font-medium mt-1">
            Aggregated multi-product
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>PAYBACK PERIOD</span>
            <Calculator className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockEconomicFeasibility.paybackPeriod}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            High Commercial Feasibility
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>INTERNAL RATE OF RETURN</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-ink-900 mt-2 font-sans">
            {mockEconomicFeasibility.irrPercent}
          </div>
          <div className="text-[11px] text-indigo-700 font-medium mt-1">
            Attractive for Green Bonds
          </div>
        </Card>
      </div>

      {/* Cash Flow Cumulative Break-Even Curve */}
      <Card className="p-5">
        <CardHeader
          title="5-Year Cumulative Cash Flow & Break-Even Analysis"
          subtitle="Initial CAPEX investment recovery (₹45 Lakhs plant) against annual revenue generation"
        />

        <div className="h-64 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockCashFlow} margin={{ top: 5, right: 30, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3EAE5" />
              <XAxis dataKey="year" stroke="#66736B" fontSize={11} />
              <YAxis stroke="#66736B" fontSize={11} unit=" L" />
              <Tooltip
                formatter={(val) => [`₹${val} Lakh`, 'Amount']}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: '1px solid #E3EAE5', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="net" name="Annual Net Revenue (₹ Lakh)" stroke="#4A90C2" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="cumulative" name="Cumulative Cash Position (₹ Lakh)" stroke="#2E7D5B" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Revenue Stream Details Table */}
      <Card className="p-5">
        <CardHeader
          title="Unit Economics & Commodity Pricing Breakdown"
          subtitle="Monthly production rate and realized market pricing"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ink-100 text-ink-500 font-mono text-[11px] bg-ink-50/50">
                <th className="p-3">Product Stream</th>
                <th className="p-3">Monthly Yield</th>
                <th className="p-3">Unit Price (INR)</th>
                <th className="p-3">Monthly Value</th>
                <th className="p-3">Revenue Share</th>
                <th className="p-3">Market Offtaker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              <tr className="hover:bg-ganga-50/30">
                <td className="p-3 font-semibold text-ink-900">Bio-CNG (Compressed Biomethane)</td>
                <td className="p-3 font-mono">27,600 kg</td>
                <td className="p-3 font-mono">₹78.50 / kg</td>
                <td className="p-3 font-mono font-bold text-ganga-800">₹4,85,000</td>
                <td className="p-3 font-mono">38%</td>
                <td className="p-3 text-ink-600">City Gas Grid / Fuel Stations</td>
              </tr>
              <tr className="hover:bg-ganga-50/30">
                <td className="p-3 font-semibold text-ink-900">Enriched Vermicompost (NPK)</td>
                <td className="p-3 font-mono">102 tonnes</td>
                <td className="p-3 font-mono">₹6,500 / tonne</td>
                <td className="p-3 font-mono font-bold text-ganga-800">₹3,95,000</td>
                <td className="p-3 font-mono">31%</td>
                <td className="p-3 text-ink-600">Local Farmer FPOs / Nurseries</td>
              </tr>
              <tr className="hover:bg-ganga-50/30">
                <td className="p-3 font-semibold text-ink-900">Humic & Fulvic Acid Extract</td>
                <td className="p-3 font-mono">5,400 Litres</td>
                <td className="p-3 font-mono">₹85.00 / Litre</td>
                <td className="p-3 font-mono font-bold text-ganga-800">₹2,45,000</td>
                <td className="p-3 font-mono">19%</td>
                <td className="p-3 text-ink-600">Agro-Chemical Companies</td>
              </tr>
              <tr className="hover:bg-ganga-50/30">
                <td className="p-3 font-semibold text-ink-900">Verified Carbon Credits (VCM)</td>
                <td className="p-3 font-mono">35 tCO₂e</td>
                <td className="p-3 font-mono">₹4,500 / tCO₂e</td>
                <td className="p-3 font-mono font-bold text-ganga-800">₹1,60,000</td>
                <td className="p-3 font-mono">12%</td>
                <td className="p-3 text-ink-600">Voluntary Carbon Exchanges</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
};
