import * as z from 'zod';

// Personal Information Schema
export const personalInfoSchema = z.object({
  FNameF: z.string().min(1, { message: 'الاسم الأول مطلوب' }),
  SNameF: z.string().min(1, { message: 'اسم الأب مطلوب' }),
  TNameF: z.string().optional(),
  LNameF: z.string().min(1, { message: 'اسم العائلة مطلوب' }),
  FNameL: z.string().min(1, { message: 'الاسم الأول مطلوب' }),
  SNameL: z.string().min(1, { message: 'اسم الأب مطلوب' }),
  TNameL: z.string().optional(),
  LNameL: z.string().min(1, { message: 'اسم العائلة مطلوب' }),
  name: z.string().min(1, { message: 'الاسم الكامل مطلوب' }),
  DateOfBirth: z.string().min(1, { message: 'تاريخ الميلاد مطلوب' }),
  Gender: z.string().min(1, { message: 'الجنس مطلوب' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  CountryCodeId: z.string().min(1, { message: 'رمز الدولة مطلوب' }),
  phone: z
    .string()
    .min(9, { message: 'رقم الهاتف يجب أن يكون 9 أرقام على الأقل' }),
  CountryId: z.string().min(1, { message: 'الدولة مطلوبة' }),
  CityId: z.string().min(1, { message: 'المدينة مطلوبة' }),
  address: z.string().min(1, { message: 'العنوان مطلوب' }),
  PreferredLanguage: z.string().min(1, { message: 'اللغة المفضلة مطلوبة' }),
  IdType: z.string().min(1, { message: 'نوع الهوية مطلوب' }),
  IdNum: z.string().min(1, { message: 'رقم الهوية مطلوب' }),
});

// Emergency Contact Schema
export const emergencyContactSchema = z.object({
  emergencyContactName: z.string().min(1, { message: 'اسم جهة الاتصال مطلوب' }),
  emergencyContactRelation: z
    .string()
    .min(1, { message: 'صلة القرابة مطلوبة' }),
  emergencyContactPhone: z
    .string()
    .min(9, { message: 'رقم الهاتف يجب أن يكون 9 أرقام على الأقل' }),
});

// Medical Information Schema
export const medicalInfoSchema = z.object({
  bloodType: z.string().min(1, { message: 'فصيلة الدم مطلوبة' }),
  height: z.number().min(1, { message: 'الطول مطلوب' }),
  weight: z.number().min(1, { message: 'الوزن مطلوب' }),
  allergies: z.string().optional(),
  chronicDiseases: z.string().optional(),
  medications: z.string().optional(),
});

// Insurance Information Schema
export const insuranceInfoSchema = z.object({
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  insuranceExpiryDate: z.string().optional(),
  insuranceCoverage: z.string().optional(),
});

// Health Indicators Schema
export const healthIndicatorsSchema = z.object({
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

// Combined Profile Schema
export const profileSchema = z.object({
  ...personalInfoSchema.shape,
  ...emergencyContactSchema.shape,
  ...medicalInfoSchema.shape,
  ...insuranceInfoSchema.shape,
  ...healthIndicatorsSchema.shape,
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// Helper function to check which schema section has errors
export const findErrorSection = (errors: any) => {
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
