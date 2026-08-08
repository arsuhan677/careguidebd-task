import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserById } from './auth.repository';
import { IUser } from './auth.types';
import { AppError } from './auth.utils';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const registerUser = async (userData: Partial<IUser>) => {
  const existingUser = await findUserByEmail(userData.email as string);
  if (existingUser) {
    throw new AppError('Email is already registered', 400);
  }

  const user = await createUser(userData);
  const token = generateToken(user._id.toString(), user.role);

  return { user, token };
};

export const loginUser = async (credentials: Partial<IUser>) => {
  const user = await findUserByEmail(credentials.email as string);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordMatch = await bcrypt.compare(credentials.password as string, user.password as string);
  if (!isPasswordMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken(user._id.toString(), user.role);
  return { user, token };
};

export const getMe = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};
