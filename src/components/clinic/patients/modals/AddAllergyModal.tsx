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
  createAllergySchema,
  allergyFormData,
  defaultAllergyValues,
} from './validationAllergy';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  // Create the schema with translations
  const allergySchema = createAllergySchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<allergyFormData>({
    resolver: zodResolver(allergySchema),
    defaultValues: defaultAllergyValues,
  });

  const { createOrUpdateAllergy } = useClinicPatients();
  const onSubmitHandler = async (data: allergyFormData) => {
    const formattedData: CreateOrUpdateAllergyDto = {
      ...data,
      id: data.id || undefined,
      patientId: patientId,
    };

    await createOrUpdateAllergy.mutateAsync(formattedData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('clinic.patients.modals.addAllergy.title')}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {t('clinic.patients.modals.addAllergy.buttons.cancel')}
          </Button>
          <Button
            onClick={handleSubmit(onSubmitHandler)}
            isLoading={createOrUpdateAllergy.isPending}
          >
            {t('clinic.patients.modals.addAllergy.buttons.add')}
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <Input
          required={true}
          label={t('clinic.patients.modals.addAllergy.fields.allergyName')}
          error={errors.name?.message}
          {...register('name')}
        />

        <Select
          required={true}
          label={t('clinic.patients.modals.addAllergy.fields.severity')}
          value={watch('severity').toString()}
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
          required={true}
          label={t('clinic.patients.modals.addAllergy.fields.reaction')}
          error={errors.reaction?.message}
          {...register('reaction')}
        />
      </form>
    </Modal>
  );
};

export default AddAllergyModal;
