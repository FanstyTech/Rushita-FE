import { clinicDashboard } from './dashboard';
import { clinicAppointments } from './appointments';
import { clinicPatients } from './patients';
import { clinicLaboratory } from './laboratory';
import { pharmacy } from './pharmacy';
import { radiology } from './radiology';
import { financial } from './financial';
import { settings } from './settings';
import { profile } from './profile';
import { staff } from './staff';
import { doctor } from './doctor';
import { visits } from './visits';

export const clinic = {
  dashboard: clinicDashboard,
  appointments: clinicAppointments,
  patients: clinicPatients,
  laboratory: clinicLaboratory,
  pharmacy: pharmacy,
  radiology: radiology,
  financial: financial,
  settings: settings,
  profile: profile,
  staff: staff,
  doctor: doctor,
  visits: visits,
};

export type ClinicTranslations = typeof clinic;
