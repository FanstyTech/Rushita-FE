import { SelectOption } from './select-option';

export enum ClinicStatus {
  Active = 1,
  Inactive,
  PendingApproval,
  Rejected,
  Suspended,
  Closed,
}

export enum DayEnum {
  Sunday = 1,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
export enum StaffTypeEnum {
  Doctor = 1,
  Nurse = 2,
  Receptionist = 3,
  FinancialStaff = 4,
  ClinicAdministrator = 5,
  LabTechnician = 6,
  Pharmacist = 7,
}

export interface ClinicDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  bio?: string;
  email?: string;
  address?: string;
  phoneNumber: string;
  cityId?: string;
  clinicTypeId?: string;
  latitude?: number;
  longitude?: number;
  workingHours : WorkingHours[]
  specialtiess:Specialtiessdto[]
  staffdto:staffdto[]
}

export interface Specialtiessdto {
  id: string; 
  specialties: string;
}
export interface staffdto{
  id: string;
  name: string;
  staffType:StaffTypeEnum;
  specialty: string;
}



export interface WorkingHours {
  day: DayEnum;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface CreateUpdateClinicDto {
  id?: string;
  nameL: string;
  nameF: string;
  phoneNumber: string;
  bio?: string;
  email?: string;
  cityId?: string;
  countryId?: string;
  clinicTypeId?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  specialtyIds: string[];
  hours: WorkingHours[];
  social?: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
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

export interface GetUserInfoDto {
  email?: string;
  bio?: string;
  phoneNumber?: string;
  address: string;
}