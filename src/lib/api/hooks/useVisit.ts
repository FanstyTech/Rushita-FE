import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitService } from '../services/visit.service';
import type {
  VisitFilterDto,
  CreateVisitDto,
  UpdateVisitDto,
  VisitStatus,
} from '../types/treatment';
import { toast } from '@/components/ui/Toast';

export function useVisit() {
  const queryClient = useQueryClient();

  // Query keys for cache management
  const queryKeys = {
    all: ['visits'] as const,
    lists: () => [...queryKeys.all, 'list'] as const,
    list: (filter: VisitFilterDto) => [...queryKeys.lists(), filter] as const,
    details: () => [...queryKeys.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.details(), id] as const,
    statusHistory: (id: string) => [...queryKeys.detail(id), 'statusHistory'] as const,
    diagnoses: (id: string) => [...queryKeys.detail(id), 'diagnoses'] as const,
    prescriptions: (id: string) => [...queryKeys.detail(id), 'prescriptions'] as const,
    labTests: (id: string) => [...queryKeys.detail(id), 'labTests'] as const,
    radiologyTests: (id: string) => [...queryKeys.detail(id), 'radiologyTests'] as const,
    dentalProcedures: (id: string) => [...queryKeys.detail(id), 'dentalProcedures'] as const,
  };

  // Get paginated list
  const getVisits = (filter: VisitFilterDto) =>
    useQuery({
      queryKey: queryKeys.list(filter),
      queryFn: async () => {
        const response = await visitService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch visits');
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
    });

  // Get single visit
  const getVisit = (id: string) =>
    useQuery({
      queryKey: queryKeys.detail(id),
      queryFn: async () => {
        const response = await visitService.getById(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch visit');
        }
        return response.result;
      },
      enabled: !!id,
    });

  // Get visit status history
  const getVisitStatusHistory = (visitId: string) =>
    useQuery({
      queryKey: queryKeys.statusHistory(visitId),
      queryFn: async () => {
        const response = await visitService.getStatusHistory(visitId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch status history');
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  // Get visit diagnoses
  const getVisitDiagnoses = (visitId: string) =>
    useQuery({
      queryKey: queryKeys.diagnoses(visitId),
      queryFn: async () => {
        const response = await visitService.getDiagnoses(visitId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch diagnoses');
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  // Get visit prescriptions
  const getVisitPrescriptions = (visitId: string) =>
    useQuery({
      queryKey: queryKeys.prescriptions(visitId),
      queryFn: async () => {
        const response = await visitService.getPrescriptions(visitId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch prescriptions');
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  // Get visit lab tests
  const getVisitLabTests = (visitId: string) =>
    useQuery({
      queryKey: queryKeys.labTests(visitId),
      queryFn: async () => {
        const response = await visitService.getLabTests(visitId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch lab tests');
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  // Get visit radiology tests
  const getVisitRadiologyTests = (visitId: string) =>
    useQuery({
      queryKey: queryKeys.radiologyTests(visitId),
      queryFn: async () => {
        const response = await visitService.getRadiologyTests(visitId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch radiology tests');
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  // Get visit dental procedures
  const getVisitDentalProcedures = (visitId: string) =>
    useQuery({
      queryKey: queryKeys.dentalProcedures(visitId),
      queryFn: async () => {
        const response = await visitService.getDentalProcedures(visitId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch dental procedures');
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  // Create visit mutation
  const createVisit = useMutation({
    mutationFn: async (data: CreateVisitDto) => {
      const response = await visitService.create(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to create visit');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Visit created successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update visit mutation
  const updateVisit = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateVisitDto }) => {
      const response = await visitService.update(id, data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to update visit');
      }
      return response.result;
    },
    onSuccess: (_, variables) => {
      toast.success('Visit updated successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(variables.id) });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete visit mutation
  const deleteVisit = useMutation({
    mutationFn: async (id: string) => {
      const response = await visitService.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete visit');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Visit deleted successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update visit status mutation
  const updateVisitStatus = useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: VisitStatus; notes?: string }) => {
      const response = await visitService.updateStatus(id, status, notes);
      if (!response.success) {
        throw new Error(response.message || 'Failed to update visit status');
      }
      return response.result;
    },
    onSuccess: (_, variables) => {
      toast.success('Visit status updated successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.statusHistory(variables.id) });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    // Queries
    getVisits,
    getVisit,
    getVisitStatusHistory,
    getVisitDiagnoses,
    getVisitPrescriptions,
    getVisitLabTests,
    getVisitRadiologyTests,
    getVisitDentalProcedures,
    
    // Mutations
    createVisit,
    updateVisit,
    deleteVisit,
    updateVisitStatus,
    
    // Query keys (for manual cache management)
    queryKeys,
  };
}
