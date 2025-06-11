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
  gender: z.number().min(1, 'Gender is required'),
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
  bloodType: z.number().min(1, 'Blood type is required'),

  height: z.number().min(0).max(300).optional(),
  weight: z.number().min(0).max(500).optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;

export const defaultPatientValues: PatientFormData = {
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
