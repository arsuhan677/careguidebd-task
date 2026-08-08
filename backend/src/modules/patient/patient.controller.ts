import { Request, Response } from 'express';
import { catchAsync } from '../auth/auth.utils';
import * as patientService from './patient.service';

export const createPatient = catchAsync(async (req: Request, res: Response) => {
  const patient = await patientService.createPatient(req.body);
  res.status(201).json({
    success: true,
    message: 'Patient created successfully',
    data: patient,
  });
});

export const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const result = await patientService.getAllPatients(req.query);
  res.status(200).json({
    success: true,
    message: 'Patients retrieved successfully',
    data: result.data,
    pagination: result.meta,
  });
});

export const getPatientById = catchAsync(async (req: Request, res: Response) => {
  const patient = await patientService.getPatientById(req.params.id as string);
  res.status(200).json({
    success: true,
    message: 'Patient retrieved successfully',
    data: patient,
  });
});

export const updatePatientById = catchAsync(async (req: Request, res: Response) => {
  const patient = await patientService.updatePatientById(req.params.id as string, req.body);
  res.status(200).json({
    success: true,
    message: 'Patient updated successfully',
    data: patient,
  });
});

export const deletePatientById = catchAsync(async (req: Request, res: Response) => {
  await patientService.deletePatientById(req.params.id as string);
  res.status(200).json({
    success: true,
    message: 'Patient deleted successfully',
    data: null,
  });
});
