import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IDashboardMetrics } from '@/types/dashboard';
import { Users, UserRound, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SummaryCardsProps {
  summary: IDashboardMetrics;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Doctors',
      value: summary.totalDoctors,
      icon: UserRound,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Patients',
      value: summary.totalPatients,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Male Patients',
      value: summary.totalMalePatients,
      icon: ArrowUpRight,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Female Patients',
      value: summary.totalFemalePatients,
      icon: ArrowDownRight,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card, idx) => (
        <Card key={idx} className="border-none shadow-sm ring-1 ring-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {card.title}
            </CardTitle>
            <div className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 md:h-5 md:w-5 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
