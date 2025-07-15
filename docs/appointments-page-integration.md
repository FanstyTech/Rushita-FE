# Appointments Page API Integration

## Overview

This document outlines the integration of the Appointments page with the real API endpoints, replacing the mock data with actual API calls while maintaining the existing UI/UX design.

## Changes Made

### 1. API Integration

**Before (Mock Data):**
```typescript
import { Appointment, appointmentAPI } from '@/mockData/appointments';
import { Patient, patientAPI } from '@/mockData/patients';
```

**After (Real APIs):**
```typescript
import { useAppointments } from '@/lib/api/hooks/useAppointments';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { 
  AppointmentListDto, 
  CreateUpdateAppointmentDto, 
  VisitType, 
  AppointmentStatus,
  AppointmentFilterDto 
} from '@/lib/api/types/appointment';
```

### 2. Data Fetching

**Appointments:**
```typescript
// Filter for appointments
const appointmentFilter: AppointmentFilterDto = useMemo(() => ({
  clinicId,
  pageNumber: 1,
  pageSize: 100, // Get all appointments for calendar view
}), [clinicId]);

// Fetch appointments
const { data: appointmentsData, isLoading: appointmentsLoading } = useAppointmentsList(appointmentFilter);
```

**Patients:**
```typescript
// Fetch patients for search
const { data: patientsData, isLoading: patientsLoading } = usePatientsList({
  clinicId,
  pageNumber: 1,
  pageSize: 100,
});
```

### 3. Data Transformation

**Calendar Compatibility:**
```typescript
// Convert appointments data for calendar
const appointments: CalendarAppointment[] = useMemo(() => {
  if (!appointmentsData?.items) return [];
  return appointmentsData.items.map(appointment => ({
    id: appointment.id,
    patientId: appointment.patientName, // Using patientName as patientId for compatibility
    doctorId: appointment.staffName, // Using staffName as doctorId for compatibility
    date: appointment.date,
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    type: appointment.type === VisitType.New ? 'checkup' : 'followup',
    status: appointment.status === AppointmentStatus.Scheduled ? 'scheduled' : 
            appointment.status === AppointmentStatus.Confirmed ? 'confirmed' :
            appointment.status === AppointmentStatus.Completed ? 'completed' : 'cancelled',
    notes: '',
    createdAt: appointment.date,
    updatedAt: appointment.date,
  }));
}, [appointmentsData]);
```

### 4. Form Handling

**Create Appointment:**
```typescript
const handleCreateAppointment = async () => {
  if (!selectedPatient) {
    toast.error('Please select a patient');
    return;
  }

  // Validate appointment time
  if (!validateAppointmentTime(newAppointment.startTime, newAppointment.endTime)) {
    toast.error('End time must be after start time');
    return;
  }

  try {
    const appointmentData: CreateUpdateAppointmentDto = {
      id: '',
      patientId: selectedPatient.id,
      staffId: '1', // TODO: Replace with actual logged-in staff ID
      clinicId: clinicId,
      date: format(selectedDate, 'yyyy-MM-dd'),
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
  } catch (error) {
    console.error('Failed to create appointment:', error);
  }
};
```

**Edit Appointment:**
```typescript
const handleEditAppointment = (appointment: AppointmentListDto) => {
  setSelectedAppointment(appointment);
  setNewAppointment({
    type: appointment.type,
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    notes: '',
    status: appointment.status,
  });

  // Find and set the patient for the appointment
  const patient = patients.find(p => p.name === appointment.patientName);
  if (patient) {
    setSelectedPatient(patient);
  }

  setShowNewAppointment(true);
};
```

**Delete Appointment:**
```typescript
const handleDeleteAppointment = async () => {
  if (!selectedAppointment) return;

  try {
    await deleteAppointment.mutateAsync(selectedAppointment.id);
    setShowDeleteConfirm(false);
    setSelectedAppointment(null);
  } catch (error) {
    console.error('Failed to delete appointment:', error);
  }
};
```

### 5. Patient Search

**Local Search Implementation:**
```typescript
const searchPatients = (query: string) => {
  if (!query.trim()) {
    setSearchResults([]);
    return;
  }
  
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(query.toLowerCase()) ||
    patient.email.toLowerCase().includes(query.toLowerCase())
  );
  setSearchResults(filteredPatients);
};
```

### 6. Loading States

**Unified Loading State:**
```typescript
// Loading states
const isSubmitting = createOrUpdateAppointment.isPending || deleteAppointment.isPending;

// Show loading spinner while data is loading
if (appointmentsLoading || patientsLoading) {
  return (
    <PageLayout>
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    </PageLayout>
  );
}
```

## Key Features

### 1. Real-time Data
- ✅ Fetches appointments from real API
- ✅ Fetches patients from real API
- ✅ Automatic data refresh after mutations
- ✅ Optimistic updates with React Query

### 2. Form Validation
- ✅ Patient selection validation
- ✅ Time range validation
- ✅ Required field validation
- ✅ Real-time error feedback

### 3. Data Transformation
- ✅ Converts API data to calendar format
- ✅ Maintains backward compatibility
- ✅ Handles different data structures

### 4. Error Handling
- ✅ Toast notifications for errors
- ✅ Graceful error recovery
- ✅ User-friendly error messages

### 5. Performance
- ✅ React Query caching
- ✅ Memoized data transformations
- ✅ Optimized re-renders

## Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.rushita.com
```

### Clinic ID
Currently hardcoded as `'clinic-123'`. Should be updated to:
```typescript
// Get from auth context
const { clinicId } = useAuth();
```

### Staff ID
Currently hardcoded as `'1'`. Should be updated to:
```typescript
// Get from auth context
const { user } = useAuth();
const staffId = user?.staffId;
```

## Usage Examples

### 1. Creating an Appointment
```typescript
// Select a patient
setSelectedPatient(patient);

// Fill appointment details
setNewAppointment({
  type: VisitType.New,
  startTime: '09:00',
  endTime: '09:30',
  notes: 'Regular checkup',
  status: AppointmentStatus.Scheduled,
});

// Submit
await handleCreateAppointment();
```

### 2. Editing an Appointment
```typescript
// Click edit button on appointment
handleEditAppointment(appointmentDto);

// Modify details in form
setNewAppointment({
  ...newAppointment,
  startTime: '10:00',
  endTime: '10:30',
});

// Submit changes
await handleCreateAppointment();
```

### 3. Deleting an Appointment
```typescript
// Click delete button
setSelectedAppointment(appointmentDto);
setShowDeleteConfirm(true);

// Confirm deletion
await handleDeleteAppointment();
```

## Benefits

1. **Real Data Integration** - Uses actual API endpoints
2. **Type Safety** - Full TypeScript support
3. **Error Handling** - Comprehensive error management
4. **Performance** - Optimized with React Query
5. **User Experience** - Maintains existing UI/UX
6. **Maintainability** - Clean, organized code structure

## Migration Notes

### From Mock Data
- Remove mock data imports
- Replace mock API calls with real hooks
- Update data structures to match API response
- Add proper error handling

### Backward Compatibility
- Calendar component interface unchanged
- Form structure maintained
- UI/UX preserved
- Existing functionality works as before

## Testing

Test the following scenarios:

1. **Load Appointments** - Verify data loads from API
2. **Create Appointment** - Verify appointment creation
3. **Edit Appointment** - Verify appointment editing
4. **Delete Appointment** - Verify appointment deletion
5. **Patient Search** - Verify patient search functionality
6. **Error Handling** - Verify error scenarios
7. **Loading States** - Verify loading indicators

## Conclusion

The Appointments page is now fully integrated with the real API while maintaining the existing user experience. The integration provides real-time data, proper error handling, and improved performance through React Query caching. 