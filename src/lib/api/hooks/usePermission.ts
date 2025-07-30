import { useMutation, useQuery } from '@tanstack/react-query';
import { permissionService } from '../services/permission.service';
import { toast } from 'sonner';

// Hook to get all permissions
export const usePermissions = () => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: () => permissionService.getPermissions(),
  });
};

// Hook to get permission modules
export const usePermissionModules = () => {
  return useQuery({
    queryKey: ['permissionModules'],
    queryFn: () => permissionService.getModules(),
  });
};

// Hook to get permissions grouped by modules
export const usePermissionsByModules = () => {
  return useQuery({
    queryKey: ['permissionsByModules'],
    queryFn: () => permissionService.getPermissionsByModules(),
  });
};

// Hook to get permissions for a specific module
export const usePermissionsByModule = (module: string) => {
  return useQuery({
    queryKey: ['permissions', 'byModule', module],
    queryFn: () => permissionService.getPermissionsByModule(module),
    enabled: !!module,
  });
};

// Hook to get user permissions
export const useUserPermissions = (userId: string) => {
  return useQuery({
    queryKey: ['userPermissions', userId],
    queryFn: () => permissionService.getUserPermissions(userId),
    enabled: !!userId,
  });
};

// Hook to update user permissions
export const useUpdateUserPermissions = () => {
  return useMutation({
    mutationFn: ({
      userId,
      permissionKeys,
    }: {
      userId: string;
      permissionKeys: string[];
    }) => permissionService.updateUserPermissions(userId, permissionKeys),
    onSuccess: (response) => {
      if (response.success) {
        toast.success('User permissions updated successfully');
      } else {
        toast.error(response.message || 'Failed to update user permissions');
      }
    },
    onError: (error: any) => {
      toast.error(
        error.message || 'An error occurred while updating user permissions'
      );
    },
  });
};
