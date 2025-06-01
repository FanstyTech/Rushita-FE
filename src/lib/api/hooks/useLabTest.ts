import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  CreateUpdateLabTestDto,
  LabTestFilterDto,
} from '../types/lab-test';
import { labTestService } from '../services/lab-test.service';

export const useLabTest = () => {
  const queryClient = useQueryClient();

  const getLabTests = (filter: LabTestFilterDto) =>
    useQuery({
      queryKey: ['labTests', filter],
      queryFn: async () => {
        const response = await labTestService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const getLabTest = (id: string) =>
    useQuery({
      queryKey: ['labTest', id],
      queryFn: async () => {
        const response = await labTestService.getOne(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

  const createLabTest = useMutation({
    mutationFn: async (data: CreateUpdateLabTestDto) => {
      const response = await labTestService.create(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Lab test created successfully');
      queryClient.invalidateQueries({ queryKey: ['labTests'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateLabTest = useMutation({
    mutationFn: async (data: CreateUpdateLabTestDto) => {
      const response = await labTestService.update(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Lab test updated successfully');
      queryClient.invalidateQueries({ queryKey: ['labTests'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteLabTest = useMutation({
    mutationFn: async (id: string) => {
      const response = await labTestService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Lab test deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['labTests'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    getLabTests,
    getLabTest,
    createLabTest,
    updateLabTest,
    deleteLabTest,
  };
};
