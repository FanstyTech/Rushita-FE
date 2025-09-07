import { z } from 'zod';
import {
  Relationship,
  FamilyHistoryStatus,
} from '@/lib/api/types/clinic-patient';
import { TFunction } from 'i18next';

export const createFamilyHistorySchema = (t: TFunction) =>
  z.object({
    id: z.string().optional(),
    condition: z.string().min(1, {
      message: t(
        'clinic.patients.modals.addFamilyHistory.validation.conditionRequired'
      ),
    }),
    ageOfOnset: z.string().min(1, {
      message: t(
        'clinic.patients.modals.addFamilyHistory.validation.ageOfOnsetRequired'
      ),
    }),
    relationship: z
      .number()
      .min(
        1,
        t(
          'clinic.patients.modals.addFamilyHistory.validation.relationshipRequired'
        )
      ),
    status: z
      .number()
      .min(
        1,
        t('clinic.patients.modals.addFamilyHistory.validation.statusRequired')
      ),
    notes: z.string().optional(),
  });

// Legacy export for backward compatibility
export const familyHistorySchema = z.object({
  id: z.string().optional(),
  condition: z.string().min(1, {
    message: 'Condition  is required',
  }),
  ageOfOnset: z.string().min(1, {
    message: 'Age of onset is required',
  }),
  relationship: z.number().min(1, 'Relationship is required'),
  status: z.number().min(1, 'Status is required'),
  notes: z.string().optional(),
});

export type familyHistoryFormData = z.infer<typeof familyHistorySchema>;

export const defaultfamilyHistoryValues: familyHistoryFormData = {
  condition: '',
  ageOfOnset: '',
  relationship: Relationship.Parent,
  status: FamilyHistoryStatus.Living,
  notes: '',
};
