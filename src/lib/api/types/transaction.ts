import { PaginationRequest } from './pagination';

export enum TransactionType {
  Inflow = 1,
  Outflow = 2,
}

export enum ReferenceType {
  Revenue = 1,
  Expense = 2,
  Salary = 3,
  Invoice = 4,
}

export interface ClinicTransactionDto {
  id: string;
  clinicId: string;
  transactionType: TransactionType;
  amount: number;
  transactionDate: string;
  description: string;
  referenceType: ReferenceType;
  referenceId: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ClinicTransactionListDto {
  id: string;
  clinicId: string;
  clinicName: string;
  transactionType: TransactionType;
  amount: number;
  transactionDate: string;
  description: string;
  referenceType: ReferenceType;
  referenceId: string;
  createdAt: string;
}

export interface CreateUpdateClinicTransactionDto {
  id?: string;
  clinicId: string;
  transactionType: TransactionType;
  amount: number;
  transactionDate: string;
  description: string;
  referenceType: ReferenceType;
  referenceId: string;
  notes?: string;
}

export interface ClinicTransactionFilterDto extends PaginationRequest {
  transactionType?: TransactionType;
  referenceType?: ReferenceType;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface ClinicTransactionSummaryFilterDto {
  startDate?: string;
  endDate?: string;
}

export interface ClinicTransactionSummaryDto {
  totalInflow?: number;
  totalOutflow?: number;
  netAmount?: number;
  totalTransactions?: number;
  thisMonthTransactions?: number;
}

export interface ClinicTransactionDashboardFilterDto {
  startDate?: string;
  endDate?: string;
}

export interface ClinicTransactionDashboardDto {
  totalInflow: number;
  totalOutflow: number;
  netAmount: number;
  transactionCount: number;
  monthlyTransactions: MonthlyTransactionDto[];
}

export interface MonthlyTransactionDto {
  month: string;
  inflow: number;
  outflow: number;
  netAmount: number;
  count: number;
}
