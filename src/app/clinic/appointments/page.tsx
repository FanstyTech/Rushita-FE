'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/clinic/appointments/Calendar';
import { format } from 'date-fns';
import Modal from '@/components/common/Modal';
import AppointmentSkeleton from '@/components/skeletons/AppointmentSkeleton';
import PageLayout from '@/components/layouts/PageLayout';
import { Button } from '@/components/ui/button';
import { useAppointments } from '@/lib/api/hooks/useAppointments';
import {
  AppointmentListDto,
  CreateUpdateAppointmentDto,
  VisitType,
  AppointmentStatus,
  AppointmentFilterDto,
} from '@/lib/api/types/appointment';
import {
  convertFormDataForAPI,
  validateAppointmentTime,
} from '@/utils/dateTimeUtils';
import { toast } from '@/components/ui/Toast';
import { ConfirmationModal } from '@/components/common';
import {
  KanbanBoard,
  AppointmentHeader,
  AppointmentDetails,
  AppointmentForm,
} from '@/components/clinic/appointments';
import { useTranslation } from 'react-i18next';

// Enhanced filter interface
interface AppointmentFilters {
  selectedDoctors: string[];
  selectedTreatments: string[];
  selectedStatuses: AppointmentStatus[];
  searchQuery: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

// View modes
type ViewMode = 'schedule' | 'kanban';

export default function AppointmentsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();

  // Extract clinicId and staffId directly from user
  const clinicId = user?.clinicInfo?.id || '';

  // View mode state
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');

  // Filter states
  const [filters] = useState<AppointmentFilters>({
    selectedDoctors: [],
    selectedTreatments: [],
    selectedStatuses: [],
    searchQuery: '',
    dateRange: { start: null, end: null },
  });

  // Use client-side only initialization for dates to avoid hydration mismatches
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Initialize date on client-side only
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedAppointmentForDelete] = useState('');
  const [showAppointmentDetail, setShowAppointmentDetail] = useState(false);
  const [detailAppointment, setDetailAppointment] =
    useState<AppointmentListDto | null>(null);

  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentListDto | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [selectedStaff, setSelectedStaff] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [newAppointment, setNewAppointment] = useState<{
    type: VisitType;
    startTime: string;
    endTime: string;
    notes: string;
    status: AppointmentStatus;
  }>({
    type: VisitType.New,
    startTime: '09:00',
    endTime: '09:30',
    notes: '',
    status: AppointmentStatus.Scheduled,
  });

  // API Hooks
  const {
    useAppointmentsList,
    useAppointmentForEdit,
    updateAppointmentStatus,
    createOrUpdateAppointment,
    deleteAppointment,
  } = useAppointments();

  // Loading states
  const isSubmitting =
    createOrUpdateAppointment.isPending || deleteAppointment.isPending;

  // Filter for appointments
  const appointmentFilter: AppointmentFilterDto = useMemo(
    () => ({
      clinicId,
      pageNumber: 1,
      pageSize: 100,
    }),
    [clinicId]
  );

  // Fetch appointments
  const { data: appointmentsData, isLoading: appointmentsLoading } =
    useAppointmentsList(appointmentFilter);

  const { data: appointmentForEditData } = useAppointmentForEdit(
    selectedAppointment?.id || ''
  );

  // Filter appointments based on current filters
  const filteredAppointments = useMemo(() => {
    if (!appointmentsData?.items) return [];

    let filtered = appointmentsData.items;

    // Filter by selected doctors
    if (filters.selectedDoctors.length > 0) {
      filtered = filtered.filter((apt) =>
        filters.selectedDoctors.includes(apt.staffName)
      );
    }

    // Filter by selected treatments
    if (filters.selectedTreatments.length > 0) {
      filtered = filtered.filter((apt) =>
        filters.selectedTreatments.includes(apt.type.toString())
      );
    }

    // Filter by selected statuses
    if (filters.selectedStatuses.length > 0) {
      filtered = filtered.filter((apt) =>
        filters.selectedStatuses.includes(apt.status)
      );
    }

    // Filter by date range
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter((apt) => {
        const aptDate = new Date(apt.date);
        return (
          aptDate >= filters.dateRange.start! &&
          aptDate <= filters.dateRange.end!
        );
      });
    }

    // Filter by search query
    if (filters.searchQuery) {
      filtered = filtered.filter((apt) =>
        apt.patientName
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [appointmentsData?.items, filters]);

  // Group appointments by status for Kanban view
  const appointmentsByStatus = useMemo(() => {
    const grouped: Record<AppointmentStatus, AppointmentListDto[]> = {
      [AppointmentStatus.Pending]: [],
      [AppointmentStatus.Scheduled]: [],
      [AppointmentStatus.Confirmed]: [],
      [AppointmentStatus.InProgress]: [],
      [AppointmentStatus.Completed]: [],
      [AppointmentStatus.Cancelled]: [],
      [AppointmentStatus.NoShow]: [],
    };

    filteredAppointments.forEach((apt) => {
      if (grouped[apt.status]) {
        grouped[apt.status].push(apt);
      }
    });

    return grouped;
  }, [filteredAppointments]);

  // Handle appointment status change (for Kanban)
  const handleStatusChange = async (
    appointmentId: string,
    newStatus: AppointmentStatus
  ) => {
    const appointment = filteredAppointments.find(
      (apt) => apt.id === appointmentId
    );
    if (!appointment) return;

    updateAppointmentStatus.mutateAsync({
      id: appointmentId,
      status: newStatus,
    });
  };

  // Show appointment details
  const handleShowAppointmentDetail = (appointment: AppointmentListDto) => {
    setDetailAppointment(appointment);
    setShowAppointmentDetail(true);
  };

  // Create or update appointment
  const handleCreateAppointment = async () => {
    if (!selectedPatient) {
      toast.error(t('clinic.appointments.messages.selectPatient'));
      return;
    }
    if (!selectedStaff) {
      toast.error(t('clinic.appointments.messages.selectStaff'));
      return;
    }
    if (
      !validateAppointmentTime(newAppointment.startTime, newAppointment.endTime)
    ) {
      toast.error(t('clinic.appointments.messages.invalidTime'));
      return;
    }

    const appointmentData: CreateUpdateAppointmentDto = {
      id: selectedAppointment?.id || undefined,
      patientId: selectedPatient.value || '',
      staffId: selectedStaff.value || '',
      clinicId: clinicId,
      date: format(selectedDate || new Date(), 'yyyy-MM-dd'),
      startTime: newAppointment.startTime,
      endTime: newAppointment.endTime,
      type: newAppointment.type,
      status: newAppointment.status,
      notes: newAppointment.notes,
    };

    const convertedData = convertFormDataForAPI(appointmentData);
    await createOrUpdateAppointment.mutateAsync(convertedData);

    setShowNewAppointment(false);
    resetNewAppointmentForm();
  };

  // Reset form
  const resetNewAppointmentForm = () => {
    setSelectedPatient(null);
    setSelectedStaff(null);
    setNewAppointment({
      type: VisitType.New,
      startTime: '09:00',
      endTime: '09:30',
      notes: '',
      status: AppointmentStatus.Scheduled,
    });
  };

  // Handle edit appointment
  const handleEditAppointment = async (appointment: AppointmentListDto) => {
    setSelectedAppointment(appointment);
  };

  useEffect(() => {
    if (appointmentForEditData) {
      const appointmentData = appointmentForEditData;

      // Set appointment details
      setNewAppointment({
        type: appointmentData.type,
        startTime: appointmentData.startTime,
        endTime: appointmentData.endTime,
        notes: appointmentData.notes || '',
        status: appointmentData.status,
      });

      // Convert SelectOption<string> to the expected state type
      if (appointmentData.patient) {
        setSelectedPatient({
          value: appointmentData.patient.value,
          label: appointmentData.patient.label || '',
        });
      }

      if (appointmentData.staff) {
        setSelectedStaff({
          value: appointmentData.staff.value,
          label: appointmentData.staff.label || '',
        });
      }

      setShowNewAppointment(true);
    }
  }, [appointmentForEditData]);

  // Handle delete appointment
  const handleDeleteAppointment = async () => {
    if (!selectedAppointmentForDelete) return;

    await deleteAppointment.mutateAsync(selectedAppointmentForDelete);
    setShowDeleteConfirm(false);
  };

  const handleAddNewAppointment = async () => {
    setShowNewAppointment(true);
    setSelectedAppointment(null);
  };

  // Show skeleton loading state when appointments are loading initially
  if (appointmentsLoading && !appointmentsData) {
    return (
      <PageLayout>
        <AppointmentSkeleton />
      </PageLayout>
    );
  }

  // Only render the full UI when we're on the client side
  if (!selectedDate) {
    return (
      <PageLayout>
        <AppointmentSkeleton />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header Component */}
      <AppointmentHeader
        appointmentsByStatus={appointmentsByStatus}
        viewMode={viewMode}
        setViewMode={setViewMode}
        handleAddNewAppointment={handleAddNewAppointment}
      />

      {/* Main Content */}
      {viewMode === 'schedule' ? (
        <Calendar
          appointments={filteredAppointments}
          selectedDate={selectedDate}
          onDaySelect={setSelectedDate}
          onAppointmentClick={handleShowAppointmentDetail}
        />
      ) : (
        <KanbanBoard
          appointmentsByStatus={appointmentsByStatus}
          filteredAppointments={filteredAppointments}
          onStatusChange={handleStatusChange}
          onEdit={handleEditAppointment}
          onShowDetails={handleShowAppointmentDetail}
          onStartVisit={(appointmentId) =>
            router.push(`/clinic/doctor/visits/add/${appointmentId}`)
          }
        />
      )}
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAppointment}
        title={t('clinic.appointments.modals.deleteConfirmation')}
        message={t('clinic.appointments.messages.deleteConfirmation')}
        secondaryMessage={t('clinic.appointments.messages.deleteWarning')}
        variant="error"
        confirmText={t('clinic.appointments.buttons.delete')}
        isLoading={deleteAppointment.isPending}
      />
      {/* New/Edit Appointment Modal */}
      <Modal
        isOpen={showNewAppointment}
        onClose={() => {
          if (!isSubmitting) {
            setShowNewAppointment(false);
            resetNewAppointmentForm();
          }
        }}
        title={
          selectedAppointment
            ? t('clinic.appointments.modals.editAppointment')
            : t('clinic.appointments.modals.scheduleNew')
        }
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setShowNewAppointment(false);
                resetNewAppointmentForm();
              }}
              type="button"
              disabled={isSubmitting}
            >
              {t('clinic.appointments.buttons.cancel')}
            </Button>
            <Button
              onClick={handleCreateAppointment}
              type="button"
              className="gap-2"
              isLoading={isSubmitting}
            >
              {selectedAppointment
                ? t('clinic.appointments.buttons.updateAppointment')
                : t('clinic.appointments.buttons.scheduleAppointment')}
            </Button>
          </div>
        }
      >
        <AppointmentForm
          clinicId={clinicId}
          onPatientChange={setSelectedPatient}
          onStaffChange={setSelectedStaff}
          initialPatient={selectedPatient}
          initialStaff={selectedStaff}
          appointmentDetails={newAppointment}
          setAppointmentDetails={setNewAppointment}
        />
      </Modal>
      {/* Enhanced Appointment Details Modal */}
      <Modal
        isOpen={showAppointmentDetail}
        onClose={() => setShowAppointmentDetail(false)}
        title=""
        maxWidth="2xl"
      >
        {detailAppointment && (
          <AppointmentDetails
            detailAppointment={detailAppointment}
            handleEditAppointment={handleEditAppointment}
            setShowAppointmentDetail={setShowAppointmentDetail}
          />
        )}
      </Modal>
    </PageLayout>
  );
}
