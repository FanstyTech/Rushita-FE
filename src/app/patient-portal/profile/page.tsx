'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  EmergencyContactCard,
  HealthIndicatorsCard,
  InsuranceCoverageDetailsCard,
  InsuranceInformationCard,
  MedicalInformationCard,
  MedicationHistoryCard,
  mockHealthIndicators,
  mockInsuranceInfo,
  mockPatientData,
  PersonalInformationCard,
  ProfileHeader,
  ProfileSkeleton,
} from '@/components/patient-portal/profile';
import { formatDate } from '@/utils/dateTimeUtils';
import { toast } from 'sonner';
import {
  profileSchema,
  findErrorSection,
  ProfileFormValues,
} from './validation';

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Dummy patient data
const patientData = {
  id: 'p-12345',
  name: 'محمد أحمد العلي',
  email: 'mohammed@example.com',
  phone: '966501234567',
  dateOfBirth: '1985-05-15',
  gender: 'male',
  bloodType: 'O+',
  height: 175,
  weight: 80,
  allergies: 'البنسلين، المكسرات',
  chronicDiseases: 'ضغط الدم المرتفع',
  medications: 'أتينولول 50 مجم مرة واحدة يومياً',
  medicalFileNumber: 'MF-98765',
  nationalId: '1098765432',
  address: 'حي النزهة، شارع الملك فهد، الرياض',
  emergencyContact: {
    name: 'أحمد محمد العلي',
    relation: 'أخ',
    phone: '966509876543',
  },
  insuranceInfo: {
    provider: 'شركة التأمين الصحي المتحدة',
    policyNumber: 'INS-123456',
    expiryDate: '2026-12-31',
    coverageType: 'شاملة',
    copayment: 10,
    annualLimit: 10000,
    exclusions: 'لا توجد استثناءات',
    notes: 'لا توجد ملاحظات',
  },
  medicalHistory: {
    allergies: ['البنسلين', 'المكسرات'],
    chronicDiseases: ['ضغط الدم المرتفع'],
    surgeries: [{ name: 'استئصال الزائدة الدودية', date: '2010-03-20' }],
    familyHistory: 'السكري من النوع الثاني في العائلة',
  },
  registrationDate: '2023-01-15',
  healthMetrics: {
    bloodPressure: {
      systolic: 125,
      diastolic: 82,
      status: 'elevated',
      lastUpdated: '2025-07-15',
      trend: 'stable',
    },
    bloodSugar: {
      value: 95,
      status: 'normal',
      lastUpdated: '2025-07-15',
      trend: 'improving',
    },
    heartRate: {
      value: 72,
      status: 'normal',
      lastUpdated: '2025-07-15',
      trend: 'stable',
    },
    cholesterol: {
      total: 190,
      hdl: 55,
      ldl: 120,
      status: 'normal',
      lastUpdated: '2025-06-20',
      trend: 'stable',
    },
  },
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize form with React Hook Form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
    control,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      // Personal Information
      name: patientData.name,
      email: patientData.email,
      phone: patientData.phone,
      address: patientData.address,
      Gender: patientData.gender,
      DateOfBirth: patientData.dateOfBirth,
      // We would populate these from API in a real scenario
      FNameF: '',
      SNameF: '',
      TNameF: '',
      LNameF: '',
      FNameL: '',
      SNameL: '',
      TNameL: '',
      LNameL: '',
      CountryCodeId: '1', // Default Saudi Arabia
      CountryId: '1',
      CityId: '1',
      PreferredLanguage: 'ar',
      IdType: 'nationalId',
      IdNum: patientData.nationalId,

      // Emergency Contact
      emergencyContactName: patientData.emergencyContact.name,
      emergencyContactRelation: patientData.emergencyContact.relation,
      emergencyContactPhone: patientData.emergencyContact.phone,

      // Medical Information
      bloodType: patientData.bloodType,
      height: patientData.height,
      weight: patientData.weight,
      allergies: patientData.allergies,
      chronicDiseases: patientData.chronicDiseases,
      medications: patientData.medications,

      // Insurance Information
      insuranceProvider: patientData.insuranceInfo.provider,
      insurancePolicyNumber: patientData.insuranceInfo.policyNumber,
      insuranceExpiryDate: patientData.insuranceInfo.expiryDate,
      insuranceCoverage: patientData.insuranceInfo.coverageType,

      // Health metrics
      bloodPressureSystolic: patientData.healthMetrics.bloodPressure.systolic,
      bloodPressureDiastolic: patientData.healthMetrics.bloodPressure.diastolic,
      bloodPressureStatus: patientData.healthMetrics.bloodPressure.status,
      bloodSugarValue: patientData.healthMetrics.bloodSugar.value,
      bloodSugarStatus: patientData.healthMetrics.bloodSugar.status,
      heartRateValue: patientData.healthMetrics.heartRate.value,
      heartRateStatus: patientData.healthMetrics.heartRate.status,
      cholesterolTotal: patientData.healthMetrics.cholesterol.total,
      cholesterolHDL: patientData.healthMetrics.cholesterol.hdl,
      cholesterolLDL: patientData.healthMetrics.cholesterol.ldl,
      cholesterolStatus: patientData.healthMetrics.cholesterol.status,
    },
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof ProfileFormValues, value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset form to initial values
    reset();
    setIsEditing(false);
  };

  const handleSave = (data: ProfileFormValues) => {
    // Here you would typically send the updated data to the server
    console.log('Form data to submit:', data);
    setIsEditing(false);
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

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Profile header */}
      <ProfileHeader
        patientData={{
          name: mockPatientData.name,
          medicalFileNumber: mockPatientData.medicalFileNumber,
          registrationDate: mockPatientData.registrationDate,
          bloodType: mockPatientData.bloodType,
        }}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={onSubmit}
        onCancel={handleCancel}
        formatDate={formatDate}
      />
      {/* Profile content */}
      <Tabs
        defaultValue="personal"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-3 mb-4 w-full sm:w-auto h-full">
          <TabsTrigger
            value="personal"
            className="py-3 data-[state=active]:shadow-sm"
          >
            {t('patientPortal.profile.tabs.personalInfo')}
          </TabsTrigger>
          <TabsTrigger
            value="medical"
            className="py-3 data-[state=active]:shadow-sm"
          >
            {t('patientPortal.profile.tabs.medicalInfo')}
          </TabsTrigger>
          {/* <TabsTrigger
            value="insurance"
            className="py-3 data-[state=active]:shadow-sm"
          >
            {t('patientPortal.profile.tabs.insuranceInfo')}
          </TabsTrigger> */}
          <TabsTrigger
            value="healthIndicators"
            className="py-3 data-[state=active]:shadow-sm"
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
            className="space-y-6"
          >
            <PersonalInformationCard
              patientData={patientData}
              isEditing={isEditing}
              formData={watch()}
              onInputChange={handleInputChange}
              variants={itemVariants}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
            />

            <EmergencyContactCard
              emergencyContact={patientData.emergencyContact}
              isEditing={isEditing}
              formData={watch()}
              onInputChange={handleInputChange}
              variants={itemVariants}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
            />
          </motion.div>
        </TabsContent>
        {/* Medical Information Tab */}
        <TabsContent value="medical">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <MedicalInformationCard
              patientData={mockPatientData}
              isEditing={isEditing}
              formData={watch()}
              onInputChange={handleInputChange}
              variants={itemVariants}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
            />

            <MedicationHistoryCard
              medications={mockPatientData.medications}
              isEditing={isEditing}
              formData={watch()}
              onInputChange={handleInputChange}
              variants={itemVariants}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
            />
          </motion.div>
        </TabsContent>
        {/* Insurance Tab */}
        <TabsContent value="insurance">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <InsuranceInformationCard
              insuranceInfo={mockInsuranceInfo}
              isEditing={isEditing}
              formData={watch()}
              onInputChange={handleInputChange}
              variants={itemVariants}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
            />

            <InsuranceCoverageDetailsCard
              insuranceInfo={mockInsuranceInfo}
              variants={itemVariants}
            />
          </motion.div>
        </TabsContent>
        {/* Health Indicators Tab */}
        <TabsContent value="healthIndicators">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <HealthIndicatorsCard
              healthIndicators={mockHealthIndicators}
              variants={itemVariants}
              isEditing={isEditing}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
              formData={watch()}
            />
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
