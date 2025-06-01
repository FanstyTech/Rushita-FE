import { PaginationRequest } from '../types/pagination';
export interface LabTestDto {
  id: string;
  code: string;
  nameL: string;
  nameF: string;
  name: string;
  description: string;
  isActive: boolean;
  color: string;
  specialtyId?: string;
  specialtyName?: string;
  labTestCategoryId?: string;
  labTestCategoryName?: string;
}

export interface CreateUpdateLabTestDto {
  id?: string;
  code: string;
  nameL: string;
  nameF: string;
  name?: string;
  description?: string;
  isActive?: boolean;
  color: string;
  specialtyId?: string;
  labTestCategoryId?: string;
}

export interface LabTestListDto {
  id: string;
  code: string;
  nameL: string;
  nameF: string;
  name: string;
  category: string;
  isActive: boolean;
  color: string;
  specialtyName?: string;
  labTestCategoryName?: string;
}

export interface LabTestFilterDto extends PaginationRequest {
  code?: string;
  isActive?: boolean;
  specialtyId?: string;
  labTestCategoryId?: string;
}
