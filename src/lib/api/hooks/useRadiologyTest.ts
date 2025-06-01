import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { radiologyTestService } from '../services/radiology-test.service';
import type {
  RadiologyTestFilterDto,
  CreateUpdateRadiologyTestDto,
} from '../types/radiology-test';
import { toast } from '@/components/ui/Toast';

export const useRadiologyTest = () => {
  const queryClient = useQueryClient();

  const getRadiologyTests = (filter: RadiologyTestFilterDto) =>
    useQuery({
      queryKey: ['radiologyTests', filter],
      retry: false,
      queryFn: async () => {
        const response = await radiologyTestService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const getRadiologyTest = (id: string) =>
    useQuery({
      queryKey: ['radiologyTests', id],
      queryFn: () => radiologyTestService.getById(id),
      enabled: !!id,
    });

  const getRadiologyTestsForDropdown = () =>
    useQuery({
      queryKey: ['radiologyTestsDropdown'],
      queryFn: async () => {
        const response =
          await radiologyTestService.getRadiologyTestsForDropdown();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const createRadiologyTest = useMutation({
    mutationFn: (data: CreateUpdateRadiologyTestDto) =>
      radiologyTestService.create(data),
    onSuccess: () => {
      toast.success('Radiology test created successfully');
      queryClient.invalidateQueries({ queryKey: ['radiologyTests'] });
    },
    onError: () => {
      toast.error('Failed to create radiology test');
    },
  });

  const updateRadiologyTest = useMutation({
    mutationFn: (data: CreateUpdateRadiologyTestDto) =>
      radiologyTestService.update(data),
    onSuccess: () => {
      toast.success('Radiology test updated successfully');
      queryClient.invalidateQueries({ queryKey: ['radiologyTests'] });
    },
    onError: () => {
      toast.error('Failed to update radiology test');
    },
  });

  const deleteRadiologyTest = useMutation({
    mutationFn: (id: string) => radiologyTestService.delete(id),
    onSuccess: () => {
      toast.success('Radiology test deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['radiologyTests'] });
    },
    onError: () => {
      toast.error('Failed to delete radiology test');
    },
  });

  return {
    getRadiologyTests,
    getRadiologyTest,
    getRadiologyTestsForDropdown,
    createRadiologyTest,
    updateRadiologyTest,
    deleteRadiologyTest,
  };
};
