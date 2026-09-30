import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { mockEconomicFeasibility } from '../../data/mockData';
import { StatusTag } from '../ui/StatusTag';

export const EconomicsSummary: React.FC = () => {
  return (
    <Card className="p-5">
      <CardHeader
        title="Circular Bioeconomy Financial Viability Model"
        subtitle="Monthly Revenue Streams vs. Skimming & Biorefinery Operational Expenditures"
        badge={<StatusTag type="demo" customText="Demo Financial Estimates" />}
      />

      {/* Net Benefit Banner */}
      <div className="bg-gradient-to-r from-ganga-50 via-skywater-50/50 to-white border border-ganga-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-ganga-500 text-white flex items-center justify-center font-bold text-xl shadow-sm">
            ₹
          </div>
          <div>
            <div className="text-[11px] uppercase font-mono tracking-wider text-ink-500 font-semibold">
              Estimated Net Monthly Benefit
            </div>
            <div className="text-2xl font-bold text-ganga-800 font-sans tracking-tight">
              {mockEconomicFeasibility.estimatedMonthlyBenefit}
              <span className="text-xs font-normal text-ink-500 ml-2">/ month (Gross: {mockEconomicFeasibility.grossAnnualRevenue}/yr)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="bg-white px-3 py-2 rounded-lg border border-ink-100 shadow-xs">
            <span className="text-ink-400 block text-[10px] font-mono">PAYBACK PERIOD</span>
            <span className="font-bold text-ink-900">{mockEconomicFeasibility.paybackPeriod}</span>
          </div>
          <div className="bg-white px-3 py-2 rounded-lg border border-ink-100 shadow-xs">
            <span className="text-ink-400 block text-[10px] font-mono">PROJECT IRR</span>
            <span className="font-bold text-ganga-700">{mockEconomicFeasibility.irrPercent}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Revenue Streams Breakdown Donut */}
        <div className="border border-ink-100 rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-ink-900">Revenue Valorization Share</span>
            <span className="text-[10px] font-mono text-ink-400">TOTAL: ₹12.85 LAKH</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockEconomicFeasibility.breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="amount"
                >
                  {mockEconomicFeasibility.breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`₹${(Number(value) / 100000).toFixed(2)} Lakh`, 'Monthly Revenue']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    border: '1px solid #E3EAE5',
                    fontSize: '11px'
                  }}
                />
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Operational Cost Allocation */}
        <div className="border border-ink-100 rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-ink-900">OPEX Expenditure Allocation</span>
            <span className="text-[10px] font-mono text-ink-400">TOTAL OPEX: ₹3.70 LAKH</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockEconomicFeasibility.costs}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" horizontal={false} />
                <XAxis 
                  type="number" 
                  tickLine={false} 
                  stroke="#66736B" 
                  fontSize={10} 
                  tickFormatter={(val) => `₹${val/1000}k`}
                />
                <YAxis dataKey="name" type="category" tickLine={false} stroke="#66736B" fontSize={10} />
                <Tooltip
                  formatter={(value: any) => [`₹${(Number(value) / 100000).toFixed(2)} Lakh`, 'Monthly Cost']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    border: '1px solid #E3EAE5',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={16}>
                  {mockEconomicFeasibility.costs.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};
