import { StaffType } from './clinic-staff';
import { PaginationRequest } from './pagination';

export enum SalaryStatus {
  Pending = 1,
  Paid = 2,
  Cancelled = 3,
}

export interface StaffSalaryDto {
  id: string;
  clinicId: string;
  staffId: string;
  amount: number;
  salaryMonth: string; // YYYY-MM format
  status: SalaryStatus;
  paidDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface StaffSalaryListDto {
  id: string;
  clinicId: string;
  clinicName: string;
  staffId: string;
  staffName: string;
  staffType: StaffType;
  amount: number;
  salaryMonth: string;
  status: SalaryStatus;
  paidDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface StaffSalarySummaryDto {
  totalSalaries?: number;
  totalAmount?: number;
  totalPaid?: number;
  pendingSalaries?: number;
  pendingAmount?: number;
}

export interface StaffSalaryFilterDto extends PaginationRequest {
  searchValue?: string;
  status?: SalaryStatus;
  fromDate?: string;
  toDate?: string;
  staffId?: string;
}

export interface StaffSalarySummaryFilterDto {
  fromDate?: string;
  toDate?: string;
  staffId?: string;
}

export interface CreateUpdateStaffSalaryDto {
  id?: string;
  staffId: string;
  amount: number;
  salaryMonth: string;
  status: SalaryStatus;
  paidDate?: string;
  notes?: string;
}
