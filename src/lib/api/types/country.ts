import { PaginationRequest } from './pagination';
import { SelectOption } from './select-option';

export interface CountryDto {
  id: string;
  nameL: string;
  nameF: string;
  code: string;
  phoneCode: string;
  isActive: boolean;
}

export interface CreateUpdateCountryDto {
  id?: string;
  nameL: string;
  nameF: string;
  code: string;
  phoneCode: string;
  isActive: boolean;
}

export interface CountryListDto {
  id: string;
  nameL: string;
  nameF: string;
  code: string;
  phoneCode: string;
  isActive: boolean;
}

export interface CountryFilterDto extends PaginationRequest {
  nameL?: string;
  nameF?: string;
  code?: string;
  isActive?: boolean;
}
export interface PhoneCodeOption extends SelectOption<string> {
  flag: string;
}
