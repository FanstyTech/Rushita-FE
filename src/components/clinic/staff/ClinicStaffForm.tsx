import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/common/Button';
import { Input, Select } from '@/components/common/form';
import Modal from '@/components/common/Modal';
import {
  CreateUpdateClinicStaffDto,
  StaffType,
} from '@/lib/api/types/clinic-staff';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { useEffect, useMemo } from 'react';

const schema = z.object({
  id: z.string().optional(),
  fNameL: z.string().min(1, 'First name in Latin is required'),
  lNameL: z.string().min(1, 'Last name in Latin is required'),
  fNameF: z.string().min(1, 'First name in Arabic is required'),
  lNameF: z.string().min(1, 'Last name in Arabic is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().optional(),
  joinDate: z.string(),
  staffType: z.number().min(1, 'Staff type is required'),
  specialtyId: z.string().min(1, 'Specialty is required'),
  clinicId: z.string(),
});

type FormData = z.infer<typeof schema>;

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
  const { useSpecialtiesDropdown } = useSpecialty();
  const { data: specialties } = useSpecialtiesDropdown();
  const defaultValues = useMemo(
    () => ({
      id: '',
      fNameL: '',
      lNameL: '',
      fNameF: '',
      lNameF: '',
      email: '',
      password: '',
      joinDate: new Date().toISOString().split('T')[0],
      staffType: undefined,
      specialtyId: undefined,
      clinicId: clinicId,
    }),
    [clinicId]
  );

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = form;

  // Reset form when initialData changes or modal opens/closes
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
          password: '',
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
      title={initialData ? 'Edit Staff Member' : 'Add New Staff Member'}
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="button"
            isLoading={isSubmitting}
            onClick={async () => {
              await handleSubmit(onSubmitHandler)();
            }}
          >
            {initialData ? 'Update' : 'Add'} Staff Member
          </Button>
        </div>
      }
    >
      <form id="clinic-staff-form" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              label="First Name (Foreign)"
              {...register('fNameF')}
              error={errors.fNameF?.message}
            />
          </div>
          <div>
            <Input
              label="Last Name (Foreign)"
              {...register('lNameF')}
              error={errors.lNameF?.message}
            />
          </div>
          <div>
            <Input
              label="First Name (Arabic)"
              {...register('fNameL')}
              error={errors.fNameL?.message}
            />
          </div>
          <div>
            <Input
              label="Last Name (Arabic)"
              {...register('lNameL')}
              error={errors.lNameL?.message}
            />
          </div>
        </div>

        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Join Date"
          type="date"
          {...register('joinDate')}
          error={errors.joinDate?.message}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select
              label="Staff Type"
              {...register('staffType', { valueAsNumber: true })}
              error={errors.staffType?.message}
              options={Object.entries(StaffType)
                .filter(([value]) => typeof value === 'number')
                .map(([key, value]) => ({
                  label: key,
                  value: value.toString(),
                }))}
            />
          </div>
          <div>
            <Select
              label="Specialty"
              {...register('specialtyId')}
              error={errors.specialtyId?.message}
              options={[
                { value: '', label: 'All Specialties' },
                ...(specialties?.map((specialty) => ({
                  value: specialty.value,
                  label: specialty.label || '',
                })) || []),
              ]}
            />
          </div>
        </div>

        {!initialData && (
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
        )}
      </form>
    </Modal>
  );
}
