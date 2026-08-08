import { Patient } from '../../models/Patient';
import { Doctor } from '../../models/Doctor';
import {
  IGenderDistribution,
  IPatientMonthlyStats,
  IDoctorSpecializationStats,
  IPatientByDoctorStats,
} from './dashboard.types';

export const getTotalDoctors = async () => {
  return await Doctor.countDocuments();
};

export const getTotalPatients = async () => {
  return await Patient.countDocuments();
};

export const getGenderDistribution = async (): Promise<IGenderDistribution[]> => {
  const result = await Patient.aggregate([
    {
      $group: {
        _id: '$gender',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        gender: '$_id',
        count: 1,
      },
    },
  ]);
  return result;
};

export const getPatientsByMonth = async (): Promise<IPatientMonthlyStats[]> => {
  const result = await Patient.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        count: 1,
      },
    },
    { $sort: { month: 1 } },
  ]);
  return result;
};

export const getDoctorsBySpecialization = async (): Promise<IDoctorSpecializationStats[]> => {
  const result = await Doctor.aggregate([
    {
      $group: {
        _id: '$specialization',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        specialization: '$_id',
        count: 1,
      },
    },
    { $sort: { count: -1 } },
  ]);
  return result;
};

export const getPatientsByDoctor = async (): Promise<IPatientByDoctorStats[]> => {
  const result = await Patient.aggregate([
    {
      $group: {
        _id: '$doctor',
        patientCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'doctors',
        localField: '_id',
        foreignField: '_id',
        as: 'doctorInfo',
      },
    },
    {
      $unwind: {
        path: '$doctorInfo',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 0,
        doctorId: '$_id',
        doctorName: { $ifNull: ['$doctorInfo.name', 'Unknown Doctor'] },
        patientCount: 1,
      },
    },
    { $sort: { patientCount: -1 } },
  ]);
  return result;
};

export const getRecentDoctors = async () => {
  return await Doctor.find()
    .select('-__v')
    .sort({ createdAt: -1 })
    .limit(5);
};

export const getRecentPatients = async () => {
  return await Patient.find()
    .select('-__v')
    .populate({ path: 'doctor', select: 'name specialization' })
    .sort({ createdAt: -1 })
    .limit(5);
};
