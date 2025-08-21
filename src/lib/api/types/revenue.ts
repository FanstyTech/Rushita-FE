import { PaginationRequest } from './pagination';

export enum RevenueType {
  Visit = 1,
  Donations,
  GovernmentSupport,
  Other = 99,
}

export interface ClinicRevenueDto {
  id: string;
  clinicId: string;
  staffId?: string;
  revenueType: RevenueType;
  amount: number;
  revenueDate: string;
  description: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ClinicRevenueListDto {
  id: string;
  clinicId: string;
  clinicName: string;
  staffId?: string;
  staffName?: string;
  revenueType: RevenueType;
  amount: number;
  revenueDate: string;
  description?: string;
  createdAt: string;
}

export interface CreateUpdateClinicRevenueDto {
  id?: string;
  clinicId: string;
  staffId?: string;
  revenueType: RevenueType;
  amount: number;
  revenueDate: string;
  description?: string;
}

export interface ClinicRevenueFilterDto extends PaginationRequest {
  staffId?: string;
  revenueType?: RevenueType;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface ClinicRevenueSummaryFilterDto {
  staffId?: string;
  startDate?: string;
  endDate?: string;
}

export interface ClinicRevenueSummaryDto {
  totalRevenue?: number;
  thisMonthRevenue?: number;
  averageRevenue?: number;
  totalTransactions?: number;
}

export interface ClinicRevenueDashboardFilterDto {
  startDate?: string;
  endDate?: string;
}

export interface ClinicRevenueDashboardDto {
  totalRevenue: number;
  revenueCount: number;
  averageRevenue: number;
  monthlyRevenue: MonthlyRevenueDto[];
  revenueByType: RevenueByTypeDto[];
}

export interface MonthlyRevenueDto {
  month: string;
  totalAmount: number;
  count: number;
}
export interface RevenueByTypeDto {
  revenueType: RevenueType;
  amount: number;
  count: number;
}
