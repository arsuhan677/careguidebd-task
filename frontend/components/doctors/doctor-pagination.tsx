'use client';

import { IPagination } from '@/types/doctor';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DoctorPaginationProps {
  pagination: IPagination;
}

export function DoctorPagination({ pagination }: DoctorPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-b-xl shadow-sm">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{pagination.page}</span> of{' '}
            <span className="font-medium">{pagination.totalPages || 1}</span> 
            {' '}({pagination.total} total results)
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Button
              variant="outline"
              className="rounded-l-md rounded-r-none"
              disabled={!pagination.hasPreviousPage}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              className="rounded-r-md rounded-l-none"
              disabled={!pagination.hasNextPage}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </div>
      
      {/* Mobile Pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          disabled={!pagination.hasPreviousPage}
          onClick={() => handlePageChange(pagination.page - 1)}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-700 flex items-center">
          Page {pagination.page} / {pagination.totalPages || 1}
        </span>
        <Button
          variant="outline"
          disabled={!pagination.hasNextPage}
          onClick={() => handlePageChange(pagination.page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
