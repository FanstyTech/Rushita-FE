"use client";

import { ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </I18nextProvider>
  );
} 