'use client';

import { IDoctor } from '@/types/doctor';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, Phone, Building2, Stethoscope, Calendar } from 'lucide-react';

interface DoctorViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: IDoctor | null;
}

export function DoctorViewDialog({ isOpen, onClose, doctor }: DoctorViewDialogProps) {
  if (!doctor) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Doctor Details</DialogTitle>
          <DialogDescription>
            Detailed information about {doctor.name}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-700">
              {doctor.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-sm text-gray-500">Doctor Profile</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Stethoscope className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">Specialization</p>
                <p className="text-gray-500">{doctor.specialization}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">Hospital</p>
                <p className="text-gray-500">{doctor.hospital}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">Phone Number</p>
                <p className="text-gray-500">{doctor.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">Email Address</p>
                <p className="text-gray-500">{doctor.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">Added On</p>
                <p className="text-gray-500">{formatDate(doctor.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
