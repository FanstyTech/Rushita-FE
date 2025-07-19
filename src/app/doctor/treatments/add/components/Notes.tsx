'use client';

import { TextArea } from '@/components/common/form';
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from 'react-hook-form';

interface NotesProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors;
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
