import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clinicSettingsService } from '../services/clinic-settings.service';
import type { SaveClinicSettingsDto } from '../types/clinic-settings';
import { toast } from '@/components/ui/Toast';

export function useClinicSettings() {
  const queryClient = useQueryClient();

  // Query keys for cache management
  const queryKeys = {
    all: ['clinicSettings'] as const,
    settings: () => [...queryKeys.all, 'settings'] as const,
  };

  // Get clinic settings
  const getClinicSettings = () =>
    useQuery({
      queryKey: queryKeys.settings(),
      queryFn: async () => {
        const response = await clinicSettingsService.getClinicSettings();
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch clinic settings'
          );
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    });

  // Save clinic settings mutation
  const saveClinicSettings = useMutation({
    mutationFn: async (data: SaveClinicSettingsDto) => {
      const response = await clinicSettingsService.saveClinicSettings(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to save clinic settings');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Clinic settings saved successfully');

      // Invalidate and refetch settings
      queryClient.invalidateQueries({ queryKey: queryKeys.settings() });
    },
  });

  return {
    // Queries
    getClinicSettings,

    // Mutations
    saveClinicSettings,

    // Query keys (for manual cache management)
    queryKeys,
  };
}
