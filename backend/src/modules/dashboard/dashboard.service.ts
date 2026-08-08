import * as dashboardRepository from './dashboard.repository';
import { IDashboardData } from './dashboard.types';

export const getDashboardData = async (): Promise<IDashboardData> => {
  const [
    totalDoctors,
    totalPatients,
    genderDistribution,
    patientsByMonth,
    doctorsBySpecialization,
    patientsByDoctor,
    recentDoctors,
    recentPatients,
  ] = await Promise.all([
    dashboardRepository.getTotalDoctors(),
    dashboardRepository.getTotalPatients(),
    dashboardRepository.getGenderDistribution(),
    dashboardRepository.getPatientsByMonth(),
    dashboardRepository.getDoctorsBySpecialization(),
    dashboardRepository.getPatientsByDoctor(),
    dashboardRepository.getRecentDoctors(),
    dashboardRepository.getRecentPatients(),
  ]);

  let totalMalePatients = 0;
  let totalFemalePatients = 0;
  let totalOtherPatients = 0;

  genderDistribution.forEach((stat) => {
    if (stat.gender === 'Male') totalMalePatients = stat.count;
    else if (stat.gender === 'Female') totalFemalePatients = stat.count;
    else if (stat.gender === 'Other') totalOtherPatients = stat.count;
  });

  return {
    summary: {
      totalDoctors,
      totalPatients,
      totalMalePatients,
      totalFemalePatients,
      totalOtherPatients,
    },
    genderDistribution,
    patientsByMonth,
    doctorsBySpecialization,
    patientsByDoctor,
    recentDoctors,
    recentPatients,
  };
};
