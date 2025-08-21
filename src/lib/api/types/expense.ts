import { PaginationRequest } from './pagination';

export enum ExpenseType {
  Rent = 1,
  Utilities = 2,
  Salaries = 3,
  Supplies = 4,
  Equipment = 5,
  Maintenance = 6,
  Insurance = 7,
  Marketing = 8,
  Other = 9,
}

export interface ClinicExpenseDto {
  id: string;
  clinicId: string;
  staffId?: string;
  expenseType: ExpenseType;
  amount: number;
  expenseDate: string;
  description: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ClinicExpenseListDto {
  id: string;
  clinicId: string;
  clinicName: string;
  staffId?: string;
  staffName?: string;
  expenseType: ExpenseType;
  amount: number;
  expenseDate: string;
  description: string;
  notes?: string;
  createdAt: string;
}

export interface CreateUpdateClinicExpenseDto {
  id?: string;
  clinicId: string;
  staffId?: string;
  expenseType: ExpenseType;
  amount: number;
  expenseDate: string;
  description?: string;
}

export interface ClinicExpenseFilterDto extends PaginationRequest {
  staffId?: string;
  expenseType?: ExpenseType;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface ClinicExpenseSummaryFilterDto {
  staffId?: string;
  startDate?: string;
  endDate?: string;
}

export interface ClinicExpenseSummaryDto {
  totalExpenses?: number;
  thisMonthExpenses?: number;
  averageExpenses?: number;
  totalTransactions?: number;
}

export interface ClinicExpenseDashboardFilterDto {
  startDate?: string;
  endDate?: string;
}

export interface ClinicExpenseDashboardDto {
  totalExpenses: number;
  expenseCount: number;
  averageExpenses: number;
  monthlyExpenses: MonthlyExpenseDto[];
}

export interface MonthlyExpenseDto {
  month: string;
  totalAmount: number;
  count: number;
}
