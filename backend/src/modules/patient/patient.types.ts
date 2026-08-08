import { Types } from 'mongoose';

export interface IPatient {
  _id?: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  doctor: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPatientQuery {
  search?: string;
  doctor?: string;
  gender?: string;
  createdFrom?: string;
  createdTo?: string;
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
