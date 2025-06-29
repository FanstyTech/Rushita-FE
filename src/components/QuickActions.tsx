'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import {
  RiCalendarScheduleLine,
  RiTimeLine,
  RiDashboardLine,
  RiHospitalLine,
  RiUserSettingsLine,
} from 'react-icons/ri';
import { FaUserMd, FaHospitalUser, FaUserCog } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';

interface RoleBasedActions {
  admin: QuickAction[];
  doctor: QuickAction[];
  clinic: QuickAction[];
}

interface QuickAction {
  name: string;
  description: string;
  href: string;
  icon: IconType;
  gradient: string;
}

const roleBasedActions: RoleBasedActions = {
  admin: [
    {
      name: 'Add Clinic',
      description: 'Register a new clinic',
      href: '/admin/clinics/add',
      icon: RiHospitalLine,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Dashboard',
      description: 'View admin dashboard',
      href: '/admin/dashboard',
      icon: RiDashboardLine,
      gradient: 'from-orange-500 to-amber-400',
    },
  ],
  doctor: [
    {
      name: 'My Schedule',
      description: 'View your schedule',
      href: '/doctor/schedule',
      icon: RiCalendarScheduleLine,
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      name: 'Request Leave',
      description: 'Submit a leave request',
      href: '/doctor/leaves',
      icon: RiTimeLine,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'My Patients',
      description: 'View your patients',
      href: '/doctor/patients',
      icon: FaHospitalUser,
      gradient: 'from-green-500 to-emerald-400',
    },
    {
      name: 'Profile',
      description: 'Manage your profile',
      href: '/doctor/profile',
      icon: FaUserCog,
      gradient: 'from-orange-500 to-amber-400',
    },
  ],
  clinic: [
    {
      name: 'Appointments',
      description: 'Manage appointments',
      href: '/clinic/appointments',
      icon: RiCalendarScheduleLine,
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      name: 'Doctors',
      description: 'View clinic doctors',
      href: '/clinic/doctors',
      icon: FaUserMd,
      gradient: 'from-green-500 to-emerald-400',
    },
    // {
    //   name: 'Settings',
    //   description: 'Clinic settings',
    //   href: '/clinic/settings',
    //   icon: RiUserSettingsLine,
    //   gradient: 'from-purple-500 to-pink-500',
    // },
    {
      name: 'Profile',
      description: 'Clinic profile',
      href: '/clinic/profile',
      icon: RiUserSettingsLine,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Dashboard',
      description: 'View clinic overview',
      href: '/clinic/dashboard',
      icon: RiDashboardLine,
      gradient: 'from-orange-500 to-amber-400',
    },
  ],
};

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const role: keyof RoleBasedActions = 'doctor';

  const quickActions = roleBasedActions[role];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = async (href: string, name: string) => {
    try {
      setIsNavigating(true);
      setActiveItem(name);
      setIsOpen(false);
      router.push(href);
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsNavigating(false);
      setActiveItem(null);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
      <div className="relative inline-block">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 focus:outline-none"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <PlusIcon className="h-5 w-5" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-4"
            >
              <div className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 min-w-[320px]">
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <Link
                        href={action.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(action.href, action.name);
                        }}
                        className={`block w-full flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br bg-opacity-5 hover:bg-opacity-10 transition-all duration-300 h-full ${
                          isNavigating && activeItem === action.name
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:scale-105'
                        }`}
                      >
                        <div
                          className={`mb-3 p-3.5 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                        >
                          <action.icon className="h-7 w-7 text-white" />
                          {isNavigating && activeItem === action.name && (
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-black/20 dark:bg-black/40 flex items-center justify-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            </motion.div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center line-clamp-1 w-full">
                          {action.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 line-clamp-2 w-full">
                          {action.description}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
