'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n/LanguageProvider';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  EmergencyContactCard,
  HealthIndicatorsCard,
  MedicalInformationCard,
  MedicationHistoryCard,
  PersonalInformationCard,
  ProfileHeader,
  ProfileSkeleton,
} from '@/components/patient-portal/profile';
import { formatDate } from '@/utils/dateTimeUtils';
import { toast } from 'sonner';
import {
  findErrorSection,
  ProfileFormValues,
  createProfileSchema,
} from './validation';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import {
  Gender,
  IdentificationType,
  UpdatePatientPortalProfileDto,
} from '@/lib/api/types/clinic-patient';
import { useCountry } from '@/lib/api/hooks/useCountry';
import { useCity } from '@/lib/api/hooks/useCity';
import { AttachmentDto } from '@/lib/api/types/attachment';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const { direction } = useLanguage();

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  // API hooks
  const { usePatientPortalProfile, updatePatientPortalProfile } =
    useClinicPatients();
  const { useCitiesDropdown } = useCity();
  const { useCountryPhoneCodes, useCountryDropdown } = useCountry();

  // Fetch patient profile data
  const { data: patientProfile, isLoading, error } = usePatientPortalProfile();

  const { data: phoneCodes } = useCountryPhoneCodes();

  // Initialize form with React Hook Form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(createProfileSchema(t)),
  });

  const { data: countries = [] } = useCountryDropdown();
  const { data: cities = [] } = useCitiesDropdown({
    countryId: watch('countryId'),
  });

  // Populate form when data is loaded
  useEffect(() => {
    if (patientProfile) {
      // Personal Information
      setValue('email', patientProfile.personalInfo.email || '');
      setValue('phone', patientProfile.personalInfo.phoneNumber || '');
      setValue('address', patientProfile.personalInfo.address || '');
      setValue('gender', patientProfile.personalInfo.gender || Gender.Male);
      if (patientProfile.personalInfo.dateOfBirth) {
        const dateObj = new Date(patientProfile.personalInfo.dateOfBirth);
        const formattedDate = dateObj.toISOString().split('T')[0];
        setValue('dateOfBirth', formattedDate);
      }
      setValue('fNameF', patientProfile.personalInfo.fNameF || '');
      setValue('sNameF', patientProfile.personalInfo.sNameF || '');
      setValue('tNameF', patientProfile.personalInfo.tNameF || '');
      setValue('lNameF', patientProfile.personalInfo.lNameF || '');
      setValue('fNameL', patientProfile.personalInfo.fNameL || '');
      setValue('sNameL', patientProfile.personalInfo.sNameL || '');
      setValue('tNameL', patientProfile.personalInfo.tNameL || '');
      setValue('lNameL', patientProfile.personalInfo.lNameL || '');
      setValue(
        'countryCodeId',
        patientProfile.personalInfo.countryCodeId || ''
      );
      setValue('countryId', patientProfile.personalInfo.countryId || '');
      setValue('cityId', patientProfile.personalInfo.cityId || '');
      setValue(
        'preferredLanguage',
        patientProfile.personalInfo.preferredLanguage || ''
      );
      setValue(
        'idType',
        patientProfile.personalInfo.idType || IdentificationType.NationalID
      );
      setValue('idNum', patientProfile.personalInfo.idNum || '');

      // Emergency Contact
      setValue(
        'emergencyContactName',
        patientProfile.emergencyContact.name || ''
      );
      setValue(
        'emergencyContactRelation',
        patientProfile.emergencyContact.relationship || ''
      );
      setValue(
        'emergencyContactPhone',
        patientProfile.emergencyContact.phone || ''
      );

      // Medical Information
      setValue('bloodType', patientProfile.medicalInfo.bloodType || '');
      setValue('height', patientProfile.medicalInfo.height || 0);
      setValue('weight', patientProfile.medicalInfo.weight || 0);
      setValue(
        'allergies',
        patientProfile.medicalInfo.allergies.map((a) => a.name).join(', ') || ''
      );
      setValue(
        'chronicDiseases',
        patientProfile.medicalInfo.medicalConditions
          .map((c) => c.name)
          .join(', ') || ''
      );
      setValue(
        'medications',
        patientProfile.medicalInfo.currentMedications
          .map((m) => m.name)
          .join(', ') || ''
      );

      // Insurance Information
      // setValue(
      //   'insuranceProvider',
      //   patientProfile.insuranceInfo.provider || ''
      // );
      // setValue(
      //   'insurancePolicyNumber',
      //   patientProfile.insuranceInfo.policyNumber || ''
      // );
      // setValue(
      //   'insuranceExpiryDate',
      //   patientProfile.insuranceInfo.expiryDate || ''
      // );
      // setValue(
      //   'insuranceCoverage',
      //   patientProfile.insuranceInfo.coverageType || ''
      // );

      // Health metrics
      setValue(
        'bloodPressureSystolic',
        patientProfile.healthIndicators.bloodPressure.systolic || 0
      );
      setValue(
        'bloodPressureDiastolic',
        patientProfile.healthIndicators.bloodPressure.diastolic || 0
      );
      setValue(
        'bloodPressureStatus',
        patientProfile.healthIndicators.bloodPressure.status?.toString() || ''
      );
      setValue(
        'bloodSugarValue',
        patientProfile.healthIndicators.bloodSugar.value || 0
      );
      setValue(
        'bloodSugarStatus',
        patientProfile.healthIndicators.bloodSugar.status?.toString() || ''
      );
      setValue(
        'heartRateValue',
        patientProfile.healthIndicators.heartRate.value || 0
      );
      setValue(
        'heartRateStatus',
        patientProfile.healthIndicators.heartRate.status?.toString() || ''
      );
      setValue(
        'cholesterolTotal',
        patientProfile.healthIndicators.cholesterol.total || 0
      );
      setValue(
        'cholesterolHDL',
        patientProfile.healthIndicators.cholesterol.hdl || 0
      );
      setValue(
        'cholesterolLDL',
        patientProfile.healthIndicators.cholesterol.ldl || 0
      );
      setValue(
        'cholesterolStatus',
        patientProfile.healthIndicators.cholesterol.status?.toString() || ''
      );
    }
  }, [patientProfile, setValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof ProfileFormValues, value as string);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const onImageChange = (attachment: AttachmentDto) => {
    setValue('attachmentId', attachment.id);
  };

  const handleCancel = () => {
    // Reset form to initial values
    reset();
    setIsEditing(false);
  };

  const handleSave = async (data: ProfileFormValues) => {
    if (!patientProfile) return;

    try {
      const updateData: UpdatePatientPortalProfileDto = {
        id: patientProfile.id,
        personalInfo: {
          fNameF: data.fNameF,
          sNameF: data.sNameF,
          tNameF: data.tNameF,
          lNameF: data.lNameF,
          fNameL: data.fNameL,
          sNameL: data.sNameL,
          tNameL: data.tNameL,
          lNameL: data.lNameL,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          email: data.email,
          phoneNumber: data.phone,
          address: data.address,
          countryCodeId: data.countryCodeId,
          countryId: data.countryId,
          cityId: data.cityId,
          preferredLanguage: data.preferredLanguage,
          idType: data.idType,
          idNum: data.idNum,
          imageId: data.attachmentId,
        },
        emergencyContact: {
          id: patientProfile?.emergencyContact?.id || undefined,
          patientId: patientProfile.id,
          name: data.emergencyContactName,
          phone: data.emergencyContactPhone,
          relationship: data.emergencyContactRelation,
          isPrimary: true,
        },
        medicalInfo: {
          bloodType: data.bloodType,
          height: data.height,
          weight: data.weight,
          allergies: patientProfile.medicalInfo.allergies,
          medicalConditions: patientProfile.medicalInfo.medicalConditions,
          currentMedications: patientProfile.medicalInfo.currentMedications,
        },
        // insuranceInfo: {
        //   provider: data.insuranceProvider,
        //   policyNumber: data.insurancePolicyNumber,
        //   expiryDate: data.insuranceExpiryDate,
        //   coverageType: data.insuranceCoverage,
        // },
        healthIndicators: {
          bloodPressure: {
            systolic: data.bloodPressureSystolic,
            diastolic: data.bloodPressureDiastolic,
          },
          bloodSugar: {
            value: data.bloodSugarValue,
          },
          heartRate: {
            value: data.heartRateValue,
          },
          cholesterol: {
            total: data.cholesterolTotal,
            hdl: data.cholesterolHDL,
            ldl: data.cholesterolLDL,
          },
        },
      };

      await updatePatientPortalProfile.mutateAsync(updateData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Add a custom submission handler that checks for errors and navigates to the appropriate tab
  const onSubmit = handleSubmit(
    (data) => {
      // Form is valid, proceed with save
      handleSave(data);
    },
    (errors) => {
      // Form has validation errors, determine which tab has errors and navigate to it
      const errorSection = findErrorSection(errors);

      if (errorSection) {
        setActiveTab(errorSection);
      }

      // Display a toast to inform the user about validation errors
      toast.warning(t('patientPortal.profile.validation.pleaseCorrectErrors'));
    }
  );

  if (isLoading || updatePatientPortalProfile.isPending) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Error loading profile: {error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!patientProfile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No profile data found</p>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('space-y-6', direction === 'rtl' ? 'rtl' : 'ltr')}
      dir={direction}
    >
      {/* Profile header */}
      <ProfileHeader
        patientData={patientProfile}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={onSubmit}
        onCancel={handleCancel}
        formatDate={formatDate}
        onImageChange={onImageChange}
      />

      {/* Profile content */}
      <Tabs
        defaultValue="personal"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList
          className={cn(
            'grid grid-cols-3 mb-4 w-full sm:w-auto h-full',
            direction === 'rtl' ? 'flex-row-reverse' : ''
          )}
        >
          <TabsTrigger
            value="personal"
            className={cn(
              'py-3 data-[state=active]:shadow-sm',
              direction === 'rtl' ? 'text-right' : 'text-left'
            )}
          >
            {t('patientPortal.profile.tabs.personalInfo')}
          </TabsTrigger>
          <TabsTrigger
            value="medical"
            className={cn(
              'py-3 data-[state=active]:shadow-sm',
              direction === 'rtl' ? 'text-right' : 'text-left'
            )}
          >
            {t('patientPortal.profile.tabs.medicalInfo')}
          </TabsTrigger>
          <TabsTrigger
            value="healthIndicators"
            className={cn(
              'py-3 data-[state=active]:shadow-sm',
              direction === 'rtl' ? 'text-right' : 'text-left'
            )}
          >
            {t('patientPortal.profile.tabs.healthIndicators')}
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={cn('space-y-6', direction === 'rtl' ? 'rtl' : 'ltr')}
          >
            <PersonalInformationCard
              patientData={patientProfile?.personalInfo}
              phoneCodes={phoneCodes || []}
              countries={countries || []}
              cities={cities || []}
              isEditing={isEditing}
              formData={watch()}
              variants={itemVariants}
              register={register}
              errors={errors}
              setValue={setValue}
            />

            <EmergencyContactCard
              emergencyContact={patientProfile.emergencyContact}
              isEditing={isEditing}
              formData={watch()}
              onInputChange={handleInputChange}
              variants={itemVariants}
              register={register}
              errors={errors}
            />
          </motion.div>
        </TabsContent>

        {/* Medical Information Tab */}
        <TabsContent value="medical">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={cn('space-y-6', direction === 'rtl' ? 'rtl' : 'ltr')}
          >
            <MedicalInformationCard
              patientData={patientProfile.medicalInfo}
              isEditing={isEditing}
              formData={watch()}
              variants={itemVariants}
              register={register}
              errors={errors}
            />

            <MedicationHistoryCard
              medications={patientProfile.medicalInfo.currentMedications
                .map((m) => m.name)
                .join(', ')}
              isEditing={isEditing}
              formData={watch()}
              onInputChange={handleInputChange}
              variants={itemVariants}
              register={register}
              errors={errors}
            />
          </motion.div>
        </TabsContent>

        {/* Health Indicators Tab */}
        <TabsContent value="healthIndicators">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={cn('space-y-6', direction === 'rtl' ? 'rtl' : 'ltr')}
          >
            <HealthIndicatorsCard
              healthIndicators={patientProfile.healthIndicators}
              variants={itemVariants}
              isEditing={isEditing}
              register={register}
              errors={errors}
            />
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
