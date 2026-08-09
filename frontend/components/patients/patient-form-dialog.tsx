'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { IPatient, CreatePatientPayload, UpdatePatientPayload } from '@/types/patient';
import { useCreatePatient, useUpdatePatient } from '@/hooks/usePatients';
import { useGetDoctors } from '@/hooks/useDoctors';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().positive('Age must be a positive number'),
  gender: z.enum(['Male', 'Female', 'Other']),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
  doctor: z.string().min(1, 'Doctor is required'),
  condition: z.string().min(1, 'Condition is required'),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface PatientFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: IPatient | null; // null means Create, object means Edit
  preSelectedDoctorId?: string;
}

export function PatientFormDialog({ isOpen, onClose, patient, preSelectedDoctorId }: PatientFormDialogProps) {
  const isEdit = !!patient;
  
  const createMutation = useCreatePatient();
  const updateMutation = useUpdatePatient();
  
  const { data: doctorsRes } = useGetDoctors({ limit: 100 });
  const doctors = doctorsRes?.data || [];
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch, control } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      age: undefined,
      gender: 'Male', // Just to satisfy types, won't be used if overridden
      phone: '',
      email: '',
      doctor: '',
      condition: '',
    },
  });

  const [conditionPreset, setConditionPreset] = useState<string>('');
  
  const commonConditions = ['Fever', 'Diabetes', 'Heart Disease', 'Hypertension', 'Asthma'];

  useEffect(() => {
    if (patient && isOpen) {
      reset({
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        phone: patient.phone,
        email: patient.email,
        doctor: typeof patient.doctor === 'string' ? patient.doctor : patient.doctor._id,
        condition: patient.condition,
      });
      setConditionPreset(commonConditions.includes(patient.condition) ? patient.condition : 'Other');
    } else if (!patient && isOpen) {
      reset({
        name: '',
        age: undefined,
        phone: '',
        email: '',
        doctor: preSelectedDoctorId || '',
        condition: '',
      });
      setConditionPreset('');
      // Do not reset gender so we can let users select or keep empty
    }
  }, [patient, isOpen, reset, preSelectedDoctorId]);

  const onSubmit = (data: PatientFormValues) => {
    if (isEdit) {
      updateMutation.mutate(
        { id: patient._id, payload: data as UpdatePatientPayload },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    } else {
      createMutation.mutate(
        data as CreatePatientPayload,
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const apiError = createMutation.error || updateMutation.error;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
          <DialogDescription>
            {isEdit 
              ? 'Update the patient details below.' 
              : 'Enter the details of the new patient to add to the system.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {apiError && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {(apiError as Error).message || 'An error occurred. Please try again.'}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register('name')} placeholder="John Doe" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" {...register('age')} placeholder="30" />
              {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onValueChange={(val: any) => setValue('gender', val, { shouldValidate: true })}
                defaultValue={patient?.gender ?? undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" {...register('phone')} placeholder="+1 (555) 000-0000" />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register('email')} placeholder="john@example.com" />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doctor">Assigned Doctor</Label>
              <Select 
                onValueChange={(val: any) => setValue('doctor', val, { shouldValidate: true })}
                defaultValue={patient ? (typeof patient.doctor === 'string' ? patient.doctor : patient.doctor._id) : preSelectedDoctorId}
                disabled={!!preSelectedDoctorId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assigned doctor..." />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map(doc => (
                    <SelectItem key={doc._id} value={doc._id}>{doc.name} - {doc.specialization}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.doctor && <p className="text-xs text-red-500">{errors.doctor.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select 
                onValueChange={(val: any) => {
                  setConditionPreset(val);
                  if (val !== 'Other') {
                    setValue('condition', val, { shouldValidate: true });
                  } else {
                    setValue('condition', '', { shouldValidate: true });
                  }
                }}
                value={conditionPreset}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition..." />
                </SelectTrigger>
                <SelectContent>
                  {commonConditions.map(cond => (
                    <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                  ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {conditionPreset !== 'Other' && errors.condition && <p className="text-xs text-red-500">{errors.condition.message}</p>}
            </div>
          </div>

          {conditionPreset === 'Other' && (
            <div className="space-y-2">
              <Label htmlFor="customCondition">Specify Condition</Label>
              <Input id="customCondition" {...register('condition')} placeholder="Enter patient's condition" />
              {errors.condition && <p className="text-xs text-red-500">{errors.condition.message}</p>}
            </div>
          )}


          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
              {isPending ? 'Saving...' : (isEdit ? 'Save Changes' : 'Add Patient')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
