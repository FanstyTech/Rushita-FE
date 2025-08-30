import { useQuery } from '@tanstack/react-query';
import { doctorDashboardService } from '../services/doctor-dashboard.service';
import type { DoctorDashboardFilterDto } from '../types/doctor-dashboard';

export function useDoctorDashboard() {
  // Query keys for cache management
  const queryKeys = {
    all: ['doctorDashboard'] as const,
    dashboard: (filter: DoctorDashboardFilterDto) =>
      [...queryKeys.all, 'dashboard', filter] as const,
  };

  // Get doctor dashboard data
  const getDashboard = (filter: DoctorDashboardFilterDto = {}) =>
    useQuery({
      queryKey: queryKeys.dashboard(filter),
      queryFn: async () => {
        const response = await doctorDashboardService.getDashboard(filter);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch dashboard data');
        }
        return response.result;
      },
      staleTime: 2 * 60 * 1000, // 2 minutes - dashboard data changes frequently
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      retryDelay: 1000,
    });

  return {
    // Queries
    getDashboard,

    // Query keys (for manual cache management)
    queryKeys,
  };
}
