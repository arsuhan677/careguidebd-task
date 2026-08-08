import * as doctorRepository from './doctor.repository';
import { IDoctor, IDoctorQuery, IPagination } from './doctor.types';
import { AppError } from '../auth/auth.utils';
import mongoose from 'mongoose';

export const createDoctor = async (doctorData: IDoctor) => {
  const existingDoctor = await doctorRepository.findDoctorByEmail(doctorData.email);
  if (existingDoctor) {
    throw new AppError('Doctor with this email already exists', 400);
  }
  return await doctorRepository.createDoctor(doctorData);
};

export const getAllDoctors = async (query: IDoctorQuery) => {
  const { data, total } = await doctorRepository.getAllDoctors(query);
  
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const totalPages = Math.ceil(total / limit);

  const pagination: IPagination = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  return { data, pagination };
};

export const getDoctorById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid Doctor ID format', 400);
  }

  const doctor = await doctorRepository.getDoctorById(id);
  if (!doctor) {
    throw new AppError('Doctor not found', 404);
  }
  return doctor;
};

export const updateDoctorById = async (id: string, payload: Partial<IDoctor>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid Doctor ID format', 400);
  }

  const doctor = await doctorRepository.getDoctorById(id);
  if (!doctor) {
    throw new AppError('Doctor not found', 404);
  }

  return await doctorRepository.updateDoctorById(id, payload);
};

export const deleteDoctorById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid Doctor ID format', 400);
  }

  const doctor = await doctorRepository.getDoctorById(id);
  if (!doctor) {
    throw new AppError('Doctor not found', 404);
  }

  return await doctorRepository.deleteDoctorById(id);
};
