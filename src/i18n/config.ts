'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      navigation: {
        dashboard: 'Dashboard',
        patients: 'Patients',
        appointments: 'Appointments',
        diagnosis: 'Diagnosis',
        analytics: 'Analytics',
        settings: 'Settings',
        clinicAI: 'Clinic AI',
        medicalIntelligence: 'Medical Intelligence',
      },

      // User related
      user: {
        profile: 'Profile',
        logout: 'Logout',
        login: 'Login',
        register: 'Register',
        forgotPassword: 'Forgot Password',
        resetPassword: 'Reset Password',
        generalPractitioner: 'General Practitioner',
        notifications: 'Notifications',
      },

      // Settings
      settings: {
        language: 'Language',
        theme: 'Theme',
        notifications: 'Notifications',
        privacy: 'Privacy',
        security: 'Security',
      },

      // Languages
      languages: {
        en: 'English',
        ar: 'Arabic',
        es: 'Spanish',
      },

      // Common
      common: {
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        cancel: 'Cancel',
        save: 'Save',
        confirm: 'Confirm',
        back: 'Back',
        next: 'Next',
        submit: 'Submit',
        loading: 'Loading...',
        noResults: 'No results found',
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Info',
      },

      // Messages
      messages: {
        success: {
          saved: 'Successfully saved',
          updated: 'Successfully updated',
          deleted: 'Successfully deleted',
        },
      },
    },
  },
  ar: {
    translation: {
      // Navigation
      navigation: {
        dashboard: 'لوحة التحكم',
        patients: 'المرضى',
        appointments: 'المواعيد',
        diagnosis: 'التشخيص',
        analytics: 'التحليلات',
        settings: 'الإعدادات',
        clinicAI: 'الذكاء الاصطناعي للعيادة',
        medicalIntelligence: 'الذكاء الطبي',
      },

      // User related
      user: {
        profile: 'الملف الشخصي',
        logout: 'تسجيل الخروج',
        login: 'تسجيل الدخول',
        register: 'التسجيل',
        forgotPassword: 'نسيت كلمة المرور',
        resetPassword: 'إعادة تعيين كلمة المرور',
        generalPractitioner: 'طبيب عام',
        notifications: 'الإشعارات',
      },

      // Settings
      settings: {
        language: 'اللغة',
        theme: 'المظهر',
        notifications: 'الإشعارات',
        privacy: 'الخصوصية',
        security: 'الأمان',
      },

      // Languages
      languages: {
        en: 'الإنجليزية',
        ar: 'العربية',
        es: 'الإسبانية',
      },

      // Common
      common: {
        search: 'بحث',
        filter: 'تصفية',
        sort: 'ترتيب',
        add: 'إضافة',
        edit: 'تعديل',
        delete: 'حذف',
        cancel: 'إلغاء',
        save: 'حفظ',
        confirm: 'تأكيد',
        back: 'رجوع',
        next: 'التالي',
        submit: 'إرسال',
        loading: 'جاري التحميل...',
        noResults: 'لا توجد نتائج',
        success: 'نجاح',
        error: 'خطأ',
        warning: 'تحذير',
        info: 'معلومات',
      },

      // Messages
      messages: {
        success: {
          saved: 'تم الحفظ بنجاح',
          updated: 'تم التحديث بنجاح',
          deleted: 'تم الحذف بنجاح',
        },
      },
    },
  },
  es: {
    translation: {
      // Navigation
      navigation: {
        dashboard: 'Panel de Control',
        patients: 'Pacientes',
        appointments: 'Citas',
        diagnosis: 'Diagnóstico',
        analytics: 'Análisis',
        settings: 'Configuración',
        clinicAI: 'IA Clínica',
        medicalIntelligence: 'Inteligencia Médica',
      },

      // User related
      user: {
        profile: 'Perfil',
        logout: 'Cerrar Sesión',
        login: 'Iniciar Sesión',
        register: 'Registrarse',
        forgotPassword: 'Olvidé mi Contraseña',
        resetPassword: 'Restablecer Contraseña',
        generalPractitioner: 'Médico General',
        notifications: 'Notificaciones',
      },

      // Settings
      settings: {
        language: 'Idioma',
        theme: 'Tema',
        notifications: 'Notificaciones',
        privacy: 'Privacidad',
        security: 'Seguridad',
      },

      // Languages
      languages: {
        en: 'Inglés',
        ar: 'Árabe',
        es: 'Español',
      },

      // Common
      common: {
        search: 'Buscar',
        filter: 'Filtrar',
        sort: 'Ordenar',
        add: 'Añadir',
        edit: 'Editar',
        delete: 'Eliminar',
        cancel: 'Cancelar',
        save: 'Guardar',
        confirm: 'Confirmar',
        back: 'Atrás',
        next: 'Siguiente',
        submit: 'Enviar',
        loading: 'Cargando...',
        noResults: 'No se encontraron resultados',
        success: 'Éxito',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Información',
      },

      // Messages
      messages: {
        success: {
          saved: 'Guardado con éxito',
          updated: 'Actualizado con éxito',
          deleted: 'Eliminado con éxito',
        },
      },
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
