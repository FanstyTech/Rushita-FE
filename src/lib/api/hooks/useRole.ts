import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { roleService } from '../services/role.service';
import {
  CreateRoleDto,
  RoleFilterDto,
  UpdateRoleDto,
  UpdateRolePermissionsDto,
  UpdateUserRolesDto,
} from '../types/role';

export function useRole() {
  const queryClient = useQueryClient();

  // Get roles with optional filtering
  const useRolesList = (filter: RoleFilterDto = {}) =>
    useQuery({
      queryKey: ['roles', filter],
      queryFn: async () => {
        const response = await roleService.getRoles(filter);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch roles');
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get single role by ID
  const useRoleDetails = (id: string) =>
    useQuery({
      queryKey: ['role', id],
      queryFn: async () => {
        const response = await roleService.getRole(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch role');
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  // Get user roles
  const useUserRoles = (userId: string) =>
    useQuery({
      queryKey: ['userRoles', userId],
      queryFn: async () => {
        const response = await roleService.getUserRoles(userId);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch user roles');
        }
        return response.result;
      },
      enabled: !!userId,
      retry: false,
    });

  // Get user permissions
  const useUserPermissions = (userId: string) =>
    useQuery({
      queryKey: ['userPermissions', userId],
      queryFn: async () => {
        const response = await roleService.getUserPermissions(userId);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch user permissions'
          );
        }
        return response.result;
      },
      enabled: !!userId,
      retry: false,
    });

  // Create role mutation
  const createRole = useMutation({
    mutationFn: async (data: CreateRoleDto) => {
      const response = await roleService.createRole(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to create role');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Role created successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Update role mutation
  const updateRole = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateRoleDto }) => {
      const response = await roleService.updateRole(id, data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to update role');
      }
      return response.result;
    },
    onSuccess: (_, variables) => {
      toast.success('Role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role', variables.id] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Delete role mutation
  const deleteRole = useMutation({
    mutationFn: async (id: string) => {
      const response = await roleService.deleteRole(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete role');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Role deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Update role permissions mutation
  const updateRolePermissions = useMutation({
    mutationFn: async ({
      roleId,
      data,
    }: {
      roleId: string;
      data: UpdateRolePermissionsDto;
    }) => {
      const response = await roleService.updateRolePermissions(roleId, data);
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to update role permissions'
        );
      }
      return response.result;
    },
    onSuccess: (_, variables) => {
      toast.success('Role permissions updated successfully');
      queryClient.invalidateQueries({ queryKey: ['role', variables.roleId] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Update user roles mutation
  const updateUserRoles = useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateUserRolesDto;
    }) => {
      const response = await roleService.updateUserRoles(userId, data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to update user roles');
      }
      return response.result;
    },
    onSuccess: (_, variables) => {
      toast.success('User roles updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['userRoles', variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['userPermissions', variables.userId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // End user session mutation
  const endUserSession = useMutation({
    mutationFn: async (userId: string) => {
      const response = await roleService.endUserSession(userId);
      if (!response.success) {
        throw new Error(response.message || 'Failed to end user session');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('User session ended successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  return {
    useRolesList,
    useRoleDetails,
    useUserRoles,
    useUserPermissions,
    createRole,
    updateRole,
    deleteRole,
    updateRolePermissions,
    updateUserRoles,
    endUserSession,
  };
}
