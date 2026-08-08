'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { IDoctor, CreateDoctorPayload, UpdateDoctorPayload } from '@/types/doctor';
import { useCreateDoctor, useUpdateDoctor } from '@/hooks/useDoctors';
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

const doctorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  specialization: z.string().min(1, 'Specialization is required'),
  hospital: z.string().min(1, 'Hospital is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
});

type DoctorFormValues = z.infer<typeof doctorSchema>;

interface DoctorFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor?: IDoctor | null; // null means Create, object means Edit
}

export function DoctorFormDialog({ isOpen, onClose, doctor }: DoctorFormDialogProps) {
  const isEdit = !!doctor;
  
  const createMutation = useCreateDoctor();
  const updateMutation = useUpdateDoctor();
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: '',
      specialization: '',
      hospital: '',
      phone: '',
      email: '',
    },
  });

  useEffect(() => {
    if (doctor && isOpen) {
      reset({
        name: doctor.name,
        specialization: doctor.specialization,
        hospital: doctor.hospital,
        phone: doctor.phone,
        email: doctor.email,
      });
    } else if (!doctor && isOpen) {
      reset({
        name: '',
        specialization: '',
        hospital: '',
        phone: '',
        email: '',
      });
    }
  }, [doctor, isOpen, reset]);

  const onSubmit = (data: DoctorFormValues) => {
    if (isEdit && doctor) {
      updateMutation.mutate(
        { id: doctor._id, payload: data as UpdateDoctorPayload },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      createMutation.mutate(data as CreateDoctorPayload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const apiError = createMutation.error || updateMutation.error;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Doctor' : 'Add Doctor'}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the doctor's details below." : 'Fill in the details to add a new doctor.'}
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
            <Input id="name" {...register('name')} placeholder="Dr. John Doe" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onValueChange={(val: any) => setValue('specialization', val, { shouldValidate: true })}
                defaultValue={doctor?.specialization ?? ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                </SelectContent>
              </Select>
              {errors.specialization && <p className="text-xs text-red-500">{errors.specialization.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hospital">Hospital</Label>
              <Select 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onValueChange={(val: any) => setValue('hospital', val, { shouldValidate: true })}
                defaultValue={doctor?.hospital ?? ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dhaka Medical College">Dhaka Medical College</SelectItem>
                  <SelectItem value="Square Hospital">Square Hospital</SelectItem>
                  <SelectItem value="Apollo Hospital">Apollo Hospital</SelectItem>
                  <SelectItem value="United Hospital">United Hospital</SelectItem>
                  <SelectItem value="Evercare Hospital">Evercare Hospital</SelectItem>
                </SelectContent>
              </Select>
              {errors.hospital && <p className="text-xs text-red-500">{errors.hospital.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register('phone')} placeholder="+8801700000000" />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} placeholder="doctor@example.com" />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="flex justify-end pt-4 gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
              {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Doctor'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
