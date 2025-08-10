'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Menu, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import ThemeToggle from '../ThemeToggle';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import { useLanguage, Language } from '@/i18n/LanguageProvider';
import { AuthenticationUserResult } from '@/lib/api/types/auth';
import { languages } from '@/middleware';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ setSidebarOpen }: HeaderProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, direction, isChangingLanguage } =
    useLanguage();
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    // await logout();
    router.push('/patient-portal/auth');
  };

  if (!mounted) return null;
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <motion.header
      className={cn(
        'fixed top-4 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4',
        // Responsive positioning based on direction
        direction === 'rtl'
          ? 'left-4 lg:left-4 right-4 lg:right-[calc(288px+2rem)]' // 288px sidebar + 2rem margin on large screens
          : 'right-4 lg:right-4 left-4 lg:left-[calc(288px+2rem)]' // 288px sidebar + 2rem margin on large screens
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      <div
        className={cn(
          'mx-auto rounded-2xl transition-all duration-300 flex items-center h-16',
          scrolled
            ? 'bg-card/90 backdrop-blur-md shadow-lg border border-border/50'
            : 'bg-card/70 backdrop-blur-sm shadow-md border border-border/30'
        )}
      >
        <div className="flex items-center justify-between w-full px-4 sm:px-6">
          {/* Left section: Menu button and Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full hover:bg-primary/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">فتح القائمة</span>
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'transition-all duration-300 flex items-center justify-center shadow-md',
                  scrolled ? 'h-8 w-8 rounded-lg' : 'h-10 w-10 rounded-xl'
                )}
              >
                <div className="h-full w-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center rounded-inherit">
                  <span className="text-primary-foreground font-bold">R</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span
                  className={cn(
                    'font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent transition-all duration-300 leading-tight',
                    scrolled ? 'text-lg' : 'text-xl'
                  )}
                >
                  Rushita
                </span>
                <span
                  className={cn(
                    'font-medium transition-all duration-300 leading-tight',
                    scrolled ? 'text-xs text-muted-foreground' : 'text-sm'
                  )}
                >
                  Health Portal
                </span>
              </div>
            </div>
          </div>

          {/* Right section: Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Theme toggle - placeholder for future implementation */}
            <ThemeToggle />

            {/* Language Dropdown */}
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full p-1 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                    <span className="sr-only">{t('settings.language')}</span>
                    <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent asChild>
                  <div>
                    {languages.map((lang, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="mx-auto p-0 my-1 flex justify-center items-center"
                      >
                        <button
                          onClick={() => setLanguage(lang as Language)}
                          disabled={isChangingLanguage}
                          className={cn(
                            'block w-full px-4 py-2 text-start text-sm text-gray-700 dark:text-gray-300',
                            language === lang
                              ? 'bg-gray-50 dark:bg-gray-700/50'
                              : '',
                            isChangingLanguage
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          )}
                        >
                          {t(`languages.${lang}`)}
                          {isChangingLanguage && language === lang && (
                            <span className="ml-2 inline-block h-3 w-3 animate-pulse rounded-full bg-blue-500"></span>
                          )}
                        </button>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'relative rounded-full hover:bg-primary/10 transition-all',
                    scrolled ? 'h-8 w-8' : 'h-9 w-9'
                  )}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="sr-only">الإشعارات</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 rounded-xl border-border/50 shadow-lg"
              >
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>الإشعارات</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs hover:bg-primary/10"
                  >
                    تحديد الكل كمقروء
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  <motion.div
                    className="py-2 px-3 hover:bg-accent rounded-lg cursor-pointer my-1 mx-1"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">تذكير بالموعد</p>
                      <span className="text-xs text-muted-foreground">
                        منذ ساعة
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      لديك موعد مع د. أحمد غداً الساعة 10:00 صباحاً
                    </p>
                  </motion.div>
                  <motion.div
                    className="py-2 px-3 hover:bg-accent rounded-lg cursor-pointer my-1 mx-1"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">نتائج الفحص جاهزة</p>
                      <span className="text-xs text-muted-foreground">
                        منذ 3 ساعات
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      نتائج فحص الدم الخاص بك جاهزة للاطلاع
                    </p>
                  </motion.div>
                  <motion.div
                    className="py-2 px-3 hover:bg-accent rounded-lg cursor-pointer my-1 mx-1"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">تذكير بالدواء</p>
                      <span className="text-xs text-muted-foreground">
                        منذ 5 ساعات
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      حان وقت تناول دواء الضغط
                    </p>
                  </motion.div>
                </div>
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  className="w-full justify-center text-sm rounded-lg hover:bg-primary/10"
                >
                  عرض كل الإشعارات
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(var(--primary), 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(var(--primary), 0.3);
        }
      `}</style>
    </motion.header>
  );
}
