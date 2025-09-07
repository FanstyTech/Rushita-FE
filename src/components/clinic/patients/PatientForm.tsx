'use client';

import { useEffect, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  patientSchema,
  PatientFormData,
} from '@/app/clinic/patients/validation';
import { Input, Select, PhoneInput } from '@/components/common';
import {
  BloodType,
  bloodTypeDisplayNames,
  Gender,
  IdentificationType,
} from '@/lib/api/types/clinic-patient';
import { useCountry } from '@/lib/api/hooks/useCountry';
import { useCity } from '@/lib/api/hooks/useCity';
import Button from '@/components/common/Button';
import { format } from 'date-fns';
import { languages } from '@/middleware';
import { getIdentificationTypeLabel } from '@/utils/textUtils';
import { useTranslation } from 'react-i18next';

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
  isSubmitting?: boolean;
  initialData?: Partial<PatientFormData>;
}

export default function PatientForm({
  onSubmit,
  isSubmitting,
  initialData,
}: PatientFormProps) {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<string>(
    initialData?.countryId || ''
  );
  const [selectedPhoneCode, setSelectedPhoneCode] = useState<string>(
    initialData?.countryCodeId || ''
  );

  const { useCountryDropdown, useCountryPhoneCodes } = useCountry();
  const { useCitiesDropdown } = useCity();

  const { data: countries = [] } = useCountryDropdown();
  const { data: cities = [] } = useCitiesDropdown({
    countryId: selectedCountry,
  });
  const { data: phoneCodes = [] } = useCountryPhoneCodes();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema) as Resolver<PatientFormData>,
    defaultValues: initialData
      ? {
          ...initialData,
          gender: initialData.gender?.toString(), // Convert to string
          bloodType: initialData.bloodType?.toString(), // Convert to string
          dateOfBirth: initialData.dateOfBirth
            ? format(new Date(initialData.dateOfBirth), 'yyyy-MM-dd')
            : undefined,
        }
      : undefined,
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        gender: initialData.gender?.toString(), // Convert to string
        bloodType: initialData.bloodType?.toString(), // Convert to string
        dateOfBirth: initialData.dateOfBirth
          ? format(new Date(initialData.dateOfBirth), 'yyyy-MM-dd')
          : undefined,
      });
      setSelectedCountry(initialData.countryId || '');
      setSelectedPhoneCode(initialData.countryCodeId || '');
    }
  }, [initialData, reset]);

  // Clear city when country changes (except on initial load)
  useEffect(() => {
    if (selectedCountry && initialData?.countryId !== selectedCountry) {
      setValue('cityId', '');
    }
  }, [selectedCountry, setValue, initialData?.countryId]);

  // Set city value when cities load and initialData has cityId
  useEffect(() => {
    if (cities && cities.length > 0 && initialData?.cityId) {
      const cityExists = cities.some(
        (city) => city.value === initialData.cityId
      );
      if (cityExists) {
        setValue('cityId', initialData.cityId);
      } else {
        setValue('cityId', '');
      }
    }
  }, [cities, initialData?.cityId, setValue]);

  // Handle country code selection
  const handlePhoneCodeChange = (value: string) => {
    setSelectedPhoneCode(value);
    setValue('countryCodeId', value);
  };

  // Handle country selection
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setValue('countryId', countryId);
    // Clear city when country changes
    setValue('cityId', '');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 dark:text-gray-200"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="space-y-8">
          {/* Personal Information Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-1 bg-indigo-600 dark:bg-indigo-400 rounded mr-3"></div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {t('clinic.patients.form.sections.personalInfo')}
              </h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg border border-gray-100 dark:border-gray-600 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label={t('clinic.patients.form.fields.firstNameForeign')}
                  error={errors.fNameF?.message}
                  {...register('fNameF')}
                />
                <Input
                  label={t('clinic.patients.form.fields.firstNameArabic')}
                  error={errors.fNameL?.message}
                  {...register('fNameL')}
                />
                <Input
                  label={t('clinic.patients.form.fields.secondNameForeign')}
                  error={errors.sNameF?.message}
                  {...register('sNameF')}
                />
                <Input
                  label={t('clinic.patients.form.fields.secondNameArabic')}
                  error={errors.sNameL?.message}
                  {...register('sNameL')}
                />
                <Input
                  label={t('clinic.patients.form.fields.thirdNameForeign')}
                  error={errors.tNameF?.message}
                  {...register('tNameF')}
                />
                <Input
                  label={t('clinic.patients.form.fields.thirdNameArabic')}
                  error={errors.tNameL?.message}
                  {...register('tNameL')}
                />
                <Input
                  label={t('clinic.patients.form.fields.lastNameForeign')}
                  error={errors.lNameF?.message}
                  {...register('lNameF')}
                />
                <Input
                  label={t('clinic.patients.form.fields.lastNameArabic')}
                  error={errors.lNameL?.message}
                  {...register('lNameL')}
                />
                <Select
                  label={t('clinic.patients.form.fields.idType')}
                  value={initialData?.idType?.toString()}
                  error={errors.idType?.message}
                  {...register('idType', { valueAsNumber: true })}
                  options={Object.entries(IdentificationType)
                    .filter(([key]) => isNaN(Number(key)))
                    .map(([, value]) => ({
                      value: value.toString(),
                      label: getIdentificationTypeLabel(
                        value as IdentificationType
                      ),
                    }))}
                />
                <Input
                  label={t('clinic.patients.form.fields.idNumber')}
                  error={errors.idNum?.message}
                  {...register('idNum')}
                />
                <Select
                  label={t('clinic.patients.form.fields.gender')}
                  value={initialData?.gender?.toString()}
                  error={errors.gender?.message}
                  {...register('gender', { valueAsNumber: true })}
                  options={Object.entries(Gender)
                    .filter(([key]) => isNaN(Number(key)))
                    .map(([key, value]) => ({
                      value: value.toString(),
                      label:
                        key === 'Male'
                          ? t('clinic.patients.filters.male')
                          : t('clinic.patients.filters.female'),
                    }))}
                />
                <Select
                  label={t('clinic.patients.form.fields.preferredLanguage')}
                  value={initialData?.preferredLanguage?.toString()}
                  error={errors.preferredLanguage?.message}
                  {...register('preferredLanguage')}
                  options={languages.map((lang) => ({
                    value: lang,
                    label: lang,
                  }))}
                />
                <Input
                  label={t('clinic.patients.form.fields.dateOfBirth')}
                  type="date"
                  error={errors.dateOfBirth?.message}
                  {...register('dateOfBirth')}
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-1 bg-emerald-500 dark:bg-emerald-400 rounded mr-3"></div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {t('clinic.patients.form.sections.contactInfo')}
              </h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg border border-gray-100 dark:border-gray-600 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <PhoneInput
                  label={t('clinic.patients.form.fields.phoneNumber')}
                  phoneCodeOptions={phoneCodes || []}
                  selectedPhoneCode={selectedPhoneCode || ''}
                  onPhoneCodeChange={(value) => {
                    handlePhoneCodeChange(value);
                  }}
                  onPhoneNumberChange={(value) => {
                    setValue('phoneNumber', value);
                  }}
                  phoneCodeName="countryCodeId"
                  {...register('phoneNumber')}
                  error={errors?.phoneNumber?.message}
                  phoneCodeError={errors?.countryCodeId?.message}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.phoneNumber || errors?.countryCodeId
                      ? 'border-red-500'
                      : ''
                  }`}
                  required
                />
                <Input
                  label={t('clinic.patients.form.fields.email')}
                  type="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Select
                  value={initialData?.countryId || ''}
                  label={t('clinic.patients.form.fields.country')}
                  error={errors.countryId?.message}
                  {...register('countryId')}
                  options={(countries || []).map((country) => ({
                    value: country.value,
                    label: country.label || country.value,
                  }))}
                  onChange={handleCountryChange}
                />
                <Select
                  label={t('clinic.patients.form.fields.city')}
                  value={initialData?.cityId?.toString() || ''}
                  error={errors.cityId?.message}
                  {...register('cityId')}
                  options={(cities || []).map((city) => ({
                    value: city.value,
                    label: city.label || city.value,
                  }))}
                  disabled={!selectedCountry}
                />
                <Input
                  label={t('clinic.patients.form.fields.address')}
                  error={errors.address?.message}
                  {...register('address')}
                  className="col-span-2"
                />
              </div>
            </div>
          </div>

          {/* Medical Information Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-1 bg-amber-500 dark:bg-amber-400 rounded mr-3"></div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {t('clinic.patients.form.sections.medicalInfo')}
              </h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg border border-gray-100 dark:border-gray-600 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Select
                  label={t('clinic.patients.form.fields.bloodType')}
                  value={initialData?.bloodType?.toString()}
                  error={errors.bloodType?.message}
                  {...register('bloodType', { valueAsNumber: true })}
                  options={Object.entries(BloodType)
                    .filter(([key]) => isNaN(Number(key)))
                    .map(([, value]) => ({
                      value: value.toString(),
                      label: bloodTypeDisplayNames[value as BloodType],
                    }))}
                />
                <Input
                  label={t('clinic.patients.form.fields.height')}
                  type="number"
                  {...register('height', {
                    valueAsNumber: true,
                  })}
                  error={errors.height?.message}
                />
                <Input
                  label={t('clinic.patients.form.fields.weight')}
                  type="number"
                  {...register('weight', {
                    valueAsNumber: true,
                  })}
                  error={errors.weight?.message}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t dark:border-gray-700">
          <Button type="submit" className="gap-2" isLoading={isSubmitting}>
            {isSubmitting
              ? t('clinic.patients.form.buttons.saving')
              : initialData
              ? t('clinic.patients.form.buttons.update')
              : t('clinic.patients.form.buttons.save')}
          </Button>
        </div>
      </div>
    </form>
  );
}
