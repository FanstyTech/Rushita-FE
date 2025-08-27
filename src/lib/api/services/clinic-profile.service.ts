import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface ClinicProfileDto {
  id?: string;
  nameL: string;
  nameF: string;
  phoneNumber: string;
  bio: string;
  email: string;
  cityId?: string;
  countryId?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  specialtyIds: string[];
  hours: {
    day: string;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
  }[];
  social: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export const clinicProfileService = {
  // Get clinic profile
  async getClinicProfile(): Promise<ApiResponse<ClinicProfileDto>> {
    return apiClient.get(API_ENDPOINTS.CLINICS.GET_ONE.replace(':id', 'current'));
  },

  // Create or update clinic profile
  async createOrUpdateClinicProfile(data: ClinicProfileDto): Promise<ApiResponse<ClinicProfileDto>> {
    return apiClient.post(API_ENDPOINTS.CLINICS.CREATE_OR_UPDATE, data);
  },
};

