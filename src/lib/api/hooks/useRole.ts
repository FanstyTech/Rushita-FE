import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { roleService } from '../services/role.service';
import {
  CreateRoleDto,
  RoleDetailDto,
  RoleDto,
  RoleFilterDto,
  UpdateRoleDto,
  UpdateRolePermissionsDto,
  UpdateUserRolesDto,
} from '../types/role';

export const useRoles = (filter: RoleFilterDto = {}) => {
  return useQuery({
    queryKey: ['roles', filter],
    queryFn: () => roleService.getRoles(filter),
    retry: false,
  });
};

export const useRole = (id: string) => {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => roleService.getRole(id),
    retry: false,
    enabled: !!id,
  });
};

export const useUserRoles = (userId: string) => {
  return useQuery({
    queryKey: ['userRoles', userId],
    queryFn: () => roleService.getUserRoles(userId),
    retry: false,
    enabled: !!userId,
  });
};

export const useUserPermissions = (userId: string) => {
  return useQuery({
    queryKey: ['userPermissions', userId],
    queryFn: () => roleService.getUserPermissions(userId),
    retry: false,
    enabled: !!userId,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleDto) => roleService.createRole(data),
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Role created successfully');
        queryClient.invalidateQueries({ queryKey: ['roles'] });
      } else {
        toast.error(response.message || 'Failed to create role');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create role');
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoleDto }) =>
      roleService.updateRole(id, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        toast.success('Role updated successfully');
        queryClient.invalidateQueries({ queryKey: ['roles'] });
        queryClient.invalidateQueries({ queryKey: ['role', variables.id] });
      } else {
        toast.error(response.message || 'Failed to update role');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update role');
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roleService.deleteRole(id),
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Role deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['roles'] });
      } else {
        toast.error(response.message || 'Failed to delete role');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete role');
    },
  });
};

export const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roleId,
      data,
    }: {
      roleId: string;
      data: UpdateRolePermissionsDto;
    }) => roleService.updateRolePermissions(roleId, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        toast.success('Role permissions updated successfully');
        queryClient.invalidateQueries({ queryKey: ['role', variables.roleId] });
      } else {
        toast.error(response.message || 'Failed to update role permissions');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update role permissions');
    },
  });
};

export const useUpdateUserRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateUserRolesDto;
    }) => roleService.updateUserRoles(userId, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        toast.success('User roles updated successfully');
        queryClient.invalidateQueries({
          queryKey: ['userRoles', variables.userId],
        });
        queryClient.invalidateQueries({
          queryKey: ['userPermissions', variables.userId],
        });
      } else {
        toast.error(response.message || 'Failed to update user roles');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update user roles');
    },
  });
};

export const useEndUserSession = () => {
  return useMutation({
    mutationFn: (userId: string) => roleService.endUserSession(userId),
    onSuccess: (response) => {
      if (response.success) {
        toast.success('User session ended successfully');
      } else {
        toast.error(response.message || 'Failed to end user session');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to end user session');
    },
  });
};
