import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse } from '../types/api';
import {
  CreateRoleDto,
  RoleDetailDto,
  RoleDto,
  RoleFilterDto,
  UpdateRoleDto,
  UpdateRolePermissionsDto,
  UpdateUserRolesDto,
} from '../types/role';

export const roleService = {
  // Get list of roles with optional filtering
  async getRoles(filter: RoleFilterDto): Promise<ApiResponse<RoleDto[]>> {
    const params = new URLSearchParams();
    if (filter.clinicId) params.append('ClinicId', filter.clinicId);
    if (filter.includeSystemRoles !== undefined)
      params.append('IncludeSystemRoles', filter.includeSystemRoles.toString());

    return apiClient.get(API_ENDPOINTS.ROLE.GET_LIST, {
      params: Object.fromEntries(params),
    });
  },

  // Get single role by ID
  async getRole(id: string): Promise<ApiResponse<RoleDetailDto>> {
    return apiClient.get(`${API_ENDPOINTS.ROLE.GET_ONE}/${id}`);
  },

  // Create new role
  async createRole(data: CreateRoleDto): Promise<ApiResponse<RoleDto>> {
    return apiClient.post(API_ENDPOINTS.ROLE.CREATE, data);
  },

  // Update existing role
  async updateRole(
    id: string,
    data: UpdateRoleDto
  ): Promise<ApiResponse<boolean>> {
    return apiClient.put(`${API_ENDPOINTS.ROLE.UPDATE}/${id}`, data);
  },

  // Delete role
  async deleteRole(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`${API_ENDPOINTS.ROLE.DELETE}/${id}`);
  },

  // Update role permissions
  async updateRolePermissions(
    roleId: string,
    data: UpdateRolePermissionsDto
  ): Promise<ApiResponse<boolean>> {
    return apiClient.post(
      `${API_ENDPOINTS.ROLE.UPDATE_PERMISSIONS}/${roleId}`,
      data
    );
  },

  // Get user roles
  async getUserRoles(userId: string): Promise<ApiResponse<RoleDto[]>> {
    return apiClient.get(`${API_ENDPOINTS.USER_ROLE.GET_USER_ROLES}`, {
      params: { id: userId },
    });
  },

  // Update user roles
  async updateUserRoles(
    userId: string,
    data: UpdateUserRolesDto
  ): Promise<ApiResponse<boolean>> {
    return apiClient.post(
      `${API_ENDPOINTS.USER_ROLE.UPDATE_USER_ROLES}/${userId}`,
      data
    );
  },

  // Get user permissions
  async getUserPermissions(userId: string): Promise<ApiResponse<string[]>> {
    return apiClient.get(
      `${API_ENDPOINTS.USER_ROLE.GET_USER_PERMISSIONS}/${userId}`
    );
  },

  // End user session (blacklist tokens)
  async endUserSession(userId: string): Promise<ApiResponse<boolean>> {
    return apiClient.post(`${API_ENDPOINTS.USER_ROLE.END_SESSION}/${userId}`);
  },
};
