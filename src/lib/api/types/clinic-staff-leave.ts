export enum LeaveType {
  Annual = 1,
  Sick,
  Maternity,
  Paternity,
  Unpaid,
  Emergency,
  Study,
  Compassionate,
}

export enum LeaveStatus {
  Pending = 1,
  Approved,
  Rejected,
  Cancelled,
}

export interface ClinicStaffLeaveDto {
  id: string;
  staffId: string;
  staffName: string;
  startDate: string;
  endDate: string;
  type: LeaveType;
  status: LeaveStatus;
  reason: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateUpdateClinicStaffLeaveDto {
  id?: string;
  staffId?: string;
  startDate?: string;
  endDate?: string;
  type?: LeaveType;
  reason: string;
}

export interface ClinicStaffLeaveListDto {
  id: string;
  staffName: string;
  startDate: string;
  endDate: string;
  type: LeaveType;
  status: LeaveStatus;
  createdAt: string;
  reason: string;
}

export interface ClinicStaffLeaveFilterDto {
  pageNumber: number;
  pageSize: number;
  searchValue?: string;
  clinicId?: string;
  staffId?: string;
  status?: LeaveStatus;
  type?: LeaveType;
  startDate?: string;
  endDate?: string;
}

export interface UpdateClinicStaffLeaveStatusDto {
  id: string;
  status: LeaveStatus;
}
