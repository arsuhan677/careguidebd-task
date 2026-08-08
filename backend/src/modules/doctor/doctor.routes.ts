import { Router, Request, Response, NextFunction } from 'express';
import * as doctorController from './doctor.controller';
import { createDoctorSchema, updateDoctorSchema, getAllDoctorsQuerySchema } from './doctor.validator';
import { protect } from '../auth/auth.middleware';

const router = Router();

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err.errors || err.message,
    });
  }
};

router.use(protect);

router.post('/', validate(createDoctorSchema), doctorController.createDoctor);
router.get('/', validate(getAllDoctorsQuerySchema), doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.patch('/:id', validate(updateDoctorSchema), doctorController.updateDoctorById);
router.delete('/:id', doctorController.deleteDoctorById);

export default router;
