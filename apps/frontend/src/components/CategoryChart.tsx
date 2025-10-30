'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
      <div className="card text-center py-10 sm:py-12">
        <p className="text-slate-500 text-sm sm:text-base">No expense data available</p>
      </div>
    );
  }

  const total = chartData.reduce((sum, item) => sum + Number(item.value), 0);

  return (
    <div className="card p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 text-center sm:text-left">
        Spending by Category
      </h3>

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
        
        {/* Pie Chart */}
        <div className="w-full md:w-1/2 flex justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
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
                  padding: '0.75rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category List */}
        <div className="w-full md:w-1/2 space-y-2">
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
                    <p className="font-bold text-slate-900 text-sm">
                      ₹{Number(item.value).toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500">{percentage}%</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left gap-2">
          <span className="font-semibold text-slate-700">Total Expenses</span>
          <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
