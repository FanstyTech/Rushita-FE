import { AttachmentDto } from './attachment';
import { PaginationRequest, PaginationResponse } from './pagination';
import { VisitStatus } from './visit';

// Test status enum
export enum TestStatus {
  Pending = 1,
  InProgress = 2,
  Completed = 3,
  Cancelled = 4,
  Failed = 5,
}

// Base VisitLabTest DTO
export interface VisitLabTestDto {
  id: string;
  visitId: string;
  visitNumber: string;
  labTestId: string;
  labTestName: string;
  labTestCode: string;
  labTestCategoryName: string;
  specialtyName: string;
  notes?: string;
  createdAt: string;
  status: TestStatus;
}

// Create/Update DTO
export interface CreateUpdateVisitLabTestDto {
  id?: string; // Optional for create operations
  visitId?: string;
  labTestId: string;
  notes?: string;
  testName?: string;
}

// List DTO (optimized for table display)
export interface VisitLabTestListDto {
  id: string;
  visitNumber: string;
  labTestName: string;
  labTestCode: string;
  labTestCategoryName: string;
  notes?: string;
  createdAt: string;
}

// Filter DTO for search and filtering
export interface VisitLabTestFilterDto extends PaginationRequest {
  visitId?: string;
  labTestId?: string;
  labTestCategoryId?: string;
  specialtyId?: string;
}

// Test item DTO for visit with tests
export interface TestItemDto {
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
export interface LabSummaryStatsDto {
  count: number;
  testStatus: TestStatus;
}
export interface LabSummaryStatsInput {
  clinicId?: string;
  doctorId?: string;
}
// Visit with tests DTO
export interface VisitWithTestsDto {
  id: string;
  patientId: string;
  patientName: string;
  visitDate: string;
  status: VisitStatus;
  tests: TestItemDto[];
}

// Input DTO for getting visits with lab tests
export interface GetVisitsWithLabTestsInput extends PaginationRequest {
  patientId?: string;
  fromDate?: string;
  toDate?: string;
  visitId?: string;
  testStatus?: TestStatus;
  clinicId?: string;
}

export interface UpdateVisitLabTestStatusDto {
  id: string;
  status: TestStatus;
}
export interface UpdateVisitLabTestResultDto {
  id: string;
  result: string;
  attachmentIds: string[];
}

// Patient Portal Lab Test DTO
export interface PatientPortalLabTestDto {
  id: string;
  visitId: string;
  visitNumber: string;
  labTestName: string;
  labTestCode: string;
  labTestCategoryName: string;
  specialtyName: string;
  doctorName: string;
  clinicName: string;
  notes?: string;
  result?: string;
  status: TestStatus;
  requestDate: string;
  resultDate?: string;
  abnormalFlags: number;
  criticalFlags: number;
  attachments?: AttachmentDto[];
}

// Patient Portal Filter DTO
export interface PatientLabTestFilterDto extends PaginationRequest {
  searchValue?: string;
  status?: TestStatus;
  testTypeId?: string;
  fromDate?: string;
  toDate?: string;
}
