import { PaginationRequest, PaginationResponse } from './pagination';

// Enum for condition types
export enum BookingConditionType {
  General = 1,
  Cancellation = 2,
  Payment = 3,
  Preparation = 4,
  Documentation = 5,
  Health = 6,
  Other = 7,
}

// Base DTO
export interface ClinicBookingConditionDto {
  id: string;
  clinicId: string;
  titleL: string;           // Arabic title
  titleF: string;           // English title
  title: string;            // Computed title based on current language
  descriptionL: string;     // Arabic description
  descriptionF: string;     // English description
  description: string;      // Computed description based on current language
  displayOrder: number;
  isActive: boolean;
  isRequired: boolean;      // If condition is mandatory for booking
  conditionType: BookingConditionType;
  conditionTypeName: string;
  createdAt: string;
  updatedAt: string;
}

// Create/Update DTO
export interface CreateUpdateClinicBookingConditionDto {
  id?: string;              // Optional for create operations
  clinicId: string;
  titleL: string;
  titleF: string;
  descriptionL: string;
  descriptionF: string;
  displayOrder: number;
  isActive: boolean;
  isRequired: boolean;
  conditionType: BookingConditionType;
}

// List DTO (optimized for table display)
export interface ClinicBookingConditionListDto {
  id: string;
  clinicId: string;
  titleL: string;
  titleF: string;
  title: string;
  descriptionL: string;
  descriptionF: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  isRequired: boolean;
  conditionType: BookingConditionType;
  conditionTypeName: string;
  createdAt: string;
}

// Filter DTO for search and filtering
export interface ClinicBookingConditionFilterDto extends PaginationRequest {
  clinicId?: string;
  conditionType?: BookingConditionType;
  isActive?: boolean;
  isRequired?: boolean;
  searchValue?: string;     // General search across multiple fields
}

// Dropdown option DTO
export interface ClinicBookingConditionSelectOption {
  value: string;
  label: string;
}

// Status update DTO
export interface UpdateClinicBookingConditionStatusDto {
  id: string;
  isActive: boolean;
}

// Dropdown filter DTO
export interface ClinicBookingConditionDropdownFilterDto {
  clinicId?: string;
  conditionType?: BookingConditionType;
  isActive?: boolean;
  isRequired?: boolean;
}
