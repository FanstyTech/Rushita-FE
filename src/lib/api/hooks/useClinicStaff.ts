import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clinicStaffService } from '../services/clinic-staff.service';
import {
  ChangeStaffPasswordDto,
  ClinicStaffFilterDto,
  CreateUpdateClinicStaffDto,
  GetClinicStaffForDropdownInput,
  UpdateClinicStaffStatusDto,
} from '../types/clinic-staff';
import { toast } from 'sonner';

export const useClinicStaff = () => {
  const queryClient = useQueryClient();

  const useClinicStaffList = (filters: ClinicStaffFilterDto) =>
    useQuery({
      retry: false,
      queryKey: ['clinicStaff', 'list', filters],
      queryFn: async () => {
        const response = await clinicStaffService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!filters.clinicId,
    });

  const useClinicStaffDetails = (id: string) =>
    useQuery({
      retry: false,
      queryKey: ['clinicStaff', 'details', id],
      queryFn: async () => {
        const response = await clinicStaffService.getDoctordetails(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

      const useDoctorDetails = (id: string) =>
    useQuery({
      retry: false,
      queryKey: ['clinicStaff', 'details', id],
      queryFn: async () => {
        const response = await clinicStaffService.getOne(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });
  const useClinicStaffForDropdown = (filter: GetClinicStaffForDropdownInput, options?: { enabled?: boolean }) =>
    useQuery({
      queryKey: ['clinic-staff', 'dropdown', filter],
      queryFn: async () => {
        const response = await clinicStaffService.getClinicStaffForDropdown(
          filter
        );
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: options?.enabled !== undefined ? options.enabled : !!filter.clinicId,
    });
  const useClinicStaffForEdit = (id: string) =>
    useQuery({
      retry: false,
      queryKey: ['clinic-staff', 'edit', id],
      queryFn: async () => {
        const response = await clinicStaffService.getForEdit(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

  const useChangeStaffPassword = () =>
    useMutation({
      retry: false,
      mutationFn: (data: ChangeStaffPasswordDto) =>
        clinicStaffService.changeStaffPassword(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['clinicStaff'] });
        toast.success('Staff password has been changed');
      },
    });
  const createOrUpdateClinicStaff = useMutation({
    retry: false,
    mutationFn: (data: CreateUpdateClinicStaffDto) =>
      clinicStaffService.createOrUpdate(data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['clinicStaff'] });
      toast.success(
        `Staff member has been successfully ${data.id ? 'updated' : 'created'}`
      );
    },
  });

  const deleteClinicStaff = useMutation({
    retry: false,
    mutationFn: (id: string) => clinicStaffService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinicStaff'] });
      toast.success('Staff member has been successfully deleted');
    },
  });

  const updateClinicStaffStatus = useMutation({
    retry: false,
    mutationFn: (data: UpdateClinicStaffStatusDto) =>
      clinicStaffService.updateStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinicStaff'] });
      toast.success('Staff member status has been updated');
    },
    onError: () => {
      toast.error('Failed to update staff member status');
    },
  });

  return {
    useClinicStaffList,
    useClinicStaffDetails,
    useClinicStaffForEdit,
    useChangeStaffPassword,
    useClinicStaffForDropdown,
    createOrUpdateClinicStaff,
    deleteClinicStaff,
    updateClinicStaffStatus,
    useDoctorDetails
  };
};
