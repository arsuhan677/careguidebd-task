import { Request, Response } from 'express';
import * as dashboardService from './dashboard.service';
import { catchAsync } from '../auth/auth.utils';

export const getDashboard = catchAsync(async (req: Request, res: Response) => {
  const dashboardData = await dashboardService.getDashboardData();

  res.status(200).json({
    success: true,
    message: 'Dashboard data retrieved successfully',
    data: dashboardData,
  });
});
