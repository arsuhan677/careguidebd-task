'use client';

import { IPatient } from '@/types/patient';
import { IDoctor } from '@/types/doctor';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, User, UserCheck } from 'lucide-react';

interface PatientViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  patient: IPatient | null;
}

export function PatientViewDialog({ isOpen, onClose, patient }: PatientViewDialogProps) {
  if (!patient) return null;

  const getDoctorName = (doctor: string | IDoctor) => {
    if (typeof doctor === 'string') return 'Unknown';
    return doctor.name;
  };

  const getDoctorSpecialization = (doctor: string | IDoctor) => {
    if (typeof doctor === 'string') return '';
    return doctor.specialization;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            Patient Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{patient.name}</h3>
            <div className="flex items-center mt-2 gap-2">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {patient.gender}
              </Badge>
              <Badge variant="outline" className="text-gray-600">
                {patient.age} Years Old
              </Badge>
            </div>
          </div>

          <div className="space-y-4 rounded-lg bg-gray-50 p-4 border border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="mr-3 h-4 w-4 text-gray-400" />
              {patient.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="mr-3 h-4 w-4 text-gray-400" />
              {patient.email}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 flex items-center border-b pb-2">
              <UserCheck className="mr-2 h-4 w-4 text-gray-400" />
              Assigned Doctor
            </h4>
            <div className="text-sm text-gray-600 pl-6">
              <div className="font-medium text-gray-900">{getDoctorName(patient.doctor)}</div>
              <div className="text-gray-500 mt-0.5">{getDoctorSpecialization(patient.doctor)}</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 flex items-center border-b pb-2">
              <User className="mr-2 h-4 w-4 text-gray-400" />
              System Information
            </h4>
            <div className="grid grid-cols-2 gap-4 pl-6">
              <div>
                <span className="block text-xs text-gray-500 mb-1">Added On</span>
                <div className="flex items-center text-sm text-gray-900">
                  <Calendar className="mr-2 h-3 w-3 text-gray-400" />
                  {format(new Date(patient.createdAt), 'MMM dd, yyyy')}
                </div>
              </div>
              <div>
                <span className="block text-xs text-gray-500 mb-1">Last Updated</span>
                <div className="flex items-center text-sm text-gray-900">
                  <Calendar className="mr-2 h-3 w-3 text-gray-400" />
                  {format(new Date(patient.updatedAt), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
