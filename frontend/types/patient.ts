import { IDoctor } from './doctor';
import { IPagination } from './doctor';

export interface IPatient {
  _id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  doctor: IDoctor | string;
  condition: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPatientQuery {
  page?: number;
  limit?: number;
  search?: string;
  doctor?: string;
  gender?: string;
  condition?: string;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: 'createdAt' | 'name' | 'age' | 'gender';
  sortOrder?: 'asc' | 'desc';
}

export interface PatientListResponse {
  data: IPatient[];
  pagination: IPagination;
}

export interface CreatePatientPayload {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  doctor: string;
  condition: string;
}

export type UpdatePatientPayload = Partial<CreatePatientPayload>;
