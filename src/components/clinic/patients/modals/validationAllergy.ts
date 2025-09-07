import { z } from 'zod';
import { Severity } from '@/lib/api/types/clinic-patient';
import { TFunction } from 'i18next';

export const createAllergySchema = (t: TFunction) =>
  z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
      message: t('clinic.patients.modals.addAllergy.validation.nameRequired'),
    }),
    reaction: z.string().min(1, {
      message: t(
        'clinic.patients.modals.addAllergy.validation.reactionRequired'
      ),
    }),
    severity: z
      .number()
      .min(
        1,
        t('clinic.patients.modals.addAllergy.validation.severityRequired')
      ),
  });

// Legacy export for backward compatibility
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
