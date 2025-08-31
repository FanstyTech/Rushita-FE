import { AttachmentDto } from './attachment';
import { PaginationRequest } from './pagination';
import { VisitStatus } from './visit';
import { TestStatus } from './visit-lab-test';

// Base VisitRadiologyTest DTO
export interface VisitRadiologyTestDto {
  id: string;
  visitId: string;
  visitNumber: string;
  radiologyTestId: string;
  radiologyTestName: string;
  radiologyTestCode: string;
  radiologyTestCategoryName: string;
  specialtyName: string;
  notes?: string;
  result?: string;
  createdAt: string;
  updatedAt?: string;
  status: TestStatus;
}

// Create/Update DTO
export interface CreateUpdateVisitRadiologyTestDto {
  id?: string; // Optional for create operations
  visitId?: string;
  radiologyTestId: string;
  notes?: string;
  testName?: string;
}

// List DTO (optimized for table display)
export interface VisitRadiologyTestListDto {
  id: string;
  visitNumber: string;
  radiologyTestName: string;
  radiologyTestCode: string;
  radiologyTestCategoryName: string;
  notes?: string;
  createdAt: string;
}

// Filter DTO for search and filtering
export interface VisitRadiologyTestFilterDto extends PaginationRequest {
  visitId?: string;
  radiologyTestId?: string;
  radiologyTestCategoryId?: string;
  specialtyId?: string;
  doctorId?: string;
  clinicId?: string;
}

// Test item DTO for visit with tests
export interface RadiologyTestItemDto {
  id: string;
  visitId: string;
  patientId: string;
  patientName: string;
  testName: string;
  details?: string;
  results?: string;
  status: TestStatus;
  createdAt: string;
  tempId: string;
  attachments?: AttachmentDto[];
}

export interface RadiologySummaryStatsDto {
  count: number;
  testStatus: TestStatus;
}

export interface RadiologySummaryStatsInput {
  clinicId?: string;
  doctorId?: string;
}

// Visit with tests DTO
export interface VisitWithRadiologyTestsDto {
  id: string;
  patientId: string;
  patientName: string;
  visitDate: string;
  status: VisitStatus;
  tests: RadiologyTestItemDto[];
}

// Input DTO for getting visits with radiology tests
export interface GetVisitsWithRadiologyTestsInput extends PaginationRequest {
  patientId?: string;
  doctorId?: string;
  clinicId?: string;
  fromDate?: string;
  toDate?: string;
  visitId?: string;
  testStatus?: TestStatus;
}

export interface UpdateVisitRadiologyTestStatusDto {
  id: string;
  status: TestStatus;
}

export interface UpdateVisitRadiologyTestResultDto {
  id: string;
  result?: string;
  attachmentIds?: string[];
}

// Patient Portal Radiology Test DTO
export interface PatientPortalRadiologyTestDto {
  id: string;
  visitId: string;
  visitNumber: string;
  radiologyTestName: string;
  radiologyTestCode: string;
  radiologyTestCategoryName: string;
  specialtyName: string;
  doctorName: string;
  clinicName: string;
  radiologyCenterName: string;
  notes?: string;
  result?: string;
  status: TestStatus;
  requestDate: string;
  testDate?: string;
  resultDate?: string;
  attachments?: AttachmentDto[];
}

// Patient Portal Filter DTO
export interface PatientRadiologyTestFilterDto extends PaginationRequest {
  searchValue?: string;
  status?: TestStatus;
  specialtyId?: string;
  fromDate?: string;
  toDate?: string;
}
