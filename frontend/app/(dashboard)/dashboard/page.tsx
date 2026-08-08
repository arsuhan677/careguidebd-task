'use client';

import { useDashboard } from '@/hooks/useDashboard';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { GenderChart } from '@/components/dashboard/gender-chart';
import { PatientsMonthChart } from '@/components/dashboard/patients-month-chart';
import { SpecializationChart } from '@/components/dashboard/specialization-chart';
import { PatientsByDoctor } from '@/components/dashboard/patients-by-doctor';
import { RecentDoctors } from '@/components/dashboard/recent-doctors';
import { RecentPatients } from '@/components/dashboard/recent-patients';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of doctors, patients, and appointment management data.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-[350px] w-full rounded-xl lg:col-span-1" />
          <Skeleton className="h-[350px] w-full rounded-xl lg:col-span-2" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-[350px] w-full rounded-xl lg:col-span-2" />
          <Skeleton className="h-[350px] w-full rounded-xl lg:col-span-1" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center space-y-4 rounded-xl border border-dashed p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900">Failed to load dashboard data</h2>
        <p className="text-sm text-gray-500 max-w-sm">
          There was a problem connecting to the server. Please try again later.
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of doctors, patients, and appointment management data.</p>
      </div>
      
      <SummaryCards summary={data.summary} />
      
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <GenderChart data={data.genderDistribution} />
        </div>
        <div className="lg:col-span-2">
          <PatientsMonthChart data={data.patientsByMonth} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SpecializationChart data={data.doctorsBySpecialization} />
        </div>
        <div className="lg:col-span-1">
          <PatientsByDoctor data={data.patientsByDoctor} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <RecentDoctors data={data.recentDoctors} />
        <RecentPatients data={data.recentPatients} />
      </div>
    </div>
  );
}
