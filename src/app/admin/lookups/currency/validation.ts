import { z } from 'zod';

export const currencySchema = z.object({
  code: z
    .string()
    .min(2, 'Currency code is required and must be at least 2 characters')
    .max(10, 'Currency code must not exceed 10 characters')
    .regex(/^[A-Z]{2,10}$/, 'Currency code must be uppercase letters only'),
  symbol: z
    .string()
    .min(1, 'Currency symbol is required')
    .max(10, 'Currency symbol must not exceed 10 characters'),
  nameL: z
    .string()
    .min(2, 'الاسم المحلي مطلوب ويجب أن يكون على الأقل حرفين')
    .max(50, 'الاسم المحلي يجب ألا يتجاوز 50 حرفاً'),
  nameF: z
    .string()
    .min(2, 'Foreign name is required and must be at least 2 characters')
    .max(50, 'Foreign name must not exceed 50 characters'),
  decimalPlaces: z
    .number()
    .min(0, 'Decimal places must be at least 0')
    .max(4, 'Decimal places must not exceed 4'),
  isDefault: z.boolean(),
  isActive: z.enum(['true', 'false'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be either active or inactive',
  }),
  exchangeRate: z
    .number()
    .min(0, 'Exchange rate must be positive')
    .optional(),
  exchangeRateDate: z.string().optional(),
});

export type CurrencyFormData = z.infer<typeof currencySchema>;

export interface ParsedCurrencyData {
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
