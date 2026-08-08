import { z } from 'zod';

export const createDoctorSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    specialization: z.string().min(2).max(100),
    hospital: z.string().min(2).max(150),
    phone: z.string().min(5).max(20),
    email: z.string().email(),
  }),
});

export const updateDoctorSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    specialization: z.string().min(2).max(100).optional(),
    hospital: z.string().min(2).max(150).optional(),
    phone: z.string().min(5).max(20).optional(),
    email: z.string().email().optional(),
  }),
});

export const getAllDoctorsQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).refine((val) => val > 0, { message: 'Page must be greater than 0' }).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).refine((val) => val > 0, { message: 'Limit must be greater than 0' }).optional(),
    search: z.string().optional(),
    specialization: z.string().optional(),
    hospital: z.string().optional(),
    createdFrom: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' }).optional(),
    createdTo: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' }).optional(),
    sortBy: z.enum(['createdAt', 'name', 'specialization', 'hospital']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});
