import { Patient } from '../../models/Patient';
import { IPatient, IPatientQuery } from './patient.types';

export const createPatient = async (patientData: IPatient) => {
  return await Patient.create(patientData);
};

export const getAllPatients = async (queryOptions: IPatientQuery = {}) => {
  const { search, doctor, gender, createdFrom, createdTo, sortBy = 'createdAt', sortOrder = 'desc' } = queryOptions;
  const page = Number(queryOptions.page) || 1;
  const limit = Number(queryOptions.limit) || 10;
  
  const filter: any = {};

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filter.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { phone: searchRegex },
    ];
  }

  if (doctor) {
    filter.doctor = doctor;
  }
  
  if (gender) {
    filter.gender = gender;
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
    Patient.find(filter)
      .populate('doctor')
      .sort(sortParams)
      .skip(skip)
      .limit(limit),
    Patient.countDocuments(filter),
  ]);

  return { data, total };
};

export const getPatientById = async (id: string) => {
  return await Patient.findById(id).populate('doctor');
};

export const updatePatientById = async (id: string, payload: Partial<IPatient>) => {
  return await Patient.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('doctor');
};

export const deletePatientById = async (id: string) => {
  return await Patient.findByIdAndDelete(id);
};

export const findPatientByEmail = async (email: string) => {
  return await Patient.findOne({ email });
};
