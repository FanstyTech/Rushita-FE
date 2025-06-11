import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clinicPatientService } from '../services/clinic-patient.service';
import { toast } from '@/components/ui/Toast';
import {
  CreateUpdateClinicPatientDto,
  PatientStatus,
  ClinicPatientFilterDto,
  PatientProfileDto,
} from '../types/clinic-patient';

export function useClinicPatients() {
  const queryClient = useQueryClient();

  const usePatientsList = (filters: ClinicPatientFilterDto) =>
    useQuery({
      queryKey: ['clinic-patients', filters],
      queryFn: async () => {
        const response = await clinicPatientService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!filters.clinicId,
      retry: false,
    });

  const usePatientProfile = (id?: string) => {
    return useQuery({
      queryKey: ['clinic-patient-profile', id],
      queryFn: async () => {
        const response = await clinicPatientService.getProfile(id!);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });
  };
  const usePatientForEdit = (id: string) =>
    useQuery({
      queryKey: ['clinic-patient-edit', id],
      queryFn: async () => {
        const response = await clinicPatientService.getForEdit(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  const createOrUpdatePatient = useMutation({
    mutationFn: async (data: CreateUpdateClinicPatientDto) => {
      const response = await clinicPatientService.createOrUpdate(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-patients'] });
      toast.success('Patient saved successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save patient');
    },
    retry: false,
  });

  const deletePatient = useMutation({
    mutationFn: async (id: string) => {
      const response = await clinicPatientService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-patients'] });
      toast.success('Patient deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete patient');
    },
    retry: false,
  });

  const updatePatientStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: PatientStatus;
    }) => {
      const response = await clinicPatientService.updateStatus(id, status);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-patients'] });
      toast.success('Patient status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update patient status');
    },
  });

  return {
    usePatientsList,
    usePatientForEdit,
    usePatientProfile,
    createOrUpdatePatient,
    deletePatient,
    updatePatientStatus,
  };
}
