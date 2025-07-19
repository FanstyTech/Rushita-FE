import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clinicPatientService } from '../services/clinic-patient.service';
import { toast } from '@/components/ui/Toast';
import {
  CreateUpdateClinicPatientDto,
  PatientStatus,
  ClinicPatientFilterDto,
  CreateOrUpdateMedicalConditionDto,
  CreateOrUpdateAllergyDto,
  CreateOrUpdateFamilyHistoryDto,
  GetPatientDropdownInput,
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

  const usePatientForView = (id: string) =>
    useQuery({
      queryKey: ['clinic-patient-view', id],
      queryFn: async () => {
        const response = await clinicPatientService.getForView(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  const usePatientDropdown = (
    filters: GetPatientDropdownInput,
    options?: { enabled?: boolean }
  ) =>
    useQuery({
      queryKey: ['clinic-patients-dropdown', filters],
      queryFn: async () => {
        const response = await clinicPatientService.getPatientDropdown(filters);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: options?.enabled !== undefined ? options.enabled : true,
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
    onError: () => {
      toast.error('Failed to save patient');
    },
    retry: false,
  });

  const createOrUpdateCondition = useMutation({
    mutationFn: async (data: CreateOrUpdateMedicalConditionDto) => {
      const response = await clinicPatientService.createOrUpdateCondition(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({
        queryKey: ['clinic-patient-profile', data.patientId],
      });
      toast.success('Condition saved successfully');
    },
    onError: () => {
      toast.error('Failed to save condition');
    },
    retry: false,
  });

  const createOrUpdateAllergy = useMutation({
    mutationFn: async (data: CreateOrUpdateAllergyDto) => {
      const response = await clinicPatientService.createOrUpdateAllergy(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({
        queryKey: ['clinic-patient-profile', data.patientId],
      });
      toast.success('Allergy saved successfully');
    },
    onError: () => {
      toast.error('Failed to save allergy');
    },
    retry: false,
  });

  const createOrUpdateFamilyHistory = useMutation({
    mutationFn: async (data: CreateOrUpdateFamilyHistoryDto) => {
      const response = await clinicPatientService.createOrUpdateFamilyHistory(
        data
      );
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({
        queryKey: ['clinic-patient-profile', data.patientId],
      });
      toast.success('Family history saved successfully');
    },
    onError: () => {
      toast.error('Failed to save family history');
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
    onError: () => {
      toast.error('Failed to delete patient');
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
    onError: () => {
      toast.error('Failed to update patient status');
    },
  });

  return {
    usePatientsList,
    usePatientForEdit,
    usePatientForView,
    usePatientProfile,
    usePatientDropdown,
    createOrUpdatePatient,
    createOrUpdateCondition,
    createOrUpdateAllergy,
    createOrUpdateFamilyHistory,
    deletePatient,
    updatePatientStatus,
  };
}
