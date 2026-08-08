'use client';

import { IDoctor } from '@/types/doctor';
import { useDeleteDoctor } from '@/hooks/useDoctors';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DoctorDeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: IDoctor | null;
}

export function DoctorDeleteAlert({ isOpen, onClose, doctor }: DoctorDeleteAlertProps) {
  const deleteMutation = useDeleteDoctor();

  if (!doctor) return null;

  const handleDelete = () => {
    deleteMutation.mutate(doctor._id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete Dr. {doctor.name} 
            from our servers and remove all of their associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {deleteMutation.error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {(deleteMutation.error as Error).message || 'Failed to delete doctor.'}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending} onClick={onClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
