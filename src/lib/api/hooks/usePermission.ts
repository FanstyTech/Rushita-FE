import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { permissionService } from '../services/permission.service';
import { toast } from 'sonner';
import { SaveUserPermissionsDto } from '../types/permission';

export function usePermission() {
  const queryClient = useQueryClient();

  // Get user permission selection
  const useUserPermissionSelection = (userId: string, clinicId: string) =>
    useQuery({
      queryKey: ['userPermissionSelection', userId, clinicId],
      queryFn: async () => {
        const response = await permissionService.getUserPermissionSelection(
          userId,
          clinicId
        );
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch user permission selection'
          );
        }
        return response.result;
      },
      enabled: !!userId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });
  // Save user permissions mutation (new)
  const saveUserPermissions = useMutation({
    mutationFn: async (data: SaveUserPermissionsDto) => {
      const response = await permissionService.saveUserPermissions(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to save user permissions');
      }
      return response.result;
    },
    onSuccess: (_, variables) => {
      toast.success('User permissions saved successfully');
      queryClient.invalidateQueries({
        queryKey: ['userPermissionSelection', variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['userPermissions', variables.userId],
      });
    },
    retry: false,
  });

  return {
    useUserPermissionSelection,
    saveUserPermissions,
  };
}
