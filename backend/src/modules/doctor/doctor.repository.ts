import { Doctor } from '../../models/Doctor';
import { IDoctor, IDoctorQuery } from './doctor.types';
import mongoose from 'mongoose';

export const createDoctor = async (doctorData: IDoctor) => {
  return await Doctor.create(doctorData);
};

export const getAllDoctors = async (queryOptions: IDoctorQuery) => {
  const { search, specialization, hospital, createdFrom, createdTo, sortBy = 'createdAt', sortOrder = 'desc' } = queryOptions;
  
  const page = Number(queryOptions.page) || 1;
  const limit = Number(queryOptions.limit) || 10;
  
  const filter: any = {};

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filter.$or = [
      { name: { $regex: searchRegex } },
      { specialization: { $regex: searchRegex } },
      { hospital: { $regex: searchRegex } },
      { email: { $regex: searchRegex } },
    ];
  }

  if (specialization) {
    filter.specialization = specialization;
  }

  if (hospital) {
    filter.hospital = hospital;
  }

  if (createdFrom || createdTo) {
    filter.createdAt = {};
    if (createdFrom) filter.createdAt.$gte = new Date(createdFrom);
    if (createdTo) filter.createdAt.$lte = new Date(createdTo);
  }

  const sortParams: any = {
    [sortBy]: sortOrder === 'desc' ? -1 : 1,
  };

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Doctor.find(filter).sort(sortParams).skip(skip).limit(limit),
    Doctor.countDocuments(filter),
  ]);

  return { data, total };
};

export const getDoctorById = async (id: string) => {
  return await Doctor.findById(id);
};

export const updateDoctorById = async (id: string, payload: Partial<IDoctor>) => {
  return await Doctor.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deleteDoctorById = async (id: string) => {
  return await Doctor.findByIdAndDelete(id);
};

export const findDoctorByEmail = async (email: string) => {
  return await Doctor.findOne({ email });
};
