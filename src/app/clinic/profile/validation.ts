import { DayEnum } from '@/lib/api/types/clinic';
import { z } from 'zod';
import { TFunction } from 'i18next';

// Factory function for creating translated schema
export const createClinicProfileSchema = (t: TFunction) =>
  z.object({
    nameL: z
      .string()
      .min(3, t('clinic.profile.validation.nameArabicMinLength')),
    nameF: z
      .string()
      .min(3, t('clinic.profile.validation.nameEnglishMinLength')),
    email: z.string().email(t('clinic.profile.validation.emailInvalid')),
    phoneNumber: z
      .string()
      .min(8, t('clinic.profile.validation.phoneMinLength')),
    bio: z.string().min(1, t('clinic.profile.validation.bioRequired')),
    address: z.string().optional(),
    cityId: z.string().optional(),
    countryId: z.string().optional(),
    hours: z.array(
      z.object({
        day: z.nativeEnum(DayEnum),
        isOpen: z.boolean(),
        openTime: z.string(),
        closeTime: z.string(),
      })
    ),
    specialtyIds: z.array(z.string()),
    social: z.object({
      website: z
        .string()
        .url(t('clinic.profile.validation.urlInvalid'))
        .optional()
        .or(z.literal('')),
      facebook: z
        .string()
        .url(t('clinic.profile.validation.urlInvalid'))
        .optional()
        .or(z.literal('')),
      twitter: z
        .string()
        .url(t('clinic.profile.validation.urlInvalid'))
        .optional()
        .or(z.literal('')),
      instagram: z
        .string()
        .url(t('clinic.profile.validation.urlInvalid'))
        .optional()
        .or(z.literal('')),
      linkedin: z
        .string()
        .url(t('clinic.profile.validation.urlInvalid'))
        .optional()
        .or(z.literal('')),
      youtube: z
        .string()
        .url(t('clinic.profile.validation.urlInvalid'))
        .optional()
        .or(z.literal('')),
    }),
  });

// Legacy static schema for backward compatibility
export const clinicProfileSchema = z.object({
  nameL: z.string().min(3, 'NameL must be at least 3 characters'),
  nameF: z.string().min(3, 'NameF must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(8, 'Phone number must be at least 8 characters'),
  bio: z.string().min(1, 'Bio is required'),
  address: z.string().optional(),
  cityId: z.string().optional(),
  countryId: z.string().optional(),
  hours: z.array(
    z.object({
      day: z.nativeEnum(DayEnum),
      isOpen: z.boolean(),
      openTime: z.string(),
      closeTime: z.string(),
    })
  ),
  specialtyIds: z.array(z.string()),
  social: z.object({
    website: z.string().url('Invalid URL').optional().or(z.literal('')),
    facebook: z.string().url('Invalid URL').optional().or(z.literal('')),
    twitter: z.string().url('Invalid URL').optional().or(z.literal('')),
    instagram: z.string().url('Invalid URL').optional().or(z.literal('')),
    linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
    youtube: z.string().url('Invalid URL').optional().or(z.literal('')),
  }),
});

export type ClinicProfileFormData = z.infer<typeof clinicProfileSchema>;
