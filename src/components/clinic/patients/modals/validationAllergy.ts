import { z } from 'zod';
import { Severity } from '@/lib/api/types/clinic-patient';

export const allergySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: 'Allergy Name is required',
  }),
  reaction: z.string().min(1, {
    message: 'Reaction is required',
  }),
  severity: z.number().min(1, 'Severity is required'),
});

export type allergyFormData = z.infer<typeof allergySchema>;

export const defaultAllergyValues: allergyFormData = {
  name: '',
  reaction: '',
  severity: Severity.Mild,
};
