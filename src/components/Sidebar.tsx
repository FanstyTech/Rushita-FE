'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { filterNavItemsByPermission } from '@/utils/permissions';
import type { NavItem } from '@/types/navigation';
import { adminNav, clinicNav, doctorNav } from '@/config/navigation';
import { useLanguage } from '@/i18n/LanguageProvider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

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

  // Improved active state detection
  const isActive = useMemo(() => {
    if (!item.href) return false;

    // Normalize pathname by removing language prefix
    const normalizedPathname =
      pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
    const normalizedHref = item.href.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

    console.log(
      'pathname',
      pathname,
      'normalizedPathname',
      normalizedPathname,
      'item.href',
      normalizedHref
    );

    // Exact match
    if (normalizedPathname === normalizedHref) return true;

    // For parent items, check if current path starts with the item's href
    // but only if the item has children or is a parent route
    if (hasChildren || normalizedHref.endsWith('/')) {
      return normalizedPathname.startsWith(normalizedHref);
    }

    // For nested routes, check if current path starts with item href
    // Example: /clinic/financial should be active when on /clinic/financial/revenues
    return normalizedPathname.startsWith(normalizedHref + '/');
  }, [pathname, item.href, hasChildren]);

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => toggleExpand(item.id)}
          className={classNames(
            'w-full group flex items-center px-3 py-2.5 rounded-xl transition-all duration-300 ease-in-out',
            'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20',
            'hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]',
            isActive
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
              : 'text-gray-700 dark:text-gray-300',
            isCollapsed ? 'justify-center' : 'justify-between',
            level > 0 && !isCollapsed ? 'ml-3' : ''
          )}
        >
          <div
            className={classNames(
              'flex items-center gap-3',
              isCollapsed ? 'justify-center' : ''
            )}
          >
            <div
              className={classNames(
                'p-1.5 rounded-lg transition-all duration-300',
                isActive
                  ? 'bg-white/20'
                  : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
              )}
            >
              <item.icon
                className={classNames(
                  'h-4 w-4 transition-all duration-300',
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                )}
              />
            </div>
            {!isCollapsed && (
              <span
                className={classNames(
                  'font-medium text-sm transition-colors duration-300',
                  isActive
                    ? 'text-white'
                    : 'group-hover:text-blue-700 dark:group-hover:text-blue-300'
                )}
              >
                {item.name}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <ChevronRightIcon
              className={classNames(
                'h-4 w-4 transition-all duration-300',
                isExpanded ? 'transform rotate-90' : '',
                isActive
                  ? 'text-white/80'
                  : 'text-gray-400 group-hover:text-blue-500'
              )}
            />
          )}
        </button>

        {!isCollapsed && isExpanded && item.children && (
          <div
            className={classNames(
              'space-y-1 overflow-hidden transition-all duration-300',
              level === 0
                ? 'ml-4 pl-4 border-l-2 border-gray-100 dark:border-gray-700'
                : 'ml-6'
            )}
          >
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
        'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ease-in-out',
        isActive
          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20',
        'hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]',
        level > 0 && !isCollapsed ? 'ml-3' : ''
      )}
    >
      <div
        className={classNames(
          'p-1.5 rounded-lg transition-all duration-300',
          isActive
            ? 'bg-white/20'
            : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
        )}
      >
        <item.icon
          className={classNames(
            'h-4 w-4 transition-all duration-300',
            isActive
              ? 'text-white'
              : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
          )}
        />
      </div>
      {!isCollapsed && (
        <span
          className={classNames(
            'font-medium text-sm transition-colors duration-300',
            isActive
              ? 'text-white'
              : 'group-hover:text-blue-700 dark:group-hover:text-blue-300'
          )}
        >
          {item.name}
        </span>
      )}
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

  // Define findActiveParent with useCallback before any conditional returns
  const findActiveParent = useCallback(
    (navItems: NavItem[]) => {
      const activeParents: string[] = [];

      // Normalize pathname by removing language prefix
      const normalizedPathname =
        pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

      const traverse = (items: NavItem[]) => {
        for (const item of items) {
          if (item.children) {
            const isActiveParent = item.children.some((child) => {
              if (!child.href) return false;

              // Check if child is active (exact match or nested route)
              if (normalizedPathname === child.href) return true;
              if (normalizedPathname.startsWith(child.href + '/')) return true;

              // Check nested children
              return child.children?.some((subChild) => {
                if (!subChild.href) return false;
                return (
                  normalizedPathname === subChild.href ||
                  normalizedPathname.startsWith(subChild.href + '/')
                );
              });
            });

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

  // Use useEffect before any conditional returns
  useEffect(() => {
    if (authorizedItems.length > 0) {
      const activeParents = findActiveParent(authorizedItems);
      setExpandedItems(activeParents);
    }
  }, [authorizedItems, findActiveParent]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((name) => name !== id) : [...prev, id]
    );
  };

  // Don't render section if no authorized items - moved after all hooks
  if (authorizedItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 mb-6">
      {!isCollapsed && (
        <div className="flex items-center justify-between px-3 mb-3">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {authorizedItems.length}
          </Badge>
        </div>
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

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { language, open, toggolemenue } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredNavItems = useMemo(() => {
    // Remove conditional check inside useMemo
    const sections = [];

    // Only add sections if we have the necessary data
    if (mounted && user?.permissions) {
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
    }
    return sections;
  }, [mounted, user?.permissions]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sections = filteredNavItems;
  // Conditional rendering moved after all hooks
  if (!mounted || sections.length === 0) {
    return null;
  }

  return (
    <>
      <Sheet open={open} onOpenChange={toggolemenue}>
        <SheetContent
          className="p-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
          side={`${language == 'ar' ? 'right' : 'left'}`}
        >
          <SheetHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <SheetTitle className="text-white text-center text-3xl font-bold tracking-wide">
              Rushita
            </SheetTitle>
          </SheetHeader>
          <SheetDescription
            asChild
            className="overflow-y-auto max-h-[80vh] overflow-x-hidden"
          >
            <div className="p-6 space-y-4">
              {sections.map((section) => (
                <NavigationSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  isCollapsed={false}
                />
              ))}
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>

      <aside
        className={classNames(
          'flex flex-col fixed top-0 ltr:left-0 rtl:right-0 z-40 h-screen transition-all duration-500 ease-in-out',
          'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 hidden md:block',
          'shadow-xl shadow-gray-900/5 dark:shadow-black/20',
          isCollapsed ? 'md:w-20' : 'md:w-80'
        )}
      >
        {/* Toggle Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleCollapse}
            className={classNames(
              'absolute top-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600',
              'rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300',
              'shadow-lg hover:shadow-xl hover:scale-110 active:scale-95',
              'ltr:-right-4 rtl:-left-4'
            )}
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Logo Section */}
        <div
          className={classNames(
            'flex items-center px-6 py-6 border-b border-gray-100 dark:border-gray-800',
            isCollapsed ? 'justify-center' : 'justify-start'
          )}
        >
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/images/image4.png"
                  alt="Rushita"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="relative">
              <Image
                src="/images/logo-small.png"
                alt="Rushita"
                width={32}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </div>
          )}
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="relative px-6 py-4">
            <div className="relative">
              <Input
                type="text"
                className="pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Search navigation..."
              />
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300"
                size={18}
              />
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
            <nav className="space-y-1">
              {sections.map((section) => (
                <NavigationSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  isCollapsed={isCollapsed}
                />
              ))}
              {/* Extra padding to ensure last item is visible */}
              <div className="h-16"></div>
            </nav>
          </div>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              &copy; 2024 Rushita Platform
            </div>
          </div>
        )}
      </aside>

      {/* Spacer div to push content */}
      <div
        className={classNames(
          'flex-shrink-0 transition-all duration-500 ease-in-out',
          isCollapsed ? 'md:w-20' : 'md:w-80'
        )}
      />
    </>
  );
}
