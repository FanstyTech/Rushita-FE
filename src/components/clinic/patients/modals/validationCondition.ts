import { z } from 'zod';
import { MedicalConditionStatus } from '@/lib/api/types/clinic-patient';

export const conditionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: 'Condition Name is required',
  }),
  diagnosedDate: z.string().min(1, {
    message: 'Diagnosed Date is required',
  }),
  status: z.number().min(1, 'Condition Status is required'),
});

export type conditionFormData = z.infer<typeof conditionSchema>;

export const defaultConditionValues: conditionFormData = {
  name: '',
  diagnosedDate: '',
  status: MedicalConditionStatus.Monitoring,
};
