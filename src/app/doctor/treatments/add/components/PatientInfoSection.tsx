'use client';

import { Input, Select } from '@/components/common/form';
import Button from '@/components/common/Button';
import { GetPatientForViewDto } from '@/lib/api/types/clinic-patient';
import { SelectOption } from '@/lib/api/types/select-option';

interface PatientInfoSectionProps {
  patientSearchQuery: string;
  setPatientSearchQuery: (query: string) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  patientsData: SelectOption<string>[] | undefined;
  patientsLoading: boolean;
  selectedPatient: string;
  setSelectedPatient: (id: string) => void;
  selectedPatientData: GetPatientForViewDto | undefined;
  selectedPatientLoading: boolean;
  onShowAdvancedSearch: () => void;
  onShowAddPatient: () => void;
}

export default function PatientInfoSection({
  patientSearchQuery,
  setPatientSearchQuery,
  showDropdown,
  setShowDropdown,
  patientsData,
  patientsLoading,
  selectedPatient,
  setSelectedPatient,
  selectedPatientData,
  selectedPatientLoading,
  onShowAdvancedSearch,
  onShowAddPatient,
}: PatientInfoSectionProps) {
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
              <div className="relative">
                <Input
                  label="Search Patient"
                  type="text"
                  value={patientSearchQuery}
                  onChange={(e) => setPatientSearchQuery(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search by name, ID, or phone..."
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
                {patientsLoading && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                )}
                {showDropdown && patientsData && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg">
                    {patientsData?.map((patient) => (
                      <div
                        key={patient.value}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                        onClick={() => {
                          setSelectedPatient(patient.value);
                          setPatientSearchQuery('');
                          setShowDropdown(false);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900">
                              {patient.label}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {patient.value}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Select
                label="Visit Type"
                options={[
                  { value: 'initial', label: 'Initial Visit' },
                  { value: 'followup', label: 'Follow-up' },
                  { value: 'emergency', label: 'Emergency' },
                  { value: 'dental', label: 'Dental' },
                ]}
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
                      {selectedPatientData?.bloodType}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedPatientData?.phoneNumber}
                    </p>
                  </div>
                </div>
                {/* {selectedPatientData?.medicalHistory.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Medical History</p>
                  <div className="flex flex-wrap gap-2"></div>
                </div>
              )} */}
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
