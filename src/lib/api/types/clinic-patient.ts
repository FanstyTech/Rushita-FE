import { AppointmentStatus } from './appointment';
import { PaginationRequest } from './pagination';
import { TestStatus, VisitLabTestDto } from './visit-lab-test';
import { FrequencyType, VisitPrescriptionDto } from './visit-prescription';
import { VisitRadiologyTestDto } from './visit-radiology-test';

// Enums
export enum Gender {
  Male = 1,
  Female = 2,
}
export enum BMICategory {
  Underweight = 1,
  Normal,
  Overweight,
  Obese,
}
export enum IdentificationType {
  NationalID = 1,
  Passport,
  DriverLicense,
  Other,
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

export enum Relationship {
  Parent = 1,
  Spouse = 2,
  Sibling = 3,
  Child = 4,
  Relative = 5,
  Friend = 6,
  Neighbor = 7,
  Other = 99,
}
export enum FamilyHistoryStatus {
  Living = 1,
  Deceased = 2,
}

export enum VisitType {
  New = 1,
  Followup = 2,
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
export { FrequencyType };

// New types for Patient Portal Profile
export interface PatientPortalProfileDto {
  id: string;
  userId?: string;
  patientNumber: string;
  registrationDate: string;

  // Personal Information
  personalInfo: PersonalInformationDto;

  // Emergency Contact
  emergencyContact: EmergencyContactDto;

  // Medical Information
  medicalInfo: MedicalInformationDto;

  // Insurance Information
  insuranceInfo: InsuranceInformationDto;

  // Health Indicators
  healthIndicators: HealthIndicatorsDto;
}

export interface PersonalInformationDto {
  imageUrl?: string;
  // Names
  fNameF?: string;
  sNameF?: string;
  tNameF?: string;
  lNameF?: string;
  fNameL?: string;
  sNameL?: string;
  tNameL?: string;
  lNameL?: string;
  shortName?: string;

  // Basic Info
  dateOfBirth?: string;
  gender?: Gender;
  email?: string;
  phoneNumber?: string;
  phoneNumberWithCode?: string;
  address?: string;

  // Location
  countryCodeId?: string;
  countryId?: string;
  cityId?: string;

  // Additional
  preferredLanguage: string;
  idType?: IdentificationType;
  idNum?: string;
  imageId?: string;
}

export interface EmergencyContactDto {
  id?: string;
  patientId?: string;
  name: string;
  phone: string;
  relationship: Relationship;
  isPrimary: boolean;
}

export interface MedicalInformationDto {
  bloodType: BloodType;
  height: number; // in cm
  weight: number; // in kg
  bmiValue?: number;
  bmiCategory?: BMICategory;
  allergies: AllergyDto[];
  medicalConditions: MedicalConditionDto[];
  currentMedications: MedicationDto[];
}

export interface InsuranceInformationDto {
  provider?: string;
  policyNumber?: string;
  expiryDate?: string;
  coverageType?: string;
  copayment?: number;
  annualLimit?: number;
  exclusions?: string;
  notes?: string;
}

export interface HealthIndicatorsDto {
  bloodPressure: BloodPressureDto;
  bloodSugar: BloodSugarDto;
  heartRate: HeartRateDto;
  cholesterol: CholesterolDto;
}

export interface BloodPressureDto {
  systolic?: number;
  diastolic?: number;
  status?: MetricStatus;
  lastUpdated?: string;
  trend?: HealthTrend;
  history?: BloodPressureHistoryDto[];
}
export interface BloodPressureHistoryDto {
  systolic?: number;
  diastolic?: number;
}

export interface BloodSugarDto {
  value?: number;
  status?: MetricStatus;
  lastUpdated?: string;
  trend?: HealthTrend;
  history?: number[];
}

export interface HeartRateDto {
  value?: number;
  status?: MetricStatus;
  lastUpdated?: string;
  trend?: HealthTrend;
  history?: number[];
}

export interface CholesterolDto {
  total?: number;
  hdl?: number;
  ldl?: number;
  status?: MetricStatus;
  lastUpdated?: string;
  trend?: HealthTrend;
}

// Update DTO for Patient Portal Profile
export interface UpdatePatientPortalProfileDto {
  id: string;
  personalInfo: PersonalInformationDto;
  emergencyContact: EmergencyContactDto;
  medicalInfo: MedicalInformationDto;
  insuranceInfo?: InsuranceInformationDto;
  healthIndicators: HealthIndicatorsDto;
}

// Health Metrics DTOs
export interface PatientHealthMetricDto {
  id: string;
  patientId: string;

  // Blood Pressure
  systolic?: number;
  diastolic?: number;

  // Blood Sugar
  bloodSugar?: number;

  // Heart Rate
  heartRate?: number;

  // Cholesterol
  cholesterolTotal?: number;
  cholesterolHDL?: number;
  cholesterolLDL?: number;

  // Calculated Properties
  bloodPressureStatus: MetricStatus;
  bloodSugarStatus: MetricStatus;
  heartRateStatus: MetricStatus;
  cholesterolStatus: MetricStatus;
}

export interface UpdatePatientHealthMetricDto {
  patientId: string;
  systolic?: number;
  diastolic?: number;
  bloodSugar?: number;
  heartRate?: number;
  cholesterolTotal?: number;
  cholesterolHDL?: number;
  cholesterolLDL?: number;
}

export interface CreateOrUpdateEmergencyContactDto {
  id?: string;
  patientId: string;
  name: string;
  phone: string;
  relationship: Relationship;
  isPrimary: boolean;
}

// Enums for Health Metrics
export enum MetricStatus {
  Low = 1,
  Normal = 2,
  Elevated = 3,
  High = 4,
  Critical = 5,
  Borderline = 6,
  Unknown = 7,
}

export enum HealthTrend {
  Unknown = 0,
  Improving = 1,
  Stable = 2,
  Worsening = 3,
}

// Patient Portal Dashboard Types
export interface PatientPortalDashboardDto {
  id: string;
  recentAppointments: PatientPortalAppointmentsDto[];
  recentVisits: PatientPortalVisitsDto[];
  activePrescriptionsList: PatientPortalPrescriptionsDto[];
  healthIndicators?: HealthIndicatorsDto;
  medicalInfo?: MedicalInformationDto;
}

// Patient Portal Appointments Types
export interface PatientPortalAppointmentsDto {
  id: string;
  appointmentNumber: string;
  date: string;
  startTime: string;
  endTime: string;
  type: VisitType;
  status: AppointmentStatus;
  cancellationReason?: string;
  notes?: string;
  doctorName: string;
  clinicName: string;
  clinicAddress: string;
  doctorSpecialization?: string;
  isUpcoming: boolean;
  isToday: boolean;
  timeRange: string;
  statusDisplay: string;
}

export interface PatientAppointmentFilterDto {
  pageNumber?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  status?: string;
  type?: string;
  clinicId?: string;
  staffId?: string;
  isUpcoming?: boolean;
}

// Patient Portal Visits Types
export interface PatientPortalVisitsDto {
  id: string;
  visitNumber: string;
  createdAt: string;
  type: VisitType;
  currentStatus: string;
  symptoms?: string;
  followUpInstructions?: string;
  nextVisitDate?: string;
  notes?: string;
  doctorName: string;
  clinicName: string;
  doctorSpecialization: string;
  appointmentNumber?: string;
  diagnoses: VisitDiagnosisDto[];
  prescriptions: VisitPrescriptionDto[];
  labTests: VisitLabTestDto[];
  radiologyTests: VisitRadiologyTestDto[];
}

export interface PatientVisitFilterDto {
  pageNumber?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  status?: string;
  type?: string;
  clinicId?: string;
  staffId?: string;
}

export interface VisitDiagnosisDto {
  id: string;
  description: string;
  diagnosisCode: string;
}

// Patient Portal Prescriptions Types
export interface PatientPortalPrescriptionsDto {
  id: string;
  visitId: string;
  visitNumber: string;
  createdAt: string;
  medicineName: string;
  medicineCode: string;
  scientificName?: string;
  description?: string;
  dosageForm?: string;
  strength?: string;
  dosage: number;
  frequency: FrequencyType;
  frequencyNotes?: string;
  duration: number;
  durationUnit: string;
  status: string;
  route?: string;
  instructions?: string;
  notes?: string;
  quantity: number;
  dispensedQuantity: number;
  expiryDate?: string;
  lastDispensedDate?: string;
  prescribeDate?: string;
  prescribedByName: string;
}

export interface PatientPrescriptionFilterDto {
  pageNumber?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  status?: string;
  visitId?: string;
  medicineId?: string;
  isActive?: boolean;
}

// Update DTOs
export interface UpdatePatientAppointmentDto {
  id: string;
  status: AppointmentStatus;
  cancellationReason?: string;
}

export interface UpdatePatientPrescriptionDto {
  id: string;
  notes?: string;
  instructions?: string;
}
export interface SavePatientAppointmentDto {
  date: string;
  startTime: string;
  appointmentReason: string;
  staffId: string;
  clinicId: string;
  type: VisitType;
}

// Book Follow-up Appointment DTO
export interface BookFollowUpAppointmentDto {
  originalAppointmentId: string;
  preferredDate?: string; // YYYY-MM-DD format
  appointmentReason?: string;
}
