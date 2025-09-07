import { z } from 'zod';
import { ExpenseType } from '@/lib/api/types/expense';
import { TFunction } from 'i18next';

export const createExpenseSchema = (t: TFunction) =>
  z.object({
    expenseType: z.coerce
      .number({
        required_error: t(
          'clinic.financial.expenses.validation.expenseTypeRequired'
        ),
        invalid_type_error: t(
          'clinic.financial.expenses.validation.expenseTypeInvalid'
        ),
      })
      .refine(
        (val) => Object.values(ExpenseType).includes(val as ExpenseType),
        {
          message: t('clinic.financial.expenses.validation.expenseTypeInvalid'),
        }
      ),
    amount: z
      .number()
      .min(0.01, t('clinic.financial.expenses.validation.amountMinimum')),
    expenseDate: z
      .string()
      .min(1, t('clinic.financial.expenses.validation.dateRequired')),
    description: z.string().optional(),
  });

// Legacy export for backward compatibility
export const expenseSchema = z.object({
  expenseType: z.coerce
    .number({
      required_error: 'Expense type is required',
      invalid_type_error: 'Expense type must be a number',
    })
    .refine((val) => Object.values(ExpenseType).includes(val as ExpenseType), {
      message: 'Invalid expense type',
    }),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  expenseDate: z.string().min(1, 'Date is required'),
  description: z.string().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
