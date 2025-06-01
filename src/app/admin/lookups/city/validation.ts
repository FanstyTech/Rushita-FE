import { z } from 'zod';

export const citySchema = z.object({
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
  countryId: z.string().min(1, 'Please select a country'),
});

export type CityFormData = z.infer<typeof citySchema>;

export interface ParsedCityData {
  id?: string;
  nameL: string;
  nameF: string;
  isActive: boolean;
  countryId: string;
}
