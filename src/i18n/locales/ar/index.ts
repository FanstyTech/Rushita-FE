import { clinic } from './clinic';
import { patientPortal } from './patient-portal';
import { common } from './common';
import { ar as existingAr } from '../ar';

export const ar = {
  ...existingAr.translation,
  clinic,
  patientPortal,
  common,
};
