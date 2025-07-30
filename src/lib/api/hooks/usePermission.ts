import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { permissionService } from '../services/permission.service';
import { toast } from 'sonner';
import { PermissionFilterDto } from '../types/permission';

export function usePermission() {
  const queryClient = useQueryClient();

  // Get all permissions
  const usePermissionsList = () =>
    useQuery({
      queryKey: ['permissions'],
      queryFn: async () => {
        const response = await permissionService.getPermissions();
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch permissions');
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get permission modules
  const usePermissionModules = () =>
    useQuery({
      queryKey: ['permissionModules'],
      queryFn: async () => {
        const response = await permissionService.getModules();
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch permission modules'
          );
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get permissions grouped by modules
  const usePermissionsByModules = () =>
    useQuery({
      queryKey: ['permissionsByModules'],
      queryFn: async () => {
        const response = await permissionService.getPermissionsByModules();
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch permissions by modules'
          );
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get permissions for a specific module
  const usePermissionsByModule = (module: string) =>
    useQuery({
      queryKey: ['permissions', 'byModule', module],
      queryFn: async () => {
        const response = await permissionService.getPermissionsByModule(module);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch permissions for module'
          );
        }
        return response.result;
      },
      enabled: !!module,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get user permissions
  const useUserPermissions = (userId: string) =>
    useQuery({
      queryKey: ['userPermissions', userId],
      queryFn: async () => {
        const response = await permissionService.getUserPermissions(userId);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch user permissions'
          );
        }
        return response.result;
      },
      enabled: !!userId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Update user permissions mutation
  const updateUserPermissions = useMutation({
    mutationFn: async ({
      userId,
      permissionKeys,
    }: {
      userId: string;
      permissionKeys: string[];
    }) => {
      const response = await permissionService.updateUserPermissions(
        userId,
        permissionKeys
      );
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to update user permissions'
        );
      }
      return response.result;
    },
    onSuccess: (_, variables) => {
      toast.success('User permissions updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['userPermissions', variables.userId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  return {
    usePermissionsList,
    usePermissionModules,
    usePermissionsByModules,
    usePermissionsByModule,
    useUserPermissions,
    updateUserPermissions,
  };
}
