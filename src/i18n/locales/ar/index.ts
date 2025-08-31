import { clinic } from './clinic';
import { ar as existingAr } from '../ar';

export const ar = {
  ...existingAr.translation,
  clinic,
};
