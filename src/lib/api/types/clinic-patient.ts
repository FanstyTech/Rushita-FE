import { PaginationRequest } from './pagination';

// Enums
export enum Gender {
  Male = 1,
  Female = 2,
}

export enum MedicalConditionStatus {
  Controlled = 1,
  Monitoring = 2,
  Critical = 3,
}

export enum Severity {
  Mild = 1,
  Moderate = 2,
  Severe = 3,
}

export enum FrequencyType {
  Daily = 1,
  BID = 2,
  TID = 3,
  QID = 4,
  Weekly = 5,
  Monthly = 6,
  AsNeeded = 7,
}

export enum Relationship {
  Father = 1,
  Mother = 2,
  Sibling = 3,
}
export enum FamilyHistoryStatus {
  Living = 1,
  Deceased = 2,
}

export enum VisitType {
  New = 1,
  Followup = 2,
}

export enum AppointmentStatus {
  Scheduled = 1,
  Confirmed = 2,
  InProgress = 3,
  Completed = 4,
  Cancelled = 5,
  NoShow = 6,
}
export enum PatientStatus {
  Active = 1,
  Inactive = 2,
}

export enum BloodType {
  A_Positive = 1,
  A_Negative = 2,
  B_Positive = 3,
  B_Negative = 4,
  AB_Positive = 5,
  AB_Negative = 6,
  O_Positive = 7,
  O_Negative = 8,
}

// Blood type display names mapping
export const bloodTypeDisplayNames: Record<BloodType, string> = {
  [BloodType.A_Positive]: 'A+',
  [BloodType.A_Negative]: 'A-',
  [BloodType.B_Positive]: 'B+',
  [BloodType.B_Negative]: 'B-',
  [BloodType.AB_Positive]: 'AB+',
  [BloodType.AB_Negative]: 'AB-',
  [BloodType.O_Positive]: 'O+',
  [BloodType.O_Negative]: 'O-',
};

export interface ClinicPatientDto {
  id: string;
  // Basic Information
  fNameF: string;
  sNameF?: string;
  tNameF?: string;
  lNameF?: string;
  fNameL?: string;
  sNameL?: string;
  tNameL?: string;
  lNameL?: string;
  dateOfBirth: string;
  gender: Gender;
  // Contact Information
  email?: string;
  phoneNumber: string;
  countryCodeId?: string;
  // Location
  address?: string;
  countryId?: string;
  cityId?: string;
  // Medical Information
  bloodType?: BloodType;
  height?: number;
  weight?: number;
  // System Fields
  status: PatientStatus;
  imageUrl?: string;
  clinicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClinicPatientListDto {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber: string;
  gender: Gender;
  dateOfBirth: string;
  lastVisitDate?: string;
  totalVisits: number;
}

export interface CreateUpdateClinicPatientDto {
  id?: string;
  // Basic Information
  fNameF: string;
  sNameF?: string;
  tNameF?: string;
  lNameF?: string;
  fNameL?: string;
  sNameL?: string;
  tNameL?: string;
  lNameL?: string;
  dateOfBirth: string;
  gender: Gender;
  // Contact Information
  email?: string;
  phoneNumber: string;
  countryCodeId?: string;
  // Location
  address?: string;
  countryId?: string;
  cityId?: string;
  // Medical Information
  bloodType?: BloodType;
  height?: number;
  weight?: number;
  // System Fields
  clinicId?: string;
  primaryDoctorId?: string;
  preferredClinicId?: string;
}

export interface ClinicPatientFilterDto extends PaginationRequest {
  clinicId?: string;
  gender?: Gender;
  countryId?: string;
  cityId?: string;
  fromDate?: string;
  toDate?: string;
  status?: PatientStatus;
}

// DTOs
export interface PatientProfileDto {
  id: string;
  fullName: string;
  gender?: Gender;
  dateOfBirth?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  stats?: PatientStatsDto;
  medicalHistory: MedicalHistoryDto;
  appointments: PatientAppointmentDto[];
  recentActivity: PatientActivityDto[] | null;
  documents: PatientDocumentDto[] | null;
}
export interface PatientStatsDto {
  totalVisits: number;
  lastVisit?: string;
}
export interface PatientActivityDto {
  id: string;
  type: string;
  date: string;
  description: string;
}

export interface PatientDocumentDto {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  category: string;
  uploadedBy: string;
}

export interface MedicalHistoryDto {
  conditions: MedicalConditionDto[];
  allergies: AllergyDto[];
  medications: MedicationDto[];
  familyHistory: FamilyHistoryDto[];
}

export interface MedicationDto {
  id: string;
  name: string;
  dosage: string;
  frequency: FrequencyType;
  startDate: string;
}

export interface PatientAppointmentDto {
  id: string;
  date: string;
  type: VisitType;
  doctor?: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface MedicalConditionDto {
  id: string;
  name: string;
  diagnosedDate?: string;
  status?: MedicalConditionStatus;
  patientId: string;
}
export interface CreateOrUpdateMedicalConditionDto {
  id?: string;
  name: string;
  diagnosedDate?: string;
  status?: MedicalConditionStatus;
  patientId: string;
}

export interface AllergyDto {
  id: string;
  name: string;
  severity?: Severity;
  reaction?: string;
  patientId: string;
}

export interface CreateOrUpdateAllergyDto {
  id?: string;
  name: string;
  severity?: Severity;
  reaction?: string;
  patientId: string;
}

export interface FamilyHistoryDto {
  id: string;
  condition: string;
  relationship: Relationship;
  ageOfOnset?: number;
  status: FamilyHistoryStatus;
  notes: string;
  patientId: string;
}
export interface CreateOrUpdateFamilyHistoryDto {
  id?: string;
  condition: string;
  relationship: Relationship;
  ageOfOnset?: string;
  status: FamilyHistoryStatus;
  notes?: string;
  patientId: string;
}

export interface GetPatientDropdownInput {
  clinicId?: string;
  name?: string;
}
export interface GetPatientForViewDto {
  id: string;
  patientNumber: string;
  patientName: string;
  phoneNumber: string;
  age: number;
  bloodType?: BloodType;
  gender?: Gender;
}
