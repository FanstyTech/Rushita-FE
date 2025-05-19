"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      dashboard: 'Dashboard',
      patients: 'Patients',
      appointments: 'Appointments',
      diagnosis: 'Diagnosis',
      analytics: 'Analytics',
      settings: 'Settings',
      clinicAI: 'Clinic AI',
      medicalIntelligence: 'Medical Intelligence',
      generalPractitioner: 'General Practitioner',
      notifications: 'Notifications',
      profile: 'Profile',
      logout: 'Logout',
      language: 'Language',
      english: 'English',
      arabic: 'Arabic',
    },
  },
  ar: {
    translation: {
      dashboard: 'لوحة التحكم',
      patients: 'المرضى',
      appointments: 'المواعيد',
      diagnosis: 'التشخيص',
      analytics: 'التحليلات',
      settings: 'الإعدادات',
      clinicAI: 'العيادة الذكية',
      medicalIntelligence: 'الذكاء الطبي',
      generalPractitioner: 'طبيب عام',
      notifications: 'الإشعارات',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
      language: 'اللغة',
      english: 'الإنجليزية',
      arabic: 'العربية',
    },
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n; 