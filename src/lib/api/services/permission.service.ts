import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse } from '../types/api';
import {
  SaveUserPermissionsDto,
  UserPermissionSelectionDto,
} from '../types/permission';

export const permissionService = {
  // Get user permission selection
  async getUserPermissionSelection(
    userId: string,
    clinicId: string
  ): Promise<ApiResponse<UserPermissionSelectionDto>> {
    return apiClient.get(
      API_ENDPOINTS.PERMISSION.GET_USER_PERMISSION_SELECTION,
      {
        params: { userId: userId, clinicId: clinicId },
      }
    );
  },

  // Save user permissions
  async saveUserPermissions(
    data: SaveUserPermissionsDto
  ): Promise<ApiResponse<boolean>> {
    return apiClient.post(API_ENDPOINTS.PERMISSION.SAVE_USER_PERMISSIONS, data);
  },
};
