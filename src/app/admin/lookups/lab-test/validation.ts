import { z } from 'zod';

export const labTestSchema = z.object({
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
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional(),
  color: z
    .string()
    .min(4, 'Color is required')
    .max(7, 'Color must be a valid hex color'),
  specialtyId: z
    .string()
    .optional(),
  labTestCategoryId: z
    .string()
    .optional(),
  isActive: z.enum(['true', 'false'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be either active or inactive',
  }),
});

export type LabTestFormData = z.infer<typeof labTestSchema>;

export interface ParsedLabTestData extends Omit<LabTestFormData, 'isActive'> {
  isActive: boolean;
  id?: string;
}
