import { Request, Response } from 'express';
import { catchAsync } from './auth.utils';
import * as authService from './auth.service';

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: result.user,
    token: result.token,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    data: result.user,
    token: result.token,
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const user = await authService.getMe(userId);
  res.status(200).json({
    success: true,
    message: 'User profile rtrieved successfully',
    data: user,
  });
});
