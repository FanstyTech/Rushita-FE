import {
  VisitRadiologyTestDto,
  CreateUpdateVisitRadiologyTestDto,
  VisitRadiologyTestListDto,
  VisitRadiologyTestFilterDto,
  VisitWithRadiologyTestsDto,
  GetVisitsWithRadiologyTestsInput,
  RadiologySummaryStatsDto,
  RadiologySummaryStatsInput,
  UpdateVisitRadiologyTestStatusDto,
  UpdateVisitRadiologyTestResultDto,
  PatientRadiologyTestFilterDto,
  PatientPortalRadiologyTestDto,
} from '../types/visit-radiology-test';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

export const visitRadiologyTestService = {
  // Get paginated list
  async getAll(
    filter: VisitRadiologyTestFilterDto
  ): Promise<ApiResponse<PaginationResponse<VisitRadiologyTestListDto>>> {
    return apiClient.get(API_ENDPOINTS.visitRadiologyTest.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get single visit radiology test by ID
  async getById(id: string): Promise<ApiResponse<VisitRadiologyTestDto>> {
    return apiClient.get(API_ENDPOINTS.visitRadiologyTest.GET_ONE.replace(':id', id));
  },

  // Create new visit radiology test
  async create(
    data: CreateUpdateVisitRadiologyTestDto
  ): Promise<ApiResponse<VisitRadiologyTestDto>> {
    return apiClient.post(API_ENDPOINTS.visitRadiologyTest.CREATE_OR_UPDATE, data);
  },

  // Update existing visit radiology test
  async update(
    data: CreateUpdateVisitRadiologyTestDto
  ): Promise<ApiResponse<VisitRadiologyTestDto>> {
    return apiClient.post(API_ENDPOINTS.visitRadiologyTest.CREATE_OR_UPDATE, data);
  },

  // Create or update (handles both cases)
  async createOrUpdate(
    data: CreateUpdateVisitRadiologyTestDto
  ): Promise<ApiResponse<VisitRadiologyTestDto>> {
    return apiClient.post(API_ENDPOINTS.visitRadiologyTest.CREATE_OR_UPDATE, data);
  },

  // Update visit radiology test status
  async updateStatus(
    data: UpdateVisitRadiologyTestStatusDto
  ): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.visitRadiologyTest.UPDATE_STATUS, data);
  },

  // Update visit radiology test result
  async updateResult(
    data: UpdateVisitRadiologyTestResultDto
  ): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.visitRadiologyTest.UPDATE_RESULT, data);
  },

  // Delete visit radiology test
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.visitRadiologyTest.DELETE, {
      params: { id },
    });
  },

  // Get visit radiology tests by visit ID
  async getByVisitId(visitId: string): Promise<ApiResponse<VisitRadiologyTestDto[]>> {
    return apiClient.get(API_ENDPOINTS.visitRadiologyTest.GET_BY_VISIT_ID, {
      params: { visitId },
    });
  },

  // Get visit radiology tests by radiology test ID
  async getByRadiologyTestId(
    radiologyTestId: string
  ): Promise<ApiResponse<VisitRadiologyTestDto[]>> {
    return apiClient.get(API_ENDPOINTS.visitRadiologyTest.GET_BY_RADIOLOGY_TEST_ID, {
      params: { radiologyTestId },
    });
  },

  // Get visits with radiology tests
  async getVisitsWithRadiologyTests(
    input: GetVisitsWithRadiologyTestsInput
  ): Promise<ApiResponse<VisitWithRadiologyTestsDto[]>> {
    return apiClient.get(API_ENDPOINTS.visitRadiologyTest.GET_VISITS_WITH_RADIOLOGY_TESTS, {
      params: convertFilterToParams(input as FilterParams),
    });
  },

  // Get radiology test summary statistics
  async getRadiologyTestSummary(
    input: RadiologySummaryStatsInput
  ): Promise<ApiResponse<RadiologySummaryStatsDto[]>> {
    return apiClient.get(API_ENDPOINTS.visitRadiologyTest.GET_SUMMARY, {
      params: convertFilterToParams(input as FilterParams),
    });
  },

  // Get patient radiology tests for patient portal
  async getPatientRadiologyTests(
    filter: PatientRadiologyTestFilterDto
  ): Promise<ApiResponse<PaginationResponse<PatientPortalRadiologyTestDto>>> {
    return apiClient.get(API_ENDPOINTS.visitRadiologyTest.PATIENT_RADIOLOGY_TESTS, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get patient radiology test details
  async getPatientRadiologyTestDetails(
    id: string
  ): Promise<ApiResponse<PatientPortalRadiologyTestDto>> {
    return apiClient.get(API_ENDPOINTS.visitRadiologyTest.PATIENT_RADIOLOGY_TEST_DETAILS, {
      params: { id },
    });
  },
}; 