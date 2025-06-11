import { z } from 'zod';
import { LeaveType } from '@/lib/api/types/clinic-staff-leave';

export const leaveSchema = z
  .object({
    id: z.string().optional(),
    staffId: z.string().min(1, 'Staff member is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    type: z.number().min(1, 'Leave type is required'),
    reason: z.string().min(1, 'Reason is required'),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start <= end;
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  );

export type LeaveFormData = z.infer<typeof leaveSchema>;

export const defaultLeaveValues = {
  staffId: '',
  startDate: '',
  endDate: '',
  type: undefined,
  reason: '',
};
