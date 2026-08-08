import mongoose from 'mongoose';
import { IDoctor } from '../modules/doctor/doctor.types';

const doctorSchema = new mongoose.Schema<IDoctor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    hospital: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

doctorSchema.index({ specialization: 1 });
doctorSchema.index({ hospital: 1 });
doctorSchema.index({ createdAt: -1 });

export const Doctor = (mongoose.models.Doctor as mongoose.Model<IDoctor>) || mongoose.model<IDoctor>('Doctor', doctorSchema);
