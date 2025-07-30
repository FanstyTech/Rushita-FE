import { PaginationRequest } from './pagination';

export enum ServiceType {
  Visit = 1,
  Prescription = 2,
  LabTest = 3,
  Radiology = 4,
  Dental = 5,
}

export interface ServicePriceDto {
  id: string;
  serviceType: number;
  serviceId?: string;
  price: number;
  notes?: string;
  clinicId: string;
  clinicName?: string;
  doctorId: string;
  doctorName?: string;
  serviceName?: string;
  serviceTypeName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePriceListDto {
  id: string;
  serviceType: ServiceType;
  serviceName?: string;
  price: number;
  clinicId: string;
  clinicName: string;
  doctorId: string;
  doctorName: string;
  isActive: boolean;
}

export interface ServicePriceFilterDto extends PaginationRequest {
  serviceType?: ServiceType;
  clinicId?: string;
  doctorId?: string;
  isActive?: boolean;
}

export interface ServicePriceCreateUpdateDto {
  id?: string;
  serviceType: number;
  serviceId?: string;
  price: number;
  notes?: string;
  clinicId: string;
  doctorId?: string;
  isActive: boolean;
}

export interface GetServicesByTypeInput {
  serviceType: ServiceType;
  filter: string;
}

export interface ServicePriceSummaryDto {
  serviceType: ServiceType;
  count: number;
  averagePrice: number;
}

export interface ServicePriceSummaryFilterDto {
  clinicId?: string;
  doctorId?: string;
}
