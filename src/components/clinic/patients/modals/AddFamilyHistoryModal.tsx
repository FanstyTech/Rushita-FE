import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { Select, Input, TextArea } from '@/components/common/form';
import { useForm } from 'react-hook-form';
import {
  CreateOrUpdateFamilyHistoryDto,
  FamilyHistoryStatus,
  Relationship,
} from '@/lib/api/types/clinic-patient';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import {
  familyHistoryFormData,
  familyHistorySchema,
  defaultfamilyHistoryValues,
} from './validationFamilyHistory';
import { zodResolver } from '@hookform/resolvers/zod';

interface AddFamilyHistoryModalProps {
  isOpen: boolean;
  patientId: string;
  onClose: () => void;
}

export const AddFamilyHistoryModal = ({
  isOpen,
  patientId,
  onClose,
}: AddFamilyHistoryModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<familyHistoryFormData>({
    resolver: zodResolver(familyHistorySchema),
    defaultValues: defaultfamilyHistoryValues,
  });

  const { createOrUpdateFamilyHistory } = useClinicPatients();

  const onSubmitHandler = async (data: familyHistoryFormData) => {
    try {
      const formattedData: CreateOrUpdateFamilyHistoryDto = {
        ...data,
        id: data.id || undefined,
        patientId: patientId,
      };

      await createOrUpdateFamilyHistory.mutateAsync(formattedData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Family History"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmitHandler)}
            isLoading={createOrUpdateFamilyHistory.isPending}
          >
            Add Family History
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <Input
          label="Condition"
          error={errors.condition?.message}
          {...register('condition')}
        />
        <Input
          label="AgeOfOnset"
          error={errors.ageOfOnset?.message}
          {...register('ageOfOnset')}
        />
        <Select
          label="Relationship"
          error={errors.status?.message}
          {...register('relationship', { valueAsNumber: true })}
          options={Object.entries(Relationship)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => ({
              value: value.toString(),
              label: key,
            }))}
        />{' '}
        <Select
          label="Status"
          error={errors.status?.message}
          {...register('status', { valueAsNumber: true })}
          options={Object.entries(FamilyHistoryStatus)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => ({
              value: value.toString(),
              label: key,
            }))}
        />
        <TextArea
          rows={3}
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </form>
    </Modal>
  );
};

export default AddFamilyHistoryModal;
