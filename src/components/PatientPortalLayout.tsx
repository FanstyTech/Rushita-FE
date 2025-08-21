'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './patient-portal/Sidebar';
import { Header } from './patient-portal/Header';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import Loading from '@/components/Splash';

export default function PatientPortalLayout({
  children,
  languages,
}: {
  children: React.ReactNode;
  languages: string[];
}) {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { direction } = useLanguage();
  const pathname = usePathname();

  const { isChangingLanguage } = useLanguage();
  const isAuthPage =
    pathname?.startsWith('/auth') ||
    languages.some((lang) =>
      pathname?.startsWith(`/${lang}/patient-portal/auth`)
    );

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect to login if not authenticated - only run on client
  useEffect(() => {
    if (isClient && !user) {
      router.push('/patient-portal/auth');
    }
  }, [user, router, isClient]);

  // Return a minimal layout during server rendering or before client hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    );
  }
  // Show a minimal loading state when language is changing
  if (isChangingLanguage) {
    return <Loading />;
  }
  // For landing and auth pages, render without sidebar/header
  if (isAuthPage) {
    return <main>{children}</main>;
  }
  const handleLogout = () => {
    // Remove any darkMode attribute from DOM before logout
    document.documentElement.removeAttribute('darkmode');
    document.documentElement.removeAttribute('darkMode');

    logout.mutate('/patient-portal/auth');
  };
  // Full component rendered only on client after hydration
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Sidebar for navigation - positioned based on language direction */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        handleLogout={handleLogout}
        user={user}
      />

      {/* Main content area with proper spacing for floating header and sidebar */}
      <div
        className={cn(
          'flex flex-col min-h-screen pt-28',
          direction === 'rtl' ? 'lg:pr-80' : 'lg:pl-80'
        )}
      >
        {/* Header is positioned fixed at the top with spacing on all sides */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Content area with padding */}
        <motion.main
          className="flex-1 px-4 pb-6 sm:px-6 md:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>

        {/* Footer with theme toggle - floating design */}
        <footer className="bg-card/80 backdrop-blur-sm mx-4 md:mx-6 lg:mx-8 mb-4 p-4 border border-border/50 rounded-2xl shadow-md">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Rushita Health Portal
            </p>
          </div>
        </footer>
      </div>

      {/* Add global styles for better scrolling */}
      <style jsx global>{`
        html,
        body {
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
