import { z } from 'zod';

export const countrySchema = z.object({
  nameL: z
    .string()
    .min(2, 'Local name must be at least 2 characters')
    .max(100, 'Local name must not exceed 100 characters'),
  nameF: z
    .string()
    .min(2, 'Foreign name must be at least 2 characters')
    .max(100, 'Foreign name must not exceed 100 characters'),
  code: z
    .string()
    .min(2, 'Country code must be at least 2 characters')
    .max(3, 'Country code must not exceed 3 characters'),
  phoneCode: z
    .string()
    .min(1, 'Phone code is required')
    .max(5, 'Phone code must not exceed 5 characters')
    .regex(/^\+?[0-9]+$/, 'Phone code must contain only numbers'),
  isActive: z.enum(['true', 'false']),
});
// Form data type matches exactly what the form handles
export type CountryFormData = z.infer<typeof countrySchema>;

// Parsed data type includes the transformed boolean
export type ParsedCountryData = Omit<CountryFormData, 'isActive'> & {
  isActive: boolean;
  id?: string;
};
