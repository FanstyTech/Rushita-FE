import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { radiologyTestCategoryService } from '../services/radiology-test-category.service';
import type {
  RadiologyTestCategoryFilterDto,
  CreateUpdateRadiologyTestCategoryDto,
} from '../types/radiology-test-category';
import { toast } from '@/components/ui/Toast';

export const useRadiologyTestCategory = () => {
  const queryClient = useQueryClient();

  const useRadiologyTestCategoriesList = (
    filter: RadiologyTestCategoryFilterDto
  ) =>
    useQuery({
      queryKey: ['radiologyTestCategories', filter],
      retry: false,
      queryFn: async () => {
        const response = await radiologyTestCategoryService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const useRadiologyTestCategoryDetails = (id: string) =>
    useQuery({
      queryKey: ['radiologyTestCategories', id],
      queryFn: () => radiologyTestCategoryService.getById(id),
      enabled: !!id,
    });

  const useRadiologyTestCategoriesDropdown = () =>
    useQuery({
      queryKey: ['radiologyTestCategoriesDropdown'],
      queryFn: async () => {
        const response =
          await radiologyTestCategoryService.getRadiologyTestCategoriesForDropdown();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const createRadiologyTestCategory = useMutation({
    mutationFn: (data: CreateUpdateRadiologyTestCategoryDto) =>
      radiologyTestCategoryService.create(data),
    onSuccess: () => {
      toast.success('Radiology test category created successfully');
      queryClient.invalidateQueries({ queryKey: ['radiologyTestCategories'] });
    },
    onError: () => {
      toast.error('Failed to create radiology test category');
    },
  });

  const updateRadiologyTestCategory = useMutation({
    mutationFn: (data: CreateUpdateRadiologyTestCategoryDto) =>
      radiologyTestCategoryService.update(data),
    onSuccess: () => {
      toast.success('Radiology test category updated successfully');
      queryClient.invalidateQueries({ queryKey: ['radiologyTestCategories'] });
    },
    onError: () => {
      toast.error('Failed to update radiology test category');
    },
  });

  const deleteRadiologyTestCategory = useMutation({
    mutationFn: (id: string) => radiologyTestCategoryService.delete(id),
    onSuccess: () => {
      toast.success('Radiology test category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['radiologyTestCategories'] });
    },
    onError: () => {
      toast.error('Failed to delete radiology test category');
    },
  });

  return {
    useRadiologyTestCategoriesList,
    useRadiologyTestCategoryDetails,
    useRadiologyTestCategoriesDropdown,
    createRadiologyTestCategory,
    updateRadiologyTestCategory,
    deleteRadiologyTestCategory,
  };
};
