import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { Select, Input } from '@/components/common/form';
import {
  CreateOrUpdateAllergyDto,
  Severity,
} from '@/lib/api/types/clinic-patient';
import { useForm } from 'react-hook-form';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import {
  allergySchema,
  allergyFormData,
  defaultAllergyValues,
} from './validationAllergy';
import { zodResolver } from '@hookform/resolvers/zod';

interface AddAllergyModalProps {
  isOpen: boolean;
  patientId: string;
  onClose: () => void;
}

export const AddAllergyModal = ({
  isOpen,
  patientId,
  onClose,
}: AddAllergyModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<allergyFormData>({
    resolver: zodResolver(allergySchema),
    defaultValues: defaultAllergyValues,
  });

  const { createOrUpdateAllergy } = useClinicPatients();
  const onSubmitHandler = async (data: allergyFormData) => {
    try {
      const formattedData: CreateOrUpdateAllergyDto = {
        ...data,
        id: data.id || undefined,
        patientId: patientId,
      };

      await createOrUpdateAllergy.mutateAsync(formattedData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Allergy"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmitHandler)}
            isLoading={createOrUpdateAllergy.isPending}
          >
            Add Allergy
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <Input
          label="Allergy Name"
          error={errors.name?.message}
          {...register('name')}
        />

        <Select
          label="Severity"
          error={errors.severity?.message}
          {...register('severity', { valueAsNumber: true })}
          options={Object.entries(Severity)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => ({
              value: value.toString(),
              label: key,
            }))}
        />
        <Input
          label="Reaction"
          error={errors.reaction?.message}
          {...register('reaction')}
        />
      </form>
    </Modal>
  );
};

export default AddAllergyModal;
