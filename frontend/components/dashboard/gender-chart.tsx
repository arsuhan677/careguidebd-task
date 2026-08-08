'use client';

import { IGenderDistribution } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface GenderChartProps {
  data: IGenderDistribution[];
}

const COLORS = ['#2563eb', '#db2777', '#9ca3af']; // Blue for Male, Pink for Female, Gray for Other

export function GenderChart({ data }: GenderChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-none shadow-sm ring-1 ring-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Patient Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center text-sm text-gray-500">
          No data available
        </CardContent>
      </Card>
    );
  }

  // Format data for Recharts
  const chartData = data.map((d) => ({
    name: d.gender,
    value: d.count,
  }));

  return (
    <Card className="border-none shadow-sm ring-1 ring-gray-200">
      <CardHeader>
        <CardTitle className="text-lg">Patient Gender Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [`${value} Patients`, 'Count']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
