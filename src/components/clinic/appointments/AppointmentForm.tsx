'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { UserIcon, X, ClockIcon } from 'lucide-react';
import Select from '@/components/common/form/Select';
import Input from '@/components/common/form/Input';
import TextArea from '@/components/common/form/TextArea';
import { SelectOption } from '@/lib/api/types/select-option';
import { VisitType } from '@/lib/api/types/appointment';
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
  };
  setAppointmentDetails: React.Dispatch<
    React.SetStateAction<{
      type: VisitType;
      startTime: string;
      endTime: string;
      notes: string;
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
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      {/* Staff Selection */}
      <Card className="p-3">
        <h3 className="text-lg font-semibold">Staff Information</h3>
        <div className="space-y-4">
          {!selectedStaff ? (
            <Select
              options={safeStaffOptions}
              onChange={handleStaffSelect}
              placeholder="Select a staff member"
              isLoading={staffLoading || staffFetching}
              onSearch={handleStaffSearch}
              noOptionsMessage={
                shouldFetchStaff ? 'No staff found' : 'Type to search for staff'
              }
              disabled={shouldAutoSelectSelf}
            />
          ) : (
            <div className="flex items-center justify-between bg-green-50 dark:bg-green-950 p-3 rounded-md">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <span className="font-medium dark:text-gray-200">
                    {selectedStaff.label}
                  </span>
                </div>
              </div>
              {!shouldAutoSelectSelf && (
                <Button
                  type="button"
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={clearSelectedStaff}
                  disabled={shouldAutoSelectSelf}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
      {/* Patient Selection */}
      <Card className="p-3">
        <h3 className="text-lg font-semibold">Patient Information</h3>
        <div className="space-y-4">
          {!selectedPatient ? (
            <Select
              options={safePatientOptions}
              onChange={handlePatientSelect}
              placeholder="Select a patient"
              isLoading={patientsLoading || patientsFetching}
              onSearch={handlePatientSearch}
              noOptionsMessage={
                shouldFetchPatients
                  ? 'No patients found'
                  : 'Type to search for patients'
              }
            />
          ) : (
            <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <span className="font-medium dark:text-gray-200">
                    {selectedPatient.label}
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={clearSelectedPatient}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>
      {/* Appointment Details */}
      <Card className="p-3">
        <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
        <div className="space-y-6">
          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
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
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Input
                label="Start Time"
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
            <div>
              <Input
                label="End Time"
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

          {/* Notes */}
          <div>
            <TextArea
              label="Additional Notes"
              value={appointmentDetails.notes}
              onChange={(e) =>
                setAppointmentDetails({
                  ...appointmentDetails,
                  notes: e.target.value,
                })
              }
              rows={3}
              placeholder="Add any additional notes about the appointment..."
            />
          </div>
        </div>
      </Card>
    </form>
  );
};

export default AppointmentForm;
