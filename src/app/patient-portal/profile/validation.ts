import * as z from 'zod';

// Personal Information Schema
export const personalInfoSchema = z.object({
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

// Emergency Contact Schema
export const emergencyContactSchema = z.object({
  emergencyContactName: z.string().min(1, { message: 'اسم جهة الاتصال مطلوب' }),
  emergencyContactRelation: z.coerce
    .number()
    .min(1, { message: 'صلة القرابة مطلوبة' }),
  emergencyContactPhone: z
    .string()
    .min(9, { message: 'رقم الهاتف يجب أن يكون 9 أرقام على الأقل' }),
});

// Medical Information Schema
export const medicalInfoSchema = z.object({
  bloodType: z.coerce.number().min(1, { message: 'فصيلة الدم مطلوبة' }),
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
