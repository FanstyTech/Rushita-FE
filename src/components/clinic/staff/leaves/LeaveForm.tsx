import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  leaveSchema,
  LeaveFormData,
  defaultLeaveValues,
} from '@/app/clinic/staff/leaves/validation';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { Input } from '@/components/common';
import { Select } from '@/components/common';
import { TextArea } from '@/components/common/form';
import {
  CreateUpdateClinicStaffLeaveDto,
  LeaveType,
} from '@/lib/api/types/clinic-staff-leave';

interface Option {
  label: string;
  value: string;
}

interface LeaveFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeaveFormData) => Promise<void>;
  initialData?: Partial<CreateUpdateClinicStaffLeaveDto>;
  isLoading?: boolean;
  staffOptions?: Option[];
}

export default function LeaveForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  staffOptions = [],
}: LeaveFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      ...defaultLeaveValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        Object.entries(initialData).forEach(([key, value]) => {
          if (value !== undefined) {
            setValue(key as keyof LeaveFormData, value);
          }
        });
      } else {
        reset({
          staffId: '',
          type: LeaveType.Annual,
          startDate: '',
          endDate: '',
          reason: '',
        });
      }
    }
  }, [isOpen, initialData, reset, setValue]);

  const handleFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Leave Request' : 'New Leave Request'}
      footer={
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleFormSubmit}
            isLoading={isLoading}
          >
            {initialData ? 'Update' : 'Submit'}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {staffOptions && (
          <Select
            label="Staff Member"
            options={staffOptions}
            error={errors.staffId?.message}
            {...register('staffId')}
          />
        )}

        <Input
          type="datetime-local"
          label="Start Date"
          error={errors.startDate?.message}
          {...register('startDate')}
        />

        <Input
          type="datetime-local"
          label="End Date"
          error={errors.endDate?.message}
          {...register('endDate')}
        />

        <Select
          label="Leave Type"
          {...register('type', { valueAsNumber: true })}
          error={errors.type?.message}
          options={Object.entries(LeaveType)
            .filter(([value]) => typeof value === 'number')
            .map(([key, value]) => ({
              label: key,
              value: value.toString(),
            }))}
        />

        <TextArea
          rows={3}
          label="Reason"
          error={errors.reason?.message}
          {...register('reason')}
        />
      </form>
    </Modal>
  );
}
