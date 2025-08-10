'use client';

import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, MapPin, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input, Select, TextArea } from '@/components/common/form';
import { formatDate } from '@/utils/dateTimeUtils';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { ProfileFormValues } from '@/app/patient-portal/profile/validation';
import PhoneInput from '@/components/common/form/PhoneInput';
import { PhoneCodeOption } from '@/lib/api/types/country';
import { SelectOption } from '@/lib/api/types/select-option';
import {
  Gender,
  IdentificationType,
  PersonalInformationDto,
} from '@/lib/api/types/clinic-patient';
import { getGenderLabel } from '@/utils/textUtils';
import { languages } from '@/middleware';

interface PersonalInformationCardProps {
  patientData: PersonalInformationDto;
  phoneCodes: PhoneCodeOption[] | undefined;
  countries: SelectOption[] | undefined;
  cities: SelectOption[] | undefined;
  isEditing: boolean;
  formData: ProfileFormValues;
  variants: any;
  register: UseFormRegister<ProfileFormValues>;
  errors?: FieldErrors<ProfileFormValues>;
  setValue?: UseFormSetValue<ProfileFormValues>;
}

export function PersonalInformationCard({
  patientData,
  isEditing,
  formData,
  variants,
  register,
  errors,
  setValue,
  phoneCodes,
  countries,
  cities,
}: PersonalInformationCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="flex items-center text-lg">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-primary" />
              </div>
              {t('patientPortal.profile.personalInfo.title')}
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.profile.personalInfo.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isEditing ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label={t('patientPortal.profile.personalInfo.firstNameEn')}
                {...register('fNameF')}
                error={errors?.fNameF?.message}
              />

              <Input
                label={t('patientPortal.profile.personalInfo.fatherNameEn')}
                {...register('sNameF')}
                error={errors?.sNameF?.message}
              />

              <Input
                label={t(
                  'patientPortal.profile.personalInfo.grandfatherNameEn'
                )}
                {...register('tNameF')}
                error={errors?.tNameF?.message}
              />

              <Input
                label={t('patientPortal.profile.personalInfo.familyNameEn')}
                {...register('lNameF')}
                error={errors?.lNameF?.message}
              />

              <Input
                label={t('patientPortal.profile.personalInfo.firstNameAr')}
                {...register('fNameL')}
                error={errors?.fNameL?.message}
              />

              <Input
                label={t('patientPortal.profile.personalInfo.fatherNameAr')}
                {...register('sNameL')}
                error={errors?.sNameL?.message}
              />

              <Input
                label={t(
                  'patientPortal.profile.personalInfo.grandfatherNameAr'
                )}
                {...register('tNameL')}
                error={errors?.tNameL?.message}
              />

              <Input
                label={t('patientPortal.profile.personalInfo.familyNameAr')}
                {...register('lNameL')}
                error={errors?.lNameL?.message}
              />

              <Input
                label={t('patientPortal.profile.personalInfo.dateOfBirth')}
                type="date"
                {...register('dateOfBirth')}
                error={errors?.dateOfBirth?.message}
              />

              <Select
                label={t('patientPortal.profile.personalInfo.gender')}
                value={formData?.gender?.toString()}
                error={errors?.gender?.message}
                {...register('gender', { valueAsNumber: true })}
                options={Object.entries(Gender)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  }))}
              />

              <Input
                label={t('patientPortal.profile.personalInfo.email')}
                type="email"
                {...register('email')}
                error={errors?.email?.message}
              />

              <PhoneInput
                label={t('patientPortal.profile.personalInfo.phone')}
                phoneCodeOptions={phoneCodes || []}
                selectedPhoneCode={formData.countryCodeId || '1'}
                onPhoneCodeChange={(value) => {
                  if (setValue) {
                    setValue('countryCodeId', value);
                  }
                }}
                onPhoneNumberChange={(value) => {
                  if (setValue) {
                    setValue('phone', value);
                  }
                }}
                phoneCodeName="countryCodeId"
                value={formData.phone || ''}
                error={errors?.phone?.message}
                phoneCodeError={errors?.countryCodeId?.message}
                className={`border-border/50 focus-visible:ring-primary/20 ${
                  errors?.phone || errors?.countryCodeId ? 'border-red-500' : ''
                }`}
                required
              />

              <Select
                label={t(
                  'patientPortal.profile.personalInfo.preferredLanguage'
                )}
                value={formData.preferredLanguage}
                options={languages.map((lang) => ({
                  value: lang,
                  label: lang,
                }))}
                error={errors?.preferredLanguage?.message}
                {...register('preferredLanguage')}
              />
              <Select
                label={t('patientPortal.profile.personalInfo.idType')}
                value={formData.idType.toString() || ''}
                options={Object.entries(IdentificationType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  }))}
                error={errors?.idType?.message}
                {...register('idType')}
              />

              <Input
                label={t('patientPortal.profile.personalInfo.idNumber')}
                error={errors?.idNum?.message}
                {...register('idNum')}
              />

              <Select
                label={t('patientPortal.profile.personalInfo.country')}
                value={formData.countryId || ''}
                options={
                  countries?.map((country) => ({
                    value: country.value.toString(),
                    label: country.label,
                  })) || []
                }
                error={errors?.countryId?.message}
                {...register('countryId')}
              />
              <Select
                label={t('patientPortal.profile.personalInfo.city')}
                value={formData.cityId || ''}
                options={
                  cities?.map((city) => ({
                    value: city.value.toString(),
                    label: city.label,
                  })) || []
                }
                error={errors?.cityId?.message}
                {...register('cityId')}
              />
              <TextArea
                label={t('patientPortal.profile.personalInfo.address')}
                error={errors?.address?.message}
                {...register('address')}
              />
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.personalInfo.fullName')}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">{patientData.shortName}</span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.personalInfo.email')}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">{patientData.email}</span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.personalInfo.phone')}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary/70" />
                  <span dir="ltr" className="font-medium">
                    {patientData.phoneNumberWithCode}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.personalInfo.dateOfBirth')}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">
                    {formatDate(patientData?.dateOfBirth || '')}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.personalInfo.gender')}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">
                    {patientData?.gender && getGenderLabel(patientData?.gender)}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.personalInfo.idNumber')}
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary/70" />
                  <span dir="ltr" className="font-medium">
                    {patientData.idNum}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors md:col-span-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.personalInfo.address')}
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary/70 mt-0.5" />
                  <span className="font-medium">{patientData.address}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
