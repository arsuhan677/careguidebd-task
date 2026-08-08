import { Router } from 'express';
import * as dashboardController from './dashboard.controller';
import { protect } from '../auth/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', dashboardController.getDashboard);

export default router;
