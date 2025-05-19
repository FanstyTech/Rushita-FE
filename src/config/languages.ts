export type Language = 'en' | 'ar';

export const languages: Record<Language, { name: string; direction: 'ltr' | 'rtl' }> = {
  en: {
    name: 'English',
    direction: 'ltr',
  },
  ar: {
    name: 'العربية',
    direction: 'rtl',
  },
};

export const translations = {
  en: {
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    diagnosis: 'Diagnosis',
    analytics: 'Analytics',
    settings: 'Settings',
    clinicAI: 'Clinic AI',
    medicalIntelligence: 'Medical Intelligence',
    generalPractitioner: 'General Practitioner',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    patients: 'المرضى',
    appointments: 'المواعيد',
    diagnosis: 'التشخيص',
    analytics: 'التحليلات',
    settings: 'الإعدادات',
    clinicAI: 'العيادة الذكية',
    medicalIntelligence: 'الذكاء الطبي',
    generalPractitioner: 'طبيب عام',
  },
}; 