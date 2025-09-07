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
  createConditionSchema,
  conditionFormData,
  defaultConditionValues,
} from './validationCondition';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  // Create the schema with translations
  const conditionSchema = createConditionSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<conditionFormData>({
    resolver: zodResolver(conditionSchema),
    defaultValues: defaultConditionValues,
  });

  const { createOrUpdateCondition } = useClinicPatients();

  const onSubmitHandler = async (data: conditionFormData) => {
    const formattedData: CreateOrUpdateMedicalConditionDto = {
      ...data,
      id: data.id || undefined,
      patientId: patientId,
    };

    await createOrUpdateCondition.mutateAsync(formattedData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('clinic.patients.modals.addCondition.title')}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {t('clinic.patients.modals.addCondition.buttons.cancel')}
          </Button>
          <Button
            onClick={handleSubmit(onSubmitHandler)}
            isLoading={createOrUpdateCondition.isPending}
          >
            {t('clinic.patients.modals.addCondition.buttons.add')}
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <Input
          required={true}
          label={t('clinic.patients.modals.addCondition.fields.conditionName')}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          required={true}
          label={t('clinic.patients.modals.addCondition.fields.diagnoseDate')}
          type="date"
          {...register('diagnosedDate')}
          error={errors.diagnosedDate?.message}
        />
        <Select
          required={true}
          label={t('clinic.patients.modals.addCondition.fields.status')}
          value={watch('status').toString()}
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
