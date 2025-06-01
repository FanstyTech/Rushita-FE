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
  diagnosisCategoryId?: string;
  diagnosisCategoryName?: string;
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
  diagnosisCategoryId?: string;
}

export interface DiagnosisListDto {
  id: string;
  code: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
  specialtyName?: string;
  diagnosisCategoryName?: string;
}

export interface DiagnosisFilterDto extends PaginationRequest {
  code?: string;
  isActive?: boolean;
  specialtyId?: string;
  diagnosisCategoryId?: string;
}
