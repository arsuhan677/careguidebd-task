import { Router, Request, Response, NextFunction } from 'express';
import * as patientController from './patient.controller';
import { createPatientSchema, updatePatientSchema, getAllPatientsQuerySchema } from './patient.validator';
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

router.post('/', validate(createPatientSchema), patientController.createPatient);
router.get('/', validate(getAllPatientsQuerySchema), patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.patch('/:id', validate(updatePatientSchema), patientController.updatePatientById);
router.delete('/:id', patientController.deletePatientById);

export default router;
