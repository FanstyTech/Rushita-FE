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
  createFamilyHistorySchema,
  familyHistoryFormData,
  defaultfamilyHistoryValues,
} from './validationFamilyHistory';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  // Create the schema with translations
  const familyHistorySchema = createFamilyHistorySchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<familyHistoryFormData>({
    resolver: zodResolver(familyHistorySchema),
    defaultValues: defaultfamilyHistoryValues,
  });

  const { createOrUpdateFamilyHistory } = useClinicPatients();

  const onSubmitHandler = async (data: familyHistoryFormData) => {
    const formattedData: CreateOrUpdateFamilyHistoryDto = {
      ...data,
      id: data.id || undefined,
      patientId: patientId,
    };

    await createOrUpdateFamilyHistory.mutateAsync(formattedData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('clinic.patients.modals.addFamilyHistory.title')}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {t('clinic.patients.modals.addFamilyHistory.buttons.cancel')}
          </Button>
          <Button
            onClick={handleSubmit(onSubmitHandler)}
            isLoading={createOrUpdateFamilyHistory.isPending}
          >
            {t('clinic.patients.modals.addFamilyHistory.buttons.add')}
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <Input
          required={true}
          label={t('clinic.patients.modals.addFamilyHistory.fields.condition')}
          error={errors.condition?.message}
          {...register('condition')}
        />
        <Input
          type="date"
          required={true}
          label={t('clinic.patients.modals.addFamilyHistory.fields.ageOfOnset')}
          error={errors.ageOfOnset?.message}
          {...register('ageOfOnset')}
        />
        <Select
          required={true}
          label={t(
            'clinic.patients.modals.addFamilyHistory.fields.relationship'
          )}
          value={watch('relationship').toString()}
          error={errors.relationship?.message}
          {...register('relationship', { valueAsNumber: true })}
          options={Object.entries(Relationship)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => ({
              value: value.toString(),
              label: key,
            }))}
        />{' '}
        <Select
          required={true}
          label={t('clinic.patients.modals.addFamilyHistory.fields.status')}
          error={errors.status?.message}
          value={watch('relationship').toString()}
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
          label={t('clinic.patients.modals.addFamilyHistory.fields.notes')}
          error={errors.notes?.message}
          {...register('notes')}
        />
      </form>
    </Modal>
  );
};

export default AddFamilyHistoryModal;
