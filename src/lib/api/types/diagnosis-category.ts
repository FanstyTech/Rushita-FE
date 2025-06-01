import { PaginationRequest } from '../types/pagination';

export interface DiagnosisCategoryDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
  parentCategoryId?: string;
  parentCategoryName?: string;
}

export interface CreateUpdateDiagnosisCategoryDto {
  id?: string;
  nameL: string;
  nameF: string;
  isActive?: boolean;
  parentCategoryId?: string;
}

export interface DiagnosisCategoryListDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
  parentCategoryName?: string;
}

export interface DiagnosisCategoryFilterDto extends PaginationRequest {
  isActive?: boolean;
  parentCategoryId?: string;
}
