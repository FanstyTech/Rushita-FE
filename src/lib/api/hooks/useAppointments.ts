import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/Toast';
import { appointmentService } from '../services/appointment.service';
import {
  AppointmentFilterDto,
  UpdateAppointmentStatusDto,
  CreateUpdateAppointmentDto,
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
    });

  const useAppointmentForEdit = (id: string) =>
    useQuery({
      queryKey: ['appointment-edit', id],
      queryFn: async () => {
        const response = await appointmentService.getForEdit(id);
        if (!response.success) {
          throw new Error(response.message);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment saved successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save appointment');
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
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete appointment');
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
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update appointment status');
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
