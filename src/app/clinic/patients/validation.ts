import { z } from 'zod';
import { Gender, BloodType } from '@/lib/api/types/clinic-patient';

export const patientSchema = z.object({
  id: z.string().optional(),
  // Basic Information
  fNameF: z.string().min(1, {
    message: 'First name (Foreign) is required',
  }),
  sNameF: z.string().nullable().optional(),
  tNameF: z.string().nullable().optional(),
  lNameF: z.string().nullable().optional(),
  fNameL: z.string().nullable().optional(),
  sNameL: z.string().nullable().optional(),
  tNameL: z.string().nullable().optional(),
  lNameL: z.string().nullable().optional(),
  dateOfBirth: z.string().min(1, {
    message: 'Date of birth is required ',
  }),
  gender: z.coerce.number().min(1, 'Gender is required'),
  // Contact Information
  email: z.string().email('Invalid email format').optional().nullable(),
  phoneNumber: z
    .string()
    .min(1, {
      message: 'Phone number is required',
    })
    .regex(/^\d{9}$/, 'Phone number must be exactly 9 digits'),
  countryCodeId: z.string().optional(),
  // Location
  address: z.string().optional().nullable(),
  countryId: z.string().optional(),
  cityId: z.string().optional(),
  // Medical Information
  bloodType: z.coerce.number().min(1, 'Blood type is required'),

  // In your schema
  height: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === '') return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    })
    .refine((val) => val === undefined || (val >= 0 && val <= 300), {
      message: 'Height must be between 0 and 300',
    }),

  weight: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === '') return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    })
    .refine((val) => val === undefined || (val >= 0 && val <= 500), {
      message: 'Weight must be between 0 and 500',
    }),
});

// Create a base type from the schema
type PatientSchemaType = z.infer<typeof patientSchema>;

// Override the gender and bloodType to be strictly numbers for form usage
export type PatientFormData = Omit<
  PatientSchemaType,
  'gender' | 'bloodType'
> & {
  gender: number | string;
  bloodType: number | string;
};

export const defaultPatientValues: PatientSchemaType = {
  fNameF: '',
  sNameF: '',
  tNameF: '',
  lNameF: '',
  fNameL: '',
  sNameL: '',
  tNameL: '',
  lNameL: '',
  email: '',
  phoneNumber: '',
  countryCodeId: '',
  gender: Gender.Male,
  dateOfBirth: '',
  address: '',
  countryId: '',
  cityId: '',
  bloodType: BloodType.A_Negative,
  height: 0,
  weight: 0,
  // clinicId: '',
  // primaryDoctorId: '',
  // preferredClinicId: '',
};
