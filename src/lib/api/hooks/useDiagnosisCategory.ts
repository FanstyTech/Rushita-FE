import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  CreateUpdateDiagnosisCategoryDto,
  DiagnosisCategoryFilterDto,
} from '../types/diagnosis-category';
import { diagnosisCategoryService } from '../services/diagnosis-category.service';

export const useDiagnosisCategory = () => {
  const queryClient = useQueryClient();

  const getDiagnosisCategories = (filter: DiagnosisCategoryFilterDto) =>
    useQuery({
      queryKey: ['diagnosisCategories', filter],
      queryFn: async () => {
        const response = await diagnosisCategoryService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const getDiagnosisCategory = (id: string) =>
    useQuery({
      queryKey: ['diagnosisCategory', id],
      queryFn: async () => {
        const response = await diagnosisCategoryService.getOne(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

  const getDiagnosisCategoriesForDropdown = () =>
    useQuery({
      queryKey: ['diagnosisCategoriesDropdown'],
      queryFn: async () => {
        const response = await diagnosisCategoryService.getDiagnosisCategoriesForDropdown();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const createDiagnosisCategory = useMutation({
    mutationFn: async (data: CreateUpdateDiagnosisCategoryDto) => {
      const response = await diagnosisCategoryService.create(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Diagnosis category created successfully');
      queryClient.invalidateQueries({ queryKey: ['diagnosisCategories'] });
      queryClient.invalidateQueries({ queryKey: ['diagnosisCategoriesDropdown'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateDiagnosisCategory = useMutation({
    mutationFn: async (data: CreateUpdateDiagnosisCategoryDto) => {
      const response = await diagnosisCategoryService.update(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Diagnosis category updated successfully');
      queryClient.invalidateQueries({ queryKey: ['diagnosisCategories'] });
      queryClient.invalidateQueries({ queryKey: ['diagnosisCategoriesDropdown'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteDiagnosisCategory = useMutation({
    mutationFn: async (id: string) => {
      const response = await diagnosisCategoryService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Diagnosis category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['diagnosisCategories'] });
      queryClient.invalidateQueries({ queryKey: ['diagnosisCategoriesDropdown'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    getDiagnosisCategories,
    getDiagnosisCategory,
    getDiagnosisCategoriesForDropdown,
    createDiagnosisCategory,
    updateDiagnosisCategory,
    deleteDiagnosisCategory,
  };
};
