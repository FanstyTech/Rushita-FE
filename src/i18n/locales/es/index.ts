import { clinic } from './clinic';
import { patientPortal } from './patient-portal';
import { common } from './common';
import { es as existingEs } from '../es';

export const es = {
  ...existingEs.translation,
  clinic,
  patientPortal,
  common,
};
