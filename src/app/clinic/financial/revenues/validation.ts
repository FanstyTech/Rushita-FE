import { z } from 'zod';
import { RevenueType } from '@/lib/api/types/revenue';

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

export type RevenueFormData = z.infer<typeof revenueSchema>;
