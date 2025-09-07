import { clinic } from './clinic';
import { patientPortal } from './patient-portal';
import { common } from './common';
import { en as existingEn } from '../en';

export const en = {
  ...existingEn.translation,
  clinic,
  patientPortal,
  common,
};
