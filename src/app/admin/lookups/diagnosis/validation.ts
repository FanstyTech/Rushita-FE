import { z } from 'zod';

export const diagnosisSchema = z.object({
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
  commonSymptoms: z
    .string()
    .max(1000, 'Common symptoms must not exceed 1000 characters')
    .optional(),
  commonMedications: z
    .string()
    .max(1000, 'Common medications must not exceed 1000 characters')
    .optional(),
  recommendedTests: z
    .string()
    .max(1000, 'Recommended tests must not exceed 1000 characters')
    .optional(),
  riskFactors: z
    .string()
    .max(1000, 'Risk factors must not exceed 1000 characters')
    .optional(),
  specialtyId: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.enum(['true', 'false'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be either active or inactive',
  }),
});

export type DiagnosisFormData = z.infer<typeof diagnosisSchema>;

export interface ParsedDiagnosisData
  extends Omit<DiagnosisFormData, 'isActive'> {
  isActive: boolean;
  id?: string;
}
