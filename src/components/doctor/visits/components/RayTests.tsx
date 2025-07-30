'use client';

import { Button } from '@/components/ui/button';
import { Input, Select, TextArea } from '@/components/common/form';
import { SelectOption } from '@/lib/api/types/select-option';
import { CreateOrUpdateVisitRadiologyTestDto } from '@/lib/api/types/treatment';
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

interface RayTestsProps {
  rays: CreateOrUpdateVisitRadiologyTestDto[];
  availableRays: SelectOption<string>[];
  onRaysChange: (rays: CreateOrUpdateVisitRadiologyTestDto[]) => void;
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors;
  isLoading?: boolean;
}

export default function RayTests({
  rays,
  availableRays,
  onRaysChange,
  register,
  control,
  errors,
  isLoading = false,
}: RayTestsProps) {
  const handleAddRay = () => {
    onRaysChange([...rays, { id: '', notes: '', name: '' }]);
  };

  const handleRemoveRay = (index: number) => {
    const newRays = rays.filter((_, i) => i !== index);
    onRaysChange(newRays);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">
          Ray Tests
        </h4>
        <Button
          variant={'ghost'}
          type="button"
          onClick={handleAddRay}
          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Add Medication"
        >
          <Plus className="h-4 w-4 " />
        </Button>
      </div>

      <div className="space-y-4">
        {rays.map((ray, index) => (
          <div
            key={ray.id || index}
            className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ray Test #{index + 1}
              </h4>
              <Button
                type="button"
                variant={'ghost'}
                onClick={() => handleRemoveRay(index)}
                className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                title="Remove Ray Test"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Controller
                  name={`rays.${index}.id`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Ray Test"
                      placeholder="Select Ray"
                      {...field}
                      options={availableRays}
                      disabled={isLoading}
                      isLoading={isLoading}
                      className="w-full"
                      onChange={(event) => {
                        field.onChange(event);
                        // Extract the value from the event object
                        const value = event.target.value;
                        // Find the selected option and set the name field with its label
                        const selectedOption = availableRays.find(
                          (option) => option.value === value
                        );
                        if (selectedOption) {
                          const newRays = [...rays];
                          newRays[index] = {
                            ...newRays[index],
                            id: value,
                            name: selectedOption.label || '',
                          };
                          onRaysChange(newRays);
                        }
                      }}
                    />
                  )}
                />
                {errors.rays &&
                  Array.isArray(errors.rays) &&
                  errors.rays[index]?.id && (
                    <p className="text-xs text-red-500 mt-1">
                      {(errors.rays[index]?.id?.message as string) ||
                        'Ray test name is required'}
                    </p>
                  )}
              </div>
              <div>
                <TextArea
                  label="Additional Details"
                  {...register(`rays.${index}.notes`)}
                  placeholder="Additional details"
                  rows={2}
                  className="w-full"
                  error={
                    errors.rays &&
                    Array.isArray(errors.rays) &&
                    errors.rays[index]?.details
                      ? (errors.rays[index]?.details?.message as string)
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        ))}

        {rays.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
            <p>No ray tests added yet. Click "Add Ray Test" to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
