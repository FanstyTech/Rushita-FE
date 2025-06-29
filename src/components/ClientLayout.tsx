'use client';

import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import QuickMenu from '@/components/QuickMenu';
import QuickActions from '@/components/QuickActions';
import Loading from '@/components/Splash';
import Header from '@/components/Header';
import { useLanguage } from '@/i18n/LanguageProvider';

interface ClientLayoutProps {
  children: React.ReactNode;
  languages: string[];
}

export default function ClientLayout({
  children,
  languages,
}: ClientLayoutProps) {
  const pathname = usePathname();
  const { language, direction, isChangingLanguage } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  // Check if it's a landing page (either root '/' or just a language prefix like '/ar' or '/en')
  const isLandingPage =
    pathname === '/' || languages.some((lang) => pathname === `/${lang}`);

  const isAuthPage =
    pathname?.startsWith('/auth') ||
    languages.some((lang) => pathname?.startsWith(`/${lang}/auth`));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update html lang and dir attributes when language changes
  useEffect(() => {
    if (!isMounted) return;

    // Update html lang attribute only on client side
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = direction;
    }
  }, [language, direction, isMounted]);

  // Show a minimal loading state when language is changing
  if (isChangingLanguage) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isLandingPage || isAuthPage ? (
        <main>{children}</main>
      ) : (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="relative">
                <QuickMenu />
                <QuickActions />
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
                  {/* <Loading /> */}
                  {children}
                </main>
              </div>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
}
