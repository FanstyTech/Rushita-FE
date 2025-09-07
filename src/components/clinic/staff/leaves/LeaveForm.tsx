import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import {
  createLeaveSchema,
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
import { SelectOption } from '@/lib/api/types/select-option';

interface LeaveFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeaveFormData) => Promise<void>;
  initialData?: Partial<CreateUpdateClinicStaffLeaveDto>;
  isLoading?: boolean;
  staffOptions?: SelectOption<string>[];
}

export default function LeaveForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  staffOptions = [],
}: LeaveFormProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(createLeaveSchema(t)),
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
      title={
        initialData
          ? t('clinic.staff.leaves.form.editTitle')
          : t('clinic.staff.leaves.form.title')
      }
      footer={
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={onClose}>
            {t('clinic.staff.leaves.form.cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={handleFormSubmit}
            isLoading={isLoading}
          >
            {initialData
              ? t('clinic.staff.leaves.form.update')
              : t('clinic.staff.leaves.form.submit')}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {staffOptions && (
          <Select
            required={true}
            label={t('clinic.staff.leaves.form.staffMember')}
            options={staffOptions}
            error={errors.staffId?.message}
            {...register('staffId')}
          />
        )}

        <Input
          required={true}
          type="datetime-local"
          label={t('clinic.staff.leaves.form.startDate')}
          error={errors.startDate?.message}
          {...register('startDate')}
        />

        <Input
          required={true}
          type="datetime-local"
          label={t('clinic.staff.leaves.form.endDate')}
          error={errors.endDate?.message}
          {...register('endDate')}
        />

        <Select
          required={true}
          label={t('clinic.staff.leaves.form.leaveType')}
          value={initialData?.type?.toString()}
          {...register('type', { valueAsNumber: true })}
          error={errors.type?.message}
          options={Object.entries(LeaveType)
            .filter(([, value]) => typeof value === 'number')
            .map(([key, value]) => ({
              label: t(`clinic.staff.leaves.types.${key.toLowerCase()}`) || key,
              value: value.toString(),
            }))}
        />

        <TextArea
          required={true}
          rows={3}
          label={t('clinic.staff.leaves.form.reason')}
          error={errors.reason?.message}
          {...register('reason')}
        />
      </form>
    </Modal>
  );
}
