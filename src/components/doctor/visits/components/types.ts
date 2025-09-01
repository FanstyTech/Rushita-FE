import { CreateUpdateVisitLabTestDto } from '@/lib/api/types/visit-lab-test';

export interface AdvancedSearchForm {
  name: string;
  id: string;
  phone: string;
  email: string;
}
export type LabTestFormData = {
  labTests: CreateUpdateVisitLabTestDto[];
  [key: string]: unknown;
};
