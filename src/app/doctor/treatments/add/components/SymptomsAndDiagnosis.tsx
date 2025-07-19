'use client';

import { TextArea } from '@/components/common/form';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface SymptomsAndDiagnosisProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function SymptomsAndDiagnosis({
  register,
  errors,
}: SymptomsAndDiagnosisProps) {
  return (
    <div className="space-y-4">
      {/* Symptoms */}
      <div>
        <TextArea
          {...register(`symptoms`)}
          placeholder="Enter patient symptoms..."
          label="Symptoms"
          rows={3}
          error={errors.symptoms?.message as string}
        />
      </div>

      {/* Diagnosis */}
      <div>
        <TextArea
          {...register(`diagnosis`)}
          placeholder="Enter diagnosis..."
          label="Diagnosis"
          rows={3}
          error={errors.diagnosis?.message as string}
        />
      </div>
    </div>
  );
}
