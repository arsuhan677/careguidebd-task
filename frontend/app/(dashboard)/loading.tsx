import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="mt-4">
        <Skeleton className="h-[500px] w-full rounded-xl" />
      </div>
    </div>
  );
}
