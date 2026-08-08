import { z } from 'zod';

export const createPatientSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    age: z.number().positive(),
    gender: z.enum(['Male', 'Female', 'Other']),
    phone: z.string().min(5).max(20),
    email: z.string().email(),
    doctor: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Doctor ID'),
    condition: z.string().min(1, 'Condition is required'),
  }),
});

export const updatePatientSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    age: z.number().positive().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    phone: z.string().min(5).max(20).optional(),
    email: z.string().email().optional(),
    doctor: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Doctor ID').optional(),
    condition: z.string().min(1).optional(),
  }),
});

export const getAllPatientsQuerySchema = z.object({
  query: z
    .object({
      search: z.string().optional(),
      doctor: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Doctor ID').optional(),
      gender: z.enum(['Male', 'Female', 'Other']).optional(),
      condition: z.string().optional(),
      createdFrom: z.string().datetime({ message: 'Invalid ISO date string' }).optional(),
      createdTo: z.string().datetime({ message: 'Invalid ISO date string' }).optional(),
      page: z
        .string()
        .regex(/^\d+$/, 'Page must be a valid number')
        .transform(Number)
        .refine((val) => val >= 1, { message: 'Page must be at least 1' })
        .optional(),
      limit: z
        .string()
        .regex(/^\d+$/, 'Limit must be a valid number')
        .transform(Number)
        .refine((val) => val >= 1, { message: 'Limit must be at least 1' })
        .refine((val) => val <= 100, { message: 'Limit cannot exceed 100' })
        .optional(),
      sortBy: z.enum(['createdAt', 'name', 'age', 'gender']).optional(),
      sortOrder: z.enum(['asc', 'desc']).optional(),
    })
    .refine(
      (data) => {
        if (data.createdFrom && data.createdTo) {
          return new Date(data.createdFrom) <= new Date(data.createdTo);
        }
        return true;
      },
      {
        message: 'createdFrom must not be later than createdTo',
        path: ['createdFrom'],
      }
    ),
});
