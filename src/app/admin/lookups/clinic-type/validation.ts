import { z } from 'zod';

export const clinicTypeSchema = z.object({
  id: z.string().optional(),
  nameL: z
    .string()
    .min(1, { message: 'Name in English is required' })
    .max(100, { message: 'Name in English must be less than 100 characters' }),
  nameF: z
    .string()
    .min(1, { message: 'Name in Arabic is required' })
    .max(100, { message: 'Name in Arabic must be less than 100 characters' }),
  isActive: z.enum(['true', 'false']),
});

export type ClinicTypeFormData = z.infer<typeof clinicTypeSchema>;
export type ParsedClinicTypeData = Omit<ClinicTypeFormData, 'isActive'> & {
  isActive: boolean;
  id?: string;
};
