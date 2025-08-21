import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { salaryService } from '../services/salary.service';
import {
  StaffSalaryFilterDto,
  StaffSalarySummaryFilterDto,
  CreateUpdateStaffSalaryDto,
} from '../types/salary';

export const useSalary = () => {
  const queryClient = useQueryClient();

  // Get all salaries

  const useGetSalaries = (params: StaffSalaryFilterDto) =>
    useQuery({
      queryKey: ['salaries', params],
      queryFn: async () => {
        const response = await salaryService.getAll(params);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch salary');
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });
  // Get salary summary

  const useGetSalarySummary = (filter: StaffSalarySummaryFilterDto) =>
    useQuery({
      queryKey: ['salary-summary', filter],
      queryFn: async () => {
        const response = await salaryService.getSummary(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch service price summary'
          );
        }
        return response.result;
      },
      retry: false,
    });

  // Get salary by ID
  const useGetSalaryById = (id: string) => {
    return useQuery({
      queryKey: ['salary', id],
      queryFn: () => salaryService.getById(id),

      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create salary
  const useCreateOrUpdateSalary = () => {
    return useMutation({
      mutationFn: (data: CreateUpdateStaffSalaryDto) =>
        salaryService.createOrUpdate(data),
      onSuccess: () => {
        toast.success('Salary created successfully');
        queryClient.invalidateQueries({ queryKey: ['salaries'] });
        queryClient.invalidateQueries({ queryKey: ['salary-summary'] });
      },
    });
  };

  // Delete salary
  const useDeleteSalary = () => {
    return useMutation({
      mutationFn: (id: string) => salaryService.delete(id),
      onSuccess: () => {
        toast.success('Salary deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['salaries'] });
        queryClient.invalidateQueries({ queryKey: ['salary-summary'] });
      },
    });
  };

  return {
    useGetSalaries,
    useGetSalarySummary,
    useGetSalaryById,
    useCreateOrUpdateSalary,
    useDeleteSalary,
  };
};
