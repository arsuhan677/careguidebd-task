export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JwtPayload {
  id: string;
  role: string;
}
