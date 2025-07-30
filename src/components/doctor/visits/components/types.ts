import { CreateOrUpdateVisitLabTestDto } from '@/lib/api/types/treatment';

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
