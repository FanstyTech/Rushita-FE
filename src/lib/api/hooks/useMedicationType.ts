import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  CreateUpdateMedicationTypeDto,
  MedicationTypeFilterDto,
} from '../types/medication-type';
import { medicationTypeService } from '../services/medication-type.service';

export const useMedicationType = () => {
  const queryClient = useQueryClient();

  const getMedicationTypes = (filter: MedicationTypeFilterDto) =>
    useQuery({
      queryKey: ['medicationTypes', filter],
      queryFn: async () => {
        const response = await medicationTypeService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const getMedicationType = (id: string) =>
    useQuery({
      queryKey: ['medicationType', id],
      queryFn: async () => {
        const response = await medicationTypeService.getOne(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

  const createMedicationType = useMutation({
    mutationFn: async (data: CreateUpdateMedicationTypeDto) => {
      const response = await medicationTypeService.create(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Medication Type created successfully');
      queryClient.invalidateQueries({ queryKey: ['medicationTypes'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateMedicationType = useMutation({
    mutationFn: async (data: CreateUpdateMedicationTypeDto) => {
      const response = await medicationTypeService.update(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Medication Type updated successfully');
      queryClient.invalidateQueries({ queryKey: ['medicationTypes'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteMedicationType = useMutation({
    mutationFn: async (id: string) => {
      const response = await medicationTypeService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Medication Type deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['medicationTypes'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const getMedicationTypesForDropdown = () =>
    useQuery({
      queryKey: ['medicationTypesDropdown'],
      queryFn: async () => {
        const response = await medicationTypeService.getMedicationTypesForDropdown();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  return {
    getMedicationTypes,
    getMedicationType,
    createMedicationType,
    updateMedicationType,
    deleteMedicationType,
    getMedicationTypesForDropdown,
  };
};
