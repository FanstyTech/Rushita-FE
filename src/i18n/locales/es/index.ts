import { clinic } from './clinic';
import { es as existingEs } from '../es';

export const es = {
  ...existingEs.translation,
  clinic,
};
