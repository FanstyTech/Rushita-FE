import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import Button from '@/components/common/Button';
import { Input, Select } from '@/components/common/form';
import Modal from '@/components/common/Modal';
import {
  CreateUpdateClinicStaffDto,
  StaffType,
} from '@/lib/api/types/clinic-staff';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { useEffect, useMemo } from 'react';

const createStaffSchema = (t: (key: string) => string) =>
  z.object({
    id: z.string().optional(),
    fNameL: z
      .string()
      .min(1, t('clinic.staff.staffForm.firstNameForeignRequired')),
    lNameL: z
      .string()
      .min(1, t('clinic.staff.staffForm.lastNameForeignRequired')),
    fNameF: z
      .string()
      .min(1, t('clinic.staff.staffForm.firstNameArabicRequired')),
    lNameF: z
      .string()
      .min(1, t('clinic.staff.staffForm.lastNameArabicRequired')),
    email: z.string().email(t('clinic.staff.staffForm.invalidEmail')),
    joinDate: z.string(),
    staffType: z.coerce
      .number()
      .min(1, t('clinic.staff.staffForm.staffTypeRequired')),
    specialtyId: z
      .string()
      .min(1, t('clinic.staff.staffForm.specialtyRequired')),
    clinicId: z.string(),
  });

type FormData = z.infer<ReturnType<typeof createStaffSchema>>;

interface ClinicStaffFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CreateUpdateClinicStaffDto;
  clinicId: string;
  onSubmit: (data: CreateUpdateClinicStaffDto) => Promise<void>;
}

export default function ClinicStaffForm({
  isOpen,
  onClose,
  initialData,
  clinicId,
  onSubmit,
}: ClinicStaffFormProps) {
  const { t } = useTranslation();
  const { useSpecialtiesDropdown } = useSpecialty();
  const { data: specialties } = useSpecialtiesDropdown();

  const dynamicSchema = useMemo(() => createStaffSchema(t), [t]);

  const defaultValues = useMemo(
    () => ({
      id: '',
      fNameL: '',
      lNameL: '',
      fNameF: '',
      lNameF: '',
      email: '',
      joinDate: new Date().toISOString().split('T')[0],
      staffType: undefined,
      specialtyId: undefined,
      clinicId: clinicId,
    }),
    [clinicId]
  );

  const form = useForm<FormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues,
  });

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = form;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          id: initialData.id,
          fNameL: initialData.fNameL || '',
          lNameL: initialData.lNameL || '',
          fNameF: initialData.fNameF || '',
          lNameF: initialData.lNameF || '',
          email: initialData.email || '',
          joinDate: initialData.joinDate
            ? new Date(initialData.joinDate).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          staffType: initialData.staffType || undefined,
          specialtyId: initialData.specialtyId || undefined,
          clinicId: clinicId,
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [initialData, clinicId, isOpen, reset, defaultValues]);

  const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
    const submitData = {
      ...data,
      joinDate: new Date(data.joinDate).toISOString(),
      clinicId: clinicId,
      id: initialData?.id || undefined,
    };
    await onSubmit(submitData);
    reset(defaultValues);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        initialData
          ? t('clinic.staff.staffForm.editTitle')
          : t('clinic.staff.staffForm.addTitle')
      }
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} type="button">
            {t('clinic.staff.staffForm.cancel')}
          </Button>
          <Button
            type="button"
            isLoading={isSubmitting}
            onClick={async () => {
              await handleSubmit(onSubmitHandler)();
            }}
          >
            {initialData
              ? t('clinic.staff.staffForm.updateButton')
              : t('clinic.staff.staffForm.addButton')}
          </Button>
        </div>
      }
    >
      <form id="clinic-staff-form" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              required={true}
              label={t('clinic.staff.staffForm.firstNameForeign')}
              {...register('fNameF')}
              error={errors.fNameF?.message}
            />
          </div>
          <div>
            <Input
              required={true}
              label={t('clinic.staff.staffForm.lastNameForeign')}
              {...register('lNameF')}
              error={errors.lNameF?.message}
            />
          </div>
          <div>
            <Input
              required={true}
              label={t('clinic.staff.staffForm.firstNameArabic')}
              {...register('fNameL')}
              error={errors.fNameL?.message}
            />
          </div>
          <div>
            <Input
              required={true}
              label={t('clinic.staff.staffForm.lastNameArabic')}
              {...register('lNameL')}
              error={errors.lNameL?.message}
            />
          </div>
        </div>

        <Input
          required={true}
          label={t('clinic.staff.staffForm.email')}
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          required={true}
          label={t('clinic.staff.staffForm.joinDate')}
          type="date"
          {...register('joinDate')}
          error={errors.joinDate?.message}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select
              required={true}
              label={t('clinic.staff.staffForm.staffType')}
              value={initialData?.staffType?.toString() || ''}
              {...register('staffType', { valueAsNumber: true })}
              error={errors.staffType?.message}
              options={Object.entries(StaffType)
                .filter(([, value]) => typeof value === 'number')
                .map(([key, value]) => ({
                  label: key,
                  value: value.toString(),
                }))}
            />
          </div>
          <div>
            <Select
              required={true}
              label={t('clinic.staff.staffForm.specialty')}
              value={initialData?.specialtyId || ''}
              {...register('specialtyId')}
              error={errors.specialtyId?.message}
              options={[
                {
                  value: '',
                  label: t('clinic.staff.staffForm.allSpecialties'),
                },
                ...(specialties?.map((specialty) => ({
                  value: specialty.value,
                  label: specialty.label || '',
                })) || []),
              ]}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
