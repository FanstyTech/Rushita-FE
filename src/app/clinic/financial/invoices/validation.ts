import { PaymentMethod } from '@/lib/api/types/invoice';
import { z } from 'zod';
import { TFunction } from 'i18next';

export const invoiceSchema = z.object({
  visitId: z.string().min(1, 'Visit is required'),
  patientId: z.string().min(1, 'Patient is required'),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  invoiceDate: z.string().min(1, 'Invoice date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  totalAmount: z.number().min(0.01, 'Total amount must be greater than 0'),
  notes: z.string().optional(),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

// Static schema for backward compatibility
export const paymentSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  paymentDate: z.string().min(1, 'Payment date is required'),
  method: z.coerce
    .number({
      required_error: 'Payment method is required',
      invalid_type_error: 'Payment method must be a number',
    })
    .refine(
      (val) => Object.values(PaymentMethod).includes(val as PaymentMethod),
      {
        message: 'Invalid payment method',
      }
    ),
  referenceNumber: z.string().optional(),
  notes: z.string().optional(),
});

// Dynamic schema factory function that accepts translation function
export const createPaymentSchema = (t: TFunction) => {
  return z.object({
    amount: z
      .number()
      .min(0.01, t('clinic.financial.invoices.validation.amountMinimum')),
    paymentDate: z
      .string()
      .min(1, t('clinic.financial.invoices.validation.paymentDateRequired')),
    method: z.coerce
      .number({
        required_error: t(
          'clinic.financial.invoices.validation.paymentMethodRequired'
        ),
        invalid_type_error: t(
          'clinic.financial.invoices.validation.paymentMethodRequired'
        ),
      })
      .refine(
        (val) => Object.values(PaymentMethod).includes(val as PaymentMethod),
        {
          message: t(
            'clinic.financial.invoices.validation.paymentMethodInvalid'
          ),
        }
      ),
    referenceNumber: z.string().optional(),
    notes: z.string().optional(),
  });
};

export type PaymentFormData = z.infer<ReturnType<typeof createPaymentSchema>>;
