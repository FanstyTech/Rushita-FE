'use client';

import { Input, Select, TextArea } from '@/components/common/form';

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
        <button
          type="button"
          onClick={handleAddMedication}
          className="p-2 text-blue-600 hover:bg-gray-100 rounded"
          title="Add Medication"
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
      <div className="space-y-3">
        {medications.map((med, index) => (
          <div
            key={med.id || index}
            className="grid grid-cols-12 gap-2 items-start"
          >
            <div className="col-span-3">
              <Controller
                name={`medications.${index}.name`}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Search medicine..."
                    value={field.value}
                    onClick={() => onShowMedicationSearch(index)}
                    readOnly
                    className="cursor-pointer"
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
            <div className="col-span-2">
              <Input
                placeholder="Dosage"
                {...register(`medications.${index}.dosage`, { required: true })}
                error={
                  errors.medications &&
                  Array.isArray(errors.medications) &&
                  errors.medications[index]?.dosage
                    ? (errors.medications[index]?.dosage?.message as string)
                    : undefined
                }
              />
            </div>
            <div className="col-span-3">
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
                    ? (errors.medications[index]?.frequency?.message as string)
                    : undefined
                }
              />
            </div>
            <div className="col-span-3">
              <Input
                type="number"
                placeholder="Duration"
                {...register(`medications.${index}.duration`, {
                  required: true,
                })}
                error={
                  errors.medications &&
                  Array.isArray(errors.medications) &&
                  errors.medications[index]?.duration
                    ? (errors.medications[index]?.duration?.message as string)
                    : undefined
                }
              />
            </div>

            <div className="col-span-3">
              <TextArea
                {...register(`medications.${index}.notes`, {
                  required: true,
                })}
                placeholder="Notes"
                label="Notes"
                rows={3}
                error={
                  errors.medications &&
                  Array.isArray(errors.medications) &&
                  errors.medications[index]?.notes
                    ? (errors.medications[index]?.notes?.message as string)
                    : undefined
                }
              />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              {medications.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMedication(index)}
                  className="p-1 text-red-500 hover:bg-gray-100 rounded"
                  title="Remove Medication"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m5-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
