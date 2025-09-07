import { z } from 'zod';
import { TFunction } from 'i18next';
import { RevenueType } from '@/lib/api/types/revenue';

export interface RevenueFormData {
  revenueType: RevenueType;
  amount: number;
  revenueDate: string;
  description?: string;
}

// Dynamic schema factory function for multilingual validation
export const createRevenueSchema = (t: TFunction) => {
  return z.object({
    revenueType: z.coerce
      .number({
        required_error: t(
          'clinic.financial.revenues.validation.revenueTypeRequired'
        ),
        invalid_type_error: t(
          'clinic.financial.revenues.validation.revenueTypeInvalid'
        ),
      })
      .refine(
        (val) => Object.values(RevenueType).includes(val as RevenueType),
        {
          message: t('clinic.financial.revenues.validation.revenueTypeInvalid'),
        }
      ),
    amount: z
      .number({
        required_error: t(
          'clinic.financial.revenues.validation.amountRequired'
        ),
        invalid_type_error: t(
          'clinic.financial.revenues.validation.amountRequired'
        ),
      })
      .min(0.01, {
        message: t('clinic.financial.revenues.validation.amountMinimum'),
      }),
    revenueDate: z
      .string({
        required_error: t('clinic.financial.revenues.validation.dateRequired'),
      })
      .min(1, {
        message: t('clinic.financial.revenues.validation.dateRequired'),
      }),
    description: z.string().optional(),
  });
};

// Static schema for backward compatibility
export const revenueSchema = z.object({
  revenueType: z.coerce
    .number({
      required_error: 'Revenue type is required',
      invalid_type_error: 'Revenue type must be a number',
    })
    .refine((val) => Object.values(RevenueType).includes(val as RevenueType), {
      message: 'Invalid revenue type',
    }),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  revenueDate: z.string().min(1, 'Date is required'),
  description: z.string().optional(),
});

export type RevenueSchema = z.infer<typeof revenueSchema>;
