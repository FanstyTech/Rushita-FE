import { z } from 'zod';
import { ServiceType } from '@/lib/api/types/service-price';
import { TFunction } from 'i18next';

export const servicePriceSchema = z.object({
  serviceType: z.coerce
    .number({
      required_error: 'Service type is required',
      invalid_type_error: 'Service type must be a number',
    })
    .refine((val) => Object.values(ServiceType).includes(val as ServiceType), {
      message: 'Invalid service type',
    }),
  serviceId: z.string().optional(),
  price: z.coerce
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(1, 'Price must be at least 1'),
  notes: z.string().max(500, 'Notes must not exceed 500 characters').optional(),
  clinicId: z
    .string({
      required_error: 'Clinic is required',
    })
    .min(1, 'Clinic is required'),
  doctorId: z.string().optional(),
  isActive: z.enum(['true', 'false'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be either active or inactive',
  }),
});

// Dynamic validation schema factory function
export const createServicePriceSchema = (t: TFunction) => {
  return z.object({
    serviceType: z.coerce
      .number({
        required_error: t(
          'clinic.financial.servicePrices.validation.serviceTypeRequired'
        ),
        invalid_type_error: t(
          'clinic.financial.servicePrices.validation.priceInvalid'
        ),
      })
      .refine(
        (val) => Object.values(ServiceType).includes(val as ServiceType),
        {
          message: t(
            'clinic.financial.servicePrices.validation.serviceTypeInvalid'
          ),
        }
      ),
    serviceId: z.string().optional(),
    price: z.coerce
      .number({
        required_error: t(
          'clinic.financial.servicePrices.validation.priceRequired'
        ),
        invalid_type_error: t(
          'clinic.financial.servicePrices.validation.priceInvalid'
        ),
      })
      .min(1, t('clinic.financial.servicePrices.validation.priceMinimum')),
    notes: z
      .string()
      .max(500, t('clinic.financial.servicePrices.validation.notesMaxLength'))
      .optional(),
    clinicId: z
      .string({
        required_error: t(
          'clinic.financial.servicePrices.validation.clinicRequired'
        ),
      })
      .min(1, t('clinic.financial.servicePrices.validation.clinicRequired')),
    doctorId: z.string().optional(),
    isActive: z.enum(['true', 'false'], {
      required_error: t(
        'clinic.financial.servicePrices.validation.statusRequired'
      ),
      invalid_type_error: t(
        'clinic.financial.servicePrices.validation.statusInvalid'
      ),
    }),
  });
};

// Make Service Id is Rrequired

// .superRefine((data, ctx) => {
//   if (data.serviceType > 1 && !data.serviceId) {
//     ctx.addIssue({
//       path: ['serviceId'],
//       code: z.ZodIssueCode.custom,
//       message: 'Service ID is required',
//     });
//   }
// });

export type ServicePriceFormData = z.infer<typeof servicePriceSchema>;

export interface ParsedServicePriceData
  extends Omit<ServicePriceFormData, 'isActive'> {
  isActive: boolean;
  id?: string;
}
