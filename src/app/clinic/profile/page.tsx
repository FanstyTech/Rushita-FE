'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Save,
  Edit,
  User,
  FileText,
} from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import { Button } from '@/components/ui/button';
import { Input, Select, TextArea } from '@/components/common/form';
import { useClinic } from '@/lib/api/hooks/useClinic';
import { useCity } from '@/lib/api/hooks/useCity';
import { useCountry } from '@/lib/api/hooks/useCountry';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { SelectOption } from '@/lib/api/types/select-option';
import {
  CreateUpdateClinicDto,
  DayEnum,
  WorkingHours,
} from '@/lib/api/types/clinic';
import ClinicProfileSkeleton from '@/components/skeletons/ClinicProfileSkeleton';
import { ClinicProfileFormData, clinicProfileSchema } from './validation';
import { getDayLabel } from '@/utils/textUtils';

const defaultHours: WorkingHours[] = [
  {
    day: DayEnum.Sunday,
    isOpen: false,
    openTime: '09:00',
    closeTime: '17:00',
  },
  {
    day: DayEnum.Monday,
    isOpen: false,
    openTime: '09:00',
    closeTime: '17:00',
  },
  {
    day: DayEnum.Tuesday,
    isOpen: false,
    openTime: '09:00',
    closeTime: '17:00',
  },
  {
    day: DayEnum.Wednesday,
    isOpen: false,
    openTime: '09:00',
    closeTime: '17:00',
  },
  {
    day: DayEnum.Thursday,
    isOpen: false,
    openTime: '09:00',
    closeTime: '17:00',
  },
  {
    day: DayEnum.Friday,
    isOpen: false,
    openTime: '09:00',
    closeTime: '17:00',
  },
  {
    day: DayEnum.Saturday,
    isOpen: false,
    openTime: '09:00',
    closeTime: '17:00',
  },
];

export default function ClinicProfile() {
  const { useClinicForEdit, createOrUpdateClinic } = useClinic();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  // Get clinic data for editing
  const { data: clinicData, isLoading, error } = useClinicForEdit();

  // Get dropdown data
  const { useSpecialtiesDropdown: getSpecialtiesForDropdown } = useSpecialty();
  const { data: specialties } = getSpecialtiesForDropdown();

  const { useCountryDropdown } = useCountry();
  const { useCitiesDropdown } = useCity();

  const { data: countries = [] } = useCountryDropdown();
  const { data: cities = [] } = useCitiesDropdown({
    countryId: selectedCountry,
  });

  // Initialize form with React Hook Form and Zod validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ClinicProfileFormData>({
    resolver: zodResolver(clinicProfileSchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      email: '',
      phoneNumber: '',
      bio: '',
      address: '',
      cityId: '',
      countryId: '',
      hours: defaultHours,
      specialtyIds: [],
      social: {
        website: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: '',
      },
    },
  });

  // Watch form values for real-time updates
  const watchedValues = watch();

  // Update form data when clinic data is loaded
  useEffect(() => {
    if (clinicData) {
      reset({
        nameL: clinicData.nameL || '',
        nameF: clinicData.nameF || '',
        email: clinicData.email || '',
        phoneNumber: clinicData.phoneNumber || '',
        bio: clinicData.bio || '',
        address: clinicData.address || '',
        cityId: clinicData.cityId || '',
        countryId: clinicData.countryId || '',
        hours:
          clinicData.hours && clinicData.hours.length > 0
            ? clinicData.hours
            : defaultHours,
        specialtyIds: clinicData.specialtyIds || [],
        social: clinicData.social || {
          website: '',
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          youtube: '',
        },
      });
      setSelectedCountry(clinicData.countryId || '');
    }
  }, [clinicData, reset]);

  useEffect(() => {
    if (selectedCountry && clinicData?.countryId !== selectedCountry) {
      setValue('cityId', '');
    }
  }, [selectedCountry, setValue, clinicData?.countryId]);
  // Set city value when cities load and initialData has cityId
  useEffect(() => {
    if (cities && cities.length > 0 && clinicData?.cityId) {
      const cityExists = cities.some(
        (city) => city.value === clinicData.cityId
      );
      if (cityExists) {
        setValue('cityId', clinicData.cityId);
      } else {
        setValue('cityId', '');
      }
    }
  }, [cities, clinicData?.cityId, setValue]);

  // Handle country selection
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setValue('countryId', countryId);
    // Clear city when country changes
    setValue('cityId', '');
  };
  // Form submission handler
  const onSubmit = async (data: ClinicProfileFormData) => {
    try {
      const payload: CreateUpdateClinicDto = {
        id: clinicData?.id,
        nameL: data.nameL,
        nameF: data.nameF,
        phoneNumber: data.phoneNumber,
        bio: data.bio,
        email: data.email,
        cityId: data.cityId,
        countryId: data.countryId,
        address: data.address,
        specialtyIds: data.specialtyIds,
        hours: data.hours,
        social: data.social,
      };

      await createOrUpdateClinic.mutateAsync(payload);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving clinic profile:', error);
    }
  };

  const handleHourChange = <K extends keyof WorkingHours>(
    index: number,
    field: K,
    value: WorkingHours[K]
  ) => {
    const currentHours = watchedValues.hours || [];
    const updatedHours = [...currentHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    setValue('hours', updatedHours);
  };
  const ToggleSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        className="sr-only peer"
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        disabled={!isEditing}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );

  // Show loading state while fetching clinic data
  if (isLoading) {
    return <ClinicProfileSkeleton />;
  }

  // Show error state if clinic data failed to load
  if (error) {
    return (
      <PageLayout>
        <div className="w-auto space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <Building2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ملف العيادة الشخصي
                </h1>
                <p className="text-red-600 dark:text-red-400">
                  Error loading clinic data: {error.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="w-auto space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ملف العيادة الشخصي
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  إدارة معلومات العيادة والإعدادات الأساسية
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant={'outline'}
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    حفظ التغييرات
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  تعديل الملف
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <User className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                المعلومات الأساسية
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                معلومات العيادة الأساسية والتواصل
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="اسم العيادة (العربية)"
                {...register('nameL')}
                disabled={!isEditing}
                startIcon={<Building2 className="w-4 h-4" />}
                error={errors.nameL?.message}
              />
            </div>

            <div>
              <Input
                label="اسم العيادة (الإنجليزية)"
                {...register('nameF')}
                disabled={!isEditing}
                startIcon={<Building2 className="w-4 h-4" />}
                error={errors.nameF?.message}
              />
            </div>

            <div>
              <Input
                label="البريد الإلكتروني"
                type="email"
                {...register('email')}
                disabled={!isEditing}
                startIcon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
              />
            </div>

            <div>
              <Input
                label="رقم الهاتف"
                {...register('phoneNumber')}
                disabled={!isEditing}
                startIcon={<Phone className="w-4 h-4" />}
                error={errors.phoneNumber?.message}
              />
            </div>

            <div className="md:col-span-2">
              <TextArea
                label="نبذة عن العيادة"
                {...register('bio')}
                disabled={!isEditing}
                rows={3}
                error={errors.bio?.message}
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                معلومات الموقع
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                عنوان العيادة والموقع الجغرافي
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Select
                label="الدولة"
                value={selectedCountry}
                {...register('countryId')}
                disabled={!isEditing}
                options={[
                  { value: '', label: 'اختر الدولة' },
                  ...(countries || []).map((country: SelectOption<string>) => ({
                    value: country.value,
                    label: country.label || '',
                  })),
                ]}
                error={errors.countryId?.message}
                onChange={handleCountryChange}
              />
            </div>

            <div>
              <Select
                label="المدينة"
                value={watchedValues.cityId}
                {...register('cityId')}
                disabled={!isEditing}
                options={[
                  { value: '', label: 'اختر المدينة' },
                  ...(cities || []).map((city: SelectOption<string>) => ({
                    value: city.value,
                    label: city.label || '',
                  })),
                ]}
                error={errors.cityId?.message}
              />
            </div>

            <div className="md:col-span-2">
              <TextArea
                label="العنوان الكامل"
                {...register('address')}
                disabled={!isEditing}
                rows={2}
                error={errors.address?.message}
              />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                ساعات العمل
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تحديد أوقات عمل العيادة خلال الأسبوع
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {watchedValues.hours?.map((hour, index) => (
              <div
                key={hour.day}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="w-20 font-medium text-gray-700 dark:text-gray-300">
                  {getDayLabel(hour.day)}
                </div>

                <ToggleSwitch
                  checked={hour.isOpen}
                  onChange={(checked) =>
                    handleHourChange(index, 'isOpen', checked)
                  }
                />

                {hour.isOpen && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={hour.openTime}
                      onChange={(e) =>
                        handleHourChange(index, 'openTime', e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-40"
                    />
                    <span className="text-gray-500">إلى</span>
                    <Input
                      type="time"
                      value={hour.closeTime}
                      onChange={(e) =>
                        handleHourChange(index, 'closeTime', e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-40"
                    />
                  </div>
                )}

                {!hour.isOpen && (
                  <span className="text-gray-500 dark:text-gray-400">مغلق</span>
                )}
              </div>
            ))}
          </div>
          {errors.hours && (
            <p className="mt-2 text-sm text-red-600">{errors.hours.message}</p>
          )}
        </div>

        {/* Specialties */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                التخصصات
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                التخصصات الطبية المتوفرة في العيادة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {specialties?.map((specialty) => (
              <label
                key={specialty.value}
                className="relative flex items-center p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <input
                  type="checkbox"
                  value={specialty.value}
                  {...register('specialtyIds')}
                  disabled={!isEditing}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-foreground">
                  {specialty.label}
                </span>
              </label>
            ))}
          </div>
          {errors.specialtyIds && (
            <p className="mt-2 text-sm text-red-600">
              {errors.specialtyIds.message}
            </p>
          )}
        </div>

        {/* Social Media */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                وسائل التواصل الاجتماعي
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                روابط المواقع الاجتماعية والموقع الإلكتروني
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="الموقع الإلكتروني"
                {...register('social.website')}
                disabled={!isEditing}
                startIcon={<Globe className="w-4 h-4" />}
                placeholder="https://www.example.com"
                error={errors.social?.website?.message}
              />
            </div>

            <div>
              <Input
                label="فيسبوك"
                {...register('social.facebook')}
                disabled={!isEditing}
                startIcon={<Facebook className="w-4 h-4" />}
                placeholder="https://facebook.com/clinic"
                error={errors.social?.facebook?.message}
              />
            </div>

            <div>
              <Input
                label="تويتر"
                {...register('social.twitter')}
                disabled={!isEditing}
                startIcon={<Twitter className="w-4 h-4" />}
                placeholder="https://twitter.com/clinic"
                error={errors.social?.twitter?.message}
              />
            </div>

            <div>
              <Input
                label="إنستغرام"
                {...register('social.instagram')}
                disabled={!isEditing}
                startIcon={<Instagram className="w-4 h-4" />}
                placeholder="https://instagram.com/clinic"
                error={errors.social?.instagram?.message}
              />
            </div>

            <div>
              <Input
                label="لينكد إن"
                {...register('social.linkedin')}
                disabled={!isEditing}
                startIcon={<Linkedin className="w-4 h-4" />}
                placeholder="https://linkedin.com/company/clinic"
                error={errors.social?.linkedin?.message}
              />
            </div>

            <div>
              <Input
                label="يوتيوب"
                {...register('social.youtube')}
                disabled={!isEditing}
                startIcon={<Youtube className="w-4 h-4" />}
                placeholder="https://youtube.com/clinic"
                error={errors.social?.youtube?.message}
              />
            </div>
          </div>
        </div>
      </form>
    </PageLayout>
  );
}
