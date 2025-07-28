'use client';

import { Input, Select, TextArea } from '@/components/common/form';
import { SelectOption } from '@/lib/api/types/select-option';
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from 'react-hook-form';
import { CreateOrUpdateVisitLabTestDto } from '@/lib/api/types/treatment';
import { Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LabTestsProps {
  labTests: CreateOrUpdateVisitLabTestDto[];
  availableTests: SelectOption<string>[];
  onLabTestsChange: (labTests: CreateOrUpdateVisitLabTestDto[]) => void;
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors;
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
  const handleAddLabTest = () => {
    // Generate a unique ID for the new lab test
    onLabTestsChange([...labTests, { id: '', notes: '', name: '' }]);
  };

  const handleRemoveLabTest = (index: number) => {
    const newTests = labTests.filter((_, i) => i !== index);
    onLabTestsChange(newTests);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-base font-medium text-gray-800">Lab Tests</h4>

        <Button
          type="button"
          variant={'ghost'}
          onClick={handleAddLabTest}
          className="p-2 text-blue-600 hover:bg-gray-100 rounded"
          title="Add Medication"
        >
          <Plus className="h-4 w-4 " />
        </Button>
      </div>

      <div className="space-y-4">
        {labTests.map((test, index) => (
          <div
            key={`lab-${index}-${Date.now()}`}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                Lab Test #{index + 1}
              </h4>
              <Button
                type="button"
                variant={'ghost'}
                onClick={() => handleRemoveLabTest(index)}
                className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Remove Lab Test"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Controller
                  name={`labTests.${index}.id`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Lab Test"
                      required={true}
                      {...field}
                      options={availableTests}
                      placeholder="Select Lab Test"
                      disabled={isLoading}
                      isLoading={isLoading}
                      className="w-full"
                      {...register(`labTests.${index}.id`, {
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
                            name: selectedOption.label || '',
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
                        'Lab test name is required'}
                    </p>
                  )}
              </div>
              <div>
                <TextArea
                  label="Additional Details"
                  {...register(`labTests.${index}.notes`)}
                  placeholder="Additional details"
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
          <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p>No lab tests added yet. Click "Add Lab Test" to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
