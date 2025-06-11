import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { ApiResponse } from '../types/api';
import {
  ClinicPatientDto,
  ClinicPatientListDto,
  CreateUpdateClinicPatientDto,
  PatientProfileDto,
  PatientStatus,
} from '../types/clinic-patient';
import { PaginationResponse } from '../types/pagination';

class ClinicPatientService {
  async getAll(
    params: any
  ): Promise<ApiResponse<PaginationResponse<ClinicPatientListDto>>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.LIST, { params });
  }

  async getById(id: string): Promise<ApiResponse<ClinicPatientDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_ONE, {
      params: { id },
    });
  }

  async getForEdit(
    id: string
  ): Promise<ApiResponse<CreateUpdateClinicPatientDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_FOR_EDIT, {
      params: { id },
    });
  }

  async createOrUpdate(
    data: CreateUpdateClinicPatientDto
  ): Promise<ApiResponse<ClinicPatientDto>> {
    return apiClient.post(API_ENDPOINTS.CLINIC_PATIENTS.CREATE_OR_UPDATE, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.CLINIC_PATIENTS.DELETE, {
      id,
    });
  }

  async updateStatus(
    id: string,
    status: PatientStatus
  ): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.CLINIC_PATIENTS.UPDATE_STATUS, {
      id,
      status,
    });
  }

  async getProfile(id: string): Promise<ApiResponse<PatientProfileDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_PROFILE, {
      params: { id },
    });
  }
}

export const clinicPatientService = new ClinicPatientService();
