import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/Toast';
import { clinicService } from '../services/clinic.service';
import type {
  ClinicDto,
  ClinicFilterDto,
  ClinicStatus,
  CreateUpdateClinicDto,
} from '../types/clinic';

export const useClinic = () => {
  const queryClient = useQueryClient();

  const useClinicsList = (filters: ClinicFilterDto) =>
    useQuery({
      queryKey: ['clinics', filters],
      retry: false,
      queryFn: async () => {
        const response = await clinicService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const useClinicDetails = (id: string) =>
    useQuery({
      queryKey: ['clinics', id],
      queryFn: () => clinicService.getOne(id),
      enabled: !!id,
    });

  const useClinicForEdit = (id: string) =>
    useQuery({
      queryKey: ['clinicForEdit', id],
      queryFn: async () => {
        const response = await clinicService.getForEdit(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

    const UpdateUserInf = (clinicDetails: ClinicDto) =>
    useQuery({
      queryKey: ['UpdateUserInf', clinicDetails],
      queryFn: async () => {
        const response = await clinicService.UpdateUserInf(clinicDetails);
        if (response) {
        }
        return response;
      },
      enabled: !!clinicDetails,
    });
  const createOrUpdateClinic = useMutation({
    mutationFn: (data: CreateUpdateClinicDto & { id?: string }) =>
      clinicService.createOrUpdate(data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      queryClient.invalidateQueries({ queryKey: ['clinicForEdit', data.id] });
      toast.success(
        `Clinic has been successfully ${data.id ? 'updated' : 'created'}`
      );
    },
    onError: () => {
      toast.error('Failed to save clinic');
    },
  });

  const deleteClinic = useMutation({
    mutationFn: (id: string) => clinicService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      toast.success('Clinic has been successfully deleted');
    },
    onError: () => {
      toast.error('Failed to delete clinic');
    },
  });

  const updateClinicStatus = useMutation({
    mutationFn: ({
      clinicId,
      status,
      reason,
    }: {
      clinicId: string;
      status: ClinicStatus;
      reason?: string;
    }) => clinicService.updateStatus(clinicId, status, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      toast.success('Clinic status has been successfully updated');
    },
    onError: () => {
      toast.error('Failed to update clinic status');
    },
  });

  return {
    useClinicsList,
    useClinicDetails,
    useClinicForEdit,
    createOrUpdateClinic,
    deleteClinic,
    updateClinicStatus,
    UpdateUserInf
  };
};
