'use client';

import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/Splash';
import { useLanguage } from '@/i18n/LanguageProvider';

// Dynamically import heavy components with ssr: false to prevent hydration issues
const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const QuickMenu = dynamic(() => import('@/components/QuickMenu'), {
  ssr: false,
});
const QuickActions = dynamic(() => import('@/components/QuickActions'), {
  ssr: false,
});

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

  // Show a minimal loading state when language is changing
  if (isChangingLanguage) {
    return <Loading />;
  }

  // For landing and auth pages, render without sidebar/header
  if (isLandingPage || isAuthPage) {
    return <main>{children}</main>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Only render these components client-side */}
      {isMounted ? (
        <>
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="relative">
                <Header />
                <QuickMenu />
                <QuickActions />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
