import { PaginationRequest, PaginationResponse } from './pagination';

// Visit status enum (matching backend)
export enum VisitStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
  Cancelled = 3,
}

// FrequencyType enum
export enum FrequencyType {
  Daily = 1,
  BID = 2, // Twice a day
  TID = 3, // Three times a day
  QID = 4, // Four times a day
  Weekly = 5,
  Monthly = 6,
  AsNeeded = 7,
}

// VisitType enum (define values based on your backend enum)
export enum VisitType {
  New = 1,
  Followup = 2,
}

// Base visit interface
export interface VisitDto {
  id: string;
  visitNumber: string;
  patientId: string;
  patientName: string;
  staffId: string;
  staffName: string;
  appointmentId?: string;
  type: VisitType;
  currentStatus: VisitStatus;
  notes: string;
  diagnoses: VisitDiagnosisDto[];
  prescriptions: VisitPrescriptionDto[];
  labTests: VisitLabTestDto[];
  radiologyTests: VisitRadiologyTestDto[];
  dentalProcedures: VisitDentalProcedureDto[];
  statusHistory: VisitStatusHistoryDto[];
  createdAt: string;
  updatedAt: string;
}

// Visit diagnosis DTO
export interface VisitDiagnosisDto {
  id?: string;
  visitId: string;
  diagnosis: string;
  notes?: string;
  createdAt?: string;
}

// Visit prescription (medication) DTO
export interface VisitPrescriptionDto {
  id?: string;
  visitId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
  createdAt?: string;
}

// Visit lab test DTO
export interface VisitLabTestDto {
  id?: string;
  visitId: string;
  testName: string;
  details?: string;
  results?: string;
  status?: number;
  createdAt?: string;
}

// Visit radiology test DTO
export interface VisitRadiologyTestDto {
  id?: string;
  visitId: string;
  testName: string;
  details?: string;
  results?: string;
  status?: number;
  createdAt?: string;
}

// Visit dental procedure DTO
export interface VisitDentalProcedureDto {
  id?: string;
  visitId: string;
  procedureName: string;
  toothNumber?: number;
  details?: string;
  status?: number;
  createdAt?: string;
}

// Visit status history DTO
export interface VisitStatusHistoryDto {
  id?: string;
  visitId: string;
  status: VisitStatus;
  notes?: string;
  createdAt?: string;
}

// Create visit DTO
export interface CreateVisitDto {
  patientId: string;
  staffId: string;
  appointmentId?: string;
  type: VisitType;
  notes?: string;
  diagnoses?: VisitDiagnosisDto[];
  prescriptions?: VisitPrescriptionDto[];
  labTests?: VisitLabTestDto[];
  radiologyTests?: VisitRadiologyTestDto[];
  dentalProcedures?: VisitDentalProcedureDto[];
}

// Update visit DTO
export interface UpdateVisitDto {
  patientId?: string;
  staffId?: string;
  appointmentId?: string;
  type?: VisitType;
  notes?: string;
}

// Visit list DTO (optimized for table display)
export interface VisitListDto {
  id: string;
  visitNumber: string;
  patientId: string;
  patientName: string;
  staffId: string;
  staffName: string;
  appointmentId?: string;
  type: VisitType;
  currentStatus: VisitStatus;
  createdAt: string;
}

// Filter DTO for search and filtering
export interface VisitFilterDto extends PaginationRequest {
  visitNumber?: string;
  patientId?: string;
  staffId?: string;
  appointmentId?: string;
  type?: VisitType;
  currentStatus?: VisitStatus;
  fromDate?: string;
  toDate?: string;
  searchValue?: string;
}

// Prescription DTO
export interface CreateOrUpdateVisitPrescriptionDto {
  id: string;
  name: string;
  dosage: string;
  frequency: FrequencyType;
  duration: number;
  notes?: string;
}

// Lab Test DTO
export interface CreateOrUpdateVisitLabTestDto {
  id: string;
  name?: string;
  notes?: string;
}

// Radiology Test DTO
export interface CreateOrUpdateVisitRadiologyTestDto {
  id: string;
  name?: string;
  notes?: string;
}

// Main Visit DTO
export interface CreateOrUpdateVisitDto {
  id?: string;
  patientId: string;
  staffId: string;
  clinicId: string;
  appointmentId?: string;
  nextVisitDate?: string; // or Date, depending on your usage
  followUpInstructions: string;
  diagnosis: string;
  type: VisitType;
  notes: string;
  symptoms: string;

  medications?: CreateOrUpdateVisitPrescriptionDto[];
  labTests?: CreateOrUpdateVisitLabTestDto[];
  rays?: CreateOrUpdateVisitRadiologyTestDto[];
  dentalProcedures?: VisitDentalProcedureDto[];
  attachments?: VisitPrescriptionDto[];
}
