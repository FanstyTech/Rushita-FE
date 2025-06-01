import { SelectOption } from './select-option';
export enum ClinicStatus {
  Active = 1,
  Inactive,
  PendingApproval,
  Rejected,
  Suspended,
  Closed,
}

export interface ClinicDto {
  id: string;
  nameL: string;
  nameF: string;
  address: string;
  phoneNumber: string;
  cityId?: string;
  clinicTypeId?: string;
  latitude?: number;
  longitude?: number;
}

export interface CreateUpdateClinicDto {
  nameL: string;
  nameF: string;
  phoneNumber: string;
  cityId?: string;
  clinicTypeId?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  specialtyIds: string[];
}

export interface ClinicListDto extends ClinicDto {
  clinicTypeName?: string;
  cityName?: string;
  specialties?: SelectOption<string>[];
  status?: ClinicStatus;
  rating?: number;
  doctorsCount?: number;
  patientsCount?: number;
}

export interface ClinicFilterDto {
  pageNumber: number;
  pageSize: number;
  sortColumn?: string;
  sortDirection?: string;
  searchValue?: string;
  cityId?: string;
  specialtyId?: string;
  clinicTypeId?: string;
  status?: ClinicStatus;
}
