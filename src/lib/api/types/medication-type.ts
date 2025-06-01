import { PaginationRequest } from './pagination';

export interface MedicationTypeDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface CreateUpdateMedicationTypeDto {
  id?: string;
  nameL: string;
  nameF: string;
  description?: string;
  isActive?: boolean;
}

export interface MedicationTypeListDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
}

export interface MedicationTypeFilterDto extends PaginationRequest {
  searchValue?: string;
  isActive?: boolean;
}
