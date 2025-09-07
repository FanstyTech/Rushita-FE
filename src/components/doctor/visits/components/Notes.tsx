'use client';

import { TextArea } from '@/components/common/form';
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TreatmentFormData } from './validation';

interface NotesProps {
  register: UseFormRegister<TreatmentFormData>;
  control: Control<TreatmentFormData>;
  errors: FieldErrors<TreatmentFormData>;
}

export default function Notes({ register, control, errors }: NotesProps) {
  const { t } = useTranslation();

  return (
    <div>
      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <TextArea
            label={t('clinic.visits.form.notes.title')}
            value={field.value}
            {...register('notes')}
            rows={3}
            placeholder={t('clinic.visits.form.notes.placeholder')}
            error={errors.notes?.message as string}
          />
        )}
      />
    </div>
  );
}
