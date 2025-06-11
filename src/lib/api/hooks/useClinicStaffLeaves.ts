import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clinicStaffLeaveService } from '../services/clinic-staff-leave.service';
import { toast } from 'react-hot-toast';
import {
  ClinicStaffLeaveFilterDto,
  CreateUpdateClinicStaffLeaveDto,
} from '../types/clinic-staff-leave';

export function useClinicStaffLeaves() {
  const queryClient = useQueryClient();

  const useLeavesList = (filters: ClinicStaffLeaveFilterDto) =>
    useQuery({
      queryKey: ['clinic-staff-leaves', filters],
      queryFn: async () => {
        const response = await clinicStaffLeaveService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!filters.clinicId,
    });

  const useLeaveDetails = (id: string) =>
    useQuery({
      queryKey: ['clinic-staff-leave', id],
      queryFn: async () => {
        const response = await clinicStaffLeaveService.getById(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

  const useLeaveForEdit = (id: string) =>
    useQuery({
      queryKey: ['clinic-staff-leave-edit', id],
      queryFn: async () => {
        const response = await clinicStaffLeaveService.getForEdit(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  const createOrUpdateLeave = useMutation({
    mutationFn: async (data: CreateUpdateClinicStaffLeaveDto) => {
      const response = await clinicStaffLeaveService.createOrUpdate(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-staff-leaves'] });
      toast.success('Leave request saved successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save leave request');
    },
    retry: false,
  });
  const useClinicStaffForEdit = (id: string) =>
    useQuery({
      retry: false,
      queryKey: ['clinic-staff', 'edit', id],
      queryFn: async () => {
        const response = await clinicStaffLeaveService.getForEdit(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });
  const deleteLeave = useMutation({
    mutationFn: async (id: string) => {
      const response = await clinicStaffLeaveService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-staff-leaves'] });
      toast.success('Leave request deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete leave request');
    },
  });

  const updateLeaveStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: number }) => {
      const response = await clinicStaffLeaveService.updateStatus({
        id,
        status,
      });
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-staff-leaves'] });
      toast.success('Leave status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update leave status');
    },
  });

  return {
    useLeavesList,
    useLeaveDetails,
    useLeaveForEdit,
    createOrUpdateLeave,
    deleteLeave,
    updateLeaveStatus,
  };
}
