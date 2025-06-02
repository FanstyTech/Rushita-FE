import { PaginationRequest } from '../types/pagination';

export interface CityDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  isActive: boolean;
  countryId: string;
  countryName: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateUpdateCityDto {
  id?: string;
  nameL: string;
  nameF: string;
  isActive?: boolean;
  countryId: string;
}

export interface CityListDto {
  id: string;
  nameL: string;
  nameF: string;
  countryId: string;
  countryName: string;
  isActive: boolean;
}

export interface CityFilterDto extends PaginationRequest {
  nameL?: string;
  nameF?: string;
  isActive?: boolean;
  countryId?: string;
}

export interface GetCitiesForDropdownInput {
  countryId?: string;
  filter?: string;
  all?: boolean | true;
}
