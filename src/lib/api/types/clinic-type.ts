import { PaginationRequest } from './pagination';

export interface ClinicTypeDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
}

export interface CreateUpdateClinicTypeDto {
  id?: string;
  nameL: string;
  nameF: string;
  isActive: boolean;
}

export interface ClinicTypeListDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
}

export interface ClinicTypeFilterDto extends PaginationRequest {
  isActive?: boolean;
  searchValue?: string;
}
