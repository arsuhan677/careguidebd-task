'use client';

import { useState, useEffect } from 'react';
import { IDoctor } from '@/types/doctor';
import { IPatientQuery } from '@/types/patient';
import { useGetPatients } from '@/hooks/usePatients';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface DoctorPatientsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: IDoctor | null;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export function DoctorPatientsDialog({ isOpen, onClose, doctor }: DoctorPatientsDialogProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  // Reset state when dialog opens or doctor changes
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setPage(1);
    }
  }, [isOpen, doctor]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const query: IPatientQuery = {
    doctor: doctor?._id,
    page,
    limit: 5,
    search: debouncedSearch || undefined,
  };

  // Only fetch if dialog is open and doctor exists
  const { data: response, isLoading, error, refetch } = useGetPatients(query);

  if (!doctor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] md:w-[90vw] lg:w-[85vw] max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gray-50/50">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Patients of {doctor.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            {doctor.specialization} • {doctor.hospital}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search patients..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-2 mt-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : error ? (
            <div className="p-8 text-center rounded-xl border border-red-200 bg-red-50">
              <h3 className="text-sm font-medium text-red-800">Failed to load patients</h3>
              <p className="mt-1 text-xs text-red-600">{(error as Error).message}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          ) : !response || !response.data || response.data.length === 0 ? (
            <div className="p-12 text-center border border-dashed rounded-xl bg-gray-50/50 mt-4">
              <p className="text-sm font-medium text-gray-900">
                {search ? "No patients match your search." : "No patients found for this doctor."}
              </p>
            </div>
          ) : (
            <div className="border rounded-md mt-4 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden sm:table-cell">Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {response.data.map((patient) => (
                    <TableRow key={patient._id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell className="text-gray-500">{patient.age}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                          {patient.gender}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{patient.phone}</TableCell>
                      <TableCell className="hidden md:table-cell text-gray-500">{patient.email}</TableCell>
                      <TableCell className="hidden sm:table-cell text-gray-500">
                        {format(new Date(patient.createdAt), 'MMM dd, yyyy')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {response?.pagination && response.pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t bg-gray-50/50 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Page {response.pagination.page} of {response.pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!response.pagination.hasPreviousPage}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!response.pagination.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
