import { PaginationRequest } from './pagination';
import { ServiceType } from './service-price';

export enum InvoiceStatus {
  Pending = 1,
  PartiallyPaid = 2,
  Paid = 3,
  Cancelled = 4,
}
export enum PaymentMethod {
  Cash = 1,
  Card = 2,
  BankTransfer = 3,
  Insurance = 4,
  Other = 5,
}

export interface InvoiceDto {
  id: string;
  clinicId: string;
  visitId: string;
  doctorName: string;
  patientName: string;
  patientId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
  status: InvoiceStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  items?: InvoiceItemDto[];
  payments?: PaymentDto[];
}

export interface InvoiceListDto {
  id: string;
  clinicId: string;
  clinicName: string;
  visitId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
  status: InvoiceStatus;
  createdAt: string;
  notes?: string;
}
export class InvoiceItemDto {
  quantity!: number; // int
  total!: number; // decimal
  serviceType?: ServiceType; // nullable enum
}
export interface CreateUpdateInvoiceDto {
  id?: string;
  clinicId?: string;
  visitId: string;
  patientId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  notes?: string;
}

export interface InvoiceFilterDto extends PaginationRequest {
  patientId?: string;
  visitId?: string;
  status?: InvoiceStatus;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface InvoiceSummaryFilterDto {
  startDate?: string;
  endDate?: string;
}

export interface InvoiceSummaryDto {
  totalInvoices?: number;
  totalAmount?: number;
  totalPaid?: number;
  totalUnpaid?: number;
  overdueInvoices?: number;
}

export interface InvoiceDashboardFilterDto {
  startDate?: string;
  endDate?: string;
}

export interface InvoiceDashboardDto {
  totalInvoices: number;
  totalAmount: number;
  totalPaid: number;
  totalUnpaid: number;
  overdueInvoices: number;
  monthlyInvoices: MonthlyInvoiceDto[];
  invoicesByStatus: InvoiceByStatusDto[];
}

export interface MonthlyInvoiceDto {
  month: string;
  totalAmount: number;
  count: number;
}

export interface InvoiceByStatusDto {
  status: InvoiceStatus;
  amount: number;
  count: number;
}
export interface PaymentDto {
  id?: string;
  invoiceId?: string;
  paymentDate: string;
  amount: number;
  method: PaymentMethod;
  referenceNumber?: string;
  notes?: string;
  createdAt?: string;
}
