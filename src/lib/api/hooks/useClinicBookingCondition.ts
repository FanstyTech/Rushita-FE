import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clinicBookingConditionService } from '../services/clinic-booking-condition.service';
import type {
  ClinicBookingConditionFilterDto,
  CreateUpdateClinicBookingConditionDto,
  UpdateClinicBookingConditionStatusDto,
  ClinicBookingConditionDropdownFilterDto, // إضافة النوع الجديد
} from '../types/clinic-booking-condition';
import { toast } from '@/components/ui/Toast';

export function useClinicBookingCondition() {
  const queryClient = useQueryClient();

  // Query keys for cache management
  const queryKeys = {
    all: ['clinicBookingConditions'] as const,
    lists: () => [...queryKeys.all, 'list'] as const,
    list: (filter: ClinicBookingConditionFilterDto) =>
      [...queryKeys.lists(), filter] as const,
    details: () => [...queryKeys.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.details(), id] as const,
    dropdown: (filter?: ClinicBookingConditionDropdownFilterDto) =>
      [...queryKeys.all, 'dropdown', filter] as const,
    byClinic: (clinicId: string) =>
      [...queryKeys.all, 'byClinic', clinicId] as const,
  };

  // Get paginated list
  const useClinicBookingConditionsList = (
    filter: ClinicBookingConditionFilterDto
  ) =>
    useQuery({
      queryKey: queryKeys.list(filter),
      queryFn: async () => {
        const response = await clinicBookingConditionService.getAll(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch booking conditions'
          );
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    });

  // Get single condition
  const useClinicBookingConditionDetails = (id: string) =>
    useQuery({
      queryKey: queryKeys.detail(id),
      queryFn: async () => {
        const response = await clinicBookingConditionService.getById(id);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch booking condition'
          );
        }
        return response.result;
      },
      enabled: !!id,
    });

  // Get conditions by clinic ID
  const useClinicBookingConditionsByClinic = (clinicId: string) =>
    useQuery({
      queryKey: queryKeys.byClinic(clinicId),
      queryFn: async () => {
        const response = await clinicBookingConditionService.getByClinicId(
          clinicId
        );
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch clinic booking conditions'
          );
        }
        return response.result;
      },
      enabled: !!clinicId,
      staleTime: 10 * 60 * 1000, // 10 minutes
    });

  // Get condition for edit
  const useClinicBookingConditionForEdit = (id: string) =>
    useQuery({
      queryKey: [...queryKeys.detail(id), 'edit'],
      queryFn: async () => {
        const response = await clinicBookingConditionService.getForEdit(id);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch booking condition for edit'
          );
        }
        return response.result;
      },
      enabled: !!id,
    });

  // Get dropdown options with filter
  const useClinicBookingConditionsDropdown = (
    filter?: ClinicBookingConditionDropdownFilterDto
  ) =>
    useQuery({
      queryKey: queryKeys.dropdown(filter),
      queryFn: async () => {
        const response = await clinicBookingConditionService.getForDropdown(
          filter
        );
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch dropdown data');
        }
        return response.result;
      },
      enabled: !!filter?.clinicId,
    });

  // Create/Update mutation
  const createOrUpdateClinicBookingCondition = useMutation({
    mutationFn: async (data: CreateUpdateClinicBookingConditionDto) => {
      const response = await clinicBookingConditionService.createOrUpdate(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to save booking condition');
      }
      return response.result;
    },
    onSuccess: (data, variables) => {
      const isUpdate = !!variables.id;
      toast.success(
        isUpdate
          ? 'Booking condition updated successfully'
          : 'Booking condition created successfully'
      );

      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      if (variables.clinicId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.byClinic(variables.clinicId),
        });
      }
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.detail(variables.id),
        });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete mutation
  const deleteClinicBookingCondition = useMutation({
    mutationFn: async (id: string) => {
      const response = await clinicBookingConditionService.delete(id);
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to delete booking condition'
        );
      }
    },
    onSuccess: () => {
      toast.success('Booking condition deleted successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update status mutation
  const updateClinicBookingConditionStatus = useMutation({
    mutationFn: async (data: UpdateClinicBookingConditionStatusDto) => {
      const response = await clinicBookingConditionService.updateStatus(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to update status');
      }
    },
    onSuccess: () => {
      toast.success('Status updated successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    // Queries
    useClinicBookingConditionsList,
    useClinicBookingConditionDetails,
    useClinicBookingConditionsByClinic,
    useClinicBookingConditionForEdit,
    useClinicBookingConditionsDropdown,

    // Mutations
    createOrUpdateClinicBookingCondition,
    deleteClinicBookingCondition,
    updateClinicBookingConditionStatus,

    // Query keys (for manual cache management)
    queryKeys,
  };
}
