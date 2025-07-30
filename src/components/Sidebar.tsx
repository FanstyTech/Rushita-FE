'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { filterNavItemsByPermission } from '@/utils/permissions';
import type { NavItem } from '@/types/navigation';
import { adminNav, clinicNav, doctorNav } from '@/config/navigation';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Input } from './ui/input';

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
            'w-full group flex items-center  px-3 py-2 rounded-lg transition-all duration-200',
            isActive
              ? 'bg-indigo-100 text-indigo-700 font-semibold'
              : 'dark:hover:bg-card hover:bg-primary-foreground',
            isCollapsed ? 'justify-center' : 'justify-between',
            level > 0 && !isCollapsed ? 'ml-2' : ''
          )}
        >
          <div
            className={classNames(
              'flex items-center gap-2',
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
            {!isCollapsed && <span className='text-popover-foreground'>{item.name}</span>}
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
          <div className={classNames(level === 0 ? 'ml-2' : 'ml-4')}>
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
        'group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
        isActive
          ? 'text-red-300'
          : 'dark:hover:bg-card hover:bg-primary-foreground',
        level > 0 && !isCollapsed ? 'ml-2' : ''
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
      {!isCollapsed && <span className='text-popover-foreground'>{item.name}</span>}
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
    <div className="space-y-1">
      {!isCollapsed && (
        <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
          {title}
        </h3>
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
  const { language, open, toggolemenue } = useLanguage()

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

        <SheetContent className='p-0' side={`${language == "ar" ? "right" : "left"}`}>
          <SheetHeader>
            <SheetTitle className='text-secend text-center text-4xl mt-10 '>Rushita</SheetTitle>
            <SheetDescription asChild className='overflow-y-auto max-h-[80vh] overflow-x-hidden '>
              <div className=' p-4'>
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
          </SheetHeader>
        </SheetContent>
      </Sheet >
      <aside
        className={classNames(
          'flex flex-col',
          'fixed top-0 ltr:left-0 right-0 z-40 h-screen transition-all duration-300',
          'bg-white dark:bg-gray-800 border-r  hidden md:block border-gray-200 dark:border-gray-700',
          isCollapsed ? 'md:w-20' : 'md:w-72'
        )}
      >
        {/* Toggle Button */}
        <div className="flex justify-end mb-3">
          <button
            onClick={toggleCollapse}
            className="absolute ltr:-right-3 rtl:-left-3 top-9 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-1.5 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <ChevronRightIcon
              className={`w-4 duration-300 h-4 text-gray-500 dark:text-gray-300 ${isCollapsed
                ? 'rotate-180 ltr:rotate-0'
                : 'rotate-0 ltr:rotate-180'
                }`}
            />
          </button>
        </div>

        {/* Logo */}
        <div
          className={classNames(
            'flex items-center h-16 px-4',
            isCollapsed ? 'justify-center' : 'justify-between'
          )}
        >
          {!isCollapsed && (
            <span className="text-xl font-semibold text-secend">Rushita</span>
          )}
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="relative px-4 mb-4">
            <Input
              type="text"
              className={`p-4 py-2 pl-8 `}
              placeholder={isCollapsed ? '' : 'Search...'} />

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
        <div className="flex-1 overflow-y-auto  max-h-[80vh]">
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
          'flex-shrink-0 transition-all duration-300 w-0',
          isCollapsed ? 'md:w-20' : 'md:w-72'
        )}
      />
    </>
  );
}
