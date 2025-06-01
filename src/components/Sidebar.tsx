'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import {
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserIcon,
  HomeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  MapPinIcon,
  ListBulletIcon,
  BeakerIcon,
  HeartIcon,
  ArchiveBoxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  BoltIcon,
  PuzzlePieceIcon,
  IdentificationIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { RiHospitalLine } from 'react-icons/ri';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Placeholder: Replace with real user role from auth context
const userRole: 'admin' | 'clinic' | 'doctor' = 'admin'; // Change to test different sidebars

export const doctorNav = [
  { name: 'Dashboard', href: '/doctor/dashboard', icon: ChartBarIcon },
  { name: 'Patients', href: '/doctor/patients', icon: UserGroupIcon },
  {
    name: 'Treatments',
    href: '/doctor/treatments',
    icon: ClipboardDocumentListIcon,
  },
  { name: 'Leaves', href: '/doctor/leaves', icon: CalendarIcon },
  { name: 'Profile', href: '/doctor/profile', icon: UserIcon },
];

export const adminNav = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
  {
    name: 'Clinics',
    icon: HomeIcon,
    children: [
      {
        name: 'Management',
        icon: ClipboardDocumentListIcon,
        children: [
          {
            name: 'Clinic List',
            href: '/admin/clinics',
            icon: ClipboardDocumentListIcon,
          },
          {
            name: 'Add Clinic',
            href: '/admin/clinics/add',
            icon: UserGroupIcon,
          },
        ],
      },
      {
        name: 'Reports',
        icon: ChartBarIcon,
        children: [
          {
            name: 'Performance',
            href: '/admin/clinics/reports/performance',
            icon: ChartBarIcon,
          },
          {
            name: 'Analytics',
            href: '/admin/clinics/reports/analytics',
            icon: ChartBarIcon,
          },
        ],
      },
    ],
  },
  {
    name: 'Lookups',
    icon: ListBulletIcon,
    children: [
      { name: 'Specialty', href: '/admin/lookups/specialty', icon: AcademicCapIcon },
      { name: 'Country', href: '/admin/lookups/country', icon: GlobeAltIcon },
      { name: 'City', href: '/admin/lookups/city', icon: MapPinIcon },
      {
        name: 'Clinic Type',
        href: '/admin/lookups/clinic-type',
        icon: BuildingOfficeIcon,
      },
      {
        name: 'Radiology Test Category',
        href: '/admin/lookups/radiology-test-category',
        icon: ArchiveBoxIcon,
      },
      {
        name: 'Radiology Test',
        href: '/admin/lookups/radiology-test',
        icon: BoltIcon,
      },
      {
        name: 'Medication Type',
        href: '/admin/lookups/medication-type',
        icon: BookmarkIcon,
      },
      {
        name: 'Medicine',
        href: '/admin/lookups/medicine',
        icon: HeartIcon,
      },
      {
        name: 'Lab Test Category',
        href: '/admin/lookups/lab-test-category',
        icon: PuzzlePieceIcon,
      },
      {
        name: 'Lab Test',
        href: '/admin/lookups/lab-test',
        icon: ShieldCheckIcon,
      },
      {
        name: 'Diagnosis Category',
        href: '/admin/lookups/diagnosis-category',
        icon: DocumentTextIcon,
      },
      {
        name: 'Diagnosis',
        href: '/admin/lookups/diagnosis',
        icon: ClipboardDocumentCheckIcon,
      },
      {
        name: 'Dental Procedure',
        href: '/admin/lookups/dental-procedure',
        icon: SparklesIcon,
      },
    ],
  },
  { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
];

export const clinicNav = [
  { name: 'Dashboard', href: '/clinic/dashboard', icon: ChartBarIcon },
  { name: 'Clinic Profile', href: '/clinic/profile', icon: RiHospitalLine },
  {
    name: 'Doctors',
    icon: UserGroupIcon,
    children: [
      {
        name: 'Management',
        icon: ClipboardDocumentListIcon,
        children: [
          {
            name: 'Doctor List',
            href: '/clinic/doctors',
            icon: ClipboardDocumentListIcon,
          },
          {
            name: 'Add Doctor',
            href: '/clinic/doctors/add',
            icon: UserGroupIcon,
          },
        ],
      },
      {
        name: 'Reports',
        icon: ChartBarIcon,
        children: [
          {
            name: 'Performance',
            href: '/admin/clinics/reports/performance',
            icon: ChartBarIcon,
          },
          {
            name: 'Analytics',
            href: '/admin/clinics/reports/analytics',
            icon: ChartBarIcon,
          },
        ],
      },
    ],
  },
  {
    name: 'Leaves',
    href: '/clinic/doctors/leaves',
    icon: CalendarIcon,
  },
  {
    name: 'Doctor Schedule',
    href: '/clinic/doctor-schedule',
    icon: RiCalendarScheduleLine,
  },
  { name: 'Appointments', href: '/clinic/appointments', icon: CalendarIcon },
  // { name: 'Settings', href: '/clinic/settings', icon: Cog6ToothIcon },
];

// Navigation Item Type
export interface NavItem {
  name: string;
  href?: string;
  icon: any;
  children?: NavItem[];
}

export function NavigationItem({
  item,
  isCollapsed,
  level = 0,
  expandedItems,
  toggleExpand,
}: {
  item: NavItem;
  isCollapsed: boolean;
  level?: number;
  expandedItems: string[];
  toggleExpand: (name: string) => void;
}) {
  const pathname = usePathname();
  const isExpanded = expandedItems.includes(item.name);
  const hasChildren = Boolean(item.children?.length);
  const isActive = pathname === item.href;
  const isChildActive =
    hasChildren &&
    item.children?.some(
      (child) =>
        pathname === child.href ||
        child.children?.some((subChild) => pathname === subChild.href)
    );

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => toggleExpand(item.name)}
          className={classNames(
            'w-full group flex items-center px-3 py-2 rounded-lg transition-all duration-200',
            isActive
              ? 'bg-indigo-100 text-indigo-700 font-semibold'
              : 'text-gray-700 hover:bg-gray-100',
            isCollapsed ? 'justify-center' : 'justify-between',
            level > 0 && !isCollapsed ? 'ml-4' : ''
          )}
        >
          <div
            className={classNames(
              'flex items-center',
              isCollapsed ? 'justify-center' : ''
            )}
          >
            <item.icon
              className={classNames(
                'flex-shrink-0 h-5 w-5',
                isActive
                  ? 'text-indigo-700'
                  : 'text-gray-500 group-hover:text-gray-700',
                isCollapsed ? 'mr-0' : 'mr-3'
              )}
            />
            {!isCollapsed && <span>{item.name}</span>}
          </div>
          {!isCollapsed && (
            <ChevronRightIcon
              className={classNames(
                'h-4 w-4 transition-transform',
                isExpanded ? 'transform rotate-90' : ''
              )}
            />
          )}
        </button>

        {!isCollapsed && isExpanded && item.children && (
          <div className={classNames(level === 0 ? 'ml-4' : 'ml-6')}>
            {item.children.map((child) => (
              <NavigationItem
                key={child.name}
                item={child}
                isCollapsed={isCollapsed}
                level={level + 1}
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      className={classNames(
        'group flex items-center px-3 py-2 rounded-lg transition-all duration-200',
        isActive
          ? 'bg-indigo-100 text-indigo-700 font-semibold'
          : 'text-gray-700 hover:bg-gray-100',
        level > 0 && !isCollapsed ? 'ml-4' : ''
      )}
    >
      <item.icon
        className={classNames(
          'flex-shrink-0 h-5 w-5',
          isActive
            ? 'text-indigo-700'
            : 'text-gray-500 group-hover:text-gray-700',
          isCollapsed ? 'mr-0' : 'mr-3'
        )}
      />
      {!isCollapsed && <span>{item.name}</span>}
    </Link>
  );
}

function NavigationSection({
  title,
  items,
  isCollapsed,
}: {
  title: string;
  items: NavItem[];
  isCollapsed: boolean;
}) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Memoize the findActiveParent function
  const findActiveParent = useCallback(
    (navItems: NavItem[]) => {
      const activeParents: string[] = [];

      const traverse = (items: NavItem[]) => {
        for (const item of items) {
          if (item.children) {
            const isActiveParent = item.children.some(
              (child) =>
                pathname === child.href ||
                child.children?.some((subChild) => pathname === subChild.href)
            );

            if (isActiveParent) {
              activeParents.push(item.name);
            }

            traverse(item.children);
          }
        }
      };

      traverse(navItems);
      return activeParents;
    },
    [pathname]
  );

  // Update expanded items when pathname changes
  useEffect(() => {
    setExpandedItems(findActiveParent(items));
  }, [pathname, findActiveParent]);

  const toggleExpand = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="mb-2">
      {!isCollapsed && (
        <div className="text-xs text-gray-400 uppercase tracking-wider px-2 mb-2">
          {title}
        </div>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <NavigationItem
            key={item.name}
            item={item}
            isCollapsed={isCollapsed}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
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
      <aside
        className={classNames(
          'flex flex-col',
          'fixed top-0 left-0 z-40 h-screen transition-all duration-300',
          'bg-white border-r border-gray-200',
          isCollapsed ? 'w-20' : 'w-72'
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-9 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>

        {/* Logo */}
        <div
          className={classNames(
            'flex items-center h-16 px-4',
            isCollapsed ? 'justify-center' : 'justify-between'
          )}
        >
          {!isCollapsed && (
            <span className="text-xl font-semibold ">Rushita</span>
          )}
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        </div>

        {/* Search */}

        {!isCollapsed && (
          <div className="relative px-4 mb-4">
            <input
              type="text"
              placeholder={isCollapsed ? '' : 'Search...'}
              className={classNames(
                'w-full pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm',
                isCollapsed ? 'pl-3' : 'pl-10'
              )}
            />
            <FiSearch
              className={classNames(
                'absolute top-1/2 -translate-y-1/2 text-gray-400',
                isCollapsed ? 'left-1/2 -translate-x-1/2' : 'left-7'
              )}
              size={18}
            />
          </div>
        )}

        {/* Main Navigation - Make this section scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 space-y-1">
            <NavigationSection
              title="admin"
              items={adminNav}
              isCollapsed={isCollapsed}
            />
            <NavigationSection
              title="clinic"
              items={clinicNav}
              isCollapsed={isCollapsed}
            />

            <NavigationSection
              title="doctor"
              items={doctorNav}
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>
      </aside>

      {/* Spacer div to push content */}
      <div
        className={classNames(
          'flex-shrink-0 transition-all duration-300',
          isCollapsed ? 'w-20' : 'w-72'
        )}
      />
    </>
  );
}
