'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  patientSchema,
  PatientFormData,
} from '@/app/clinic/patients/validation';
import { Input, Select, PhoneInput } from '@/components/common';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { User, Phone, Activity } from 'lucide-react';
import {
  BloodType,
  bloodTypeDisplayNames,
  Gender,
} from '@/lib/api/types/clinic-patient';
import { useCountry } from '@/lib/api/hooks/useCountry';
import { useCity } from '@/lib/api/hooks/useCity';
import Button from '@/components/common/Button';
import { format } from 'date-fns';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

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
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          dateOfBirth: initialData.dateOfBirth
            ? format(new Date(initialData.dateOfBirth), 'yyyy-MM-dd')
            : undefined,
        }
      : undefined,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        dateOfBirth: initialData.dateOfBirth
          ? format(new Date(initialData.dateOfBirth), 'yyyy-MM-dd')
          : undefined,
      });
      setSelectedCountry(initialData.countryId || '');
      setSelectedPhoneCode(initialData.countryCodeId || '');
    }
  }, [initialData, reset]);

  const tabs = [
    { name: 'Basic Information', icon: User },
    { name: 'Contact Details', icon: Phone },
    { name: 'Medical Info', icon: Activity },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TabGroup>
        <TabList className="flex p-1 space-x-1 bg-gray-100 rounded-lg">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-md py-2.5 text-sm font-medium',
                  'flex items-center justify-center gap-2',
                  'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
                  selected
                    ? 'bg-white shadow text-blue-600'
                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-700'
                )
              }
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </Tab>
          ))}
        </TabList>

        <TabPanels className="mt-4">
          <TabPanel className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name (Foreign)"
                error={errors.fNameF?.message}
                {...register('fNameF')}
              />
              <Input
                label="First Name (Arabic)"
                error={errors.fNameL?.message}
                {...register('fNameL')}
              />
              <Input
                label="Second Name (Foreign)"
                error={errors.sNameF?.message}
                {...register('sNameF')}
              />
              <Input
                label="Second Name (Arabic)"
                error={errors.sNameL?.message}
                {...register('sNameL')}
              />
              <Input
                label="Third Name (Foreign)"
                error={errors.tNameF?.message}
                {...register('tNameF')}
              />
              <Input
                label="Third Name (Arabic)"
                error={errors.tNameL?.message}
                {...register('tNameL')}
              />
              <Input
                label="Last Name (Foreign)"
                error={errors.lNameF?.message}
                {...register('lNameF')}
              />
              <Input
                label="Last Name (Arabic)"
                error={errors.lNameL?.message}
                {...register('lNameL')}
              />
            </div>
          </TabPanel>

          <TabPanel className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PhoneInput
                phoneCodeError={errors.countryCodeId?.message}
                phoneNumberError={errors.phoneNumber?.message}
                phoneCodeOptions={(phoneCodes || []).map((code) => ({
                  value: code.value,
                  label: code.label || code.value,
                }))}
                selectedPhoneCode={selectedPhoneCode}
                onPhoneCodeChange={(value) => {
                  setSelectedPhoneCode(value);
                  const event = {
                    target: { value, name: 'countryCodeId' },
                  };
                  register('countryCodeId').onChange(event);
                }}
                register={register}
                phoneCodeName="countryCodeId"
                phoneNumberName="phoneNumber"
              />
              <Input
                label="Email"
                type="email"
                error={errors.email?.message}
                {...register('email')}
              />
              <Select
                label="Country"
                error={errors.countryId?.message}
                {...register('countryId')}
                options={(countries || []).map((country) => ({
                  value: country.value,
                  label: country.label || country.value,
                }))}
                onChange={(e) => setSelectedCountry(e.target.value)}
              />
              <Select
                label="City"
                error={errors.cityId?.message}
                {...register('cityId')}
                options={(cities || []).map((city) => ({
                  value: city.value,
                  label: city.label || city.value,
                }))}
                disabled={!selectedCountry}
              />
              <Input
                label="Address"
                error={errors.address?.message}
                {...register('address')}
                className="col-span-2"
              />
            </div>
          </TabPanel>

          <TabPanel className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Gender"
                error={errors.gender?.message}
                {...register('gender', { valueAsNumber: true })}
                options={Object.entries(Gender)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  }))}
              />
              <Input
                label="Date of Birth"
                type="date"
                error={errors.dateOfBirth?.message}
                {...register('dateOfBirth')}
              />
              <Select
                label="Blood Type"
                error={errors.bloodType?.message}
                {...register('bloodType', { valueAsNumber: true })}
                options={Object.entries(BloodType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: bloodTypeDisplayNames[value as BloodType],
                  }))}
              />
              <Input
                label="Height (cm)"
                type="number"
                {...register('height', { valueAsNumber: true })}
                error={errors.height?.message}
              />
              <Input
                label="Weight (kg)"
                type="number"
                {...register('weight', { valueAsNumber: true })}
                error={errors.weight?.message}
              />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" className="gap-2" isLoading={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Save'} Patient
        </Button>
      </div>
    </form>
  );
}
