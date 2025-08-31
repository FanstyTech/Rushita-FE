import { z } from 'zod';
import { ExpenseType } from '@/lib/api/types/expense';

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
