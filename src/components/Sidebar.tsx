'use client';

import { useCallback, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { filterNavItemsByPermission } from '@/utils/permissions';
import type { NavItem } from '@/types/navigation';
import { adminNav, clinicNav, doctorNav } from '@/config/navigation';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
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
  toggleExpand: (id: string) => void;
}) {
  const pathname = usePathname();
  const isExpanded = expandedItems.includes(item.id);
  const hasChildren = Boolean(item.children?.length);
  const isActive = pathname === item.href;

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => toggleExpand(item.id)}
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
                key={child.id}
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

export function NavigationSection({
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
  const authorizedItems = useMemo(
    () => filterNavItemsByPermission(items, user?.permissions || []),
    [items, user?.permissions]
  );

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
              activeParents.push(item.id);
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

  const toggleExpand = useCallback((id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((name) => name !== id) : [...prev, id]
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
            key={item.id}
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

const hasAdminRole = (userRoles: string[] = []): boolean => {
  return userRoles.some((role) => ['SystemAdmin', 'SuperAdmin'].includes(role));
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const filteredNavItems = useMemo(() => {
    if (!mounted || !user?.permissions) return [];

    const sections = [];

    // Add admin section for SuperAdmin role
    sections.push({
      title: 'Admin',
      items: filterNavItemsByPermission(adminNav, user.permissions),
    });
    // Add clinic section for ClinicStaff role
    sections.push({
      title: 'Clinic',
      items: filterNavItemsByPermission(clinicNav, user.permissions),
    });
    // Add doctor section for Doctor role
    sections.push({
      title: 'Doctor',
      items: filterNavItemsByPermission(doctorNav, user.permissions),
    });
    return sections;
  }, [mounted, user?.permissions]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sections = filteredNavItems;

  if (!mounted || sections.length === 0) {
    return null;
  }

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
            {sections.map((section) => (
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
