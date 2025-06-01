import { PaginationRequest } from './pagination';

export interface RadiologyTestDto {
  id: string;
  code: string;
  nameL: string;
  nameF: string;
  name: string;
  description: string;
  isActive: boolean;
  specialtyId?: string;
  specialtyName?: string;
  radiologyTestCategoryId?: string;
  radiologyTestCategoryName?: string;
}

export interface CreateUpdateRadiologyTestDto {
  id?: string;
  code: string;
  nameL: string;
  nameF: string;
  description?: string;
  isActive?: boolean;
  specialtyId?: string;
  radiologyTestCategoryId?: string;
}

export interface RadiologyTestListDto {
  id: string;
  code: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
  specialtyName?: string;
  radiologyTestCategoryName?: string;
}

export interface RadiologyTestFilterDto extends PaginationRequest {
  code?: string;
  isActive?: boolean;
  specialtyId?: string;
  radiologyTestCategoryId?: string;
}
