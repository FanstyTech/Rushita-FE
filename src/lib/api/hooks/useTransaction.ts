import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '../services/transactions.service';
import { toast } from '@/components/ui/Toast';
import {
  CreateUpdateClinicTransactionDto,
  ClinicTransactionFilterDto,
  ClinicTransactionSummaryFilterDto,
  ClinicTransactionDashboardFilterDto,
} from '../types/transaction';

export function useTransaction() {
  const queryClient = useQueryClient();

  // Get paginated list of transactions
  const useTransactionsList = (filters: ClinicTransactionFilterDto) =>
    useQuery({
      queryKey: ['transactions', filters],
      queryFn: async () => {
        const response = await transactionService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch transactions');
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get single transaction
  const useTransactionDetails = (id: string) =>
    useQuery({
      queryKey: ['transaction', id],
      queryFn: async () => {
        const response = await transactionService.getById(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch transaction');
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  // Get transaction summary
  const useTransactionSummary = (filter: ClinicTransactionSummaryFilterDto) =>
    useQuery({
      queryKey: ['transactionSummary', filter],
      queryFn: async () => {
        const response = await transactionService.getSummary(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch transaction summary'
          );
        }
        return response.result;
      },
      retry: false,
    });

  // Get transaction dashboard stats
  const useTransactionDashboardStats = (
    filter: ClinicTransactionDashboardFilterDto
  ) =>
    useQuery({
      queryKey: ['transactionDashboardStats', filter],
      queryFn: async () => {
        const response = await transactionService.getDashboardStats(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch transaction dashboard stats'
          );
        }
        return response.result;
      },
      retry: false,
    });

  // Create or update transaction mutation
  const createOrUpdateTransaction = useMutation({
    mutationFn: async (data: CreateUpdateClinicTransactionDto) =>
      transactionService.createOrUpdate(data),
    onSuccess: (_, data) => {
      toast.success(
        `Transaction has been successfully ${data.id ? 'updated' : 'created'}`
      );
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactionSummary'] });
      queryClient.invalidateQueries({
        queryKey: ['transactionDashboardStats'],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Delete transaction mutation
  const deleteTransaction = useMutation({
    mutationFn: async (id: string) => {
      const response = await transactionService.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete transaction');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Transaction deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactionSummary'] });
      queryClient.invalidateQueries({
        queryKey: ['transactionDashboardStats'],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  return {
    useTransactionsList,
    useTransactionDetails,
    useTransactionSummary,
    useTransactionDashboardStats,
    createOrUpdateTransaction,
    deleteTransaction,
  };
}
