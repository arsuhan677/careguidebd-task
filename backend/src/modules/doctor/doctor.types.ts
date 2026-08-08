export interface IDoctor {
  _id?: string;
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDoctorQuery {
  page?: number;
  limit?: number;
  search?: string;
  specialization?: string;
  hospital?: string;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: 'createdAt' | 'name' | 'specialization' | 'hospital';
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
