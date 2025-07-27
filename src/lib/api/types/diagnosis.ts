import { PaginationRequest } from '../types/pagination';

export interface DiagnosisDto {
  id: string;
  code: string;
  nameL: string;
  nameF: string;
  name: string;
  description: string;
  isActive: boolean;
  commonSymptoms: string;
  commonMedications: string;
  recommendedTests: string;
  riskFactors: string;
  specialtyId?: string;
  specialtyName?: string;
  parentId?: string;
  parentName?: string;
}

export interface CreateUpdateDiagnosisDto {
  id?: string;
  code: string;
  nameL: string;
  nameF: string;
  description?: string;
  isActive?: boolean;
  commonSymptoms?: string;
  commonMedications?: string;
  recommendedTests?: string;
  riskFactors?: string;
  specialtyId?: string;
  parentId?: string;
}

export interface DiagnosisListDto {
  id: string;
  code: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
  specialtyName?: string;
  parentName?: string;
  specialtyId?: string;
  parentId?: string;
}

export interface DiagnosisFilterDto extends PaginationRequest {
  code?: string;
  isActive?: boolean;
  specialtyId?: string;
  parentId?: string;
}

export interface GetDiagnosesTreeDto {
  id: string;
  code: string;
  name: string;
  parentId?: string;
  children: GetDiagnosesTreeDto[];
}
