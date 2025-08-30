# VisitPrescription API Integration

This document provides a complete guide for using the VisitPrescription API integration in the Rousheta Frontend project.

## Overview

The VisitPrescription integration provides comprehensive functionality for managing prescriptions associated with patient visits. It includes CRUD operations, prescription status management, medicine dispensing, and specialized queries for retrieving prescription data.

## Files Created

1. **API Configuration**: `src/lib/api/config.ts` - Added visitPrescription endpoints
2. **TypeScript Types**: `src/lib/api/types/visit-prescription.ts` - All DTOs and interfaces
3. **API Service**: `src/lib/api/services/visit-prescription.service.ts` - HTTP client methods
4. **React Query Hooks**: `src/lib/api/hooks/useVisitPrescription.ts` - State management hooks

## API Endpoints

```typescript
visitPrescription: {
  LIST: '/visitPrescription/getAll',
  CREATE_OR_UPDATE: '/visitPrescription/CreateOrUpdate',
  DELETE: '/visitPrescription/Delete',
  GET_ONE: '/visitPrescription/:id',
  GET_BY_VISIT_ID: '/visitPrescription/getByVisitId',
  UPDATE_STATUS: '/visitPrescription/updateStatus',
  DISPENSE_MEDICINE: '/visitPrescription/dispenseMedicine',
  GET_PRESCRIBED_MEDICATIONS: '/visitPrescription/getPrescribedMedicationsByVisitId',
}
```

## TypeScript Types

### Core DTOs

```typescript
// Base VisitPrescription DTO
interface VisitPrescriptionDto {
  id: string;
  visitId: string;
  visitNumber: string;
  medicineId: string;
  medicineName: string;
  medicineCode: string;
  dosage: string;
  frequency: FrequencyType;
  frequencyNotes?: string;
  duration: number;
  quantity: number;
  durationUnit: DurationUnit;
  status: PrescriptionStatus;
  route?: string;
  instructions?: string;
  notes?: string;
  expiryDate?: string;
  lastDispensedDate?: string;
  remainingQuantity: number;
  dispensedQuantity: number;
  createdAt: string;
  updatedAt?: string;
}

// Create/Update DTO
interface CreateUpdateVisitPrescriptionDto {
  id?: string; // Optional for create operations
  visitId: string;
  medicineId: string;
  dosage: string;
  frequency: FrequencyType;
  frequencyNotes?: string;
  duration: number;
  quantity: number;
  durationUnit: DurationUnit;
  status: PrescriptionStatus;
  route?: string;
  instructions?: string;
  notes?: string;
  expiryDate?: string;
  lastDispensedDate?: string;
  remainingQuantity: number;
  dispensedQuantity: number;
}

// Filter DTO
interface VisitPrescriptionFilterDto extends PaginationRequest {
  visitId?: string;
  medicineId?: string;
  status?: PrescriptionStatus;
  frequency?: FrequencyType;
  durationUnit?: DurationUnit;
  expiryDateFrom?: string;
  expiryDateTo?: string;
}
```

### Enums

```typescript
// Prescription status enum
enum PrescriptionStatus {
  Pending = 1,
  PartiallyDispensed = 2,
  FullyDispensed = 3,
  Cancelled = 4,
  Expired = 5,
}

// Frequency type enum
enum FrequencyType {
  Daily = 1,
  BID = 2, // Twice a day
  TID = 3, // Three times a day
  QID = 4, // Four times a day
  Weekly = 5,
  Monthly = 6,
  AsNeeded = 7,
}

// Duration unit enum
enum DurationUnit {
  Day = 1,
  Week = 2,
  Month = 3,
}
```

### Specialized DTOs

```typescript
// Medication item DTO
interface MedicationItemDto {
  id: string;
  code?: string;
  name?: string;
  scientificName?: string;
  description?: string;
  medicationTypeName?: string;
}

// Prescribed medication item DTO
interface PrescribedMedicationItemDto {
  id: string;
  visitId: string;
  patientId: string;
  patientName: string;
  medicationId: string;
  medication: MedicationItemDto;
  prescribedDate: string;
  prescribedBy: string;
  prescribedByName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  dispensedQuantity: number;
  remainingQuantity: number;
  notes?: string;
  status: PrescriptionStatus;
  lastDispensedDate?: string;
  expiryDate?: string;
  createdAt: string;
  updatedAt?: string;
}

// Update status DTO
interface UpdatePrescriptionStatusDto {
  id: string;
  status: PrescriptionStatus;
}

// Dispense medicine DTO
interface DispenseMedicineDto {
  id: string;
  dispensedQuantity: number;
}
```

## Usage Examples

### Basic CRUD Operations

```typescript
import { useVisitPrescription } from '@/lib/api/hooks/useVisitPrescription';
import type { CreateUpdateVisitPrescriptionDto } from '@/lib/api/types/visit-prescription';
import {
  PrescriptionStatus,
  FrequencyType,
  DurationUnit,
} from '@/lib/api/types/visit-prescription';

function MyComponent() {
  const {
    getVisitPrescriptions,
    createOrUpdateVisitPrescription,
    deleteVisitPrescription,
  } = useVisitPrescription();

  // Get paginated list
  const { data, isLoading, error } = getVisitPrescriptions({
    pageNumber: 1,
    pageSize: 10,
    searchValue: '',
  });

  // Create new visit prescription
  const handleCreate = async () => {
    const newPrescription: CreateUpdateVisitPrescriptionDto = {
      visitId: 'visit-id',
      medicineId: 'medicine-id',
      dosage: '500mg',
      frequency: FrequencyType.Daily,
      duration: 7,
      quantity: 30,
      durationUnit: DurationUnit.Day,
      status: PrescriptionStatus.Pending,
      remainingQuantity: 30,
      dispensedQuantity: 0,
    };

    await createOrUpdateVisitPrescription.mutateAsync(newPrescription);
  };

  // Delete visit prescription
  const handleDelete = async (id: string) => {
    await deleteVisitPrescription.mutateAsync(id);
  };
}
```

### Filtering and Search

```typescript
// Filter by visit ID
const { data: visitPrescriptions } = getVisitPrescriptionsByVisitId('visit-id');

// Advanced filtering
const { data: filteredPrescriptions } = getVisitPrescriptions({
  pageNumber: 1,
  pageSize: 20,
  visitId: 'specific-visit-id',
  status: PrescriptionStatus.Pending,
  frequency: FrequencyType.Daily,
  expiryDateFrom: '2024-01-01',
  expiryDateTo: '2024-12-31',
});
```

### Prescription Status Management

```typescript
// Update prescription status
const handleUpdateStatus = async (id: string, status: PrescriptionStatus) => {
  await updatePrescriptionStatus.mutateAsync({ id, status });
};

// Dispense medicine
const handleDispenseMedicine = async (id: string, quantity: number) => {
  await dispenseMedicine.mutateAsync({ id, dispensedQuantity: quantity });
};
```

### Getting Prescribed Medications

```typescript
// Get prescribed medications for a visit
const { data: prescribedMedications } =
  getPrescribedMedicationsByVisitId('visit-id');

// Display the data
prescribedMedications?.forEach((medication) => {
  console.log(`Patient: ${medication.patientName}`);
  console.log(`Medication: ${medication.medication.name}`);
  console.log(`Dosage: ${medication.dosage}`);
  console.log(`Status: ${PrescriptionStatus[medication.status]}`);
});
```

## React Query Features

### Cache Management

The hooks use structured query keys for efficient cache management:

```typescript
const queryKeys = {
  all: ['visitPrescriptions'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filter) => [...queryKeys.lists(), filter] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id) => [...queryKeys.details(), id] as const,
  byVisit: () => [...queryKeys.all, 'byVisit'] as const,
  byVisitId: (visitId) => [...queryKeys.byVisit(), visitId] as const,
  prescribedMedications: () =>
    [...queryKeys.all, 'prescribedMedications'] as const,
  prescribedMedicationsByVisit: (visitId) =>
    [...queryKeys.prescribedMedications(), visitId] as const,
};
```

### Automatic Cache Invalidation

After mutations, relevant queries are automatically invalidated:

```typescript
// After creating/updating a visit prescription
queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
queryClient.invalidateQueries({ queryKey: queryKeys.byVisit() });
queryClient.invalidateQueries({ queryKey: queryKeys.prescribedMedications() });

// After dispensing medicine
queryClient.invalidateQueries({ queryKey: queryKeys.detail(data.id) });
queryClient.invalidateQueries({ queryKey: queryKeys.byVisitId(data.visitId) });
```

### Stale Time Configuration

Different queries have appropriate stale times:

- **List queries**: 5 minutes
- **Detail queries**: No stale time (always fresh)
- **Visit-specific queries**: 5 minutes
- **Prescribed medications**: 5 minutes

## Error Handling

All API calls include comprehensive error handling:

```typescript
// Service level error handling
const response = await visitPrescriptionService.getAll(filter);
if (!response.success) {
  throw new Error(response.message || 'Failed to fetch visit prescriptions');
}

// Hook level error handling with toast notifications
const createOrUpdateVisitPrescription = useMutation({
  mutationFn: async (data) => {
    const response = await visitPrescriptionService.createOrUpdate(data);
    if (!response.success) {
      throw new Error(response.message || 'Failed to save visit prescription');
    }
    return response.result;
  },
  onSuccess: (data, variables) => {
    const isUpdate = !!variables.id;
    toast.success(
      isUpdate
        ? 'Visit prescription updated successfully'
        : 'Visit prescription created successfully'
    );
  },
  onError: (error: Error) => {
    toast.error(error.message);
  },
});
```

## Best Practices

### 1. Type Safety

- Always use the provided TypeScript interfaces
- Use enums for status, frequency, and duration unit values
- Avoid using `any` type

### 2. Performance

- Use pagination for large datasets
- Implement proper loading states
- Use React Query's built-in caching

### 3. User Experience

- Show loading indicators during API calls
- Display success/error messages using toast notifications
- Implement proper form validation for prescription data

### 4. Data Management

- Use the provided query keys for cache management
- Invalidate relevant queries after mutations
- Handle optimistic updates when appropriate

## Common Use Cases

### 1. Visit Management Page

```typescript
// Display all prescriptions for a specific visit
const { data: visitPrescriptions } = getVisitPrescriptionsByVisitId(visitId);

// Add new prescription to visit
const handleAddPrescription = async (medicineId: string) => {
  await createOrUpdateVisitPrescription.mutateAsync({
    visitId,
    medicineId,
    dosage: '500mg',
    frequency: FrequencyType.Daily,
    duration: 7,
    quantity: 30,
    durationUnit: DurationUnit.Day,
    status: PrescriptionStatus.Pending,
    remainingQuantity: 30,
    dispensedQuantity: 0,
  });
};
```

### 2. Pharmacy Dashboard

```typescript
// Show all pending prescriptions
const { data: pendingPrescriptions } = getVisitPrescriptions({
  status: PrescriptionStatus.Pending,
  pageNumber: 1,
  pageSize: 50,
});

// Dispense medicine
const handleDispense = async (prescriptionId: string, quantity: number) => {
  await dispenseMedicine.mutateAsync({
    id: prescriptionId,
    dispensedQuantity: quantity,
  });
};
```

### 3. Patient History

```typescript
// Get all prescribed medications for a patient's visit
const { data: patientMedications } = getPrescribedMedicationsByVisitId(visitId);

// Display medication history
patientMedications?.forEach((medication) => {
  console.log(
    `${medication.medication.name} - ${medication.dosage} - ${medication.frequency}`
  );
});
```

## Testing

### Unit Testing Hooks

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useVisitPrescription } from '@/lib/api/hooks/useVisitPrescription';

describe('useVisitPrescription', () => {
  it('should fetch visit prescriptions successfully', async () => {
    const { result } = renderHook(() => useVisitPrescription());

    await waitFor(() => {
      expect(result.current.getVisitPrescriptions.isSuccess).toBe(true);
    });
  });
});
```

### Mock API Responses

```typescript
const mockVisitPrescriptionResponse = {
  success: true,
  result: {
    id: 'test-id',
    visitId: 'visit-id',
    medicineId: 'medicine-id',
    medicineName: 'Paracetamol',
    dosage: '500mg',
    frequency: 1, // Daily
    status: 1, // Pending
    // ... other fields
  },
};
```

## Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure backend allows frontend domain
   - Check API base URL configuration

2. **Authentication Issues**

   - Verify token storage and refresh logic
   - Check authorization headers

3. **Type Errors**

   - Ensure all types are properly exported
   - Check for circular dependencies

4. **Cache Issues**
   - Clear query cache if needed
   - Check query key structure

### Debug Tips

1. Use React Query DevTools for debugging
2. Check network tab for API requests
3. Verify environment variables
4. Test API endpoints directly

## Conclusion

The VisitPrescription API integration provides a robust, type-safe, and performant solution for managing prescriptions in the Rousheta Frontend application. Follow the patterns and best practices outlined in this guide to ensure consistent and maintainable code.

For additional help, refer to:

- [API Integration Guide](../api-integration-guide.md)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
