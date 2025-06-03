import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { specialtyService } from '../services/specialty.service';
import type {
  SpecialtyFilterDto,
  CreateUpdateSpecialtyDto,
} from '../types/specialty';
import { toast } from '@/components/ui/Toast';

export function useSpecialty() {
  const queryClient = useQueryClient();

  const useSpecialtiesList = (filter: SpecialtyFilterDto) =>
    useQuery({
      queryKey: ['specialties', filter],
      retry: false,
      queryFn: async () => {
        const response = await specialtyService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const useSpecialtyDetails = (id: string) =>
    useQuery({
      queryKey: ['specialty', id],
      queryFn: async () => {
        const response = await specialtyService.getById(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

  const useSpecialtiesDropdown = () =>
    useQuery({
      queryKey: ['specialtiesDropdown'],
      queryFn: async () => {
        const response = await specialtyService.getRadiologyTestsForDropdown();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const createSpecialty = useMutation({
    mutationFn: async (data: CreateUpdateSpecialtyDto) => {
      const response = await specialtyService.create(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Specialty created successfully');
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateSpecialty = useMutation({
    mutationFn: async (data: CreateUpdateSpecialtyDto) => {
      const response = await specialtyService.update(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Specialty updated successfully');
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteSpecialty = useMutation({
    mutationFn: async (id: string) => {
      const response = await specialtyService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Specialty deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    useSpecialtiesList,
    useSpecialtyDetails,
    useSpecialtiesDropdown,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
  };
}
