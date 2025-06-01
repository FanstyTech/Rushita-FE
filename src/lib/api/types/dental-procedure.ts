import { PaginationRequest } from '../types/pagination';
export interface DentalProcedureDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  description: string;
  color: string;
  defaultCost: number;
  isActive: boolean;
}

export interface CreateUpdateDentalProcedureDto {
  id?: string;
  nameL: string;
  nameF: string;
  description?: string;
  color: string;
  defaultCost: number;
  isActive?: boolean;
}

export interface DentalProcedureListDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  defaultCost: number;
  isActive: boolean;
}

export interface DentalProcedureFilterDto extends PaginationRequest {
  minDefaultCost?: number;
  maxDefaultCost?: number;
  isActive?: boolean;
}
