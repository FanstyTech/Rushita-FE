'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Components
import PatientInfoSection from './PatientInfoSection';
import SymptomsAndDiagnosis from './SymptomsAndDiagnosis';
import Medications from './Medications';
import LabTests from './LabTests';
import RayTests from './RayTests';
import Notes from './Notes';

// File Components
import FileUpload from '@/components/common/files/FileUpload';

// Modals
import MedicationSearchModal from './modals/MedicationSearchModal';
import AddNewPatientModal from '@/components/clinic/patients/PatientFormModal';
import TreatmentDetailsModal from './modals/TreatmentDetailsModal';

// Hooks and Types
import { useLabTest } from '@/lib/api/hooks/useLabTest';
import { useRadiologyTest } from '@/lib/api/hooks/useRadiologyTest';
import { useMedicine } from '@/lib/api/hooks/useMedicine';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { useAppointments } from '@/lib/api/hooks/useAppointments';
import { FilterState } from '@/components/common/FilterBar';
import {
  GetPatientDropdownInput,
  VisitType,
} from '@/lib/api/types/clinic-patient';
import { MedicineListDto } from '@/lib/api/types/medicine';
import { useVisit } from '@/lib/api/hooks/useVisit';
import { useDiagnosis } from '@/lib/api/hooks/useDiagnosis';
import { Button } from '@/components/ui/button';
import { CreateOrUpdateVisitDto } from '@/lib/api/types/visit';
import { TreatmentFormData, treatmentFormSchema } from './validation';
import { AttachmentDto, EntityType } from '@/lib/api/types/attachment';
import { toast } from 'sonner';
import { formatDate } from '@/utils/dateTimeUtils';

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

export default function TreatmentForm({
  visitId,
  appointmentId,
}: {
  visitId?: string;
  appointmentId?: string | undefined;
}) {
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
      visitType: VisitType.New,
      symptoms: '',
      diagnosis: '',
      medications: [
        {
          id: undefined,
          name: '',
          dosage: 0,
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
  const [currentVisitId, setCurrentVisitId] = useState<string | undefined>(
    visitId
  );

  // Modal States
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showMedicationSearch, setShowMedicationSearch] = useState(false);
  const [showTreatmentDetails, setShowTreatmentDetails] = useState(false);

  // Form States
  const [medicineFilter, setMedicineFilter] = useState<FilterState>(
    INITIAL_MEDICINE_FILTER
  );
  const [medicationSearchQuery, setMedicationSearchQuery] = useState('');
  const [currentMedicationIndex, setCurrentMedicationIndex] =
    useState<number>(0);

  // Attachments State
  const [attachments, setAttachments] = useState<AttachmentDto[]>([]);

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
  const { createOrUpdateClinicVisit, useVisitForEdit: getVisitForEdit } =
    useVisit();
  const { useRadiologyTestsDropdown } = useRadiologyTest();
  const { useMedicinesList } = useMedicine();
  const { usePatientDropdown, usePatientForView } = useClinicPatients();
  const { useAppointmentForEdit } = useAppointments();

  // Fetch appointment data if appointmentId is provided
  const { data: appointmentData, isLoading: isLoadingAppointment } =
    useAppointmentForEdit(appointmentId || '');

  // Fetch visit data if visitId is provided
  const { data: visitData, isLoading: isLoadingVisit } = getVisitForEdit(
    visitId || ''
  );

  // Effect to populate form with appointment data when available
  useEffect(() => {
    if (appointmentData && appointmentId && !visitId) {
      // Set patient ID and trigger patient data fetch
      setSelectedPatient(appointmentData.patientId);
      setValue('patientId', appointmentData.patientId);

      // Set visit type from appointment
      setValue('visitType', appointmentData.type);
    }
  }, [appointmentData, appointmentId, visitId, setValue]);

  // Effect to populate form with visit data when available
  useEffect(() => {
    if (visitData && visitId) {
      // Set patient ID and trigger patient data fetch
      setSelectedPatient(visitData.patientId);
      setValue('patientId', visitData.patientId);

      // Set form values from visit data
      setValue('visitType', visitData.type);
      setValue('symptoms', visitData.symptoms || '');
      setValue('diagnosis', visitData.diagnosis || '');
      setValue('notes', visitData.notes || '');

      // Set medications if available
      if (visitData.medications && visitData.medications.length > 0) {
        setValue('medications', visitData.medications);
      }

      // Set lab tests if available
      if (visitData.labTests && visitData.labTests.length > 0) {
        setValue('labTests', visitData.labTests);
      }

      // Set ray tests if available
      if (visitData.rays && visitData.rays.length > 0) {
        setValue('rays', visitData.rays);
      }

      // Set attachments if available
      if (visitData.attachments && visitData.attachments.length > 0) {
        setAttachments(visitData?.attachments as AttachmentDto[]);
        // setValue('attachments', visitData.attachmentIds);
      }
    }
  }, [visitData, visitId, setValue]);

  // Hooks
  const { useDiagnosesTree: getDiagnoses } = useDiagnosis();
  const { data: diagnosesTree } = getDiagnoses();

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
      medicineId: medication.id,
      name: medication.name,
    };
    setValue('medications', newMedications);
    setShowMedicationSearch(false);
  };

  // File upload handlers
  const handleFileUploaded = (attachment: AttachmentDto) => {
    setAttachments((prev) => [...prev, attachment]);
    setValue('attachments', [...attachments, attachment]);
  };

  const handleFileUploadError = (error: string) => {
    toast.error(error);
  };

  const onSubmit = async (data: TreatmentFormData) => {
    // Extract attachment IDs from attachments
    const attachmentIds = attachments.map((attachment) => attachment.id);

    // Prepare data for the API
    const visitData: CreateOrUpdateVisitDto = {
      id: currentVisitId, // Include the ID for updates
      appointmentId: appointmentId || undefined,
      patientId: data.patientId,
      staffId: user?.clinicInfo?.staffId || '',
      clinicId: user?.clinicInfo?.id || '',
      type: data.visitType,
      notes: data.notes || '',
      symptoms: data.symptoms,
      followUpInstructions: '',
      diagnosis: data.diagnosis,
      medications: data.medications,
      labTests: data.labTests,
      rays: data.rays,
      attachmentIds: attachmentIds, // Add attachment IDs
    };

    // Call the mutation
    const response = await createOrUpdateClinicVisit.mutateAsync(visitData);
    if (response?.result) {
      setCurrentVisitId(response.result);
    }
  };

  return (
    <div className="space-y-6">
      {(isLoadingVisit && visitId) ||
      (isLoadingAppointment && appointmentId) ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div>
      ) : (
        <>
          {/* Patient Selection Section - Use PatientInfoSection with isReadOnly prop when in edit mode */}
          <PatientInfoSection
            patientSearchQuery={patientSearchQuery}
            setPatientSearchQuery={setPatientSearchQuery}
            shouldFetchPatients={shouldFetchPatients}
            patientsData={patientsData || []}
            patientsLoading={patientsLoading}
            selectedPatient={selectedPatient}
            setSelectedPatient={handlePatientSelect}
            selectedPatientData={selectedPatientData || undefined}
            selectedPatientLoading={selectedPatientLoading}
            onShowAddPatient={() => setShowAddPatient(true)}
            register={register}
            errors={errors}
            isReadOnly={!!visitId}
            visitType={visitData?.type || appointmentData?.type}
            patientName={appointmentData?.patientName}
          />

          {/* Treatment Form Section */}
          {selectedPatient && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Treatment Information
                  </h2>
                  {appointmentData && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Linked to appointment: {appointmentData.appointmentNumber}{' '}
                      - {formatDate(appointmentData.date)}
                    </p>
                  )}
                </div>

                <div className="p-6 space-y-6">
                  <SymptomsAndDiagnosis
                    diagnosesTree={diagnosesTree || []}
                    register={register}
                    errors={errors}
                    control={control}
                  />

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
                    onLabTestsChange={(labTests) =>
                      setValue('labTests', labTests)
                    }
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

                  <Notes
                    register={register}
                    control={control}
                    errors={errors}
                  />

                  {/* Attachments Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Attachments
                      </h3>
                    </div>

                    {/* File Upload */}
                    <FileUpload
                      entityId={currentVisitId || undefined}
                      entityType={EntityType.Visit}
                      uploadedBy={user?.id || ''}
                      description="Visit attachment"
                      multiple={true}
                      accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
                      maxSize={10}
                      label=""
                      helperText="Upload visit-related files, images, or documents"
                      showSuccessMsg={false}
                      onFileUploaded={handleFileUploaded}
                      onError={handleFileUploadError}
                      disabled={createOrUpdateClinicVisit.isPending}
                      attachments={attachments}
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                    >
                      <ArrowLeftIcon className="h-5 w-5 mr-2" />
                      Previous
                    </button>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowTreatmentDetails(true)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                      >
                        Preview
                      </button>
                      <Button
                        variant="default"
                        type="submit"
                        disabled={createOrUpdateClinicVisit.isPending}
                      >
                        {createOrUpdateClinicVisit.isPending
                          ? 'Saving...'
                          : 'Save Visit'}
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          )}

          {/* Modals */}
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
            isSubmitting={isMedicineLoading}
            title="Add New Patient"
          />

          <TreatmentDetailsModal
            isOpen={showTreatmentDetails}
            onClose={() => setShowTreatmentDetails(false)}
            formData={formData}
            selectedPatientData={selectedPatientData || undefined}
          />
        </>
      )}
    </div>
  );
}
