import { FieldErrors } from 'react-hook-form';
import * as z from 'zod';
import { TFunction } from 'i18next';

// Create dynamic validation schemas that accept translation function
export const createPersonalInfoSchema = (t: TFunction) =>
  z.object({
    fNameF: z.string().min(1, {
      message: t('patientPortal.profile.validation.firstNameRequired'),
    }),
    sNameF: z.string().min(1, {
      message: t('patientPortal.profile.validation.fatherNameRequired'),
    }),
    tNameF: z.string().optional(),
    lNameF: z.string().min(1, {
      message: t('patientPortal.profile.validation.familyNameRequired'),
    }),
    fNameL: z.string().min(1, {
      message: t('patientPortal.profile.validation.firstNameRequired'),
    }),
    sNameL: z.string().min(1, {
      message: t('patientPortal.profile.validation.fatherNameRequired'),
    }),
    tNameL: z.string().optional(),
    lNameL: z.string().min(1, {
      message: t('patientPortal.profile.validation.familyNameRequired'),
    }),
    dateOfBirth: z.string().min(1, {
      message: t('patientPortal.profile.validation.dateOfBirthRequired'),
    }),
    gender: z.coerce
      .number()
      .min(1, t('patientPortal.profile.validation.genderRequired')),
    email: z
      .string()
      .email({ message: t('patientPortal.profile.validation.invalidEmail') }),
    countryCodeId: z.string().min(1, {
      message: t('patientPortal.profile.validation.countryCodeRequired'),
    }),
    phone: z.string().max(9, {
      message: t('patientPortal.profile.validation.phoneMaxLength'),
    }),
    countryId: z.string().min(1, {
      message: t('patientPortal.profile.validation.countryRequired'),
    }),
    cityId: z
      .string()
      .min(1, { message: t('patientPortal.profile.validation.cityRequired') }),
    address: z.string().min(1, {
      message: t('patientPortal.profile.validation.addressRequired'),
    }),
    preferredLanguage: z.string().min(1, {
      message: t('patientPortal.profile.validation.preferredLanguageRequired'),
    }),
    idType: z.coerce.number().min(1, {
      message: t('patientPortal.profile.validation.idTypeRequired'),
    }),
    idNum: z.string().min(1, {
      message: t('patientPortal.profile.validation.idNumberRequired'),
    }),
    attachmentId: z.string().optional(),
  });

export const createEmergencyContactSchema = (t: TFunction) =>
  z.object({
    emergencyContactName: z.string().min(1, {
      message: t(
        'patientPortal.profile.validation.emergencyContactNameRequired'
      ),
    }),
    emergencyContactRelation: z.coerce.number().min(1, {
      message: t(
        'patientPortal.profile.validation.emergencyContactRelationRequired'
      ),
    }),
    emergencyContactPhone: z.string().min(9, {
      message: t(
        'patientPortal.profile.validation.emergencyContactPhoneMinLength'
      ),
    }),
  });

export const createMedicalInfoSchema = (t: TFunction) =>
  z.object({
    bloodType: z.coerce.number().min(1, {
      message: t('patientPortal.profile.validation.bloodTypeRequired'),
    }),
    height: z.number().min(1, {
      message: t('patientPortal.profile.validation.heightRequired'),
    }),
    weight: z.number().min(1, {
      message: t('patientPortal.profile.validation.weightRequired'),
    }),
    allergies: z.string().optional(),
    chronicDiseases: z.string().optional(),
    medications: z.string().optional(),
  });

export const createInsuranceInfoSchema = () =>
  z.object({
    insuranceProvider: z.string().optional(),
    insurancePolicyNumber: z.string().optional(),
    insuranceExpiryDate: z.string().optional(),
    insuranceCoverage: z.string().optional(),
  });

export const createHealthIndicatorsSchema = () =>
  z.object({
    bloodPressureSystolic: z.number().optional(),
    bloodPressureDiastolic: z.number().optional(),
    bloodPressureStatus: z.string().optional(),
    bloodSugarValue: z.number().optional(),
    bloodSugarStatus: z.string().optional(),
    heartRateValue: z.number().optional(),
    heartRateStatus: z.string().optional(),
    cholesterolTotal: z.number().optional(),
    cholesterolHDL: z.number().optional(),
    cholesterolLDL: z.number().optional(),
    cholesterolStatus: z.string().optional(),
  });

// Create dynamic profile schema
export const createProfileSchema = (t: TFunction) => {
  const personalInfoSchema = createPersonalInfoSchema(t);
  const emergencyContactSchema = createEmergencyContactSchema(t);
  const medicalInfoSchema = createMedicalInfoSchema(t);
  const insuranceInfoSchema = createInsuranceInfoSchema();
  const healthIndicatorsSchema = createHealthIndicatorsSchema();

  return z.object({
    ...personalInfoSchema.shape,
    ...emergencyContactSchema.shape,
    ...medicalInfoSchema.shape,
    ...insuranceInfoSchema.shape,
    ...healthIndicatorsSchema.shape,
  });
};

// Static schemas for backward compatibility (using hardcoded Arabic messages)
const personalInfoSchema = z.object({
  fNameF: z.string().min(1, { message: 'الاسم الأول مطلوب' }),
  sNameF: z.string().min(1, { message: 'اسم الأب مطلوب' }),
  tNameF: z.string().optional(),
  lNameF: z.string().min(1, { message: 'اسم العائلة مطلوب' }),
  fNameL: z.string().min(1, { message: 'الاسم الأول مطلوب' }),
  sNameL: z.string().min(1, { message: 'اسم الأب مطلوب' }),
  tNameL: z.string().optional(),
  lNameL: z.string().min(1, { message: 'اسم العائلة مطلوب' }),
  dateOfBirth: z.string().min(1, { message: 'تاريخ الميلاد مطلوب' }),
  gender: z.coerce.number().min(1, 'Gender is required'),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  countryCodeId: z.string().min(1, { message: 'رمز الدولة مطلوب' }),
  phone: z
    .string()
    .max(9, { message: 'رقم الهاتف يجب أن يكون 9 أرقام على الأقل' }),
  countryId: z.string().min(1, { message: 'الدولة مطلوبة' }),
  cityId: z.string().min(1, { message: 'المدينة مطلوبة' }),
  address: z.string().min(1, { message: 'العنوان مطلوب' }),
  preferredLanguage: z.string().min(1, { message: 'اللغة المفضلة مطلوبة' }),
  idType: z.coerce.number().min(1, { message: 'نوع الهوية مطلوب' }),
  idNum: z.string().min(1, { message: 'رقم الهوية مطلوب' }),
  attachmentId: z.string().optional(),
});

const emergencyContactSchema = z.object({
  emergencyContactName: z.string().min(1, { message: 'اسم جهة الاتصال مطلوب' }),
  emergencyContactRelation: z.coerce
    .number()
    .min(1, { message: 'صلة القرابة مطلوبة' }),
  emergencyContactPhone: z
    .string()
    .min(9, { message: 'رقم الهاتف يجب أن يكون 9 أرقام على الأقل' }),
});

const medicalInfoSchema = z.object({
  bloodType: z.coerce.number().min(1, { message: 'فصيلة الدم مطلوبة' }),
  height: z.number().min(1, { message: 'الطول مطلوب' }),
  weight: z.number().min(1, { message: 'الوزن مطلوب' }),
  allergies: z.string().optional(),
  chronicDiseases: z.string().optional(),
  medications: z.string().optional(),
});

const insuranceInfoSchema = z.object({
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  insuranceExpiryDate: z.string().optional(),
  insuranceCoverage: z.string().optional(),
});

const healthIndicatorsSchema = z.object({
  bloodPressureSystolic: z.number().optional(),
  bloodPressureDiastolic: z.number().optional(),
  bloodPressureStatus: z.string().optional(),
  bloodSugarValue: z.number().optional(),
  bloodSugarStatus: z.string().optional(),
  heartRateValue: z.number().optional(),
  heartRateStatus: z.string().optional(),
  cholesterolTotal: z.number().optional(),
  cholesterolHDL: z.number().optional(),
  cholesterolLDL: z.number().optional(),
  cholesterolStatus: z.string().optional(),
});

// Static profile schema for backward compatibility
export const profileSchema = z.object({
  ...personalInfoSchema.shape,
  ...emergencyContactSchema.shape,
  ...medicalInfoSchema.shape,
  ...insuranceInfoSchema.shape,
  ...healthIndicatorsSchema.shape,
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// Helper function to check which schema section has errors
export const findErrorSection = (errors: FieldErrors) => {
  // Check personal info fields
  const personalInfoFields = Object.keys(personalInfoSchema.shape);
  const hasPersonalInfoErrors = personalInfoFields.some(
    (field) => errors[field]
  );

  // Check emergency contact fields
  const emergencyContactFields = Object.keys(emergencyContactSchema.shape);
  const hasEmergencyContactErrors = emergencyContactFields.some(
    (field) => errors[field]
  );

  // Check medical info fields
  const medicalInfoFields = Object.keys(medicalInfoSchema.shape);
  const hasMedicalInfoErrors = medicalInfoFields.some((field) => errors[field]);

  // Check insurance info fields
  const insuranceInfoFields = Object.keys(insuranceInfoSchema.shape);
  const hasInsuranceInfoErrors = insuranceInfoFields.some(
    (field) => errors[field]
  );

  // Check health indicators fields
  const healthIndicatorsFields = Object.keys(healthIndicatorsSchema.shape);
  const hasHealthIndicatorsErrors = healthIndicatorsFields.some(
    (field) => errors[field]
  );

  if (hasPersonalInfoErrors || hasEmergencyContactErrors) {
    return 'personal';
  } else if (hasMedicalInfoErrors) {
    return 'medical';
  } else if (hasInsuranceInfoErrors) {
    return 'insurance';
  } else if (hasHealthIndicatorsErrors) {
    return 'healthIndicators';
  }

  return null;
};
