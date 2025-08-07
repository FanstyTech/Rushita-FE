import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { visitService } from '../services/visit.service';
import { toast } from '@/components/ui/Toast';
import type {
  VisitFilterDto,
  VisitStatus,
  CreateOrUpdateVisitDto,
} from '../types/visit';

export const useVisit = () => {
  const queryClient = useQueryClient();

  const useVisitList = (filter: VisitFilterDto) =>
    useQuery({
      retry: false,
      queryKey: ['visits', 'list', filter],
      queryFn: async () => {
        const response = await visitService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch visits');
        }
        return response.result;
      },
      enabled: !!filter.clinicId,
    });

  const useVisitDetails = (id: string) =>
    useQuery({
      retry: false,
      queryKey: ['visits', 'details', id],
      queryFn: async () => {
        const response = await visitService.getById(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch visit');
        }
        return response.result;
      },
      enabled: !!id,
    });

  const useVisitForEdit = (id: string) =>
    useQuery({
      retry: false,
      queryKey: ['visits', 'edit', id],
      queryFn: async () => {
        const response = await visitService.getVisitForEdit(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch visit');
        }
        return response.result;
      },
      enabled: !!id,
    });

  const useVisitStatusHistory = (visitId: string) =>
    useQuery({
      retry: false,
      queryKey: ['visits', 'details', visitId, 'statusHistory'],
      queryFn: async () => {
        const response = await visitService.getStatusHistory(visitId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch status history');
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  const useVisitDiagnoses = (visitId: string) =>
    useQuery({
      retry: false,
      queryKey: ['visits', 'details', visitId, 'diagnoses'],
      queryFn: async () => {
        const response = await visitService.getDiagnoses(visitId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch diagnoses');
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  const useVisitPrescriptions = (visitId: string) =>
    useQuery({
      retry: false,
      queryKey: ['visits', 'details', visitId, 'prescriptions'],
      queryFn: async () => {
        const response = await visitService.getPrescriptions(visitId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch prescriptions');
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  const useVisitLabTests = (visitId: string) =>
    useQuery({
      retry: false,
      queryKey: ['visits', 'details', visitId, 'labTests'],
      queryFn: async () => {
        const response = await visitService.getLabTests(visitId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch lab tests');
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  const useVisitRadiologyTests = (visitId: string) =>
    useQuery({
      retry: false,
      queryKey: ['visits', 'details', visitId, 'radiologyTests'],
      queryFn: async () => {
        const response = await visitService.getRadiologyTests(visitId);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch radiology tests'
          );
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  const useVisitDentalProcedures = (visitId: string) =>
    useQuery({
      retry: false,
      queryKey: ['visits', 'details', visitId, 'dentalProcedures'],
      queryFn: async () => {
        const response = await visitService.getDentalProcedures(visitId);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch dental procedures'
          );
        }
        return response.result;
      },
      enabled: !!visitId,
    });

  const createOrUpdateClinicVisit = useMutation({
    retry: false,
    mutationFn: (data: CreateOrUpdateVisitDto) =>
      visitService.createOrUpdate(data),
    onSuccess: (response, data) => {
      queryClient.invalidateQueries({ queryKey: ['visit'] });
      toast.success(
        `Visit has been successfully ${data.id ? 'updated' : 'created'}`
      );
      return response.result; // Return the visit ID from the API response
    },
  });
  const deleteVisit = useMutation({
    retry: false,
    mutationFn: (id: string) => visitService.delete(id),
    onSuccess: () => {
      toast.success('Visit deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['visits', 'list'] });
    },
  });

  const useUpdateVisitStatus = () =>
    useMutation({
      retry: false,
      mutationFn: async ({
        id,
        status,
        notes,
      }: {
        id: string;
        status: VisitStatus;
        notes?: string;
      }) => {
        const response = await visitService.updateStatus(id, status, notes);
        if (!response.success) {
          throw new Error(response.message || 'Failed to update visit status');
        }
        return response.result;
      },
      onSuccess: (_, variables) => {
        toast.success('Visit status updated successfully');
        queryClient.invalidateQueries({ queryKey: ['visits', 'list'] });
        queryClient.invalidateQueries({
          queryKey: ['visits', 'details', variables.id],
        });
        queryClient.invalidateQueries({
          queryKey: ['visits', 'details', variables.id, 'statusHistory'],
        });
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  return {
    useVisitList,
    useVisitDetails,
    useVisitForEdit,
    useVisitStatusHistory,
    useVisitDiagnoses,
    useVisitPrescriptions,
    useVisitLabTests,
    useVisitRadiologyTests,
    useVisitDentalProcedures,
    createOrUpdateClinicVisit,
    deleteVisit,
    useUpdateVisitStatus,
  };
};
