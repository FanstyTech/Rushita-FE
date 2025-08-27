import { PaginationRequest } from '../types/pagination';

export interface CurrencyDto {
  id: string;
  code: string;
  symbol: string;
  nameL: string;
  nameF: string;
  name: string;
  decimalPlaces: number;
  isDefault: boolean;
  isActive: boolean;
  exchangeRate?: number;
  exchangeRateDate?: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateUpdateCurrencyDto {
  id?: string;
  code: string;
  symbol: string;
  nameL: string;
  nameF: string;
  decimalPlaces: number;
  isDefault: boolean;
  isActive: boolean;
  exchangeRate?: number;
  exchangeRateDate?: string;
}

export interface CurrencyListDto {
  id: string;
  code: string;
  symbol: string;
  nameL: string;
  nameF: string;
  name: string;
  decimalPlaces: number;
  isDefault: boolean;
  isActive: boolean;
  exchangeRate?: number;
  exchangeRateDate?: string;
}

export interface CurrencyFilterDto extends PaginationRequest {
  code?: string;
  isActive?: boolean;
  isDefault?: boolean;
  searchValue?: string;
}
