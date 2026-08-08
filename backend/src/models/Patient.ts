import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({});

export const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
