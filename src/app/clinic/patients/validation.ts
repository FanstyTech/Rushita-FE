import { z } from 'zod';
import {
  Gender,
  BloodType,
  IdentificationType,
} from '@/lib/api/types/clinic-patient';

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
  idNum: z.string().nullable().optional(),
  idType: z.coerce.number().min(1, { message: 'نوع الهوية مطلوب' }),
  preferredLanguage: z.string().nullable().optional(),
  dateOfBirth: z.string().min(1, {
    message: 'Date of birth is required ',
  }),
  gender: z.coerce.number().min(1, 'Gender is required'),
  // Contact Information
  email: z.string().email('Invalid email format').optional().nullable(),

  phoneNumber: z
    .string()
    .max(9, { message: 'Phone number must be exactly 9 digits ' }),
  countryCodeId: z.string().optional(),
  // Location
  address: z.string().optional().nullable(),
  countryId: z.string().optional(),
  cityId: z.string().optional(),
  // Medical Information
  bloodType: z.coerce.number().min(1, 'Blood type is required'),

  // In your schema
  height: z.number().min(1, { message: 'Height is required' }),
  weight: z.number().min(1, { message: 'Weight is required' }),
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
  idType: IdentificationType.NationalID,
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
