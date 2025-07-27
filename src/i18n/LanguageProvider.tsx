'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { languages, defaultLanguage } from '@/middleware';

// Define language type
export type Language = 'ar' | 'en' | 'es';

// Language context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggolemenue: () => void;
  open: boolean;
  direction: 'ltr' | 'rtl';
  navigateWithLanguage: (path: string) => void;
  isChangingLanguage: boolean;
}

// Create language context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

/**
 * Language Provider - Manages language state and direction in the app
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  // Language and direction state
  const [open, setOpen] = useState(false);

  // Get initial language from cookie or URL path
  const getInitialLanguage = (): Language => {
    // Check for language in URL path first
    const pathSegments = pathname?.split('/').filter(Boolean);
    const pathLang =
      pathSegments &&
        pathSegments.length > 0 &&
        languages.includes(pathSegments[0])
        ? (pathSegments[0] as Language)
        : null;

    // If found in path, use it
    if (pathLang) return pathLang as Language;

    // Try to get from cookie if we're in the browser
    if (typeof document !== 'undefined') {
      const cookieLang = document.cookie
        .split('; ')  
        .find((row) => row.startsWith('language='))
        ?.split('=')[1];

      if (cookieLang && languages.includes(cookieLang)) {
        return cookieLang as Language;
      }
    }

    // Otherwise use i18n language or default
    return (i18n.language as Language) || (defaultLanguage as Language);
  };

  const initialLang = getInitialLanguage();
  const [language, setLanguageState] = useState<Language>(initialLang);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>(
    initialLang === 'ar' ? 'rtl' : 'ltr'
  );

  // State to track if language is currently changing
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set direction on the document element after mounting
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = initialLang;
      document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [initialLang]);

  // Mark component as mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Extract language from URL path on initial load
  useEffect(() => {
    if (!isMounted) return;

    const pathSegments = pathname?.split('/').filter(Boolean);
    const pathLang =
      pathSegments &&
        pathSegments.length > 0 &&
        languages.includes(pathSegments[0])
        ? (pathSegments[0] as Language)
        : null;

    if (pathLang && pathLang !== language) {
      setLanguageState(pathLang as Language);
      i18n.changeLanguage(pathLang);
      setDirection(pathLang === 'ar' ? 'rtl' : 'ltr');
    }
  }, [pathname, language, i18n, isMounted]);

  // Update document direction when language changes
  useEffect(() => {
    if (!isMounted) return;

    setDirection(language === 'ar' ? 'rtl' : 'ltr');

    // Update HTML attributes only on client side
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language, isMounted]);

  /**
   * Change language and update path and cookies
   */
  const toggolemenue = () => {
    setOpen(!open);
  };
  const setLanguage = async (lang: Language) => {
    // Prevent multiple changes at once
    if (isChangingLanguage || lang === language) return;

    try {
      setIsChangingLanguage(true);

      // Update language state
      setLanguageState(lang);

      // Update i18n language
      await i18n.changeLanguage(lang);

      // Store language preference in cookie
      document.cookie = `language=${lang}; path=/; max-age=${60 * 60 * 24 * 30
        }`; // 30 days

      // Update path to include language prefix
      const pathSegments = pathname?.split('/').filter(Boolean);

      // Check if current path already has a language prefix
      const currentLangPrefix = languages.includes(pathSegments?.[0])
        ? pathSegments?.[0]
        : null;

      // Use replace instead of push to avoid adding to browser history
      // and prevent double rendering
      if (currentLangPrefix) {
        // Replace existing language prefix
        const newPath = `/${lang}${pathname.substring(
          currentLangPrefix.length + 1
        )}`;
        router.replace(newPath, { scroll: false });
      } else if (pathname !== '/') {
        // Add language prefix to path
        router.replace(`/${lang}${pathname}`, { scroll: false });
      } else {
        // For root path, navigate to language-specific root
        router.replace(`/${lang}`, { scroll: false });
      }
    } finally {
      // Make sure to reset language changing state
      setTimeout(() => {
        setIsChangingLanguage(false);
      }, 500);
    }
  };

  /**
   * Helper function to navigate while preserving language
   */
  const navigateWithLanguage = (path: string) => {
    // If path already has language prefix or is root, use as is
    if (
      path === '/' ||
      languages.some(
        (lang) => path.startsWith(`/${lang}/`) || path === `/${lang}`
      )
    ) {
      router.replace(path, { scroll: false });
      return;
    }

    // Otherwise, add current language prefix
    router.replace(`/${language}${path.startsWith('/') ? path : `/${path}`}`, {
      scroll: false,
    });
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggolemenue,
        open,
        direction,
        navigateWithLanguage,
        isChangingLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to use the language context
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
