'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryChartProps {
  data: Record<string, number>;
}

type ChartDataInput = { [key: string]: string | number };

const COLORS = [
  '#f97316', // orange - Food
  '#3b82f6', // blue - Transport
  '#a855f7', // purple - Entertainment
  '#ec4899', // pink - Shopping
  '#ef4444', // red - Bills
  '#22c55e', // green - Healthcare
  '#6366f1', // indigo - Education
  '#64748b', // slate - Other
];

export default function CategoryChart({ data }: CategoryChartProps) {
  const chartData: ChartDataInput[] = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  if (chartData.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-slate-500">No expense data available</p>
      </div>
    );
  }

  const total = chartData.reduce((sum, item) => sum + Number(item.value), 0);

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Spending by Category</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `₹${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  padding: '0.75rem'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category List */}
        <div className="space-y-2">
          {chartData
            .sort((a, b) => Number(b.value) - Number(a.value))
            .map((item, index) => {
              const percentage = ((Number(item.value) / total) * 100).toFixed(1);
              return (
                <div 
                  key={String(item.name)} 
                  className="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium text-slate-700 text-sm">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 text-sm">₹{Number(item.value).toFixed(2)}</p>
                    <p className="text-xs text-slate-500">{percentage}%</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-700">Total Expenses</span>
          <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
