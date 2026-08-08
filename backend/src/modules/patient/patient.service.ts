import * as patientRepository from './patient.repository';
import * as doctorRepository from '../doctor/doctor.repository';
import { IPatient, IPatientQuery } from './patient.types';
import { AppError } from '../auth/auth.utils';
import mongoose from 'mongoose';

export const createPatient = async (patientData: IPatient) => {
  const existingPatient = await patientRepository.findPatientByEmail(patientData.email);
  if (existingPatient) {
    throw new AppError('Patient with this email already exists', 400);
  }

  const doctorExists = await doctorRepository.getDoctorById(patientData.doctor as string);
  if (!doctorExists) {
    throw new AppError('Doctor not found', 404);
  }

  return await patientRepository.createPatient(patientData);
};

export const getAllPatients = async (query: IPatientQuery = {}) => {
  const { data, total } = await patientRepository.getAllPatients(query);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

export const getPatientById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid Patient ID format', 400);
  }

  const patient = await patientRepository.getPatientById(id);
  if (!patient) {
    throw new AppError('Patient not found', 404);
  }

  return patient;
};

export const updatePatientById = async (id: string, payload: Partial<IPatient>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid Patient ID format', 400);
  }

  if (payload.doctor) {
    const doctorExists = await doctorRepository.getDoctorById(payload.doctor as string);
    if (!doctorExists) {
      throw new AppError('Doctor not found', 404);
    }
  }

  const patient = await patientRepository.updatePatientById(id, payload);
  if (!patient) {
    throw new AppError('Patient not found', 404);
  }

  return patient;
};

export const deletePatientById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid Patient ID format', 400);
  }

  const patient = await patientRepository.deletePatientById(id);
  if (!patient) {
    throw new AppError('Patient not found', 404);
  }

  return patient;
};
