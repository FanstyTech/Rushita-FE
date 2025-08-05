import {
  VisitLabTestDto,
  CreateUpdateVisitLabTestDto,
  VisitLabTestListDto,
  VisitLabTestFilterDto,
  VisitWithTestsDto,
  GetVisitsWithLabTestsInput,
  LabSummaryStatsDto,
  LabSummaryStatsInput,
  UpdateVisitLabTestStatusDto,
  UpdateVisitLabTestResultDto,
} from '../types/visit-lab-test';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

export const visitLabTestService = {
  // Get paginated list
  async getAll(
    filter: VisitLabTestFilterDto
  ): Promise<ApiResponse<PaginationResponse<VisitLabTestListDto>>> {
    return apiClient.get(API_ENDPOINTS.visitLabTest.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get single visit lab test by ID
  async getById(id: string): Promise<ApiResponse<VisitLabTestDto>> {
    return apiClient.get(API_ENDPOINTS.visitLabTest.GET_ONE.replace(':id', id));
  },

  // Create new visit lab test
  async create(
    data: CreateUpdateVisitLabTestDto
  ): Promise<ApiResponse<VisitLabTestDto>> {
    return apiClient.post(API_ENDPOINTS.visitLabTest.CREATE_OR_UPDATE, data);
  },

  // Update existing visit lab test
  async update(
    data: CreateUpdateVisitLabTestDto
  ): Promise<ApiResponse<VisitLabTestDto>> {
    return apiClient.post(API_ENDPOINTS.visitLabTest.CREATE_OR_UPDATE, data);
  },

  // Create or update (handles both cases)
  async createOrUpdate(
    data: CreateUpdateVisitLabTestDto
  ): Promise<ApiResponse<VisitLabTestDto>> {
    return apiClient.post(API_ENDPOINTS.visitLabTest.CREATE_OR_UPDATE, data);
  },

  // Update visit lab test status
  async updateStatus(
    data: UpdateVisitLabTestStatusDto
  ): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.visitLabTest.UPDATE_STATUS, data);
  },
  // Update visit lab test result
  async updateResult(
    data: UpdateVisitLabTestResultDto
  ): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.visitLabTest.UPDATE_RESULT, data);
  },

  // Delete visit lab test
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.visitLabTest.DELETE, {
      params: { id },
    });
  },

  // Get visit lab tests by visit ID
  async getByVisitId(visitId: string): Promise<ApiResponse<VisitLabTestDto[]>> {
    return apiClient.get(API_ENDPOINTS.visitLabTest.GET_BY_VISIT_ID, {
      params: { visitId },
    });
  },

  // Get visit lab tests by lab test ID
  async getByLabTestId(
    labTestId: string
  ): Promise<ApiResponse<VisitLabTestDto[]>> {
    return apiClient.get(API_ENDPOINTS.visitLabTest.GET_BY_LAB_TEST_ID, {
      params: { labTestId },
    });
  },

  // Get visits with lab tests
  async getVisitsWithLabTests(
    input: GetVisitsWithLabTestsInput
  ): Promise<ApiResponse<VisitWithTestsDto[]>> {
    return apiClient.get(API_ENDPOINTS.visitLabTest.GET_VISITS_WITH_LAB_TESTS, {
      params: convertFilterToParams(input as FilterParams),
    });
  },

  // Get lab test summary statistics
  async getLabTestSummary(
    input: LabSummaryStatsInput
  ): Promise<ApiResponse<LabSummaryStatsDto[]>> {
    return apiClient.get(API_ENDPOINTS.visitLabTest.GET_SUMMARY, {
      params: convertFilterToParams(input as FilterParams),
    });
  },
};
