import { Request, Response } from 'express';
import { catchAsync } from '../auth/auth.utils';
import * as doctorService from './doctor.service';

export const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const doctor = await doctorService.createDoctor(req.body);
  res.status(201).json({
    success: true,
    message: 'Doctor created successfully',
    data: doctor,
  });
});

export const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.getAllDoctors(req.query);
  res.status(200).json({
    success: true,
    message: 'Doctors retrieved successfully',
    data: result.data,
    pagination: result.pagination,
  });
});

export const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const doctor = await doctorService.getDoctorById(req.params.id as string);
  res.status(200).json({
    success: true,
    message: 'Doctor retrieved successfully',
    data: doctor,
  });
});

export const updateDoctorById = catchAsync(async (req: Request, res: Response) => {
  const doctor = await doctorService.updateDoctorById(req.params.id as string, req.body);
  res.status(200).json({
    success: true,
    message: 'Doctor updated successfully',
    data: doctor,
  });
});

export const deleteDoctorById = catchAsync(async (req: Request, res: Response) => {
  await doctorService.deleteDoctorById(req.params.id as string);
  res.status(200).json({
    success: true,
    message: 'Doctor deleted successfully',
    data: null,
  });
});
