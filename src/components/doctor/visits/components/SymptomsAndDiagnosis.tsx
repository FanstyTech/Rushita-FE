'use client';

import { TextArea, DiagnosisTreeSelector } from '@/components/common/form';
import { GetDiagnosesTreeDto } from '@/lib/api/types/diagnosis';
import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';

interface SymptomsAndDiagnosisProps {
  diagnosesTree: GetDiagnosesTreeDto[];
  register: UseFormRegister<any>;
  errors: FieldErrors;
  control: Control<any>;
}

export default function SymptomsAndDiagnosis({
  diagnosesTree,
  register,
  errors,
  control,
}: SymptomsAndDiagnosisProps) {
  return (
    <div className="space-y-4">
      {/* Symptoms */}
      <TextArea
        {...register(`symptoms`)}
        placeholder="Enter patient symptoms..."
        label="Symptoms"
        rows={3}
        error={errors.symptoms?.message as string}
      />

      {/* Diagnosis - ICD-10 Tree Selection */}
      <DiagnosisTreeSelector
        diagnosesTree={diagnosesTree}
        name="diagnosis"
        control={control}
        label="Diagnosis (ICD-10)"
        placeholder="Select ICD-10 diagnosis code..."
        error={errors.diagnosis?.message as string}
        required
      />
    </div>
  );
}
