import { PaginationRequest } from './pagination';
export enum ClinicStaffStatus {
  Active = 1,
  Inactive,
  OnLeave,
  Suspended,
  Terminated,
}
export enum StaffType {
  Doctor = 1,
  Nurse = 2,
  Receptionist = 3,
  FinancialStaff = 4,
  Administrator = 5,
  LabTechnician = 6,
  Pharmacist = 7,
}

export interface ClinicStaffDto {
  id: string;
  email: string;
  address: string;
  name: string;
  specialization:string;
  phoneNumber: string;
  dateOfBirth?: string; 
  clinicId : string,
  personId : string,
  specialtyId:string 
}

export interface UpdateClinicStaffStatusDto {
  id?: string;
  status: ClinicStaffStatus;
  reason?: string;
}
export interface CreateUpdateClinicStaffDto {
  id?: string;
  fNameF?: string;
  lNameF?: string;
  fNameL?: string;
  lNameL?: string;
  email?: string;
  password?: string;
  joinDate: string;
  staffType: StaffType;
  clinicId?: string;
  specialtyId?: string;
}

export interface ClinicStaffListDto {
  id: string;
  personName: string;
  clinicName: string;
  specialtyName: string;
  staffType: StaffType;
  status: ClinicStaffStatus;
}

export interface ClinicStaffFilterDto extends PaginationRequest {
  clinicId?: string;
  specialtyId?: string;
  status?: ClinicStaffStatus;
}
export interface ChangeStaffPasswordDto {
  id: string;
  newPassword: string;
}
export interface GetClinicStaffForDropdownInput {
  clinicId?: string;
  filter?: string;
  all?: boolean | true;
}
