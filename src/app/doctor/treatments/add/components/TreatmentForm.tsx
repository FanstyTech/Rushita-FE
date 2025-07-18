'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Components
import PatientInfoSection from './PatientInfoSection';
import SymptomsAndDiagnosis from './SymptomsAndDiagnosis';
import Medications from './Medications';
import LabTests from './LabTests';
import RayTests from './RayTests';
import Notes from './Notes';
import Attachments from './Attachments';
import { DentalChart } from '@/components/dental/DentalChart';

// Modals
import AdvancedSearchModal from './modals/AdvancedSearchModal';
import MedicationSearchModal from './modals/MedicationSearchModal';
import AddNewPatientModal from '@/components/clinic/patients/PatientFormModal';
import TreatmentDetailsModal from './modals/TreatmentDetailsModal';
import FilePreviewModal from './modals/FilePreviewModal';

// Hooks and Types
import { useLabTest } from '@/lib/api/hooks/useLabTest';
import { useRadiologyTest } from '@/lib/api/hooks/useRadiologyTest';
import { useMedicine } from '@/lib/api/hooks/useMedicine';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { FilterState } from '@/components/common/FilterBar';
import { GetPatientDropdownInput } from '@/lib/api/types/clinic-patient';
import { MedicineListDto } from '@/lib/api/types/medicine';
import { useVisit } from '@/lib/api/hooks/useVisit';

// Validation Schemas
const medicationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Medication name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  frequency: z.coerce.number().min(1, 'Frequency is required'),
  duration: z.number().min(1, 'Duration is required'),
  notes: z.string().optional(),
});

const labTestSchema = z.object({
  id: z.string(),
  notes: z.string().optional(),
});

const rayTestSchema = z.object({
  id: z.string(),
  notes: z.string().optional(),
});

const dentalProcedureSchema = z.object({
  teeth: z.array(z.number()),
  type: z.string().min(1, 'Dental procedure type is required'),
  notes: z.string().optional(),
});

const treatmentFormSchema = z.object({
  patientId: z.string().min(1, 'Patient selection is required'),
  visitType: z.enum(['initial', 'followup', 'emergency', 'dental']),
  symptoms: z.string().min(1, 'Symptoms are required'),
  diagnosis: z.string().min(1, 'Diagnosis is required'),
  medications: z.array(medicationSchema),
  labTests: z.array(labTestSchema),
  rays: z.array(rayTestSchema),
  notes: z.string().optional(),
  selectedTeeth: z.array(z.number()).optional(),
  dentalProcedures: z.array(dentalProcedureSchema).optional(),
  attachments: z.array(z.any()).optional(),
});

type TreatmentFormData = z.infer<typeof treatmentFormSchema>;

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface AdvancedSearchForm {
  name: string;
  id: string;
  phone: string;
  email: string;
}

const INITIAL_MEDICINE_FILTER: FilterState = {
  pageNumber: 1,
  pageSize: 5,
  sortColumn: '',
  sortDirection: '',
  searchValue: '',
  code: '',
  typeId: undefined,
  isActive: undefined,
};

export default function TreatmentForm() {
  // Form State
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<TreatmentFormData>({
    resolver: zodResolver(treatmentFormSchema),
    defaultValues: {
      patientId: '',
      visitType: 'initial',
      symptoms: '',
      diagnosis: '',
      medications: [
        {
          id: '',
          name: '',
          dosage: '',
          frequency: 0,
          duration: 0,
          notes: '',
        },
      ],
      labTests: [],
      rays: [],
      notes: '',
      selectedTeeth: [],
      dentalProcedures: [],
      attachments: [],
    },
  });

  const formData = watch();
  const { user } = useAuth();
  const clinicId = user?.clinicInfo?.id || '';

  // Patient Search State
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [debouncedPatientSearchQuery, setDebouncedPatientSearchQuery] =
    useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Modal States
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showMedicationSearch, setShowMedicationSearch] = useState(false);
  const [showTreatmentDetails, setShowTreatmentDetails] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Form States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [medicineFilter, setMedicineFilter] = useState<FilterState>(
    INITIAL_MEDICINE_FILTER
  );
  const [medicationSearchQuery, setMedicationSearchQuery] = useState('');
  const [currentMedicationIndex, setCurrentMedicationIndex] =
    useState<number>(0);
  const [advancedSearchForm, setAdvancedSearchForm] =
    useState<AdvancedSearchForm>({
      name: '',
      id: '',
      phone: '',
      email: '',
    });
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [previewFile, setPreviewFile] = useState<Attachment | null>(null);

  // Debounce patient search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPatientSearchQuery(patientSearchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [patientSearchQuery]);

  // Update medicine filter when search query changes
  useEffect(() => {
    if (showMedicationSearch) {
      setMedicineFilter((prev) => ({
        ...prev,
        searchValue: medicationSearchQuery,
      }));
    }
  }, [medicationSearchQuery, showMedicationSearch]);

  // API Hooks
  const { useLabTestsForDropdown } = useLabTest();
  const { createVisit } = useVisit();
  const { useRadiologyTestsDropdown } = useRadiologyTest();
  const { useMedicinesList } = useMedicine();
  const { usePatientDropdown, usePatientForView } = useClinicPatients();

  // Patient filter
  const patientFilter = useMemo<GetPatientDropdownInput>(
    () => ({
      clinicId,
      name: debouncedPatientSearchQuery,
    }),
    [clinicId, debouncedPatientSearchQuery]
  );

  // API Queries
  const shouldFetchPatients = debouncedPatientSearchQuery.length > 0;
  const { data: patientsData, isLoading: patientsLoading } = usePatientDropdown(
    patientFilter,
    { enabled: shouldFetchPatients }
  );

  const { data: selectedPatientData, isLoading: selectedPatientLoading } =
    usePatientForView(selectedPatient);

  const { data: labTestOptions, isLoading: isLoadingLabTests } =
    useLabTestsForDropdown();
  const { data: rayTestOptions, isLoading: isLoadingRayTests } =
    useRadiologyTestsDropdown();
  const { data: medicines, isLoading: isMedicineLoading } = useMedicinesList(
    medicineFilter,
    { enabled: showMedicationSearch }
  );

  // Event Handlers
  const handlePatientSelect = (patientId: string) => {
    setSelectedPatient(patientId);
    setValue('patientId', patientId);
  };

  const handleOpenMedicationSearch = (index: number) => {
    setMedicationSearchQuery('');
    setMedicineFilter({
      ...INITIAL_MEDICINE_FILTER,
      searchValue: '',
    });
    setCurrentMedicationIndex(index);
    setShowMedicationSearch(true);
  };

  const handleSelectMedication = (medication: MedicineListDto) => {
    const newMedications = [...formData.medications];
    newMedications[currentMedicationIndex] = {
      ...newMedications[currentMedicationIndex],
      id: medication.id,
      name: medication.name,
    };
    setValue('medications', newMedications);
    setShowMedicationSearch(false);
  };

  const handleAdvancedSearch = async () => {
    try {
      setIsLoading(true);
      // Implement advanced search logic here
      setShowAdvancedSearch(false);
      setShowDropdown(true);
      setError(null);
    } catch (err) {
      setError('Failed to search patients');
      console.error('Error searching patients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewFile = (file: Attachment) => {
    setPreviewFile(file);
    setShowPreviewModal(true);
  };

  const handleClosePreview = () => {
    setShowPreviewModal(false);
    setPreviewFile(null);
  };

  const onSubmit = async (data: TreatmentFormData) => {
    try {
      setIsLoading(true);
      console.log('Submitting form data:', data);

      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('Treatment saved successfully!');
    } catch (error) {
      console.error('Error saving treatment:', error);
      setError('Failed to save treatment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Patient Selection Section */}
      <PatientInfoSection
        patientSearchQuery={patientSearchQuery}
        setPatientSearchQuery={setPatientSearchQuery}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        patientsData={patientsData || []}
        patientsLoading={patientsLoading}
        selectedPatient={selectedPatient}
        setSelectedPatient={handlePatientSelect}
        selectedPatientData={selectedPatientData || undefined}
        selectedPatientLoading={selectedPatientLoading}
        onShowAdvancedSearch={() => setShowAdvancedSearch(true)}
        onShowAddPatient={() => setShowAddPatient(true)}
      />

      {/* Treatment Form Section */}
      {selectedPatient && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 bg-white px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Treatment Information
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <SymptomsAndDiagnosis register={register} errors={errors} />

              <Medications
                medications={formData.medications}
                onMedicationsChange={(medications) =>
                  setValue('medications', medications)
                }
                onShowMedicationSearch={handleOpenMedicationSearch}
                register={register}
                control={control}
                errors={errors}
              />

              <LabTests
                labTests={formData.labTests}
                availableTests={labTestOptions || []}
                onLabTestsChange={(labTests) => setValue('labTests', labTests)}
                register={register}
                control={control}
                errors={errors}
                isLoading={isLoadingLabTests}
              />

              <RayTests
                rays={formData.rays}
                availableRays={rayTestOptions || []}
                onRaysChange={(rays) => setValue('rays', rays)}
                register={register}
                control={control}
                errors={errors}
                isLoading={isLoadingRayTests}
              />

              {formData.visitType === 'dental' && (
                <DentalChart
                  selectedTeeth={formData.selectedTeeth || []}
                  onTeethSelect={(teeth) =>
                    setValue('selectedTeeth', teeth as number[])
                  }
                  procedures={formData.dentalProcedures || []}
                  onProcedureAdd={async (procedure) => {
                    const currentProcedures = formData.dentalProcedures || [];
                    setValue('selectedTeeth', []);
                    setValue('dentalProcedures', [
                      ...currentProcedures,
                      procedure,
                    ]);
                  }}
                  onProcedureRemove={(index) => {
                    const newProcedures = [
                      ...(formData.dentalProcedures || []),
                    ];
                    newProcedures.splice(index, 1);
                    setValue('dentalProcedures', newProcedures);
                  }}
                />
              )}

              <Notes register={register} control={control} errors={errors} />

              <Attachments
                attachments={attachments}
                onAttachmentsChange={(newAttachments) => {
                  setAttachments(newAttachments);
                  setValue('attachments', newAttachments);
                }}
                onPreviewFile={handlePreviewFile}
              />

              {/* Form Actions */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Previous
                </button>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowTreatmentDetails(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Preview
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isLoading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isLoading ? 'Saving...' : 'Save Treatment'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </form>
      )}

      {/* Modals */}
      {/* <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        formData={advancedSearchForm}
        onFormChange={setAdvancedSearchForm}
        onSearch={handleAdvancedSearch}
        isLoading={isLoading}
      /> */}

      <MedicationSearchModal
        isOpen={showMedicationSearch}
        onClose={() => setShowMedicationSearch(false)}
        medications={medicines}
        isLoading={isMedicineLoading}
        searchQuery={medicationSearchQuery}
        setSearchQuery={setMedicationSearchQuery}
        filter={medicineFilter}
        setFilter={setMedicineFilter}
        onSelectMedication={handleSelectMedication}
      />

      <AddNewPatientModal
        isOpen={showAddPatient}
        onClose={() => setShowAddPatient(false)}
        onSubmit={() => {}}
        isSubmitting={isLoading}
        title="Add New Patient"
      />

      <FilePreviewModal
        isOpen={showPreviewModal}
        onClose={handleClosePreview}
        file={previewFile}
      />

      <TreatmentDetailsModal
        isOpen={showTreatmentDetails}
        onClose={() => setShowTreatmentDetails(false)}
        formData={formData}
        selectedPatientData={selectedPatientData}
      />
    </div>
  );
}
