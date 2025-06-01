import { z } from 'zod';

export const radiologyTestCategorySchema = z.object({
  nameL: z
    .string()
    .min(2, 'الاسم المحلي مطلوب ويجب أن يكون على الأقل حرفين')
    .max(50, 'الاسم المحلي يجب ألا يتجاوز 50 حرفاً'),
  nameF: z
    .string()
    .min(2, 'Foreign name is required and must be at least 2 characters')
    .max(50, 'Foreign name must not exceed 50 characters'),
  isActive: z.enum(['true', 'false'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be either active or inactive',
  }),
  parentCategoryId: z.string().optional(),
});

export type RadiologyTestCategoryFormData = z.infer<
  typeof radiologyTestCategorySchema
>;

export interface ParsedRadiologyTestCategoryData
  extends Omit<RadiologyTestCategoryFormData, 'isActive'> {
  isActive: boolean;
  id?: string;
}
