'use client';

import { Select, TextArea } from '@/components/common/form';
import { SelectOption } from '@/lib/api/types/select-option';
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from 'react-hook-form';
import { CreateUpdateVisitLabTestDto } from '@/lib/api/types/visit-lab-test';
import { Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TreatmentFormData } from './validation';
import { useTranslation } from 'react-i18next';

interface LabTestsProps {
  labTests: CreateUpdateVisitLabTestDto[];
  availableTests: SelectOption<string>[];
  onLabTestsChange: (labTests: CreateUpdateVisitLabTestDto[]) => void;
  register: UseFormRegister<TreatmentFormData>;
  control: Control<TreatmentFormData>;
  errors: FieldErrors<TreatmentFormData>;
  isLoading?: boolean;
}

export default function LabTests({
  labTests,
  availableTests,
  onLabTestsChange,
  register,
  control,
  errors,
  isLoading = false,
}: LabTestsProps) {
  const { t } = useTranslation();

  const handleAddLabTest = () => {
    // Generate a unique ID for the new lab test
    onLabTestsChange([...labTests, { labTestId: '', notes: '', testName: '' }]);
  };

  const handleRemoveLabTest = (index: number) => {
    const newTests = labTests.filter((_, i) => i !== index);
    onLabTestsChange(newTests);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">
          {t('clinic.visits.form.labTests.title')}
        </h4>

        <Button
          type="button"
          variant={'ghost'}
          onClick={handleAddLabTest}
          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title={t('clinic.visits.form.labTests.addLabTestButton')}
        >
          <Plus className="h-4 w-4 " />
        </Button>
      </div>

      <div className="space-y-4">
        {labTests.map((test, index) => (
          <div
            key={test.id || index}
            className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('clinic.visits.form.labTests.labTestNumber')} {index + 1}
              </h4>
              <Button
                type="button"
                variant={'ghost'}
                onClick={() => handleRemoveLabTest(index)}
                className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                title={t('clinic.visits.form.labTests.removeLabTest')}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Controller
                  name={`labTests.${index}.labTestId`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      label={t('clinic.visits.form.labTests.labTest')}
                      required={true}
                      {...field}
                      options={availableTests}
                      placeholder={t(
                        'clinic.visits.form.labTests.selectLabTest'
                      )}
                      disabled={isLoading}
                      isLoading={isLoading}
                      className="w-full"
                      {...register(`labTests.${index}.labTestId`, {
                        required: true,
                      })}
                      onChange={(event) => {
                        field.onChange(event);
                        // Extract the value from the event object
                        const value = event.target.value;
                        // Find the selected option and set the name field with its label
                        const selectedOption = availableTests.find(
                          (option) => option.value === value
                        );
                        if (selectedOption) {
                          const newLabs = [...labTests];
                          newLabs[index] = {
                            ...newLabs[index],
                            id: value,
                            testName: selectedOption.label || '',
                          };
                          onLabTestsChange(newLabs);
                        }
                      }}
                    />
                  )}
                />

                {errors.labTests &&
                  Array.isArray(errors.labTests) &&
                  errors.labTests[index]?.id && (
                    <p className="text-xs text-red-500 mt-1">
                      {(errors.labTests[index]?.id?.message as string) ||
                        t('clinic.visits.form.labTests.labTestRequired')}
                    </p>
                  )}
              </div>
              <div>
                <TextArea
                  label={t('clinic.visits.form.labTests.additionalDetails')}
                  {...register(`labTests.${index}.notes`)}
                  placeholder={t(
                    'clinic.visits.form.labTests.additionalDetailsPlaceholder'
                  )}
                  rows={2}
                  className="w-full"
                  error={
                    errors.labTests &&
                    Array.isArray(errors.labTests) &&
                    errors.labTests[index]?.details
                      ? (errors.labTests[index]?.details?.message as string)
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        ))}

        {labTests.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
            <p>{t('clinic.visits.form.labTests.noLabTests')}</p>
            <Button
              type="button"
              onClick={handleAddLabTest}
              variant="outline"
              className="mt-4"
            >
              {t('clinic.visits.form.labTests.addLabTestButton')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
