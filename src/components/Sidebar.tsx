'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserIcon,
  HomeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  MapPinIcon,
  ListBulletIcon,
  HeartIcon,
  ArchiveBoxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  BoltIcon,
  PuzzlePieceIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  SparklesIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

import { FiSearch } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useAuth } from '@/lib/api/hooks/useAuth';
import type { UserPermissionDto } from '@/lib/api/types/auth';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface NavItem {
  name: string;
  href?: string;
  icon: IconType;
  children?: NavItem[];
  permission?: string;
}

const hasPermission = (
  requiredPermission: string | undefined,
  userPermissions: UserPermissionDto[]
): boolean => {
  if (!requiredPermission) return true;
  return userPermissions.some((p) => p.key === requiredPermission);
};

export const doctorNav: NavItem[] = [
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

export const adminNav: NavItem[] = [
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
      {
        name: 'Specialty',
        href: '/admin/lookups/specialty',
        icon: AcademicCapIcon,
      },
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

export const clinicNav: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/clinic/dashboard',
    icon: ChartBarIcon,
    permission: 'dashboard.access',
  },
  {
    name: 'Appointments',
    href: '/clinic/appointments',
    icon: CalendarIcon,
    permission: 'clinic.appointments.view',
  },
  {
    name: 'Patients',
    href: '/clinic/patients',
    icon: UserGroupIcon,
    permission: 'clinic.patients.view',
  },
  {
    name: 'Staff',
    icon: UserIcon,
    permission: 'clinic.staff.view',
    children: [
      {
        name: 'Staff List',
        href: '/clinic/staff',
        icon: UserGroupIcon,
        permission: 'clinic.staff.view',
      },
      {
        name: 'Roles',
        href: '/clinic/staff/roles',
        icon: ShieldCheckIcon,
        permission: 'clinic.staff.roles.manage',
      },
    ],
  },
  {
    name: 'Laboratory',
    icon: ClipboardDocumentListIcon,
    permission: 'laboratory.view',
    children: [
      {
        name: 'Tests',
        href: '/clinic/laboratory/tests',
        icon: ClipboardDocumentCheckIcon,
        permission: 'laboratory.view',
      },
      {
        name: 'Results',
        href: '/clinic/laboratory/results',
        icon: DocumentTextIcon,
        permission: 'laboratory.view',
      },
    ],
  },
  {
    name: 'Pharmacy',
    icon: HeartIcon,
    permission: 'pharmacy.prescriptions.view',
    children: [
      {
        name: 'Prescriptions',
        href: '/clinic/pharmacy/prescriptions',
        icon: DocumentTextIcon,
        permission: 'pharmacy.prescriptions.view',
      },
      {
        name: 'Dispense',
        href: '/clinic/pharmacy/dispense',
        icon: ArchiveBoxIcon,
        permission: 'pharmacy.medication.dispense',
      },
    ],
  },
  {
    name: 'Reports',
    icon: ChartBarIcon,
    permission: 'reports.view',
    children: [
      {
        name: 'View Reports',
        href: '/clinic/reports',
        icon: ChartBarIcon,
        permission: 'reports.view',
      },
      {
        name: 'Generate Reports',
        href: '/clinic/reports/generate',
        icon: DocumentTextIcon,
        permission: 'reports.generate',
      },
    ],
  },
  {
    name: 'Settings',
    href: '/clinic/settings',
    icon: Cog6ToothIcon,
    permission: 'clinic.settings.view',
  },
];

const hasAdminRole = (userRoles: string[] = []): boolean => {
  return userRoles.some((role) => ['SystemAdmin', 'SuperAdmin'].includes(role));
};

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
  const { user } = useAuth();

  // Check if user has permission to see this item
  if (!hasPermission(item.permission, user?.permissions || [])) {
    return null;
  }

  // If item has children, check if at least one child is accessible
  if (item.children?.length) {
    const hasAccessibleChild = item.children.some((child) =>
      hasPermission(child.permission, user?.permissions || [])
    );
    if (!hasAccessibleChild) return null;
  }

  const isExpanded = expandedItems.includes(item.name);
  const hasChildren = Boolean(item.children?.length);
  const isActive = pathname === item.href;

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
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { user } = useAuth();
  const pathname = usePathname();

  // Memoize authorized items to prevent unnecessary recalculations
  const authorizedItems = useMemo(() => {
    return items.filter((item) => {
      if (item.children?.length) {
        return item.children.some((child) =>
          hasPermission(child.permission, user?.permissions || [])
        );
      }
      return hasPermission(item.permission, user?.permissions || []);
    });
  }, [items, user?.permissions]);

  // Don't render section if no authorized items
  if (authorizedItems.length === 0) {
    return null;
  }

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

  useEffect(() => {
    const activeParents = findActiveParent(authorizedItems);
    setExpandedItems(activeParents);
  }, [pathname, findActiveParent, authorizedItems]);

  const toggleExpand = useCallback((itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  }, []);

  return (
    <div className="space-y-1">
      {!isCollapsed && (
        <h3 className="px-3 text-xs font-semibold text-gray-500">{title}</h3>
      )}
      <div className="space-y-1">
        {authorizedItems.map((item) => (
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
  const { user } = useAuth();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const getNavigationByRole = () => {
    if (!mounted) return []; // Return empty array during SSR

    const sections = [];

    // Admin section for SystemAdmin and SuperAdmin
    if (hasAdminRole(user?.roles)) {
      sections.push({ title: 'Admin', items: adminNav });
    }

    // Clinic section for ClinicStaff
    if (user?.roles?.includes('ClinicStaff')) {
      sections.push({ title: 'Clinic', items: clinicNav });
    }

    // Doctor section for Doctor role
    if (user?.roles?.includes('Doctor')) {
      sections.push({ title: 'Doctor', items: doctorNav });
    }

    // Patient section if needed
    if (user?.roles?.includes('Patient')) {
      sections.push({ title: 'Patient', items: [] });
    }

    return sections;
  };

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
            <span className="text-xl font-semibold">Rushita</span>
          )}
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

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 space-y-1">
            {mounted &&
              getNavigationByRole().map((section) => (
                <NavigationSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  isCollapsed={isCollapsed}
                />
              ))}
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
