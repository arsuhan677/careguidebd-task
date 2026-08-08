import { IDoctor } from '../doctor/doctor.types';
import { IPatient } from '../patient/patient.types';

export interface IDashboardMetrics {
  totalDoctors: number;
  totalPatients: number;
  totalMalePatients: number;
  totalFemalePatients: number;
  totalOtherPatients: number;
}

export interface IGenderDistribution {
  gender: string;
  count: number;
}

export interface IPatientMonthlyStats {
  month: string;
  count: number;
}

export interface IDoctorSpecializationStats {
  specialization: string;
  count: number;
}

export interface IPatientByDoctorStats {
  doctorId: string;
  doctorName: string;
  patientCount: number;
}

export interface IDashboardData {
  summary: IDashboardMetrics;
  genderDistribution: IGenderDistribution[];
  patientsByMonth: IPatientMonthlyStats[];
  doctorsBySpecialization: IDoctorSpecializationStats[];
  patientsByDoctor: IPatientByDoctorStats[];
  recentDoctors: Partial<IDoctor>[];
  recentPatients: Partial<IPatient>[];
}
