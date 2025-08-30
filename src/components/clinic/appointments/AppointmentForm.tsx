'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { UserIcon, X, ClockIcon } from 'lucide-react';
import Select from '@/components/common/form/Select';
import Input from '@/components/common/form/Input';
import TextArea from '@/components/common/form/TextArea';
import { SelectOption } from '@/lib/api/types/select-option';
import { AppointmentStatus, VisitType } from '@/lib/api/types/appointment';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import { GetPatientDropdownInput } from '@/lib/api/types/clinic-patient';
import { GetClinicStaffForDropdownInput } from '@/lib/api/types/clinic-staff';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { PermissionKeys } from '@/config/permissions';
import { hasPermission } from '@/utils/permissions';
import { Button } from '@/components/ui/button';

interface AppointmentFormProps {
  clinicId: string;

  // For parent component to access selected values
  onPatientChange: (patient: { value: string; label: string } | null) => void;
  onStaffChange: (staff: { value: string; label: string } | null) => void;

  // Initial values (optional)
  initialPatient?: { value: string; label: string } | null;
  initialStaff?: { value: string; label: string } | null;

  // Appointment details props
  appointmentDetails: {
    type: VisitType;
    startTime: string;
    endTime: string;
    notes: string;
    status: AppointmentStatus;
  };
  setAppointmentDetails: React.Dispatch<
    React.SetStateAction<{
      type: VisitType;
      startTime: string;
      endTime: string;
      notes: string;
      status: AppointmentStatus;
    }>
  >;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  clinicId,
  onPatientChange,
  onStaffChange,
  initialPatient,
  initialStaff,
  appointmentDetails,
  setAppointmentDetails,
}) => {
  // Get user from auth context
  const { user } = useAuth();

  // Patient state
  const [selectedPatient, setSelectedPatient] = useState<{
    value: string;
    label: string;
  } | null>(initialPatient || null);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [debouncedPatientSearchQuery, setDebouncedPatientSearchQuery] =
    useState('');

  // Staff state
  const [selectedStaff, setSelectedStaff] = useState<{
    value: string;
    label: string;
  } | null>(initialStaff || null);
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [debouncedStaffSearchQuery, setDebouncedStaffSearchQuery] =
    useState('');

  // Check if user has only ManageSelfAppointments permission
  const userPermissions = user?.permissions || [];
  const hasManageSelfAppointments = hasPermission(
    PermissionKeys.MANAGE_SELF_APPOINTMENTS,
    userPermissions
  );
  const hasManageAnyAppointments = hasPermission(
    PermissionKeys.MANAGE_ANY_APPOINTMENTS,
    userPermissions
  );
  const shouldAutoSelectSelf =
    hasManageSelfAppointments && !hasManageAnyAppointments;

  // Auto-select staff if user only has ManageSelfAppointments permission
  useEffect(() => {
    if (shouldAutoSelectSelf && user?.clinicInfo?.staffId && !selectedStaff) {
      const selfStaff = {
        value: user.clinicInfo.staffId,
        label: user.name,
      };
      setSelectedStaff(selfStaff);
      onStaffChange(selfStaff);
    }
  }, [shouldAutoSelectSelf, user, onStaffChange, selectedStaff]);

  // Sync initial values with parent component if they change
  useEffect(() => {
    if (initialPatient !== undefined) {
      setSelectedPatient(initialPatient);
    }
  }, [initialPatient]);

  useEffect(() => {
    if (initialStaff !== undefined && !shouldAutoSelectSelf) {
      setSelectedStaff(initialStaff);
    }
  }, [initialStaff, shouldAutoSelectSelf]);

  // API hooks
  const { usePatientDropdown } = useClinicPatients();

  // Debounce patient search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPatientSearchQuery(patientSearchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [patientSearchQuery]);

  // Debounce staff search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedStaffSearchQuery(staffSearchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [staffSearchQuery]);

  // Create patient filter with debounced search
  const patientFilter = useMemo<GetPatientDropdownInput>(
    () => ({
      clinicId,
      name: debouncedPatientSearchQuery,
    }),
    [clinicId, debouncedPatientSearchQuery]
  );

  // Only fetch patient data when user has typed something
  const shouldFetchPatients = debouncedPatientSearchQuery.length > 0;

  // Fetch patient data with React Query
  const {
    data: patientsData,
    isLoading: patientsLoading,
    isFetching: patientsFetching,
  } = usePatientDropdown(patientFilter, {
    enabled: shouldFetchPatients, // Only fetch when user has typed something
  });

  // Create staff filter with debounced search
  const staffFilter = useMemo<GetClinicStaffForDropdownInput>(
    () => ({
      clinicId,
      filter: debouncedStaffSearchQuery, // Note: API expects 'filter'
    }),
    [clinicId, debouncedStaffSearchQuery]
  );

  // Only fetch staff data when user has typed something
  const shouldFetchStaff = debouncedStaffSearchQuery.length > 0;

  // Fetch staff data with React Query
  const {
    data: staffData,
    isLoading: staffLoading,
    isFetching: staffFetching,
  } = useClinicStaff().useClinicStaffForDropdown(staffFilter, {
    enabled: shouldFetchStaff, // Only fetch when user has typed something
  });

  // Normalize patient options to ensure compatibility with Select component
  const patientOptions = useMemo(() => {
    if (!patientsData || !Array.isArray(patientsData)) {
      return [];
    }

    // Filter out options with null labels and ensure type compatibility
    return patientsData
      .filter((option): option is SelectOption<string> & { label: string } => {
        const isValid =
          option &&
          typeof option.value === 'string' &&
          typeof option.label === 'string' &&
          option.label !== null;

        return isValid;
      })
      .map((option) => ({
        value: option.value,
        label: option.label,
      }));
  }, [patientsData]);

  // Normalize staff options to ensure compatibility with Select component
  const staffOptions = useMemo(() => {
    if (!staffData || !Array.isArray(staffData)) {
      return [];
    }

    // Filter out options with null labels and ensure type compatibility
    return staffData
      .filter((option): option is SelectOption<string> & { label: string } => {
        const isValid =
          option &&
          typeof option.value === 'string' &&
          typeof option.label === 'string' &&
          option.label !== null;

        return isValid;
      })
      .map((option) => ({
        value: option.value,
        label: option.label,
      }));
  }, [staffData]);

  // Handle patient search
  const handlePatientSearch = useCallback((query: string) => {
    setPatientSearchQuery(query);
  }, []);

  // Handle staff search
  const handleStaffSearch = useCallback((query: string) => {
    setStaffSearchQuery(query);
  }, []);

  // Handle patient selection
  const handlePatientSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      const selectedOption = patientOptions.find(
        (option) => option.value === selectedValue
      );
      if (selectedOption) {
        setSelectedPatient(selectedOption);
        onPatientChange(selectedOption);
      }
    },
    [patientOptions, onPatientChange]
  );

  // Handle staff selection
  const handleStaffSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      const selectedOption = staffOptions.find(
        (option) => option.value === selectedValue
      );
      if (selectedOption) {
        setSelectedStaff(selectedOption);
        onStaffChange(selectedOption);
      }
    },
    [staffOptions, onStaffChange]
  );

  // Clear selected patient
  const clearSelectedPatient = useCallback(() => {
    setSelectedPatient(null);
    onPatientChange(null);
  }, [onPatientChange]);

  // Clear selected staff
  const clearSelectedStaff = useCallback(() => {
    setSelectedStaff(null);
    onStaffChange(null);
  }, [onStaffChange]);

  // Convert SelectOption<string>[] to Option[] for Select component
  const safePatientOptions = useMemo(() => {
    return patientOptions.map((option: { value: string; label: string }) => ({
      value: option.value,
      label: option.label || '', // Convert null to empty string if needed
    }));
  }, [patientOptions]);

  // Convert SelectOption<string>[] to Option[] for Select component
  const safeStaffOptions = useMemo(() => {
    return staffOptions.map((option: { value: string; label: string }) => ({
      value: option.value,
      label: option.label || '', // Convert null to empty string if needed
    }));
  }, [staffOptions]);

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <ClockIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Create New Appointment
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fill in the details to schedule a new appointment
            </p>
          </div>
        </div>
      </div>

      {/* Staff Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Staff Information
            </h3>
          </div>
        </div>
        <div className="p-6">
          {!selectedStaff ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Staff Member
              </label>
              <Select
                options={safeStaffOptions}
                onChange={handleStaffSelect}
                placeholder="Search and select a staff member..."
                isLoading={staffLoading || staffFetching}
                onSearch={handleStaffSearch}
                noOptionsMessage={
                  shouldFetchStaff
                    ? 'No staff found'
                    : 'Type to search for staff'
                }
                disabled={shouldAutoSelectSelf}
              />
            </div>
          ) : (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-900 dark:text-emerald-300">
                      {selectedStaff.label}
                    </span>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400">
                      Selected Staff Member
                    </p>
                  </div>
                </div>
                {!shouldAutoSelectSelf && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                    onClick={clearSelectedStaff}
                    disabled={shouldAutoSelectSelf}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Patient Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Patient Information
            </h3>
          </div>
        </div>
        <div className="p-6">
          {!selectedPatient ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Patient
              </label>
              <Select
                options={safePatientOptions}
                onChange={handlePatientSelect}
                placeholder="Search and select a patient..."
                isLoading={patientsLoading || patientsFetching}
                onSearch={handlePatientSearch}
                noOptionsMessage={
                  shouldFetchPatients
                    ? 'No patients found'
                    : 'Type to search for patients'
                }
              />
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-blue-900 dark:text-blue-300">
                      {selectedPatient.label}
                    </span>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Selected Patient
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  onClick={clearSelectedPatient}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <ClockIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Appointment Details
            </h3>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Type of Appointment
            </label>
            <Select
              options={[
                { value: VisitType.New.toString(), label: 'New Visit' },
                { value: VisitType.Followup.toString(), label: 'Follow-up' },
              ]}
              value={appointmentDetails.type.toString()}
              onChange={(e) =>
                setAppointmentDetails({
                  ...appointmentDetails,
                  type: Number(e.target.value) as VisitType,
                })
              }
              placeholder="Select appointment type"
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Appointment Time
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                  Start Time
                </label>
                <Input
                  type="time"
                  value={appointmentDetails.startTime}
                  onChange={(e) =>
                    setAppointmentDetails({
                      ...appointmentDetails,
                      startTime: e.target.value,
                    })
                  }
                  startIcon={
                    <ClockIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                  End Time
                </label>
                <Input
                  type="time"
                  value={appointmentDetails.endTime}
                  onChange={(e) =>
                    setAppointmentDetails({
                      ...appointmentDetails,
                      endTime: e.target.value,
                    })
                  }
                  startIcon={
                    <ClockIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  }
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Additional Notes
            </label>
            <TextArea
              value={appointmentDetails.notes}
              onChange={(e) =>
                setAppointmentDetails({
                  ...appointmentDetails,
                  notes: e.target.value,
                })
              }
              rows={4}
              placeholder="Add any additional notes about the appointment..."
              className="resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
