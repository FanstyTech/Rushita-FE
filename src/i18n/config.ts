'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ar } from './locales/ar/index';
import { en } from './locales/en/index';
import { es } from './locales/es/index';

const resources = {
  ar: {
    translation: {
      ...ar,
    },
  },
  en: {
    translation: {
      ...en,
    },
  },
  es: {
    translation: {
      ...es,
    },
  },
};

console.log(resources.ar);
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
