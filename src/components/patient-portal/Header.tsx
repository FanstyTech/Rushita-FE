'use client';

import { useState, useEffect } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import ThemeToggle from '../ThemeToggle';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../LanguageToggle';
import { useLanguage } from '@/i18n/LanguageProvider';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ setSidebarOpen }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const { direction } = useLanguage();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

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
              <span className="sr-only">
                {t('patientPortal.header.menu.openMenu')}
              </span>
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
                  Rousheta
                </span>
                <span
                  className={cn(
                    'font-medium transition-all duration-300 leading-tight',
                    scrolled ? 'text-xs text-muted-foreground' : 'text-sm'
                  )}
                >
                  {t('patientPortal.header.logo.healthPortal')}
                </span>
              </div>
            </div>
          </div>

          {/* Right section: Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Theme toggle - placeholder for future implementation */}
            <ThemeToggle />

            {/* Language Dropdown */}
            <LanguageToggle />

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
                  <span className="sr-only">
                    {t('patientPortal.header.notifications.title')}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 rounded-xl border-border/50 shadow-lg"
              >
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>{t('patientPortal.header.notifications.title')}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs hover:bg-primary/10"
                  >
                    {t('patientPortal.header.notifications.markAllAsRead')}
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
                      <p className="font-medium text-sm">
                        {t(
                          'patientPortal.header.notifications.appointmentReminder'
                        )}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {t(
                          'patientPortal.header.notifications.timeAgo.oneHour'
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t(
                        'patientPortal.header.notifications.messages.appointmentTomorrow'
                      )}
                    </p>
                  </motion.div>
                  <motion.div
                    className="py-2 px-3 hover:bg-accent rounded-lg cursor-pointer my-1 mx-1"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">
                        {t('patientPortal.header.notifications.testResults')}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {t(
                          'patientPortal.header.notifications.timeAgo.threeHours'
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t(
                        'patientPortal.header.notifications.messages.testResultsReady'
                      )}
                    </p>
                  </motion.div>
                  <motion.div
                    className="py-2 px-3 hover:bg-accent rounded-lg cursor-pointer my-1 mx-1"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">
                        {t(
                          'patientPortal.header.notifications.medicationReminder'
                        )}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {t(
                          'patientPortal.header.notifications.timeAgo.fiveHours'
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t(
                        'patientPortal.header.notifications.messages.medicationTime'
                      )}
                    </p>
                  </motion.div>
                </div>
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  className="w-full justify-center text-sm rounded-lg hover:bg-primary/10"
                >
                  {t('patientPortal.header.notifications.viewAll')}
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
