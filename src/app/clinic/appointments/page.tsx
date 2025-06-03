'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/clinic/appointments/Calendar';
import { Appointment, appointmentAPI } from '@/mockData/appointments';
import { format } from 'date-fns';
import { Patient, patientAPI } from '@/mockData/patients';
import Modal from '@/components/common/Modal';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PageLayout from '@/components/layouts/PageLayout';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [newAppointment, setNewAppointment] = useState({
    type: 'checkup' as 'checkup' | 'followup' | 'emergency' | 'dental',
    startTime: '09:00',
    endTime: '09:30',
    notes: '',
  });

  // Load appointments
  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data: Appointment[] = await appointmentAPI.getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Failed to load appointments:', error);
    }
  };

  // Search patients
  const searchPatients = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await patientAPI.searchPatients(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Failed to search patients:', error);
    }
  };

  // Create appointment
  const handleCreateAppointment = async () => {
    if (!selectedPatient) return;

    setIsSubmitting(true);
    try {
      const appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'> = {
        patientId: selectedPatient.id,
        doctorId: '1', // TODO: Replace with actual logged-in doctor ID
        date: format(selectedDate, 'yyyy-MM-dd'),
        startTime: newAppointment.startTime,
        endTime: newAppointment.endTime,
        type: newAppointment.type,
        status: 'scheduled',
        notes: newAppointment.notes,
      };

      await appointmentAPI.createAppointment(appointment);
      await loadAppointments();
      setShowNewAppointment(false);
      resetNewAppointmentForm();
    } catch (error) {
      console.error('Failed to create appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit appointment
  const handleEditAppointment = async (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewAppointment({
      type: appointment.type,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      notes: appointment.notes || '',
    });

    // Get and set the patient for the appointment
    try {
      const patient = await patientAPI.getPatientById(appointment.patientId);
      if (patient) {
        setSelectedPatient(patient);
      }
    } catch (error) {
      console.error('Failed to load patient:', error);
    }

    setShowNewAppointment(true);
  };

  // Handle delete appointment
  const handleDeleteAppointment = async () => {
    if (!selectedAppointment) return;

    setIsSubmitting(true);
    try {
      await appointmentAPI.deleteAppointment(selectedAppointment.id);
      await loadAppointments();
      setShowDeleteConfirm(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetNewAppointmentForm = () => {
    setSelectedPatient(null);
    setSearchQuery('');
    setSearchResults([]);
    setNewAppointment({
      type: 'checkup' as 'checkup' | 'followup' | 'emergency' | 'dental',
      startTime: '09:00',
      endTime: '09:30',
      notes: '',
    });
  };

  return (
    <PageLayout>
      {/* Calendar View */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900"></h1>
        <button
          onClick={() => setShowNewAppointment(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <CalendarIcon className="h-5 w-5 mr-2" />
          New Appointment
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Calendar
            appointments={appointments}
            selectedDate={selectedDate}
            onDaySelect={setSelectedDate}
          />
        </div>

        {/* Day's Schedule */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Schedule for {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {appointments
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
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.startTime} - {appointment.endTime}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.type.charAt(0).toUpperCase() +
                              appointment.type.slice(1)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleEditAppointment(appointment)}
                          className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <PencilIcon className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowDeleteConfirm(true);
                          }}
                          className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            {appointments.filter(
              (apt) =>
                format(new Date(apt.date), 'yyyy-MM-dd') ===
                format(selectedDate, 'yyyy-MM-dd')
            ).length === 0 && (
              <div className="px-4 py-12 text-center">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <CalendarIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    No appointments
                  </h3>
                  <p className="text-sm text-gray-500">
                    There are no appointments scheduled for this day.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => !isSubmitting && setShowDeleteConfirm(false)}
        title="Delete Appointment"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this appointment? This action cannot
            be undone.
          </p>
          <div className="mt-5 flex justify-end space-x-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteAppointment}
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* New Appointment Modal */}
      <Modal
        isOpen={showNewAppointment}
        onClose={() => !isSubmitting && setShowNewAppointment(false)}
        title="Schedule New Appointment"
        footer={
          <div className=" flex justify-end space-x-4 border-gray-200 ">
            <button
              type="button"
              onClick={() => setShowNewAppointment(false)}
              disabled={isSubmitting}
              className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleCreateAppointment}
              disabled={!selectedPatient || isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-150 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  Creating...
                </>
              ) : (
                'Schedule Appointment'
              )}
            </button>
          </div>
        }
      >
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          {/* Patient Selection */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Patient Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name
              </label>
              <div className="relative">
                {selectedPatient ? (
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-md border border-blue-200">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {selectedPatient.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPatient(null)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <UserIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          searchPatients(e.target.value);
                        }}
                        placeholder="Search patients..."
                        className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {searchResults.length > 0 && (
                      <ul className="absolute z-50 w-full mt-2 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-gray-100">
                        {searchResults.map((patient) => (
                          <li
                            key={patient.id}
                            onClick={() => {
                              setSelectedPatient(patient);
                              setSearchQuery('');
                              setSearchResults([]);
                            }}
                            className="relative cursor-pointer select-none py-3 px-4 hover:bg-gray-50 transition-colors duration-150"
                          >
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <UserIcon className="h-5 w-5 text-gray-600" />
                              </div>
                              <span className="ml-3 font-medium block text-gray-700 ">
                                {patient.name}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Appointment Details
            </h3>
            <div className="space-y-6">
              {/* Appointment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Appointment
                </label>
                <div className="relative rounded-md shadow-sm">
                  <select
                    value={newAppointment.type}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        type: e.target.value as
                          | 'checkup'
                          | 'followup'
                          | 'emergency'
                          | 'dental',
                      })
                    }
                    className="block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  >
                    <option value="checkup">Check-up</option>
                    <option value="followup">Follow-up</option>
                    <option value="emergency">Emergency</option>
                    <option value="dental">Dental</option>
                  </select>
                </div>
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <ClockIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="time"
                      value={newAppointment.startTime}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          startTime: e.target.value,
                        })
                      }
                      className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <ClockIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="time"
                      value={newAppointment.endTime}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          endTime: e.target.value,
                        })
                      }
                      className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      notes: e.target.value,
                    })
                  }
                  rows={3}
                  className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 resize-none"
                  placeholder="Add any additional notes about the appointment..."
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </PageLayout>
  );
}
