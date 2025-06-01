import { PaginationRequest } from './pagination';

export interface RadiologyTestCategoryDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
  parentCategoryId?: string;
  parentCategoryName?: string;
}

export interface CreateUpdateRadiologyTestCategoryDto {
  id?: string;
  nameL: string;
  nameF: string;
  isActive?: boolean;
  parentCategoryId?: string;
}

export interface RadiologyTestCategoryListDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
  parentCategoryName?: string;
}

export interface RadiologyTestCategoryFilterDto extends PaginationRequest {
  isActive?: boolean;
  parentCategoryId?: string;
}
