import { DosageForm, MedicineStrength } from './medicine';
import { PaginationRequest, PaginationResponse } from './pagination';

// Prescription status enum
export enum PrescriptionStatus {
  Pending = 1,
  PartiallyDispensed = 2,
  FullyDispensed = 3,
  Cancelled = 4,
  Expired = 5,
}

// Frequency type enum
export enum FrequencyType {
  Daily = 1,
  BID = 2, // Twice a day
  TID = 3, // Three times a day
  QID = 4, // Four times a day
  Weekly = 5,
  Monthly = 6,
  AsNeeded = 7,
}

// Duration unit enum
export enum DurationUnit {
  Day = 1,
  Week = 2,
  Month = 3,
}

// Base VisitPrescription DTO
export interface VisitPrescriptionDto {
  id: string;
  visitId: string;
  visitNumber: string;
  medicineId: string;
  medicineName: string;
  medicineCode: string;
  dosage: string;
  frequency: FrequencyType;
  frequencyNotes?: string;
  duration: number;
  quantity: number;
  durationUnit: DurationUnit;
  status: PrescriptionStatus;
  route?: string;
  instructions?: string;
  notes?: string;
  expiryDate?: string;
  lastDispensedDate?: string;
  remainingQuantity: number;
  dispensedQuantity: number;
  createdAt: string;
  updatedAt?: string;
}

// Create/Update DTO
export interface CreateUpdateVisitPrescriptionDto {
  id?: string;
  visitId?: string;
  medicineId: string;
  name: string;
  dosage: number;
  frequency: FrequencyType;
  frequencyNotes?: string;
  duration: number;
  quantity?: number;
  durationUnit?: DurationUnit;
  status?: PrescriptionStatus;
  route?: string;
  instructions?: string;
  notes?: string;
  expiryDate?: string;
  lastDispensedDate?: string;
  remainingQuantity?: number;
  dispensedQuantity?: number;
}

// List DTO (optimized for table display)
export interface VisitPrescriptionListDto {
  id: string;
  visitNumber: string;
  medicineName: string;
  dosage: string;
  frequency: FrequencyType;
  duration: number;
  durationUnit: DurationUnit;
  status: PrescriptionStatus;
  expiryDate?: string;
  remainingQuantity: number;
  dispensedQuantity: number;
  createdAt: string;
}

// Filter DTO for search and filtering
export interface VisitPrescriptionFilterDto extends PaginationRequest {
  visitId?: string;
  medicineId?: string;
  status?: PrescriptionStatus;
  frequency?: FrequencyType;
  durationUnit?: DurationUnit;
  expiryDateFrom?: string;
  expiryDateTo?: string;
}

// Medication item DTO
export interface MedicationItemDto {
  id: string;
  code?: string;
  name?: string;
  scientificName?: string;
  description?: string;
  strength: MedicineStrength;
  dosageForm: DosageForm;
  medicationTypeName?: string;
}

// Prescribed medication item DTO
export interface PrescribedMedicationItemDto {
  id: string;
  patientNumber: string;
  visitNumber: string;
  patientId: string;
  patientName: string;
  medicationId: string;
  medication: MedicationItemDto;
  prescribedDate?: string;
  prescribedBy: string;
  prescribedByName: string;
  dosage: string;
  frequency: FrequencyType;
  duration: string;
  quantity: number;
  dispensedQuantity: number;
  remainingQuantity: number;
  notes?: string;
  status: PrescriptionStatus;
  lastDispensedDate?: string;
  expiryDate?: string;
  createdAt: string;
  updatedAt?: string;
}

// Update status DTO
export interface UpdatePrescriptionStatusDto {
  id: string;
  status: PrescriptionStatus;
}

// Dispense medicine DTO
export interface DispenseMedicineDto {
  id: string;
  dispensedQuantity: number;
  notes?: string;
}
