import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clinicTypeService } from '../services/clinic-type.service';
import type {
  ClinicTypeFilterDto,
  CreateUpdateClinicTypeDto,
} from '../types/clinic-type';
import { toast } from 'sonner';

export function useClinicType() {
  const queryClient = useQueryClient();

  const getClinicTypes = (filter: ClinicTypeFilterDto) =>
    useQuery({
      queryKey: ['clinic-types', filter],
      queryFn: async () => {
        const response = await clinicTypeService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const getClinicTypesForDropdown = () =>
    useQuery({
      queryKey: ['clinic-types-dropdown'],
      queryFn: async () => {
        const response = await clinicTypeService.getClinicTypesForDropdown();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const createClinicType = useMutation({
    mutationFn: (data: CreateUpdateClinicTypeDto) =>
      clinicTypeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-types'] });
      toast.success('Clinic type created successfully');
    },
    onError: () => {
      toast.error('Failed to create clinic type');
    },
  });

  const updateClinicType = useMutation({
    mutationFn: (data: CreateUpdateClinicTypeDto) =>
      clinicTypeService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-types'] });
      toast.success('Clinic type updated successfully');
    },
    onError: () => {
      toast.error('Failed to update clinic type');
    },
  });

  const deleteClinicType = useMutation({
    mutationFn: (id: string) => clinicTypeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-types'] });
      toast.success('Clinic type deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete clinic type');
    },
  });

  return {
    getClinicTypes,
    getClinicTypesForDropdown,
    createClinicType,
    updateClinicType,
    deleteClinicType,
  };
}
