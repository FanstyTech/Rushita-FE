import {
  CreateUpdateVisitPrescriptionDto,
  FrequencyType,
} from './visit-prescription';
import { PaginationRequest } from './pagination';
import { CreateUpdateVisitLabTestDto, VisitLabTestDto } from './visit-lab-test';
import {
  CreateUpdateVisitRadiologyTestDto,
  VisitRadiologyTestDto,
} from './visit-radiology-test';

// Visit status enum (matching backend)
export enum VisitStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
  Cancelled = 3,
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
  symptoms: string;
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
  name: string;
  notes?: string;
  createdAt?: string;
}

// Visit prescription (medication) DTO
export interface VisitPrescriptionDto {
  id?: string;
  visitId: string;
  medicineName: string;
  dosage: string;
  frequency: FrequencyType;
  duration: string;
  notes?: string;
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
  clinicId?: string;
  appointmentId?: string;
  type?: VisitType;
  currentStatus?: VisitStatus;
  fromDate?: string;
  toDate?: string;
  searchValue?: string;
  forPharmcy?: boolean;
}

// Prescription DTO
// export interface CreateOrUpdateVisitPrescriptionDto {
//   id: string;
//   name: string;
//   dosage: string;
//   frequency: FrequencyType;
//   duration: number;
//   notes?: string;
// }

// Lab Test DTO
// export interface CreateOrUpdateVisitLabTestDto {
//   id: string;
//   name?: string;
//   notes?: string;
// }

// Radiology Test DTO
// export interface CreateOrUpdateVisitRadiologyTestDto {
//   id: string;
//   name?: string;
//   notes?: string;
//   rayName: string;
// }

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

  medications?: CreateUpdateVisitPrescriptionDto[];
  labTests?: CreateUpdateVisitLabTestDto[];
  rays?: CreateUpdateVisitRadiologyTestDto[];
  dentalProcedures?: VisitDentalProcedureDto[];
  attachments?: VisitPrescriptionDto[];
}
