import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { revenueService } from '../services/revenue.service';
import { toast } from '@/components/ui/Toast';
import {
  CreateUpdateClinicRevenueDto,
  ClinicRevenueFilterDto,
  ClinicRevenueSummaryFilterDto,
  ClinicRevenueDashboardFilterDto,
} from '../types/revenue';

export function useRevenue() {
  const queryClient = useQueryClient();

  // Get paginated list of revenues
  const useRevenuesList = (filters: ClinicRevenueFilterDto) =>
    useQuery({
      queryKey: ['revenues', filters],
      queryFn: async () => {
        const response = await revenueService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch revenues');
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get single revenue
  const useRevenueDetails = (id: string) =>
    useQuery({
      queryKey: ['revenue', id],
      queryFn: async () => {
        const response = await revenueService.getById(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch revenue');
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  // Get revenue summary
  const useRevenueSummary = (filter: ClinicRevenueSummaryFilterDto) =>
    useQuery({
      queryKey: ['revenueSummary', filter],
      queryFn: async () => {
        const response = await revenueService.getSummary(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch revenue summary'
          );
        }
        return response.result;
      },
      retry: false,
    });

  // Get revenue dashboard stats
  const useRevenueDashboardStats = (filter: ClinicRevenueDashboardFilterDto) =>
    useQuery({
      queryKey: ['revenueDashboardStats', filter],
      queryFn: async () => {
        const response = await revenueService.getDashboardStats(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch revenue dashboard stats'
          );
        }
        return response.result;
      },
      retry: false,
    });

  // Create or update revenue mutation
  const createOrUpdateRevenue = useMutation({
    mutationFn: async (data: CreateUpdateClinicRevenueDto) =>
      revenueService.createOrUpdate(data),
    onSuccess: (_, data) => {
      toast.success(
        `Revenue has been successfully ${data.id ? 'updated' : 'created'}`
      );
      queryClient.invalidateQueries({ queryKey: ['revenues'] });
      queryClient.invalidateQueries({ queryKey: ['revenueSummary'] });
      queryClient.invalidateQueries({ queryKey: ['revenueDashboardStats'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Delete revenue mutation
  const deleteRevenue = useMutation({
    mutationFn: async (id: string) => {
      const response = await revenueService.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete revenue');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Revenue deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['revenues'] });
      queryClient.invalidateQueries({ queryKey: ['revenueSummary'] });
      queryClient.invalidateQueries({ queryKey: ['revenueDashboardStats'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  return {
    useRevenuesList,
    useRevenueDetails,
    useRevenueSummary,
    useRevenueDashboardStats,
    createOrUpdateRevenue,
    deleteRevenue,
  };
}
