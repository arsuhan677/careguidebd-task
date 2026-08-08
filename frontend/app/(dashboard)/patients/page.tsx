'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetPatients } from '@/hooks/usePatients';
import { IPatient, IPatientQuery } from '@/types/patient';
import { PatientToolbar } from '@/components/patients/patient-toolbar';
import { PatientTable } from '@/components/patients/patient-table';
import { PatientPagination } from '@/components/patients/patient-pagination';
import { PatientFormDialog } from '@/components/patients/patient-form-dialog';
import { PatientViewDialog } from '@/components/patients/patient-view-dialog';
import { PatientDeleteAlert } from '@/components/patients/patient-delete-alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function PatientsPage() {
  const searchParams = useSearchParams();

  // Parse URL query parameters
  const query: IPatientQuery = {
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || undefined,
    gender: searchParams.get('gender') || undefined,
    doctor: searchParams.get('doctor') || undefined,
    createdFrom: searchParams.get('createdFrom') || undefined,
    createdTo: searchParams.get('createdTo') || undefined,
    sortBy: (searchParams.get('sortBy') as 'createdAt' | 'name' | 'age' | 'gender') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
  };

  const { data: response, isLoading, error } = useGetPatients(query);

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Selected patient for edit/view/delete
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);

  const handleAdd = () => {
    setSelectedPatient(null);
    setIsFormOpen(true);
  };

  const handleEdit = (patient: IPatient) => {
    setSelectedPatient(patient);
    setIsFormOpen(true);
  };

  const handleView = (patient: IPatient) => {
    setSelectedPatient(patient);
    setIsViewOpen(true);
  };

  const handleDelete = (patient: IPatient) => {
    setSelectedPatient(patient);
    setIsDeleteOpen(true);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Patients</h2>
      </div>

      <div className="mt-4">
        <PatientToolbar onAddPatient={handleAdd} />
        
        {isLoading ? (
          <div className="space-y-3 bg-white p-6 rounded-xl border">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-white rounded-xl border border-red-200">
            <h3 className="text-lg font-medium text-red-800">Failed to load patients</h3>
            <p className="mt-2 text-sm text-red-600">{(error as Error).message}</p>
          </div>
        ) : response ? (
          <>
            <PatientTable 
              data={response.data} 
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {response.pagination && response.pagination.totalPages > 1 && (
              <PatientPagination pagination={response.pagination} />
            )}
          </>
        ) : null}
      </div>

      <PatientFormDialog 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        patient={selectedPatient} 
      />

      <PatientViewDialog 
        isOpen={isViewOpen} 
        onClose={() => setIsViewOpen(false)} 
        patient={selectedPatient} 
      />

      <PatientDeleteAlert 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        patient={selectedPatient} 
      />
    </div>
  );
}
