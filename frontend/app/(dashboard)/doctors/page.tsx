'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetDoctors } from '@/hooks/useDoctors';
import { IDoctor, IDoctorQuery } from '@/types/doctor';
import { DoctorToolbar } from '@/components/doctors/doctor-toolbar';
import { DoctorTable } from '@/components/doctors/doctor-table';
import { DoctorPagination } from '@/components/doctors/doctor-pagination';
import { DoctorFormDialog } from '@/components/doctors/doctor-form-dialog';
import { DoctorViewDialog } from '@/components/doctors/doctor-view-dialog';
import { DoctorDeleteAlert } from '@/components/doctors/doctor-delete-alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function DoctorsPage() {
  const searchParams = useSearchParams();

  // Parse URL query parameters
  const query: IDoctorQuery = {
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || undefined,
    specialization: searchParams.get('specialization') || undefined,
    hospital: searchParams.get('hospital') || undefined,
    sortBy: (searchParams.get('sortBy') as 'createdAt' | 'name' | 'specialization' | 'hospital') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
  };

  const { data: response, isLoading, error } = useGetDoctors(query);

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Selected doctor for edit/view/delete
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);

  const handleAdd = () => {
    setSelectedDoctor(null);
    setIsFormOpen(true);
  };

  const handleEdit = (doctor: IDoctor) => {
    setSelectedDoctor(doctor);
    setIsFormOpen(true);
  };

  const handleView = (doctor: IDoctor) => {
    setSelectedDoctor(doctor);
    setIsViewOpen(true);
  };

  const handleDelete = (doctor: IDoctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteOpen(true);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Doctors</h2>
      </div>

      <div className="mt-4">
        <DoctorToolbar onAddDoctor={handleAdd} />
        
        {isLoading ? (
          <div className="space-y-3 bg-white p-6 rounded-xl border">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-white rounded-xl border border-red-200">
            <h3 className="text-lg font-medium text-red-800">Failed to load doctors</h3>
            <p className="mt-2 text-sm text-red-600">{(error as Error).message}</p>
          </div>
        ) : response ? (
          <>
            <DoctorTable 
              data={response.data} 
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {response.pagination && response.pagination.totalPages > 1 && (
              <DoctorPagination pagination={response.pagination} />
            )}
          </>
        ) : null}
      </div>

      <DoctorFormDialog 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        doctor={selectedDoctor} 
      />

      <DoctorViewDialog 
        isOpen={isViewOpen} 
        onClose={() => setIsViewOpen(false)} 
        doctor={selectedDoctor} 
      />

      <DoctorDeleteAlert 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        doctor={selectedDoctor} 
      />
    </div>
  );
}
