import { PaginationRequest } from './pagination';
export enum DosageForm {
  Tablet = 1,
  Capsule = 2,
  Syrup = 3,
  Injection = 4,
  Cream = 5,
  Drops = 6,
  Inhaler = 7,
  Other = 8,
}
export enum MedicineStrength {
  Mg250 = 1,
  Mg500,
  Mg1000,
  Other,
}
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
  strength?: MedicineStrength;
  dosageForm: DosageForm;
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
  strength?: MedicineStrength;
  dosageForm: DosageForm;
}

export interface MedicineListDto {
  id: string;
  code: string;
  nameL: string;
  nameF: string;
  name: string;
  scientificName: string;
  medicationTypeName: string;
  medicationTypeId: string;
  description: string;
  strength?: MedicineStrength;
  dosageForm: DosageForm;
  isActive: boolean;
}

export interface MedicineFilterDto extends PaginationRequest {
  code?: string;
  typeId?: string;
  isActive?: boolean;
}
