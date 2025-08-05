import { CreateOrUpdateVisitLabTestDto } from '@/lib/api/types/visit';

export interface AdvancedSearchForm {
  name: string;
  id: string;
  phone: string;
  email: string;
}
export type LabTestFormData = {
  labTests: CreateOrUpdateVisitLabTestDto[];
  [key: string]: unknown;
};
