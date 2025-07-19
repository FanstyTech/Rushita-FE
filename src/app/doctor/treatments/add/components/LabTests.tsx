'use client';

import { Input, Select } from '@/components/common/form';
import { SelectOption } from '@/lib/api/types/select-option';
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from 'react-hook-form';
import { CreateOrUpdateVisitLabTestDto } from '@/lib/api/types/treatment';

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
    const newId = `lab-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    onLabTestsChange([...labTests, { id: newId, notes: '' }]);
  };

  const handleRemoveLabTest = (index: number) => {
    const newTests = labTests.filter((_, i) => i !== index);
    onLabTestsChange(newTests);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-medium text-gray-700">Lab Tests</h4>
        <button
          type="button"
          onClick={handleAddLabTest}
          className="p-2 text-blue-600 hover:bg-gray-100 rounded"
          title="Add Lab Test"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {labTests.map((test, index) => (
          <div
            key={test.id}
            className="flex flex-col space-y-2 p-4 border rounded-lg"
          >
            <div className="flex justify-between">
              <h4 className="text-lg font-medium">Lab Test #{index + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemoveLabTest(index)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Test Name
                </label>
                <Controller
                  name={`labTests.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={availableTests}
                      placeholder="Select Lab Test"
                      disabled={isLoading}
                      isLoading={isLoading}
                    />
                  )}
                />

                {/* Error handling for name field */}
                {errors.labTests &&
                  Array.isArray(errors.labTests) &&
                  errors.labTests[index]?.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {(errors.labTests[index]?.name?.message as string) ||
                        'Lab test name is required'}
                    </p>
                  )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional details
                </label>
                <Input
                  type="text"
                  placeholder="Additional details"
                  {...register(`labTests.${index}.details`)}
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
      </div>
    </div>
  );
}
