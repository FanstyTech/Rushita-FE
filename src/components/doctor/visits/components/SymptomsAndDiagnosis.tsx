'use client';

import { TextArea, DiagnosisTreeSelector } from '@/components/common/form';
import { GetDiagnosesTreeDto } from '@/lib/api/types/diagnosis';
import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import { TreatmentFormData } from './validation';
import { useTranslation } from 'react-i18next';

interface SymptomsAndDiagnosisProps {
  diagnosesTree: GetDiagnosesTreeDto[];
  register: UseFormRegister<TreatmentFormData>;
  errors: FieldErrors<TreatmentFormData>;
  control: Control<TreatmentFormData>;
}

export default function SymptomsAndDiagnosis({
  diagnosesTree,
  register,
  errors,
  control,
}: SymptomsAndDiagnosisProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4">
      <div className="mb-3">
        <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">
          {t('clinic.visits.form.symptomsAndDiagnosis.title')}
        </h4>
      </div>

      {/* Symptoms */}
      <TextArea
        required={true}
        {...register(`symptoms`)}
        placeholder={t(
          'clinic.visits.form.symptomsAndDiagnosis.symptomsPlaceholder'
        )}
        label={t('clinic.visits.form.symptomsAndDiagnosis.symptoms')}
        rows={3}
        error={errors.symptoms?.message as string}
      />

      {/* Diagnosis - ICD-10 Tree Selection */}
      <DiagnosisTreeSelector
        diagnosesTree={diagnosesTree}
        name="diagnosis"
        control={control}
        label={t('clinic.visits.form.symptomsAndDiagnosis.diagnosis')}
        placeholder={t(
          'clinic.visits.form.symptomsAndDiagnosis.diagnosisPlaceholder'
        )}
        error={errors.diagnosis?.message as string}
        required
      />
    </div>
  );
}
