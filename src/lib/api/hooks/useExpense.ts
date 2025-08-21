import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseService } from '../services/expense.service';
import { toast } from '@/components/ui/Toast';
import {
  CreateUpdateClinicExpenseDto,
  ClinicExpenseFilterDto,
  ClinicExpenseSummaryFilterDto,
  ClinicExpenseDashboardFilterDto,
} from '../types/expense';

export function useExpense() {
  const queryClient = useQueryClient();

  // Get paginated list of expenses
  const useExpensesList = (filters: ClinicExpenseFilterDto) =>
    useQuery({
      queryKey: ['expenses', filters],
      queryFn: async () => {
        const response = await expenseService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch expenses');
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get single expense
  const useExpenseDetails = (id: string) =>
    useQuery({
      queryKey: ['expense', id],
      queryFn: async () => {
        const response = await expenseService.getById(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch expense');
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  // Get expense summary
  const useExpenseSummary = (filter: ClinicExpenseSummaryFilterDto) =>
    useQuery({
      queryKey: ['expenseSummary', filter],
      queryFn: async () => {
        const response = await expenseService.getSummary(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch expense summary'
          );
        }
        return response.result;
      },
      retry: false,
    });

  // Get expense dashboard stats
  const useExpenseDashboardStats = (filter: ClinicExpenseDashboardFilterDto) =>
    useQuery({
      queryKey: ['expenseDashboardStats', filter],
      queryFn: async () => {
        const response = await expenseService.getDashboardStats(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch expense dashboard stats'
          );
        }
        return response.result;
      },
      retry: false,
    });

  // Create or update expense mutation
  const createOrUpdateExpense = useMutation({
    mutationFn: async (data: CreateUpdateClinicExpenseDto) =>
      expenseService.createOrUpdate(data),
    onSuccess: (_, data) => {
      toast.success(
        `Expense has been successfully ${data.id ? 'updated' : 'created'}`
      );
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expenseSummary'] });
      queryClient.invalidateQueries({ queryKey: ['expenseDashboardStats'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Delete expense mutation
  const deleteExpense = useMutation({
    mutationFn: async (id: string) => {
      const response = await expenseService.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete expense');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Expense deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expenseSummary'] });
      queryClient.invalidateQueries({ queryKey: ['expenseDashboardStats'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  return {
    useExpensesList,
    useExpenseDetails,
    useExpenseSummary,
    useExpenseDashboardStats,
    createOrUpdateExpense,
    deleteExpense,
  };
}
