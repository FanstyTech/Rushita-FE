import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitLabTestService } from '../services/visit-lab-test.service';
import type {
  VisitLabTestFilterDto,
  CreateUpdateVisitLabTestDto,
  GetVisitsWithLabTestsInput,
  LabSummaryStatsInput,
  UpdateVisitLabTestStatusDto,
  UpdateVisitLabTestResultDto,
  PatientLabTestFilterDto,
  PatientPortalLabTestDto,
} from '../types/visit-lab-test';
import { toast } from '@/components/ui/Toast';

export function useVisitLabTest() {
  const queryClient = useQueryClient();

  // Query keys for cache management
  const queryKeys = {
    all: ['visitLabTests'] as const,
    lists: () => [...queryKeys.all, 'list'] as const,
    list: (filter: VisitLabTestFilterDto) =>
      [...queryKeys.lists(), filter] as const,
    details: () => [...queryKeys.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.details(), id] as const,
    byVisit: () => [...queryKeys.all, 'byVisit'] as const,
    byVisitId: (visitId: string) => [...queryKeys.byVisit(), visitId] as const,
    byLabTest: () => [...queryKeys.all, 'byLabTest'] as const,
    byLabTestId: (labTestId: string) =>
      [...queryKeys.byLabTest(), labTestId] as const,
    visitsWithTests: () => [...queryKeys.all, 'visitsWithTests'] as const,
    visitsWithTestsList: (input: GetVisitsWithLabTestsInput) =>
      [...queryKeys.visitsWithTests(), input] as const,
  };

  // Patient Portal specific query keys
  const patientQueryKeys = {
    patient: () => [...queryKeys.all, 'patient'] as const,
    patientList: (filter: PatientLabTestFilterDto) =>
      [...patientQueryKeys.patient(), 'list', filter] as const,
    patientDetail: (id: string) =>
      [...patientQueryKeys.patient(), 'detail', id] as const,
  };

  // Get paginated list
  const getVisitLabTests = (filter: VisitLabTestFilterDto) =>
    useQuery({
      queryKey: queryKeys.list(filter),
      queryFn: async () => {
        const response = await visitLabTestService.getAll(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visit lab tests'
          );
        }
        return response.result;
      },
    });

  // Get single visit lab test
  const getVisitLabTest = (id: string) =>
    useQuery({
      queryKey: queryKeys.detail(id),
      queryFn: async () => {
        const response = await visitLabTestService.getById(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch visit lab test');
        }
        return response.result;
      },
      enabled: !!id,
    });

  // Get visit lab tests by visit ID
  const getVisitLabTestsByVisitId = (visitId: string) =>
    useQuery({
      queryKey: queryKeys.byVisitId(visitId),
      queryFn: async () => {
        const response = await visitLabTestService.getByVisitId(visitId);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visit lab tests for visit'
          );
        }
        return response.result;
      },
      enabled: !!visitId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

  // Get visit lab tests by lab test ID
  const getVisitLabTestsByLabTestId = (labTestId: string) =>
    useQuery({
      queryKey: queryKeys.byLabTestId(labTestId),
      queryFn: async () => {
        const response = await visitLabTestService.getByLabTestId(labTestId);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visit lab tests for lab test'
          );
        }
        return response.result;
      },
      enabled: !!labTestId,
    });

  // Get visits with lab tests
  const getVisitsWithLabTests = (input: GetVisitsWithLabTestsInput) =>
    useQuery({
      queryKey: queryKeys.visitsWithTestsList(input),
      queryFn: async () => {
        const response = await visitLabTestService.getVisitsWithLabTests(input);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visits with lab tests'
          );
        }
        return response.result;
      },
    });

  // Get lab test summary statistics
  const getLabTestSummary = (input: LabSummaryStatsInput) =>
    useQuery({
      queryKey: [...queryKeys.visitsWithTests(), 'summary', input],
      queryFn: async () => {
        const response = await visitLabTestService.getLabTestSummary(input);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch lab test summary'
          );
        }
        return response.result;
      },
    });

  // Create/Update mutation
  const createOrUpdateVisitLabTest = useMutation({
    mutationFn: async (data: CreateUpdateVisitLabTestDto) => {
      const response = await visitLabTestService.createOrUpdate(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to save visit lab test');
      }
      return response.result;
    },
    onSuccess: (_, variables) => {
      const isUpdate = !!variables.id;
      toast.success(
        isUpdate
          ? 'Visit lab test updated successfully'
          : 'Visit lab test created successfully'
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
    mutationFn: async (data: UpdateVisitLabTestStatusDto) => {
      const response = await visitLabTestService.updateStatus(data);
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to update visit lab test status'
        );
      }
      return response.result;
    },
    onSuccess: (_) => {
      toast.success('Visit lab test status updated successfully');

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
    mutationFn: async (data: UpdateVisitLabTestResultDto) => {
      const response = await visitLabTestService.updateResult(data);
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to update visit lab test status'
        );
      }
      return response.result;
    },
    onSuccess: (_) => {
      toast.success('Visit lab test status updated successfully');

      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.visitsWithTests() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  // Delete mutation
  const deleteVisitLabTest = useMutation({
    mutationFn: async (id: string) => {
      const response = await visitLabTestService.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete visit lab test');
      }
    },
    onSuccess: (_, id) => {
      toast.success('Visit lab test deleted successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.byVisit() });
      queryClient.invalidateQueries({ queryKey: queryKeys.visitsWithTests() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Get patient lab tests for patient portal
  const getPatientLabTests = (filter: PatientLabTestFilterDto) =>
    useQuery({
      queryKey: patientQueryKeys.patientList(filter),
      queryFn: async () => {
        const response = await visitLabTestService.getPatientLabTests(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch patient lab tests'
          );
        }
        return response.result;
      },
    });

  // Get patient lab test details
  const getPatientLabTestDetails = (id: string) =>
    useQuery({
      queryKey: patientQueryKeys.patientDetail(id),
      queryFn: async () => {
        const response = await visitLabTestService.getPatientLabTestDetails(id);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch patient lab test details'
          );
        }
        return response.result;
      },
      enabled: !!id,
    });

  return {
    // Queries
    getVisitLabTests,
    getVisitLabTest,
    getVisitLabTestsByVisitId,
    getVisitLabTestsByLabTestId,
    getVisitsWithLabTests,
    getLabTestSummary,

    // Mutations
    createOrUpdateVisitLabTest,
    deleteVisitLabTest,
    updateStatus,
    updateResult,
    // Query keys (for manual cache management)
    queryKeys,

    // Patient Portal specific methods
    getPatientLabTests,
    getPatientLabTestDetails,
  };
}
