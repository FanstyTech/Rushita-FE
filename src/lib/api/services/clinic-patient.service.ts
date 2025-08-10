import { convertFilterToParams, FilterParams } from '@/utils/filter';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { ApiResponse } from '../types/api';
import {
  AllergyDto,
  ClinicPatientDto,
  ClinicPatientFilterDto,
  ClinicPatientListDto,
  CreateOrUpdateAllergyDto,
  CreateOrUpdateEmergencyContactDto,
  CreateOrUpdateFamilyHistoryDto,
  CreateOrUpdateMedicalConditionDto,
  CreateUpdateClinicPatientDto,
  EmergencyContactDto,
  FamilyHistoryDto,
  GetPatientDropdownInput,
  GetPatientForViewDto,
  MedicalConditionDto,
  PatientHealthMetricDto,
  PatientPortalProfileDto,
  PatientProfileDto,
  PatientStatus,
  UpdatePatientHealthMetricDto,
  UpdatePatientPortalProfileDto,
} from '../types/clinic-patient';
import { PaginationResponse } from '../types/pagination';
import { SelectOption } from '../types/select-option';

class ClinicPatientService {
  async getAll(
    filter: ClinicPatientFilterDto
  ): Promise<ApiResponse<PaginationResponse<ClinicPatientListDto>>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
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
  async getForView(id: string): Promise<ApiResponse<GetPatientForViewDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_FOR_VIEW, {
      params: { id },
    });
  }

  async getPatientDropdown(
    filter: GetPatientDropdownInput
  ): Promise<ApiResponse<SelectOption<string>[]>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_PATIENT_DROPDOWN, {
      params: convertFilterToParams(filter as FilterParams),
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

  async createOrUpdateCondition(
    data: CreateOrUpdateMedicalConditionDto
  ): Promise<ApiResponse<MedicalConditionDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.CREATE_OR_UPDATE_CONDITION,
      data
    );
  }
  async createOrUpdateAllergy(
    data: CreateOrUpdateAllergyDto
  ): Promise<ApiResponse<AllergyDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.CREATE_OR_UPDATE_ALLERGY,
      data
    );
  }

  async createOrUpdateFamilyHistory(
    data: CreateOrUpdateFamilyHistoryDto
  ): Promise<ApiResponse<FamilyHistoryDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.CREATE_OR_UPDATE_FAMILY_HISTORY,
      data
    );
  }

  async getProfile(id: string): Promise<ApiResponse<PatientProfileDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_PROFILE, {
      params: { id },
    });
  }

  // Get patient portal profile
  async getPatientPortalProfile(): Promise<
    ApiResponse<PatientPortalProfileDto>
  > {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_PORTAL_PROFILE);
  }

  // Update patient portal profile
  async updatePatientPortalProfile(
    data: UpdatePatientPortalProfileDto
  ): Promise<ApiResponse<PatientPortalProfileDto>> {
    return apiClient.put(
      API_ENDPOINTS.CLINIC_PATIENTS.UPDATE_PORTAL_PROFILE,
      data
    );
  }

  // Get patient health metrics
  async getPatientHealthMetrics(
    id: string
  ): Promise<ApiResponse<PatientHealthMetricDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_HEALTH_METRICS, {
      params: { id },
    });
  }

  // Update patient health metrics
  async updatePatientHealthMetrics(
    data: UpdatePatientHealthMetricDto
  ): Promise<ApiResponse<PatientHealthMetricDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.UPDATE_HEALTH_METRICS,
      data
    );
  }

  // Create or update emergency contact
  async createOrUpdateEmergencyContact(
    data: CreateOrUpdateEmergencyContactDto
  ): Promise<ApiResponse<EmergencyContactDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.CREATE_OR_UPDATE_EMERGENCY_CONTACT,
      data
    );
  }

  // Delete emergency contact
  async deleteEmergencyContact(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(
      API_ENDPOINTS.CLINIC_PATIENTS.DELETE_EMERGENCY_CONTACT,
      {
        params: { id },
      }
    );
  }
}

export const clinicPatientService = new ClinicPatientService();
