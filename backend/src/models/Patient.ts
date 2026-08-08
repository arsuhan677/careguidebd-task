import mongoose from 'mongoose';
import { IPatient } from '../modules/patient/patient.types';

const patientSchema = new mongoose.Schema<IPatient>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
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
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    condition: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.index({ doctor: 1 });
patientSchema.index({ gender: 1 });
patientSchema.index({ condition: 1 });
patientSchema.index({ createdAt: -1 });

export const Patient = (mongoose.models.Patient as mongoose.Model<IPatient>) || mongoose.model<IPatient>('Patient', patientSchema);
