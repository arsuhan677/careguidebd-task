import { User } from '../../models/User';
import { IUser } from './auth.types';

export const createUser = async (userData: Partial<IUser>) => {
  return await User.create(userData);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findUserById = async (id: string) => {
  return await User.findById(id).select('-password');
};
