'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Calendar,
  User,
  FileText,
  Pill,
  Activity,
  CreditCard,
  Video,
  X,
  Menu,
  ChevronLeft,
  LogOut,
  Settings,
  ChevronDown,
  CalendarCheck,
  CalendarClock,
  CalendarPlus,
  CalendarX,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useTranslation } from 'react-i18next'; // Add this import

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { direction } = useLanguage();
  const { t } = useTranslation(); // Add this hook

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      // await logout();
      router.push('/patient-portal/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Group navigation items by category
  const mainNavigation = [
    {
      name: t('patientPortal.sidebar.navigation.dashboard'),
      href: '/patient-portal/dashboard',
      icon: Home,
      badge: '',
    },
    {
      name: t('patientPortal.sidebar.navigation.profile'),
      href: '/patient-portal/profile',
      icon: User,
      badge: '',
    },
  ];

  const appointmentsNavigation = [
    {
      name: t('patientPortal.sidebar.navigation.appointments'),
      href: '/patient-portal/appointments',
      icon: Calendar,
      badge: '3',
    },
    {
      name: t('patientPortal.sidebar.navigation.medicalVisits'),
      href: '/patient-portal/visits',
      icon: FileText,
      badge: '',
    },
  ];

  const calendarSubNavigation = [
    {
      name: t('patientPortal.sidebar.navigation.bookAppointment'),
      href: '/patient-portal/appointments/book',
      icon: CalendarPlus,
      badge: '',
    },
    {
      name: t('patientPortal.sidebar.navigation.appointmentHistory'),
      href: '/patient-portal/appointments',
      icon: CalendarClock,
      badge: '',
    },
  ];

  const medicalNavigation = [
    {
      name: t('patientPortal.sidebar.navigation.prescriptions'),
      href: '/patient-portal/prescriptions',
      icon: Pill,
      badge: '2',
    },
    {
      name: t('patientPortal.sidebar.navigation.labResults'),
      href: '/patient-portal/lab-results',
      icon: Activity,
      badge: '1',
    },
  ];

  const servicesNavigation = [
    {
      name: t('patientPortal.sidebar.navigation.billing'),
      href: '/patient-portal/billing',
      icon: CreditCard,
      badge: '',
    },
    {
      name: t('patientPortal.sidebar.navigation.telemedicine'),
      href: '/patient-portal/telemedicine',
      icon: Video,
      badge: '',
    },
  ];

  // Check if a navigation item is active
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    calendar: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Render a navigation item
  const renderNavItem = (item: {
    name: string;
    href: string;
    icon: any;
    badge: string;
  }) => {
    const active = isActive(item.href);

    return (
      <motion.li
        key={item.name}
        className="relative "
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={item.href}
          className={cn(
            'flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 group',
            active
              ? 'bg-gradient-to-l from-primary/30 to-primary/5 text-primary font-medium shadow-md'
              : 'text-foreground hover:bg-accent/50 hover:text-accent-foreground'
          )}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={cn(
              'p-2 rounded-lg transition-colors duration-200',
              active
                ? 'bg-primary text-primary-foreground shadow-inner'
                : 'bg-muted/70 text-muted-foreground group-hover:bg-primary/70 group-hover:text-primary-foreground'
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
          </div>
          <span className="flex-1">{item.name}</span>
          {item.badge && (
            <Badge
              variant="secondary"
              className={cn(
                'h-5 min-w-5 flex items-center justify-center rounded-full px-1.5 py-0',
                active ? 'bg-primary/20 text-primary' : 'bg-muted'
              )}
            >
              {item.badge}
            </Badge>
          )}
          {active && (
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-l-full"
              layoutId="activeIndicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      </motion.li>
    );
  };

  // Render a sub-navigation item with slightly different styling
  const renderSubNavItem = (item: {
    name: string;
    href: string;
    icon: any;
    badge: string;
  }) => {
    const active = isActive(item.href);

    return (
      <motion.li
        key={item.name}
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={item.href}
          className={cn(
            'flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-all duration-200 group',
            active
              ? 'bg-gradient-to-l from-primary/20 to-primary/5 text-primary font-medium'
              : 'text-foreground hover:bg-accent/30 hover:text-accent-foreground'
          )}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={cn(
              'p-1.5 rounded-lg transition-colors duration-200',
              active
                ? 'bg-primary/80 text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/50 group-hover:text-primary-foreground'
            )}
          >
            <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
          </div>
          <span className="flex-1 text-xs">{item.name}</span>
          {item.badge && (
            <Badge
              variant="secondary"
              className={cn(
                'h-4 min-w-4 flex items-center justify-center rounded-full px-1 py-0 text-xs',
                active ? 'bg-primary/20 text-primary' : 'bg-muted'
              )}
            >
              {item.badge}
            </Badge>
          )}
          {active && (
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full"
              layoutId="activeSubIndicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      </motion.li>
    );
  };

  if (!mounted) return null;

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={cn(
          'fixed inset-y-4 z-50 w-72 rounded-2xl bg-card/80 backdrop-blur-md shadow-xl border border-border/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-hidden',
          // RTL/LTR responsive positioning
          direction === 'rtl'
            ? isOpen
              ? 'right-4 translate-x-0'
              : 'right-4 translate-x-full'
            : isOpen
            ? 'left-4 translate-x-0'
            : 'left-4 -translate-x-full',
          // Large screen positioning
          direction === 'rtl'
            ? 'lg:right-6 lg:top-6 lg:bottom-6'
            : 'lg:left-6 lg:top-6 lg:bottom-6',
          'lg:h-[calc(100vh-3rem)]'
        )}
        initial={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border/50 bg-gradient-to-l from-primary/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-bold">R</span>
            </div>
            <h2 className="text-lg font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t('patientPortal.sidebar.title')}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="lg:hidden hover:bg-primary/10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-border/50 bg-gradient-to-b from-muted/30 to-transparent">
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-sm">
              <AvatarImage
                // src={user?.avatar || ''}
                alt={user?.name || t('patientPortal.sidebar.user.user')}
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-medium">
                {user?.name?.charAt(0) || t('patientPortal.sidebar.user.user').charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-base font-medium truncate">
                {user?.name || t('patientPortal.sidebar.user.user')}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10"
              title={t('patientPortal.sidebar.user.settings')}
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div
          className="p-3 overflow-y-auto h-[calc(100%-10rem)] custom-scrollbar"
          dir={direction}
        >
          <div className="space-y-6">
            {/* Main Navigation */}
            <div>
              <h3 className="px-4 text-xs font-semibold text-muted-foreground mb-2">
                {t('patientPortal.sidebar.main')}
              </h3>
              <ul className="space-y-1.5">
                {mainNavigation.map(renderNavItem)}
              </ul>
            </div>

            <Separator className="mx-1 opacity-50" />

            {/* Appointments Navigation */}
            <div>
              <h3 className="px-4 text-xs font-semibold text-muted-foreground mb-2">
                {t('patientPortal.sidebar.appointments')}
              </h3>
              <ul className="space-y-1.5">
                {/* Calendar with expandable section */}
                <motion.li
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => toggleSection('calendar')}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 group',
                      isActive('/patient-portal/appointments') ||
                        expandedSections.calendar
                        ? 'bg-gradient-to-l from-primary/30 to-primary/5 text-primary font-medium shadow-md'
                        : 'text-foreground hover:bg-accent/50 hover:text-accent-foreground'
                    )}
                  >
                    <div
                      className={cn(
                        'p-2 rounded-lg transition-colors duration-200',
                        isActive('/patient-portal/appointments') ||
                          expandedSections.calendar
                          ? 'bg-primary text-primary-foreground shadow-inner'
                          : 'bg-muted/70 text-muted-foreground group-hover:bg-primary/70 group-hover:text-primary-foreground'
                      )}
                    >
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="flex-1">{t('patientPortal.sidebar.calendar')}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        expandedSections.calendar ? 'transform rotate-180' : ''
                      )}
                    />
                    {isActive('/patient-portal/appointments') &&
                      !expandedSections.calendar && (
                        <motion.div
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-l-full"
                          layoutId="activeIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                  </button>
                </motion.li>

                {/* Calendar sub-navigation */}
                {expandedSections.calendar && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-1 mt-1 pr-4 border-r-2 border-primary/20 mr-4">
                      {calendarSubNavigation.map(renderSubNavItem)}
                    </ul>
                  </motion.div>
                )}

                {/* Other appointment navigation items */}
                {renderNavItem(appointmentsNavigation[1])}
              </ul>
            </div>

            <Separator className="mx-1 opacity-50" />

            {/* Medical Navigation */}
            <div>
              <h3 className="px-4 text-xs font-semibold text-muted-foreground mb-2">
                {t('patientPortal.sidebar.medical')}
              </h3>
              <ul className="space-y-1.5">
                {medicalNavigation.map(renderNavItem)}
              </ul>
            </div>

            <Separator className="mx-1 opacity-50" />

            {/* Services Navigation */}
            <div>
              <h3 className="px-4 text-xs font-semibold text-muted-foreground mb-2">
                {t('patientPortal.sidebar.services')}
              </h3>
              <ul className="space-y-1.5">
                {servicesNavigation.map(renderNavItem)}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer with logout button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card to-transparent">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 border-border/50 hover:bg-primary/10 hover:text-primary"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>{t('patientPortal.sidebar.user.logout')}</span>
          </Button>
        </div>
      </motion.div>

      {/* Toggle button for mobile */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg border border-border/50 bg-card/80 backdrop-blur-sm z-30 lg:hidden hover:bg-primary/10"
      >
        <Menu className="h-5 w-5" />
      </Button>

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
    </>
  );
}
