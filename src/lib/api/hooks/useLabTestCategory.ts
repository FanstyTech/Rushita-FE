import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  CreateUpdateLabTestCategoryDto,
  LabTestCategoryFilterDto,
} from '../types/lab-test-category';
import { labTestCategoryService } from '../services/lab-test-category.service';

export const useLabTestCategory = () => {
  const queryClient = useQueryClient();

  const getLabTestCategories = (filter: LabTestCategoryFilterDto) =>
    useQuery({
      queryKey: ['labTestCategories', filter],
      queryFn: async () => {
        const response = await labTestCategoryService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const getLabTestCategory = (id: string) =>
    useQuery({
      queryKey: ['labTestCategory', id],
      queryFn: async () => {
        const response = await labTestCategoryService.getOne(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

  const getLabTestCategoriesForDropdown = () =>
    useQuery({
      queryKey: ['labTestCategoriesDropdown'],
      queryFn: async () => {
        const response = await labTestCategoryService.getLabTestCategoriesForDropdown();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const createLabTestCategory = useMutation({
    mutationFn: async (data: CreateUpdateLabTestCategoryDto) => {
      const response = await labTestCategoryService.create(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Lab test category created successfully');
      queryClient.invalidateQueries({ queryKey: ['labTestCategories'] });
      queryClient.invalidateQueries({ queryKey: ['labTestCategoriesDropdown'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateLabTestCategory = useMutation({
    mutationFn: async (data: CreateUpdateLabTestCategoryDto) => {
      const response = await labTestCategoryService.update(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Lab test category updated successfully');
      queryClient.invalidateQueries({ queryKey: ['labTestCategories'] });
      queryClient.invalidateQueries({ queryKey: ['labTestCategoriesDropdown'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteLabTestCategory = useMutation({
    mutationFn: async (id: string) => {
      const response = await labTestCategoryService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Lab test category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['labTestCategories'] });
      queryClient.invalidateQueries({ queryKey: ['labTestCategoriesDropdown'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    getLabTestCategories,
    getLabTestCategory,
    getLabTestCategoriesForDropdown,
    createLabTestCategory,
    updateLabTestCategory,
    deleteLabTestCategory,
  };
};
