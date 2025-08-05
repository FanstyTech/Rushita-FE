import { PaginationRequest } from './pagination';
import { TestStatus } from './visit-lab-test';

export interface VisitRadiologyTestDto {
  id: string;
  visitId: string;
  visitNumber: string;
  radiologyTestId: string;
  radiologyTestName: string;
  radiologyTestCode: string;
  radiologyTestCategoryName: string;
  specialtyName: string;
  notes: string;
  createdAt: string;
  status: TestStatus;
}
export interface CreateUpdateVisitRadiologyTestDto {
  id?: string;
  visitId?: string;
  radiologyTestId: string;
  notes?: string;
  testName?: string;
}
export interface VisitRadiologyTestListDto {
  id: string;
  visitNumber: string;
  radiologyTestName: string;
  radiologyTestCode: string;
  radiologyTestCategoryName: string;
  notes: string;
  createdAt: string;
}
export interface VisitRadiologyTestFilterDto extends PaginationRequest {
  visitId?: string;
  radiologyTestId?: string;
  radiologyTestCategoryId?: string;
  specialtyId?: string;
}
export interface VisitRadiologyTestItemDto {
  id: string;
  visitId: string;
  patientId: string;
  patientName: string;
  testName: string;
  details?: string;
  results?: string;
  status: number; // Assuming status is a number
  createdAt: string;
  tempId: string; // Temporary ID for client-side operations
}

export interface VisitWithRadiologyTestsDto {
  id: string;
  patientId: string;
  patientName: string;
  visitNumber: string;
  radiologyTests: VisitRadiologyTestItemDto[];
  createdAt: string;
}
export interface VisitRadiologyTestStatusHistoryDto {
  id?: string;
  visitId: string;
  radiologyTestId: string;
  status: number; // Assuming status is a number
  notes?: string;
  createdAt?: string;
}
// Input DTO for getting visits with lab tests
export interface GetVisitsWithRadiologyTestsInput {
  patientId?: string;
  fromDate?: string;
  toDate?: string;
  visitId?: string;
  testStatus?: TestStatus;
}
