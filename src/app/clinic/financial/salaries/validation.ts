import { z } from 'zod';
import { SalaryStatus } from '@/lib/api/types/salary';

export const salarySchema = z.object({
  staffId: z.string().min(1, 'Staff is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  salaryMonth: z.string().min(1, 'Salary month is required'),

  status: z.coerce
    .number({
      required_error: 'Status is required',
      invalid_type_error: 'Status must be a number',
    })
    .refine(
      (val) => Object.values(SalaryStatus).includes(val as SalaryStatus),
      {
        message: 'Invalid status',
      }
    ),
  paidDate: z.string().optional(),
  notes: z.string().optional(),
});

export type SalaryFormData = z.infer<typeof salarySchema>;

export interface ParsedSalaryData {
  staffId: string;
  amount: number;
  salaryMonth: string;
  status: SalaryStatus;
  paidDate?: string;
  notes?: string;
  clinicId: string;
  id?: string;
}

