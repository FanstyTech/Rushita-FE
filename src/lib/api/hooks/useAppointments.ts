import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/Toast';
import { appointmentService } from '../services/appointment.service';
import {
  AppointmentFilterDto,
  UpdateAppointmentStatusDto,
  CreateUpdateAppointmentDto,
  GetAppointmentForEditDto,
} from '../types/appointment';

export function useAppointments() {
  const queryClient = useQueryClient();

  const useAppointmentsList = (filters: AppointmentFilterDto) =>
    useQuery({
      queryKey: ['appointments', filters],
      queryFn: async () => {
        const response = await appointmentService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!filters.clinicId,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    });

  const useAppointmentForEdit = (id: string) =>
    useQuery<GetAppointmentForEditDto, Error, GetAppointmentForEditDto>({
      queryKey: ['appointment-edit', id],
      queryFn: async () => {
        const response = await appointmentService.getForEdit(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        // Ensure we always return a valid GetAppointmentForEditDto
        if (!response.result) {
          throw new Error('No appointment data found');
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  const createOrUpdateAppointment = useMutation({
    mutationFn: async (data: CreateUpdateAppointmentDto) => {
      const response = await appointmentService.createOrUpdate(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: (data, variables) => {
      const isUpdate = !!variables.id;
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success(
        isUpdate
          ? 'Appointment updated successfully'
          : 'Appointment created successfully'
      );
    },
    retry: false,
  });

  const deleteAppointment = useMutation({
    mutationFn: async (id: string) => {
      const response = await appointmentService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete appointment');
    },
    retry: false,
  });

  const updateAppointmentStatus = useMutation({
    mutationFn: async (data: UpdateAppointmentStatusDto) => {
      const response = await appointmentService.updateStatus(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update appointment status');
    },
  });

  return {
    useAppointmentsList,
    useAppointmentForEdit,
    createOrUpdateAppointment,
    deleteAppointment,
    updateAppointmentStatus,
  };
}
