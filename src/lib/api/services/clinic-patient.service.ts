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
  CreateOrUpdateFamilyHistoryDto,
  CreateOrUpdateMedicalConditionDto,
  CreateUpdateClinicPatientDto,
  FamilyHistoryDto,
  GetPatientDropdownInput,
  GetPatientForViewDto,
  MedicalConditionDto,
  PatientProfileDto,
  PatientStatus,
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
}

export const clinicPatientService = new ClinicPatientService();
