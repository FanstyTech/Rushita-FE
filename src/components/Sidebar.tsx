"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserIcon,
  HomeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import { SiWebflow, SiFramer, SiTypeform } from 'react-icons/si';
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Placeholder: Replace with real user role from auth context
const userRole: 'admin' | 'clinic' | 'doctor' = 'admin'; // Change to test different sidebars

const doctorNav = [ 
  { name: 'Dashboard', href: '/doctor/dashboard', icon: ChartBarIcon },
  { name: 'Patients', href: '/doctor/patients', icon: UserGroupIcon },
  { name: 'Treatments', href: '/doctor/treatments', icon: ClipboardDocumentListIcon },
  { name: 'Profile', href: '/doctor/profile', icon: UserIcon },
];

const adminNav = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
  { name: 'Clinics', href: '/admin/clinics', icon: HomeIcon },
  { name: 'Lookups', href: '/admin/lookups', icon: ChartBarIcon },
  { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
];

const clinicNav = [
  { name: 'Dashboard', href: '/clinic/dashboard', icon: ChartBarIcon },
  { name: 'Doctors', href: '/clinic/doctors', icon: UserGroupIcon },
  { name: 'Assignments', href: '/clinic/assignments', icon: ClipboardDocumentListIcon },
  { name: 'Appointments', href: '/clinic/appointments', icon: CalendarIcon },
  { name: 'Reports', href: '/clinic/reports', icon: ChartBarIcon },
];

function NavigationSection({ title, items, isCollapsed }: { title: string; items: any[]; isCollapsed: boolean }) {
  const pathname = usePathname();
  return (
    <div className="mb-2">
      {!isCollapsed && (
        <div className="text-xs text-gray-400 uppercase tracking-wider px-2 mb-2">{title}</div>
      )}
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                'group flex items-center px-3 py-2 rounded-lg transition-all duration-200',
                isActive ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-100',
                isCollapsed ? 'justify-center' : 'justify-start'
              )}
            >
              <item.icon className={classNames('flex-shrink-0 h-5 w-5', isActive ? 'text-indigo-700' : 'text-gray-500 group-hover:text-gray-700', isCollapsed ? 'mr-0' : 'mr-3')} aria-hidden="true" />
              {!isCollapsed && <span className="flex-1 text-start">{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { direction } = useLanguage();
  const { t } = useTranslation();
  const isRTL = direction === 'rtl';
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={classNames(
        'flex flex-col',
        'fixed top-0 left-0 z-40 h-screen transition-all duration-300',
        'bg-white border-r border-gray-200',
        isCollapsed ? 'w-20' : 'w-72'
      )}>
        {/* Toggle Button */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-9 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50"
        >
          {isCollapsed ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />}
        </button>

        {/* Logo */}
        <div className={classNames(
          'flex items-center h-16 px-4',
          isCollapsed ? 'justify-center' : 'justify-between'
        )}>
          {!isCollapsed && <span className="text-xl font-semibold">Clinic</span>}
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        </div>

        {/* Search */}
        
        {!isCollapsed && (<div className="relative px-4 mb-4">
          <input
            type="text"
            placeholder={isCollapsed ? '' : 'Search...'}
            className={classNames(
              'w-full pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm',
              isCollapsed ? 'pl-3' : 'pl-10'
            )}
          />
          <FiSearch className={classNames(
            'absolute top-1/2 -translate-y-1/2 text-gray-400',
            isCollapsed ? 'left-1/2 -translate-x-1/2' : 'left-7'
          )} size={18} />
        </div>
        )}
        

        {/* Main Navigation - Make this section scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 space-y-1">
            {/* <NavigationSection 
              title={userRole === 'admin' ? 'Admin' : userRole === 'clinic' ? 'Clinic' : 'Doctor'} 
              items={userRole === 'admin' ? adminNav : userRole === 'clinic' ? clinicNav : doctorNav} 
              isCollapsed={isCollapsed} 
            /> */}
            <NavigationSection 
              title="admin" 
              items={ adminNav} 
              isCollapsed={isCollapsed} 
            />
          
            <NavigationSection 
              title="clinic" 
              items={ clinicNav} 
              isCollapsed={isCollapsed} 
            />
            <NavigationSection 
              title="doctor" 
              items={ doctorNav} 
              isCollapsed={isCollapsed} 
            />  
          </nav>
        </div>

        
      </aside>

      {/* Spacer div to push content */}
      <div className={classNames(
        'flex-shrink-0 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-72'
      )} />
    </>
  );
} 