import { z } from 'zod';

export const medicineSchema = z.object({
  code: z
    .string()
    .min(2, 'Code is required and must be at least 2 characters')
    .max(20, 'Code must not exceed 20 characters'),
  nameL: z
    .string()
    .min(2, 'الاسم المحلي مطلوب ويجب أن يكون على الأقل حرفين')
    .max(50, 'الاسم المحلي يجب ألا يتجاوز 50 حرفاً'),
  nameF: z
    .string()
    .min(2, 'Foreign name is required and must be at least 2 characters')
    .max(50, 'Foreign name must not exceed 50 characters'),
  scientificName: z
    .string()
    .min(2, 'Scientific name is required and must be at least 2 characters')
    .max(100, 'Scientific name must not exceed 100 characters'),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional(),
  medicationTypeId: z.string({
    required_error: 'Medication type is required',
    invalid_type_error: 'Invalid medication type',
  }),
  isActive: z.enum(['true', 'false'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be either active or inactive',
  }),
});

export type MedicineFormData = z.infer<typeof medicineSchema>;

export interface ParsedMedicineData extends Omit<MedicineFormData, 'isActive'> {
  isActive: boolean;
  id?: string;
}
