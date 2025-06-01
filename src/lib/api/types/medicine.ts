import { PaginationRequest } from './pagination';

export interface MedicineDto {
  id: string;
  code: string;
  nameL: string;
  nameF: string;
  name: string;
  scientificName: string;
  description: string;
  medicationTypeId: string;
  medicationTypeName: string;
  isActive: boolean;
}

export interface CreateUpdateMedicineDto {
  id?: string;
  code: string;
  nameL: string;
  nameF: string;
  scientificName: string;
  description?: string;
  medicationTypeId: string;
  isActive?: boolean;
}

export interface MedicineListDto {
  id: string;
  code: string;
  nameL: string;
  nameF: string;
  name: string;
  scientificName: string;
  medicationTypeName: string;
  isActive: boolean;
}

export interface MedicineFilterDto extends PaginationRequest {
  code?: string;
  typeId?: string;
  isActive?: boolean;
}
