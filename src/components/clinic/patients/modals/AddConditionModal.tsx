import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { Select, Input } from '@/components/common/form';
import {
  CreateOrUpdateMedicalConditionDto,
  MedicalConditionStatus,
} from '@/lib/api/types/clinic-patient';
import { useForm } from 'react-hook-form';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import {
  conditionFormData,
  conditionSchema,
  defaultConditionValues,
} from './validationCondition';
import { zodResolver } from '@hookform/resolvers/zod';

interface AddConditionModalProps {
  isOpen: boolean;
  patientId: string;
  onClose: () => void;
}

export const AddConditionModal = ({
  isOpen,
  patientId,
  onClose,
}: AddConditionModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<conditionFormData>({
    resolver: zodResolver(conditionSchema),
    defaultValues: defaultConditionValues,
  });

  const { createOrUpdateCondition } = useClinicPatients();

  const onSubmitHandler = async (data: conditionFormData) => {
    try {
      const formattedData: CreateOrUpdateMedicalConditionDto = {
        ...data,
        id: data.id || undefined,
        patientId: patientId,
      };

      await createOrUpdateCondition.mutateAsync(formattedData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Medical Condition"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmitHandler)}
            isLoading={createOrUpdateCondition.isPending}
          >
            Add Condition
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <Input
          label="Condition Name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Diagnose Date"
          type="date"
          {...register('diagnosedDate')}
          error={errors.diagnosedDate?.message}
        />
        <Select
          label="ConditioStatus"
          error={errors.status?.message}
          {...register('status', { valueAsNumber: true })}
          options={Object.entries(MedicalConditionStatus)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => ({
              value: value.toString(),
              label: key,
            }))}
        />
      </form>
    </Modal>
  );
};

export default AddConditionModal;
