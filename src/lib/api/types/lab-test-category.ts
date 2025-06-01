import { PaginationRequest } from '../types/pagination';

export interface LabTestCategoryDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
  parentCategoryId?: string;
  parentCategoryName?: string;
}

export interface CreateUpdateLabTestCategoryDto {
  id?: string;
  nameL: string;
  nameF: string;
  isActive?: boolean;
  parentCategoryId?: string;
}

export interface LabTestCategoryListDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
  parentCategoryName?: string;
}

export interface LabTestCategoryFilterDto extends PaginationRequest {
  isActive?: boolean;
  parentCategoryId?: string;
}
