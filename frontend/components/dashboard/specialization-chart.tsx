'use client';

import { IDoctorSpecializationStats } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SpecializationChartProps {
  data: IDoctorSpecializationStats[];
}

export function SpecializationChart({ data }: SpecializationChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-none shadow-sm ring-1 ring-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Doctors by Specialization</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center text-sm text-gray-500">
          No data available
        </CardContent>
      </Card>
    );
  }

  // Sort by count descending for better visualization
  const chartData = [...data].sort((a, b) => b.count - a.count);

  return (
    <Card className="border-none shadow-sm ring-1 ring-gray-200 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Doctors by Specialization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
              <XAxis 
                type="number" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
              />
              <YAxis 
                dataKey="specialization" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#374151' }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                cursor={{ fill: '#f3f4f6' }}
              />
              <Bar 
                dataKey="count" 
                name="Doctors"
                fill="#0f172a" 
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
