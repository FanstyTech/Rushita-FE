'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { Calendar } from '@/components/clinic/appointments/Calendar';
import { format } from 'date-fns';
import Modal from '@/components/common/Modal';
import {
  CalendarIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import AppointmentSkeleton from '@/components/skeletons/AppointmentSkeleton';
import PageLayout from '@/components/layouts/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  formatTimeForAPI,
} from '@/utils/dateTimeUtils';
import { toast } from '@/components/ui/Toast';
import AppointmentForm from '@/components/clinic/appointments/AppointmentForm';
import { ConfirmationModal } from '@/components/common';

// Using formatTimeForAPI from dateTimeUtils for time formatting

export default function AppointmentsPage() {
  const { user } = useAuth();

  // Extract clinicId and staffId directly from user
  const clinicId = user?.clinicInfo?.id || '';

  // Use client-side only initialization for dates to avoid hydration mismatches
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Initialize date on client-side only
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedAppointmentFoDelete, setSelectedAppointmentFoDelete] =
    useState('');

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

  const { data: appointmentForEditData, isLoading: appointmentForEditLoading } =
    useAppointmentForEdit(selectedAppointment?.id || '');

  // Create or update appointment
  const handleCreateAppointment = async () => {
    if (!selectedPatient) {
      toast.error('Please select a patient');
      return;
    }
    if (!selectedStaff) {
      toast.error('Please select a staff member');
      return;
    }
    if (
      !validateAppointmentTime(newAppointment.startTime, newAppointment.endTime)
    ) {
      toast.error('End time must be after start time');
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
  }, [appointmentForEditData]); // Handle delete appointment

  const handleDeleteAppointment = async () => {
    if (!selectedAppointmentFoDelete) return;

    await deleteAppointment.mutateAsync(selectedAppointmentFoDelete);
    setShowDeleteConfirm(false);
  };

  // Calendar data conversion
  const calendarAppointments = useMemo(() => {
    if (!appointmentsData?.items) return [];
    return appointmentsData.items;
  }, [appointmentsData]);

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
      {/* Header */}
      <div className="flex justify-end items-center">
        <Button
          onClick={() => {
            setShowNewAppointment(true);
            setSelectedAppointment(null);
          }}
          className="gap-2"
        >
          <CalendarIcon className="h-5 w-5 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Calendar
            appointments={calendarAppointments}
            selectedDate={selectedDate}
            onDaySelect={setSelectedDate}
          />
        </div>

        {/* Day's Schedule */}
        <Card className="">
          <h3 className="px-4 sm:px-6 text-lg font-medium">
            Schedule for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {calendarAppointments
                .filter(
                  (apt) =>
                    format(new Date(apt.date), 'yyyy-MM-dd') ===
                    format(selectedDate, 'yyyy-MM-dd')
                )
                .map((appointment) => (
                  <li
                    key={appointment.id}
                    className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <CalendarIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">
                            {formatTimeForAPI(appointment.startTime)} -{' '}
                            {formatTimeForAPI(appointment.endTime)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.patientName} -{' '}
                            {VisitType[appointment.type]}
                            <Badge variant="secondary">
                              {appointment.staffName}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          onClick={() => handleEditAppointment(appointment)}
                          className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <PencilIcon className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setShowDeleteConfirm(true);
                            setSelectedAppointmentFoDelete(appointment?.id);
                          }}
                          className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            {calendarAppointments.filter(
              (apt) =>
                format(new Date(apt.date), 'yyyy-MM-dd') ===
                format(selectedDate, 'yyyy-MM-dd')
            ).length === 0 && (
              <div className="px-4 py-12 text-center">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <CalendarIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium mb-1">No appointments</h3>
                  <p className="text-sm text-gray-500">
                    There are no appointments scheduled for this day.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAppointment}
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment?"
        secondaryMessage="This action cannot be undone."
        variant="error"
        confirmText="Delete"
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
          selectedAppointment ? 'Edit Appointment' : 'Schedule New Appointment'
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
              Cancel
            </Button>
            <Button
              onClick={handleCreateAppointment}
              type="button"
              className="gap-2"
              isLoading={isSubmitting}
            >
              {selectedAppointment
                ? 'Update Appointment'
                : 'Schedule Appointment'}
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
    </PageLayout>
  );
}
