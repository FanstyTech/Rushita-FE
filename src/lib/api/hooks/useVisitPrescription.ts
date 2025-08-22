import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitPrescriptionService } from '../services/visit-prescription.service';
import type {
  VisitPrescriptionFilterDto,
  CreateUpdateVisitPrescriptionDto,
  UpdatePrescriptionStatusDto,
  DispenseMedicineDto,
} from '../types/visit-prescription';
import { toast } from '@/components/ui/Toast';

export function useVisitPrescription() {
  const queryClient = useQueryClient();

  // Query keys for cache management
  const queryKeys = {
    all: ['visitPrescriptions'] as const,
    lists: () => [...queryKeys.all, 'list'] as const,
    list: (filter: VisitPrescriptionFilterDto) =>
      [...queryKeys.lists(), filter] as const,
    details: () => [...queryKeys.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.details(), id] as const,
    byVisit: () => [...queryKeys.all, 'byVisit'] as const,
    byVisitId: (visitId: string) => [...queryKeys.byVisit(), visitId] as const,
    prescribedMedications: () =>
      [...queryKeys.all, 'prescribedMedications'] as const,
    prescribedMedicationsByVisit: (visitId: string) =>
      [...queryKeys.prescribedMedications(), visitId] as const,
  };

  // Get paginated list
  const getVisitPrescriptions = (filter: VisitPrescriptionFilterDto) =>
    useQuery({
      queryKey: queryKeys.list(filter),
      queryFn: async () => {
        const response = await visitPrescriptionService.getAll(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visit prescriptions'
          );
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get single visit prescription
  const getVisitPrescription = (id: string) =>
    useQuery({
      queryKey: queryKeys.detail(id),
      queryFn: async () => {
        const response = await visitPrescriptionService.getById(id);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visit prescription'
          );
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  // Get visit prescriptions by visit ID
  const getVisitPrescriptionsByVisitId = (visitId: string) =>
    useQuery({
      queryKey: queryKeys.byVisitId(visitId),
      queryFn: async () => {
        const response = await visitPrescriptionService.getByVisitId(visitId);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch visit prescriptions for visit'
          );
        }
        return response.result;
      },
      retry: false,
      enabled: !!visitId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

  // Get prescribed medications by visit ID
  const getPrescribedMedicationsByVisitId = (visitId: string) =>
    useQuery({
      queryKey: queryKeys.prescribedMedicationsByVisit(visitId),
      queryFn: async () => {
        const response =
          await visitPrescriptionService.getPrescribedMedicationsByVisitId(
            visitId
          );
        if (!response.success) {
          throw new Error(
            response.message ||
              'Failed to fetch prescribed medications for visit'
          );
        }
        return response.result;
      },
      retry: false,
      enabled: !!visitId,
    });

  // Create/Update mutation
  const createOrUpdateVisitPrescription = useMutation({
    mutationFn: async (data: CreateUpdateVisitPrescriptionDto) => {
      const response = await visitPrescriptionService.createOrUpdate(data);
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to save visit prescription'
        );
      }
      return response.result;
    },
    onSuccess: (_, variables) => {
      const isUpdate = !!variables.id;
      toast.success(
        isUpdate
          ? 'Visit prescription updated successfully'
          : 'Visit prescription created successfully'
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
        queryClient.invalidateQueries({
          queryKey: queryKeys.prescribedMedicationsByVisit(variables.visitId),
        });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Delete mutation
  const deleteVisitPrescription = useMutation({
    mutationFn: async (id: string) => {
      const response = await visitPrescriptionService.delete(id);
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to delete visit prescription'
        );
      }
    },
    onSuccess: (_, id) => {
      toast.success('Visit prescription deleted successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.byVisit() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.prescribedMedications(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Dispense medicine mutation
  const dispenseMedicine = useMutation({
    mutationFn: async (data: DispenseMedicineDto) => {
      const response = await visitPrescriptionService.dispenseMedicine(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to dispense medicine');
      }
      return response.result;
    },
    onSuccess: (data) => {
      console.log('Medicine dispensed:', data);
      // Invalidate and refetch relevant queries
      toast.success('Medicine dispensed successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.detail(data?.id || ''),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.byVisitId(data?.visitId || ''),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.prescribedMedicationsByVisit(data?.visitId || ''),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Query keys for patient portal
  const patientPortalQueryKeys = {
    patientPortal: () => [...queryKeys.all, 'patientPortal'] as const,
    patientPortalList: (filter: VisitPrescriptionFilterDto) =>
      [...patientPortalQueryKeys.patientPortal(), 'list', filter] as const,
  };

  // Get patient portal prescriptions
  const getPatientPortalPrescriptions = (filter: VisitPrescriptionFilterDto) =>
    useQuery({
      queryKey: patientPortalQueryKeys.patientPortalList(filter),
      queryFn: async () => {
        const response = await visitPrescriptionService.getPatientPortalPrescriptions(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch patient portal prescriptions'
          );
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  return {
    // Queries
    getVisitPrescriptions,
    getVisitPrescription,
    getVisitPrescriptionsByVisitId,
    getPrescribedMedicationsByVisitId,
    getPatientPortalPrescriptions,

    // Mutations
    createOrUpdateVisitPrescription,
    deleteVisitPrescription,
    dispenseMedicine,

    // Query keys (for manual cache management)
    queryKeys: {
      ...queryKeys,
      patientPortal: patientPortalQueryKeys,
    },
  };
}
