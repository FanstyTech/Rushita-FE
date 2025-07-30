'use client';

import { TextArea } from '@/components/common/form';
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from 'react-hook-form';
import { TreatmentFormData } from './validation';

interface NotesProps {
  register: UseFormRegister<TreatmentFormData>;
  control: Control<TreatmentFormData>;
  errors: FieldErrors<TreatmentFormData>;
}

export default function Notes({ register, control, errors }: NotesProps) {
  return (
    <div>
      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <TextArea
            label="Additional Notes"
            value={field.value}
            {...register('notes')}
            rows={3}
            placeholder="Enter any additional notes..."
            error={errors.notes?.message as string}
          />
        )}
      />
    </div>
  );
}
