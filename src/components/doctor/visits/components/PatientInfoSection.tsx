'use client';

import { Select } from '@/components/common/form';
import { Button } from '@/components/ui/button';
import {
  BloodType,
  GetPatientForViewDto,
  VisitType,
} from '@/lib/api/types/clinic-patient';
import { SelectOption } from '@/lib/api/types/select-option';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { getBloodTypeLabel } from '@/utils/textUtils';
import { useCallback } from 'react';

interface PatientInfoSectionProps {
  shouldFetchPatients: boolean;
  patientSearchQuery: string;
  setPatientSearchQuery: (query: string) => void;
  patientsData: SelectOption<string>[] | undefined;
  patientsLoading: boolean;
  selectedPatient: string;
  setSelectedPatient: (id: string) => void;
  selectedPatientData: GetPatientForViewDto | undefined;
  selectedPatientLoading: boolean;
  onShowAdvancedSearch: () => void;
  onShowAddPatient: () => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function PatientInfoSection({
  shouldFetchPatients,
  setPatientSearchQuery,
  patientsData,
  patientsLoading,
  selectedPatient,
  setSelectedPatient,
  selectedPatientData,
  selectedPatientLoading,
  onShowAdvancedSearch,
  onShowAddPatient,
  register,
  errors,
}: PatientInfoSectionProps) {
  // Handle staff selection
  const handlePatientSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      const selectedOption = patientsData?.find(
        (option) => option.value === selectedValue
      );
      if (selectedOption) {
        setSelectedPatient(selectedOption?.value);
      }
    },
    [patientsData]
  );

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100 bg-white px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Patient Information
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search and Visit Type */}
          <div className="space-y-4">
            <div>
              <Select
                label="Search Patient"
                placeholder="Search by name, ID, or phone..."
                options={patientsData || []}
                value={selectedPatient}
                onChange={handlePatientSelect}
                isLoading={patientsLoading}
                onSearch={(value) => setPatientSearchQuery(value)}
                className="w-full"
                error={errors?.patientId?.message as string}
                noOptionsMessage={
                  shouldFetchPatients
                    ? 'No patients found'
                    : 'Type to search for patients'
                }
              />
            </div>

            <div>
              <Select
                {...register(`visitType`)}
                label="Visit Type"
                options={Object.entries(VisitType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  }))}
                error={errors.visitType?.message as string}
              />
            </div>
          </div>

          {/* Patient Details */}
          {selectedPatient && selectedPatientLoading && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-5 w-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
          {selectedPatient &&
            !selectedPatientLoading &&
            selectedPatientData && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-900">
                    Patient Details
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ID: {selectedPatientData?.patientNumber}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedPatientData?.patientName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Age</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedPatientData?.age} years
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Blood Type</p>
                    <p className="text-sm font-medium text-gray-900">
                      {getBloodTypeLabel(
                        selectedPatientData?.bloodType || BloodType.AB_Negative
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedPatientData?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onShowAdvancedSearch}
          >
            Advanced Search
          </Button>
          <Button type="button" onClick={onShowAddPatient}>
            Add New Patient
          </Button>
        </div>
      </div>
    </section>
  );
}
