import { z } from 'zod';

export const radiologyTestSchema = z.object({
  code: z
    .string()
    .min(1, 'Code is required')
    .max(50, 'Code must not exceed 50 characters'),
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
  isActive: z.enum(['true', 'false'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be either active or inactive',
  }),
  specialtyId: z.string().optional(),
  radiologyTestCategoryId: z.string().optional(),
});

export type RadiologyTestFormData = z.infer<typeof radiologyTestSchema>;

export interface ParsedRadiologyTestData
  extends Omit<RadiologyTestFormData, 'isActive'> {
  isActive: boolean;
  id?: string;
}
