import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/Toast';
import { clinicService } from '../services/clinic.service';
import type { ClinicFilterDto, CreateUpdateClinicDto } from '../types/clinic';

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

  const createOrUpdateClinic = useMutation({
    mutationFn: (data: CreateUpdateClinicDto & { id?: string }) =>
      clinicService.createOrUpdate(data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
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
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      clinicService.updateStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      toast.success('Clinic status has been updated');
    },
    onError: () => {
      toast.error('Failed to update clinic status');
    },
  });

  return {
    useClinicsList,
    useClinicDetails,
    createOrUpdateClinic,
    deleteClinic,
    updateClinicStatus,
  };
};
