'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  FiMapPin,
  FiPhone,
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
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { states, type State, type City } from '@/mockData/locations';
import Link from 'next/link';

const formSteps = [
  { id: 'basic', title: 'Basic Info', icon: FiUser },
  { id: 'location', title: 'Location', icon: FiLocation },
  { id: 'hours', title: 'Hours', icon: FiTime },
  { id: 'social', title: 'Social Media', icon: FiGlobe },
  { id: 'specialties', title: 'Specialties', icon: FiList },
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface ClinicFormData {
  name: string;
  email: string;
  phone: string;
  description: string;
  address: string;
  city: string;
  state: string;
  hours: {
    day: string;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
  }[];
  specialties: string[];
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
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  hours: z.array(
    z.object({
      day: z.string(),
      isOpen: z.boolean(),
      openTime: z.string(),
      closeTime: z.string(),
    })
  ),
  specialties: z.array(z.string()),
  social: z.object({
    website: z.string().url('Invalid URL').optional().or(z.literal('')),
    facebook: z.string().url('Invalid URL').optional().or(z.literal('')),
    twitter: z.string().url('Invalid URL').optional().or(z.literal('')),
    instagram: z.string().url('Invalid URL').optional().or(z.literal('')),
    linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
    youtube: z.string().url('Invalid URL').optional().or(z.literal('')),
  }),
});

const specialtyOptions = [
  'General Practice',
  'Pediatrics',
  'Cardiology',
  'Dermatology',
  'Orthopedics',
  'Neurology',
  'Dentistry',
  'Ophthalmology',
  'ENT',
  'Gynecology',
];

export default function AddClinicForm() {
  const [currentStep, setCurrentStep] = useState<string>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [availableCities, setAvailableCities] = useState<City[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
    getValues,
  } = useForm<ClinicFormData>({
    resolver: zodResolver(clinicSchema),
    mode: 'onChange',
    defaultValues: {
      specialties: [],
      hours: days.map((day) => ({
        day,
        isOpen: false,
        openTime: '09:00',
        closeTime: '17:00',
      })),
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

  const getFieldsForStep = (
    step: string
  ): (keyof ClinicFormData | `social.${keyof ClinicFormData['social']}`)[] => {
    switch (step) {
      case 'basic':
        return ['name', 'email', 'phone', 'description'];
      case 'location':
        return ['address', 'city', 'state'];
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
        return ['specialties'];
      default:
        return [];
    }
  };

  const onSubmit = async (data: ClinicFormData) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await fetch('/api/clinics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      toast.success('Clinic added successfully!', {
        icon: '✅',
        style: {
          background: 'rgba(240, 253, 244, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #dcfce7',
          color: '#166534',
          padding: '12px 16px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          fontSize: '14px',
          fontWeight: 500,
        },
      });

      router.push('/admin/clinics');
    } catch (error) {
      toast.error('Failed to add clinic. Please try again.', {
        icon: '❌',
        style: {
          background: 'rgba(254, 242, 242, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #fee2e2',
          color: '#991b1b',
          padding: '12px 16px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          fontSize: '14px',
          fontWeight: 500,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
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

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = e.target.value;
    const state = states.find((s) => s.id === stateId) || null;
    setSelectedState(state);
    setValue('state', state?.name || '');
  };

  useEffect(() => {
    if (selectedState) {
      setAvailableCities(selectedState.cities);
      setValue('city', '');
    } else {
      setAvailableCities([]);
    }
  }, [selectedState, setValue]);

  const hours = watch('hours');

  const handleHourChange = (
    index: number,
    field: 'isOpen' | 'openTime' | 'closeTime',
    value: any
  ) => {
    const newHours = [...hours];
    newHours[index] = { ...newHours[index], [field]: value };
    setValue('hours', newHours);
  };

  return (
    <div className="space-y-8">
      {/* Header with Cancel Button */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Add New Clinic</h2>
        <Link
          href="/admin/clinics"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-300"
        >
          <FiX className="w-4 h-4" />
          Cancel
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
                  : 'text-gray-500 hover:text-gray-700'
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

      <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto">
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
                    <img
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Clinic Name
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className="block w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="Enter clinic name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      {...register('description')}
                      rows={3}
                      className="block w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="Describe your clinic"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div
                      className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                        errors.email ? 'text-red-500' : 'text-gray-400'
                      }`}
                    >
                      <FiMail className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      {...register('email')}
                      className={`block w-full pl-10 px-4 py-3 rounded-xl border-2 ${
                        errors.email
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
                          : 'border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                      } focus:outline-none`}
                      placeholder="clinic@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <div
                      className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                        errors.phone ? 'text-red-500' : 'text-gray-400'
                      }`}
                    >
                      <FiPhone className="h-5 w-5" />
                    </div>
                    <input
                      type="tel"
                      {...register('phone')}
                      className={`block w-full pl-10 px-4 py-3 rounded-xl border-2 ${
                        errors.phone
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
                          : 'border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                      } focus:outline-none`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register('address')}
                    className={`block w-full px-4 py-3 rounded-xl border-2 ${
                      errors.address
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
                        : 'border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500'
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <select
                      className={`block w-full px-4 py-3 rounded-xl border-2 ${
                        errors.state
                          ? 'border-red-300 text-red-900 focus:border-red-500'
                          : 'border-gray-100 text-gray-900 focus:border-blue-500'
                      } focus:outline-none bg-white`}
                      onChange={handleStateChange}
                      value={selectedState?.id || ''}
                    >
                      <option value="">Select a state</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <select
                      {...register('city')}
                      className={`block w-full px-4 py-3 rounded-xl border-2 ${
                        errors.city
                          ? 'border-red-300 text-red-900 focus:border-red-500'
                          : 'border-gray-100 text-gray-900 focus:border-blue-500'
                      } focus:outline-none bg-white ${
                        !selectedState ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={!selectedState}
                    >
                      <option value="">Select a city</option>
                      {availableCities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
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
                    className={`p-4 rounded-2xl transition-all duration-200 ${
                      day.isOpen
                        ? 'bg-white shadow-lg border border-blue-100'
                        : 'bg-gray-50 border border-gray-100'
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
                        <span className="font-medium text-gray-900">
                          {day.day}
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
                            className="block w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 text-gray-900 text-sm focus:outline-none focus:border-blue-500 bg-gray-50"
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
                            className="block w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 text-gray-900 text-sm focus:outline-none focus:border-blue-500 bg-gray-50"
                          />
                        </div>
                      </motion.div>
                    )}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        : 'border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500'
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        : 'border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500'
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        : 'border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500'
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        : 'border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500'
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        : 'border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500'
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        : 'border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500'
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
                <label className="block text-sm font-medium text-gray-700">
                  Select Specialties
                </label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {specialtyOptions.map((specialty) => (
                    <label
                      key={specialty}
                      className="relative flex items-center p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        value={specialty}
                        {...register('specialties')}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {specialty}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.specialties && (
                  <p className="text-sm text-red-600">
                    {errors.specialties.message}
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
            className="inline-flex items-center gap-2 px-6 py-2.5 text-gray-600 hover:text-gray-900 transition-colors"
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
              disabled={isSubmitting}
              className={`px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Clinic'}
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
