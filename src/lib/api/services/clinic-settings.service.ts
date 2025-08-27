import {
  ClinicSettingsDto,
  SaveClinicSettingsDto,
} from '../types/clinic-settings';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export const clinicSettingsService = {
  // Get clinic settings
  async getClinicSettings(): Promise<ApiResponse<ClinicSettingsDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_SETTINGS.GET);
  },

  // Save clinic settings
  async saveClinicSettings(data: SaveClinicSettingsDto): Promise<ApiResponse<boolean>> {
    return apiClient.post(API_ENDPOINTS.CLINIC_SETTINGS.SAVE, data);
  },
};
