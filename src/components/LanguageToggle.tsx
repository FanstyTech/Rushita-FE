'use client';

import { useLanguage, Language } from '@/i18n/LanguageProvider';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Globe, Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LanguageToggle() {
  const { language, setLanguage, isChangingLanguage } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  // Language display names and codes
  const languages = [
    { code: 'ar', name: 'العربية', shortCode: 'ع' },
    { code: 'en', name: 'English', shortCode: 'EN' },
    { code: 'es', name: 'Español', shortCode: 'ES' },
  ];

  // Get current language display info
  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isChangingLanguage}
          className={`relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white
            ${isChangingLanguage ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label="Change language"
        >
          <Globe className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
            {currentLang.shortCode}
          </span>
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className="flex items-center justify-between"
            disabled={isChangingLanguage || language === lang.code}
          >
            <span>{lang.name}</span>
            {language === lang.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
