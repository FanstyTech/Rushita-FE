import { PaginationRequest, PaginationResponse } from '../types/pagination';

export interface SpecialtyDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface CreateUpdateSpecialtyDto {
  id?: string;
  nameL: string;
  nameF: string;
  description?: string;
  isActive: boolean;
}

export interface SpecialtyListDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface SpecialtyFilterDto extends PaginationRequest {
  nameL?: string;
  nameF?: string;
  isActive?: boolean;
}
