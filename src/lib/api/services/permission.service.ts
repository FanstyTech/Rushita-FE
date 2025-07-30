import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse } from '../types/api';
import { PermissionDto, ModulePermissionsDto } from '../types/permission';

export const permissionService = {
  // Get all permissions
  async getPermissions(): Promise<ApiResponse<PermissionDto[]>> {
    return apiClient.get(API_ENDPOINTS.PERMISSION.GET_LIST);
  },

  // Get all permission modules
  async getModules(): Promise<ApiResponse<string[]>> {
    return apiClient.get(API_ENDPOINTS.PERMISSION.GET_MODULES);
  },

  // Get permissions by module
  async getPermissionsByModule(
    module: string
  ): Promise<ApiResponse<PermissionDto[]>> {
    return apiClient.get(`${API_ENDPOINTS.PERMISSION.GET_BY_MODULE}/${module}`);
  },

  // Get all permissions grouped by module
  async getPermissionsByModules(): Promise<
    ApiResponse<ModulePermissionsDto[]>
  > {
    return apiClient.get(API_ENDPOINTS.PERMISSION.GET_BY_MODULE);
  },

  // Update user permissions directly
  async updateUserPermissions(
    userId: string,
    permissionKeys: string[]
  ): Promise<ApiResponse<boolean>> {
    return apiClient.post(`/permission/updateUserPermissions/${userId}`, {
      permissionKeys,
    });
  },

  // Get user permissions
  async getUserPermissions(userId: string): Promise<ApiResponse<string[]>> {
    return apiClient.get(`/permission/getUserPermissions/${userId}`);
  },
};
