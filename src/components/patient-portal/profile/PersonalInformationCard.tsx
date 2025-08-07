'use client';

import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, MapPin, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Add this import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input, Select } from '@/components/common/form';
import { formatDate } from '@/utils/dateTimeUtils';
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormSetValue,
} from 'react-hook-form';
import { ProfileFormValues } from '@/app/patient-portal/profile/validation';

interface PersonalInformationCardProps {
  patientData: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    nationalId: string;
    address: string;
  };
  isEditing: boolean;
  formData: ProfileFormValues;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variants: any;
  // React Hook Form props
  register?: UseFormRegister<ProfileFormValues>;
  errors?: FieldErrors<ProfileFormValues>;
  control?: Control<ProfileFormValues>;
  setValue?: UseFormSetValue<ProfileFormValues>;
}

export function PersonalInformationCard({
  patientData,
  isEditing,
  formData,
  onInputChange,
  variants,
  register,
  errors,
  control,
  setValue,
}: PersonalInformationCardProps) {
  const { t } = useTranslation(); // Add this hook

  // Helper function to handle select changes
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    fieldName: keyof ProfileFormValues
  ) => {
    if (setValue) {
      setValue(fieldName, e.target.value);
    }
    if (onInputChange) {
      onInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

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
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.firstNameEn')}
                  id="FNameF"
                  {...(register
                    ? register('FNameF')
                    : {
                        name: 'FNameF',
                        value: formData.FNameF || '',
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.FNameF ? 'border-red-500' : ''
                  }`}
                />
                {errors?.FNameF && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.FNameF.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.fatherNameEn')}
                  id="SNameF"
                  {...(register
                    ? register('SNameF')
                    : {
                        name: 'SNameF',
                        value: formData.SNameF || '',
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.SNameF ? 'border-red-500' : ''
                  }`}
                />
                {errors?.SNameF && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.SNameF.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.grandfatherNameEn')}
                  id="TNameF"
                  {...(register
                    ? register('TNameF')
                    : {
                        name: 'TNameF',
                        value: formData.TNameF || '',
                        onChange: onInputChange,
                      })}
                  className="border-border/50 focus-visible:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.familyNameEn')}
                  id="LNameF"
                  {...(register
                    ? register('LNameF')
                    : {
                        name: 'LNameF',
                        value: formData.LNameF || '',
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.LNameF ? 'border-red-500' : ''
                  }`}
                />
                {errors?.LNameF && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.LNameF.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.firstNameAr')}
                  id="FNameL"
                  {...(register
                    ? register('FNameL')
                    : {
                        name: 'FNameL',
                        value: formData.FNameL || '',
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.FNameL ? 'border-red-500' : ''
                  }`}
                />
                {errors?.FNameL && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.FNameL.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.fatherNameAr')}
                  id="SNameL"
                  {...(register
                    ? register('SNameL')
                    : {
                        name: 'SNameL',
                        value: formData.SNameL || '',
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.SNameL ? 'border-red-500' : ''
                  }`}
                />
                {errors?.SNameL && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.SNameL.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.grandfatherNameAr')}
                  id="TNameL"
                  {...(register
                    ? register('TNameL')
                    : {
                        name: 'TNameL',
                        value: formData.TNameL || '',
                        onChange: onInputChange,
                      })}
                  className="border-border/50 focus-visible:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.familyNameAr')}
                  id="LNameL"
                  {...(register
                    ? register('LNameL')
                    : {
                        name: 'LNameL',
                        value: formData.LNameL || '',
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.LNameL ? 'border-red-500' : ''
                  }`}
                />
                {errors?.LNameL && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.LNameL.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.fullName')}
                  id="name"
                  {...(register
                    ? register('name')
                    : {
                        name: 'name',
                        value: formData.name,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.name ? 'border-red-500' : ''
                  }`}
                />
                {errors?.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.dateOfBirth')}
                  id="DateOfBirth"
                  type="date"
                  {...(register
                    ? register('DateOfBirth')
                    : {
                        name: 'DateOfBirth',
                        value: formData.DateOfBirth || '',
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.DateOfBirth ? 'border-red-500' : ''
                  }`}
                />
                {errors?.DateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.DateOfBirth.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Select
                  label={t('patientPortal.profile.personalInfo.gender')}
                  id="Gender"
                  value={formData.Gender || ''}
                  onChange={(e) => handleSelectChange(e, 'Gender')}
                  options={[
                    { value: 'male', label: t('patientPortal.profile.personalInfo.male') },
                    { value: 'female', label: t('patientPortal.profile.personalInfo.female') },
                    { value: 'other', label: t('patientPortal.profile.personalInfo.other') },
                  ]}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.Gender ? 'border-red-500' : ''
                  }`}
                />
                {errors?.Gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.Gender.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.email')}
                  id="email"
                  type="email"
                  {...(register
                    ? register('email')
                    : {
                        name: 'email',
                        value: formData.email,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.email ? 'border-red-500' : ''
                  }`}
                />
                {errors?.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Select
                  label={t('patientPortal.profile.personalInfo.countryCode')}
                  id="CountryCodeId"
                  value={formData.CountryCodeId || ''}
                  onChange={(e) => handleSelectChange(e, 'CountryCodeId')}
                  options={[
                    { value: '1', label: '+966 (' + t('patientPortal.profile.personalInfo.saudiArabia') + ')' },
                    { value: '2', label: '+971 (' + t('patientPortal.profile.personalInfo.uae') + ')' },
                    { value: '3', label: '+965 (' + t('patientPortal.profile.personalInfo.kuwait') + ')' },
                    { value: '4', label: '+974 (' + t('patientPortal.profile.personalInfo.qatar') + ')' },
                    { value: '5', label: '+973 (' + t('patientPortal.profile.personalInfo.bahrain') + ')' },
                    { value: '6', label: '+968 (' + t('patientPortal.profile.personalInfo.oman') + ')' },
                  ]}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.CountryCodeId ? 'border-red-500' : ''
                  }`}
                />
                {errors?.CountryCodeId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.CountryCodeId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.phone')}
                  id="phone"
                  {...(register
                    ? register('phone')
                    : {
                        name: 'phone',
                        value: formData.phone,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.phone ? 'border-red-500' : ''
                  }`}
                />
                {errors?.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Select
                  id="CountryId"
                  label={t('patientPortal.profile.personalInfo.country')}
                  value={formData.CountryId || ''}
                  onChange={(e) => handleSelectChange(e, 'CountryId')}
                  options={[
                    { value: '1', label: t('patientPortal.profile.personalInfo.saudiArabia') },
                    { value: '2', label: t('patientPortal.profile.personalInfo.uae') },
                    { value: '3', label: t('patientPortal.profile.personalInfo.kuwait') },
                    { value: '4', label: t('patientPortal.profile.personalInfo.qatar') },
                    { value: '5', label: t('patientPortal.profile.personalInfo.bahrain') },
                    { value: '6', label: t('patientPortal.profile.personalInfo.oman') },
                  ]}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.CountryId ? 'border-red-500' : ''
                  }`}
                />
                {errors?.CountryId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.CountryId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Select
                  label={t('patientPortal.profile.personalInfo.city')}
                  id="CityId"
                  value={formData.CityId || ''}
                  onChange={(e) => handleSelectChange(e, 'CityId')}
                  options={[
                    { value: '1', label: t('patientPortal.profile.personalInfo.riyadh') },
                    { value: '2', label: t('patientPortal.profile.personalInfo.jeddah') },
                    { value: '3', label: t('patientPortal.profile.personalInfo.dammam') },
                    { value: '4', label: t('patientPortal.profile.personalInfo.makkah') },
                    { value: '5', label: t('patientPortal.profile.personalInfo.madinah') },
                  ]}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.CityId ? 'border-red-500' : ''
                  }`}
                />
                {errors?.CityId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.CityId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.address')}
                  id="address"
                  {...(register
                    ? register('address')
                    : {
                        name: 'address',
                        value: formData.address,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.address ? 'border-red-500' : ''
                  }`}
                />
                {errors?.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Select
                  label={t('patientPortal.profile.personalInfo.preferredLanguage')}
                  id="PreferredLanguage"
                  value={formData.PreferredLanguage || 'ar'}
                  onChange={(e) => handleSelectChange(e, 'PreferredLanguage')}
                  options={[
                    { value: 'ar', label: t('patientPortal.profile.personalInfo.arabic') },
                    { value: 'en', label: t('patientPortal.profile.personalInfo.english') },
                  ]}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.PreferredLanguage ? 'border-red-500' : ''
                  }`}
                />
                {errors?.PreferredLanguage && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.PreferredLanguage.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Select
                  label={t('patientPortal.profile.personalInfo.idType')}
                  id="IdType"
                  value={formData.IdType || ''}
                  onChange={(e) => handleSelectChange(e, 'IdType')}
                  options={[
                    { value: 'nationalId', label: t('patientPortal.profile.personalInfo.nationalId') },
                    { value: 'passport', label: t('patientPortal.profile.personalInfo.passport') },
                    { value: 'iqama', label: t('patientPortal.profile.personalInfo.iqama') },
                    { value: 'other', label: t('patientPortal.profile.personalInfo.otherId') },
                  ]}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.IdType ? 'border-red-500' : ''
                  }`}
                />
                {errors?.IdType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.IdType.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.profile.personalInfo.idNumber')}
                  id="IdNum"
                  {...(register
                    ? register('IdNum')
                    : {
                        name: 'IdNum',
                        value: formData.IdNum || '',
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.IdNum ? 'border-red-500' : ''
                  }`}
                />
                {errors?.IdNum && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.IdNum.message}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.personalInfo.fullName')}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">{patientData.name}</span>
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
                    {patientData.phone}
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
                    {formatDate(patientData.dateOfBirth)}
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
                    {patientData.gender === 'male' ? t('patientPortal.profile.personalInfo.male') : t('patientPortal.profile.personalInfo.female')}
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
                    {patientData.nationalId}
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
