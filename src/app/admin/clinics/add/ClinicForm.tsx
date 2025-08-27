'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiGlobe,
  FiClock,
  FiImage,
  FiUser,
  FiMapPin as FiLocation,
  FiClock as FiTime,
  FiList,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiYoutube,
  FiX,
} from 'react-icons/fi';
import Link from 'next/link';
import { Input, TextArea, Select } from '@/components/common/form';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { useCity } from '@/lib/api/hooks/useCity';
import { useCountry } from '@/lib/api/hooks/useCountry';
import { useClinic } from '@/lib/api/hooks/useClinic';
import { SelectOption } from '@/lib/api/types/select-option';
import { CreateUpdateClinicDto, DayEnum } from '@/lib/api/types/clinic';
import { Button } from '@/components/ui/button';

interface ClinicFormProps {
  initialData?: CreateUpdateClinicDto;
}

interface ClinicFormData {
  nameL: string;
  nameF: string;
  email: string;
  phoneNumber: string;
  bio: string;
  address?: string;
  cityId?: string;
  countryId?: string;
  state?: string;
  hours: {
    day: DayEnum;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
  }[];
  specialtyIds: string[];
  social: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

const clinicSchema = z.object({
  nameL: z.string().min(3, 'NameL must be at least 3 characters'),
  nameF: z.string().min(3, 'NameF must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(8, 'Phone number must be at least 8 characters'),
  bio: z.string().min(1, 'Bio is required'),
  address: z.string().optional(),
  cityId: z.string().optional(),
  countryId: z.string().optional(),
  state: z.string().optional(),
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

const formSteps = [
  { id: 'basic', title: 'Basic Info', icon: FiUser },
  { id: 'location', title: 'Location', icon: FiLocation },
  { id: 'hours', title: 'Hours', icon: FiTime },
  { id: 'social', title: 'Social Media', icon: FiGlobe },
  { id: 'specialties', title: 'Specialties', icon: FiList },
];

export default function ClinicForm({ initialData }: ClinicFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<string>('basic');

  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const defaultHours = [
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<ClinicFormData>({
    resolver: zodResolver(clinicSchema),
    mode: 'onChange',
    defaultValues: {
      nameL: initialData?.nameL || '',
      nameF: initialData?.nameF || '',
      email: initialData?.email || '',
      phoneNumber: initialData?.phoneNumber || '',
      bio: initialData?.bio || '',
      address: initialData?.address || '',
      cityId: initialData?.cityId || '',
      countryId: initialData?.countryId || '',
      specialtyIds: initialData?.specialtyIds || [],
      hours:
        initialData?.hours && initialData.hours.length > 0
          ? initialData.hours
          : defaultHours,

      social: initialData?.social || {
        website: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: '',
      },
    },
  });

  const { createOrUpdateClinic } = useClinic();

  const { useSpecialtiesDropdown: getSpecialtiesForDropdown } = useSpecialty();
  const { data: specialties } = getSpecialtiesForDropdown();

  const selectedCountry = watch('countryId');
  const selectedCityId = watch('cityId');

  const { useCitiesDropdown: getCitiesForDropdown } = useCity();
  const { data: cities } = getCitiesForDropdown({
    filter: '',
    countryId: selectedCountry || '',
  });

  const { useCountryDropdown: getCountryForDropdown } = useCountry();
  const { data: countries } = getCountryForDropdown();

  useEffect(() => {
    const initializeLocationData = async () => {
      if (initialData?.countryId && initialData?.cityId) {
        setValue('countryId', initialData.countryId);
        setValue('cityId', initialData.cityId);
      }
    };

    initializeLocationData();
  }, [initialData, setValue]);

  useEffect(() => {
    if (!selectedCountry) {
      setValue('cityId', '');
      return;
    }

    if (selectedCountry !== initialData?.countryId) {
      setValue('cityId', '');
      trigger('cityId');
    }
  }, [selectedCountry, initialData?.countryId, setValue, trigger]);

  useEffect(() => {
    if (cities?.length === 1) {
      setValue('cityId', cities[0].value);
    }
  }, [cities, setValue]);

  const getFieldsForStep = (
    step: string
  ): (keyof ClinicFormData | `social.${keyof ClinicFormData['social']}`)[] => {
    switch (step) {
      case 'basic':
        return ['nameL', 'nameF', 'email', 'phoneNumber', 'bio'];
      case 'location':
        return ['address', 'cityId', 'state'];
      case 'hours':
        return ['hours'];
      case 'social':
        return [
          'social.website',
          'social.facebook',
          'social.twitter',
          'social.instagram',
          'social.linkedin',
          'social.youtube',
        ] as `social.${keyof ClinicFormData['social']}`[];
      case 'specialties':
        return ['specialtyIds'];
      default:
        return [];
    }
  };

  const onSubmit = async (data: ClinicFormData) => {
      const payload: CreateUpdateClinicDto = {
        id: initialData?.id,
        nameL: data.nameL,
        nameF: data.nameF,
        email: data.email,
        phoneNumber: data.phoneNumber,
        bio: data.bio,
        address: data.address,
        cityId: data.cityId || undefined,
        countryId: data.countryId || undefined,
        specialtyIds: data.specialtyIds,
        imageUrl: selectedImage || undefined,
        hours: data.hours,
        social: data.social,
      };
      await createOrUpdateClinic.mutateAsync(payload);
      router.push('/admin/clinics');
      router.refresh();
   
  };

  const handleStepChange = async (stepId: string) => {
    const isCurrentStepValid = await trigger(getFieldsForStep(currentStep));
    if (isCurrentStepValid) {
      setCurrentStep(stepId);
    }
  };

  const handleNext = async () => {
    const isCurrentStepValid = await trigger(getFieldsForStep(currentStep));
    if (isCurrentStepValid) {
      const currentIndex = formSteps.findIndex(
        (step) => step.id === currentStep
      );
      if (currentIndex < formSteps.length - 1) {
        setCurrentStep(formSteps[currentIndex + 1].id);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const hours = watch('hours');

  function handleHourChange(
    index: number,
    field: 'isOpen',
    value: boolean
  ): void;
  function handleHourChange(
    index: number,
    field: 'openTime' | 'closeTime',
    value: string
  ): void;
  function handleHourChange(
    index: number,
    field: 'isOpen' | 'openTime' | 'closeTime',
    value: boolean | string
  ) {
    const newHours = [...hours];
    newHours[index] = { ...newHours[index], [field]: value };
    setValue('hours', newHours);
  }

  return (
    <div className="space-y-8 text-foreground">
      {/* Header with Cancel Button */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold ">Add New Clinic</h2>

        <Link href="/admin/clinics">
          <Button variant="secondary">
            Cancel
            <FiX className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Stepper */}
      <div className="flex justify-between items-center mb-8">
        {formSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => handleStepChange(step.id)}
              className={`flex items-center space-x-2 ${
                currentStep === step.id
                  ? 'text-blue-600'
                  : 'text-foreground/70 hover:text-foreground/50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === step.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className="hidden sm:block font-medium">{step.title}</span>
            </button>
            {index < formSteps.length - 1 && (
              <div className="w-full sm:w-16 h-1 mx-2 bg-gray-200">
                <div
                  className={`h-full transition-all duration-500 ${
                    formSteps.findIndex((s) => s.id === currentStep) > index
                      ? 'bg-blue-600'
                      : ''
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <form className=" mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 'basic' && (
            <motion.div
              key="basic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Image Upload */}
              <div className="flex items-center space-x-6">
                <div className="relative h-40 w-40 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 group">
                  {selectedImage ? (
                    <Image
                      src={selectedImage}
                      alt="Clinic preview"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <FiImage className="h-12 w-12 text-blue-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer text-white text-sm font-medium">
                      <span>Change Image</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Local Name"
                      error={errors.nameL?.message}
                      {...register('nameL')}
                    />
                    <Input
                      label="Foreign Name"
                      error={errors.nameF?.message}
                      {...register('nameF')}
                    />
                  </div>

                  <TextArea
                    label="Bio"
                    error={errors.bio?.message}
                    {...register('bio')}
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Input
                    label="Email Address"
                    error={errors.email?.message}
                    {...register('email')}
                    startIcon={<FiMail className="h-5 w-5 text-gray-500" />}
                    placeholder="clinic@example.com"
                  />
                </div>

                <div>
                  <Input
                    label="Phone Number"
                    error={errors.phoneNumber?.message}
                    {...register('phoneNumber')}
                    startIcon={<FiMail className="h-5 w-5 text-gray-500" />}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'location' && (
            <motion.div
              key="location"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register('address')}
                    className={`block w-full px-4 py-3 rounded-xl border-2 ${
                      errors.address
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
                        : 'border-gray-100  placeholder-gray-400 focus:border-blue-500'
                    } focus:outline-none`}
                    placeholder="Enter clinic address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Select
                      value={selectedCountry}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setValue('countryId', e.target.value);
                      }}
                      label="Country"
                      options={[
                        { value: '', label: 'Select Country' },
                        ...(countries || []).map(
                          (country: SelectOption<string>) => ({
                            value: country.value,
                            label: country.label || '',
                          })
                        ),
                      ]}
                      placeholder="Select Country"
                    />
                  </div>
                  <div>
                    <Select
                      label="City"
                      value={selectedCityId}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setValue('cityId', e.target.value);
                      }}
                      options={[
                        { value: '', label: 'Select City' },
                        ...(cities || []).map((city: SelectOption<string>) => ({
                          value: city.value,
                          label: city.label || '',
                        })),
                      ]}
                      placeholder="Select City"
                    />
                  </div>
                  {/* <Select
                    label="City"
                    error={errors.cityId?.message}
                    {...register('cityId')}
                    options={[
                      { value: '', label: 'Select City' },
                      ...(cities || []).map((city: SelectOption<string>) => ({
                        value: city.value,
                        label: city.label || '',
                      })),
                    ]}
                  /> */}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'hours' && (
            <motion.div
              key="hours"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-4">
                {hours.map((day, index) => (
                  <div
                    key={day.day}
                    className={`p-4 rounded-2xl transition-all dark:shadow-2xl duration-200 ${
                      day.isOpen
                        ? 'bg-white dark:bg-gray-800 shadow-lg border border-blue-100 dark:border-blue-500'
                        : 'bg-primary-foreground dark:bg-gray-700/50 border border-gray-100 dark:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-xl ${
                            day.isOpen ? 'bg-blue-50' : 'bg-gray-100'
                          }`}
                        >
                          <FiClock
                            className={`w-5 h-5 ${
                              day.isOpen ? 'text-blue-500' : 'text-gray-400'
                            }`}
                          />
                        </div>
                        <span className="font-medium text-foreground">
                          {DayEnum[day.day]}
                        </span>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={day.isOpen}
                          onChange={(e) =>
                            handleHourChange(index, 'isOpen', e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>

                    <AnimatePresence mode="wait">
                      {day.isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 grid grid-cols-2 gap-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1.5">
                              Opening Time
                            </label>
                            <input
                              type="time"
                              value={day.openTime}
                              onChange={(e) =>
                                handleHourChange(
                                  index,
                                  'openTime',
                                  e.target.value
                                )
                              }
                              className="block w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 text-foreground text-sm focus:outline-none focus:border-blue-500 bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1.5">
                              Closing Time
                            </label>
                            <input
                              type="time"
                              value={day.closeTime}
                              onChange={(e) =>
                                handleHourChange(
                                  index,
                                  'closeTime',
                                  e.target.value
                                )
                              }
                              className="block w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 text-foreground text-sm focus:outline-none focus:border-blue-500 bg-gray-50"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    <div className="flex items-center space-x-2">
                      <FiGlobe className="text-blue-500" />
                      <span>Website</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    {...register('social.website')}
                    className={`block w-full px-4 py-3 rounded-xl border-2 ${
                      errors.social?.website
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
                        : 'border-gray-100 text-foreground placeholder-gray-400 focus:border-blue-500'
                    } focus:outline-none`}
                    placeholder="https://www.example.com"
                  />
                  {errors.social?.website && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.social.website.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    <div className="flex items-center space-x-2">
                      <FiFacebook className="text-[#1877F2]" />
                      <span>Facebook</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    {...register('social.facebook')}
                    className={`block w-full px-4 py-3 rounded-xl border-2 ${
                      errors.social?.facebook
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
                        : 'border-gray-100 text-foreground placeholder-gray-400 focus:border-blue-500'
                    } focus:outline-none`}
                    placeholder="https://facebook.com/your-clinic"
                  />
                  {errors.social?.facebook && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.social.facebook.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    <div className="flex items-center space-x-2">
                      <FiTwitter className="text-[#1DA1F2]" />
                      <span>Twitter</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    {...register('social.twitter')}
                    className={`block w-full px-4 py-3 rounded-xl border-2 ${
                      errors.social?.twitter
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
                        : 'border-gray-100 text-foreground placeholder-gray-400 focus:border-blue-500'
                    } focus:outline-none`}
                    placeholder="https://twitter.com/your-clinic"
                  />
                  {errors.social?.twitter && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.social.twitter.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    <div className="flex items-center space-x-2">
                      <FiInstagram className="text-[#E4405F]" />
                      <span>Instagram</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    {...register('social.instagram')}
                    className={`block w-full px-4 py-3 rounded-xl border-2 ${
                      errors.social?.instagram
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
                        : 'border-gray-100 text-foreground placeholder-gray-400 focus:border-blue-500'
                    } focus:outline-none`}
                    placeholder="https://instagram.com/your-clinic"
                  />
                  {errors.social?.instagram && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.social.instagram.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    <div className="flex items-center space-x-2">
                      <FiLinkedin className="text-[#0A66C2]" />
                      <span>LinkedIn</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    {...register('social.linkedin')}
                    className={`block w-full px-4 py-3 rounded-xl border-2 ${
                      errors.social?.linkedin
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
                        : 'border-gray-100 text-foreground placeholder-gray-400 focus:border-blue-500'
                    } focus:outline-none`}
                    placeholder="https://linkedin.com/company/your-clinic"
                  />
                  {errors.social?.linkedin && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.social.linkedin.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    <div className="flex items-center space-x-2">
                      <FiYoutube className="text-[#FF0000]" />
                      <span>YouTube</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    {...register('social.youtube')}
                    className={`block w-full px-4 py-3 rounded-xl border-2 ${
                      errors.social?.youtube
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
                        : 'border-gray-100 text-foreground placeholder-gray-400 focus:border-blue-500'
                    } focus:outline-none`}
                    placeholder="https://youtube.com/c/your-clinic"
                  />
                  {errors.social?.youtube && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.social.youtube.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'specialties' && (
            <motion.div
              key="specialties"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Select Specialties
                </label>
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
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-foreground">
                        {specialty.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.specialtyIds && (
                  <p className="text-sm text-red-600">
                    {errors.specialtyIds.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8">
          <button
            type="button"
            onClick={() => {
              const currentIndex = formSteps.findIndex(
                (step) => step.id === currentStep
              );
              if (currentIndex > 0) {
                setCurrentStep(formSteps[currentIndex - 1].id);
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-gray-600 hover:text-foreground transition-colors"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>

          {currentStep === 'specialties' ? (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={createOrUpdateClinic.isPending}
              className={`px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ${
                createOrUpdateClinic.isPending
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {createOrUpdateClinic.isPending ? 'Saving...' : 'Save Clinic'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Next
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
