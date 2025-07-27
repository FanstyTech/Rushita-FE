'use client';

import { Input, Select, TextArea } from '@/components/common/form';
import { Button } from '@/components/ui/button';

import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from 'react-hook-form';
import {
  CreateOrUpdateVisitPrescriptionDto,
  FrequencyType,
} from '@/lib/api/types/treatment';
import { Trash, Plus } from 'lucide-react';

interface MedicationsProps {
  medications: CreateOrUpdateVisitPrescriptionDto[];
  onMedicationsChange: (
    medications: CreateOrUpdateVisitPrescriptionDto[]
  ) => void;
  onShowMedicationSearch: (index: number) => void;
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors;
}

export default function Medications({
  medications,
  onMedicationsChange,
  onShowMedicationSearch,
  register,
  control,
  errors,
}: MedicationsProps) {
  const handleAddMedication = () => {
    // Generate a unique ID for the new medication
    const newId = `med-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    onMedicationsChange([
      ...medications,
      {
        id: newId,
        name: '',
        duration: 0,
        dosage: '',
        frequency: FrequencyType.Daily,
      },
    ]);
  };

  const handleRemoveMedication = (index: number) => {
    const newMedications = [...medications];
    newMedications.splice(index, 1);
    onMedicationsChange(newMedications);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-medium text-gray-700">Medications</h4>
        <Button
          type="button"
          variant={'ghost'}
          onClick={handleAddMedication}
          className="p-2 text-blue-600 hover:bg-gray-100 rounded"
          title="Add Medication"
        >
          <Plus className="h-4 w-4 " />
        </Button>
      </div>
      <div className="space-y-4">
        {medications.map((med, index) => (
          <div
            key={med.id || index}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                Medication #{index + 1}
              </h4>
              {medications.length > 1 && (
                <Button
                  type="button"
                  onClick={() => handleRemoveMedication(index)}
                  variant="ghost"
                  className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Remove Medication"
                >
                  <Trash className="h-4 w-4 " />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-3">
                <Controller
                  name={`medications.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Medication Name"
                      placeholder="Search medicine..."
                      value={field.value}
                      onClick={() => onShowMedicationSearch(index)}
                      readOnly
                      className="cursor-pointer w-full"
                      startIcon={
                        <svg
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      }
                    />
                  )}
                />
                {errors.medications &&
                  Array.isArray(errors.medications) &&
                  errors.medications[index]?.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {(errors.medications[index]?.name?.message as string) ||
                        'Medication name is required'}
                    </p>
                  )}
              </div>

              <div className="col-span-6 md:col-span-2">
                <Input
                  label="Dosage"
                  placeholder="Dosage"
                  {...register(`medications.${index}.dosage`, {
                    required: true,
                  })}
                  className="w-full"
                  error={
                    errors.medications &&
                    Array.isArray(errors.medications) &&
                    errors.medications[index]?.dosage
                      ? (errors.medications[index]?.dosage?.message as string)
                      : undefined
                  }
                />
              </div>

              <div className="col-span-6 md:col-span-3">
                <Select
                  label="Frequency"
                  {...register(`medications.${index}.frequency`, {
                    required: true,
                  })}
                  options={Object.entries(FrequencyType)
                    .filter(([key]) => isNaN(Number(key)))
                    .map(([key, value]) => ({
                      value: value.toString(),
                      label: key,
                    }))}
                  error={
                    errors.medications &&
                    Array.isArray(errors.medications) &&
                    errors.medications[index]?.frequency
                      ? (errors.medications[index]?.frequency
                          ?.message as string)
                      : undefined
                  }
                />
              </div>

              <div className="col-span-6 md:col-span-2">
                <Input
                  label="Duration (days)"
                  type="number"
                  placeholder="Duration"
                  {...register(`medications.${index}.duration`, {})}
                  className="w-full"
                  error={
                    errors.medications &&
                    Array.isArray(errors.medications) &&
                    errors.medications[index]?.duration
                      ? (errors.medications[index]?.duration?.message as string)
                      : undefined
                  }
                />
              </div>

              <div className="col-span-12 md:col-span-12 mt-2">
                <TextArea
                  label="Notes"
                  {...register(`medications.${index}.notes`, {
                    required: true,
                  })}
                  placeholder="Additional instructions or notes about this medication"
                  rows={2}
                  className="w-full"
                  error={
                    errors.medications &&
                    Array.isArray(errors.medications) &&
                    errors.medications[index]?.notes
                      ? (errors.medications[index]?.notes?.message as string)
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
