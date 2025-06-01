import { z } from 'zod';

export const dentalProcedureSchema = z.object({
  nameL: z
    .string()
    .min(2, 'الاسم المحلي مطلوب ويجب أن يكون على الأقل حرفين')
    .max(50, 'الاسم المحلي يجب ألا يتجاوز 50 حرفاً'),
  nameF: z
    .string()
    .min(2, 'Foreign name is required and must be at least 2 characters')
    .max(50, 'Foreign name must not exceed 50 characters'),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional(),
  color: z
    .string()
    .min(4, 'Color is required')
    .max(7, 'Color must be a valid hex color'),
  defaultCost: z
    .number()
    .min(0, 'Default cost must be a positive number')
    .nonnegative('Default cost must be a positive number'),
  isActive: z.enum(['true', 'false'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be either active or inactive',
  }),
});

export type DentalProcedureFormData = z.infer<typeof dentalProcedureSchema>;

export interface ParsedDentalProcedureData extends Omit<DentalProcedureFormData, 'isActive' | 'defaultCost'> {
  isActive: boolean;
  defaultCost: number;
  id?: string;
}
