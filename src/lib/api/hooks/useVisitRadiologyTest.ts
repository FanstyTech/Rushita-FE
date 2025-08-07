import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitRadiologyTestService } from '../services/visit-radiology-test.service';
import type {
  VisitRadiologyTestFilterDto,
  CreateUpdateVisitRadiologyTestDto,
  GetVisitsWithRadiologyTestsInput,
  RadiologySummaryStatsInput,
  UpdateVisitRadiologyTestStatusDto,
  UpdateVisitRadiologyTestResultDto,
} from '../types/visit-radiology-test';
import { toast } from '@/components/ui/Toast';

export function useVisitRadiologyTest() {
  const queryClient = useQueryClient();

  // Query keys for cache management
  const queryKeys = {
    all: ['visitRadiologyTests'] as const,
    lists: () => [...queryKeys.all, 'list'] as const,
    list: (filter: VisitRadiologyTestFilterDto) =>
      [...queryKeys.lists(), filter] as const,
    details: () => [...queryKeys.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.details(), id] as const,
    byVisit: () => [...queryKeys.all, 'byVisit'] as const,
    byVisitId: (visitId: string) => [...queryKeys.byVisit(), visitId] as const,
    byRadiologyTest: () => [...queryKeys.all, 'byRadiologyTest'] as const,
    byRadiologyTestId: (radiologyTestId: string) =>
      [...queryKeys.byRadiologyTest(), radiologyTestId] as const,
    visitsWithTests: () => [...queryKeys.all, 'visitsWithTests'] as const,
    visitsWithTestsList: (input: GetVisitsWithRadiologyTestsInput) =>
      [...queryKeys.visitsWithTests(), input] as const,
  };

  // Get paginated list
  const getVisitRadiologyTests = (filter: VisitRadiologyTestFilterDto) =>
    useQuery({
      queryKey: queryKeys.list(filter),
      queryFn: async () => {
        const response = await visitRadiologyTestService.getAll(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visit radiology tests'
          );
        }
        return response.result;
      },
    });

  // Get single visit radiology test
  const getVisitRadiologyTest = (id: string) =>
    useQuery({
      queryKey: queryKeys.detail(id),
      queryFn: async () => {
        const response = await visitRadiologyTestService.getById(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch visit radiology test');
        }
        return response.result;
      },
      enabled: !!id,
    });

  // Get visit radiology tests by visit ID
  const getVisitRadiologyTestsByVisitId = (visitId: string) =>
    useQuery({
      queryKey: queryKeys.byVisitId(visitId),
      queryFn: async () => {
        const response = await visitRadiologyTestService.getByVisitId(visitId);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visit radiology tests for visit'
          );
        }
        return response.result;
      },
      enabled: !!visitId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

  // Get visit radiology tests by radiology test ID
  const getVisitRadiologyTestsByRadiologyTestId = (radiologyTestId: string) =>
    useQuery({
      queryKey: queryKeys.byRadiologyTestId(radiologyTestId),
      queryFn: async () => {
        const response = await visitRadiologyTestService.getByRadiologyTestId(radiologyTestId);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visit radiology tests for radiology test'
          );
        }
        return response.result;
      },
      enabled: !!radiologyTestId,
    });

  // Get visits with radiology tests
  const getVisitsWithRadiologyTests = (input: GetVisitsWithRadiologyTestsInput) =>
    useQuery({
      queryKey: queryKeys.visitsWithTestsList(input),
      queryFn: async () => {
        const response = await visitRadiologyTestService.getVisitsWithRadiologyTests(input);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visits with radiology tests'
          );
        }
        return response.result;
      },
    });

  // Get radiology test summary statistics
  const getRadiologyTestSummary = (input: RadiologySummaryStatsInput) =>
    useQuery({
      queryKey: [...queryKeys.visitsWithTests(), 'summary', input],
      queryFn: async () => {
        const response = await visitRadiologyTestService.getRadiologyTestSummary(input);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch radiology test summary'
          );
        }
        return response.result;
      },
    });

  // Create/Update mutation
  const createOrUpdateVisitRadiologyTest = useMutation({
    mutationFn: async (data: CreateUpdateVisitRadiologyTestDto) => {
      const response = await visitRadiologyTestService.createOrUpdate(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to save visit radiology test');
      }
      return response.result;
    },
    onSuccess: (_, variables) => {
      const isUpdate = !!variables.id;
      toast.success(
        isUpdate
          ? 'Visit radiology test updated successfully'
          : 'Visit radiology test created successfully'
      );

      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.detail(variables.id),
        });
      }
      if (variables.visitId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.byVisitId(variables.visitId),
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.visitsWithTests() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update status mutation
  const updateStatus = useMutation({
    mutationFn: async (data: UpdateVisitRadiologyTestStatusDto) => {
      const response = await visitRadiologyTestService.updateStatus(data);
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to update visit radiology test status'
        );
      }
      return response.result;
    },
    onSuccess: (_) => {
      toast.success('Visit radiology test status updated successfully');

      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.visitsWithTests() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update result mutation
  const updateResult = useMutation({
    mutationFn: async (data: UpdateVisitRadiologyTestResultDto) => {
      const response = await visitRadiologyTestService.updateResult(data);
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to update visit radiology test result'
        );
      }
      return response.result;
    },
    onSuccess: (_) => {
      toast.success('Visit radiology test result updated successfully');

      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.visitsWithTests() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete mutation
  const deleteVisitRadiologyTest = useMutation({
    mutationFn: async (id: string) => {
      const response = await visitRadiologyTestService.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete visit radiology test');
      }
    },
    onSuccess: (_, id) => {
      toast.success('Visit radiology test deleted successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.byVisit() });
      queryClient.invalidateQueries({ queryKey: queryKeys.visitsWithTests() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    // Queries
    getVisitRadiologyTests,
    getVisitRadiologyTest,
    getVisitRadiologyTestsByVisitId,
    getVisitRadiologyTestsByRadiologyTestId,
    getVisitsWithRadiologyTests,
    getRadiologyTestSummary,

    // Mutations
    createOrUpdateVisitRadiologyTest,
    deleteVisitRadiologyTest,
    updateStatus,
    updateResult,
    // Query keys (for manual cache management)
    queryKeys,
  };
} 