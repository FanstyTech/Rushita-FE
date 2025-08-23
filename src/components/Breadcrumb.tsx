'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { getBreadcrumbCustomization } from '@/hooks/useBreadcrumb';

interface BreadcrumbItem {
  label: string;
  href: string;
  isLast?: boolean;
}

// Special route patterns that should be handled differently
const specialRoutes: Record<string, string> = {
  // Dynamic routes with IDs
  patients: 'patient',
  appointments: 'appointment',
  visits: 'visit',
  invoices: 'invoice',
  staff: 'staff_member',
};

const backendApiUrl = process.env.NEXT_PUBLIC_API_URL;

// API endpoints to fetch meaningful identifiers
const apiEndpoints: Record<string, (id: string) => string> = {
  patients: (id: string) =>
    `${backendApiUrl}/Patient/getPatientProfile?id=${id}`,
  appointments: (id: string) =>
    `${backendApiUrl}/appointments/getNumber?id=${id}`,
  visits: (id: string) => `${backendApiUrl}/visits/getNumber?id=${id}`,
  invoices: (id: string) => `${backendApiUrl}/invoices/getNumber?id=${id}`,
  staff: (id: string) => `${backendApiUrl}/staff/getNumber?id=${id}`,
};

// Cache for fetched identifiers to avoid repeated API calls
const identifierCache: Record<string, string> = {};

export default function Breadcrumb() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [dynamicLabels, setDynamicLabels] = useState<Record<string, string>>(
    {}
  );

  // Function to fetch meaningful identifier for a GUID
  const fetchIdentifier = async (type: string, id: string): Promise<string> => {
    const cacheKey = `${type}-${id}`;

    // Check cache first
    if (identifierCache[cacheKey]) {
      return identifierCache[cacheKey];
    }

    try {
      const endpoint = apiEndpoints[type];
      if (!endpoint) {
        return id.substring(0, 8); // Fallback to short GUID
      }

      const response = await fetch(endpoint(id));
      if (response.ok) {
        const data = await response.json();
        const identifier =
          data.number ||
          data.visitNumber ||
          data.patientNumber ||
          id.substring(0, 8);

        // Cache the result
        identifierCache[cacheKey] = identifier;
        return identifier;
      }
    } catch (error) {
      console.warn(`Failed to fetch identifier for ${type} ${id}:`, error);
    }

    // Fallback to short GUID
    const shortId = id.substring(0, 8);
    identifierCache[cacheKey] = shortId;
    return shortId;
  };

  // Effect to fetch dynamic labels for GUIDs
  useEffect(() => {
    const normalizedPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
    const segments = normalizedPath.split('/').filter(Boolean);

    const fetchPromises: Promise<void>[] = [];

    segments.forEach((segment, index) => {
      const isGuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          segment
        );

      if (isGuid && index > 0) {
        const previousSegment = segments[index - 1];
        const routeType = specialRoutes[previousSegment];

        if (routeType && apiEndpoints[previousSegment]) {
          const promise = fetchIdentifier(previousSegment, segment).then(
            (identifier) => {
              setDynamicLabels((prev) => ({
                ...prev,
                [segment]: identifier,
              }));
            }
          );
          fetchPromises.push(promise);
        }
      }
    });

    // Execute all fetch promises
    Promise.all(fetchPromises);
  }, [pathname]);

  const breadcrumbItems = useMemo(() => {
    // Remove language prefix and split path
    const normalizedPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

    if (normalizedPath === '/') {
      return [];
    }

    const segments = normalizedPath.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    // Add home
    items.push({
      label: t('breadcrumb.home'),
      href: '/',
    });

    // Build breadcrumb items
    let currentPath = '';

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      // Check for customizations first
      const customization = getBreadcrumbCustomization(currentPath);

      // Check if this is a dynamic route (UUID pattern or number)
      const isGuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          segment
        );
      const isNumericId = /^\d+$/.test(segment);

      let label: string;
      let href: string = currentPath;

      if (customization?.label) {
        label = customization.label;
      } else if ((isGuid || isNumericId) && index > 0) {
        // This is an ID, use the previous segment to determine the label
        const previousSegment = segments[index - 1];
        const labelKey = specialRoutes[previousSegment];

        if (labelKey) {
          // For GUIDs, use the fetched identifier if available
          const displayId = isGuid
            ? dynamicLabels[segment] || segment.substring(0, 8)
            : segment;
          label = t(`breadcrumb.${labelKey}`, { id: displayId });
        } else {
          label = `#${isGuid ? segment.substring(0, 8) : segment}`;
        }
      } else {
        // Regular segment - try to get translation, fallback to capitalized segment
        const translationKey = `breadcrumb.${segment}`;
        const translatedLabel = t(translationKey);

        // If translation key is the same as the result, it means no translation was found
        if (translatedLabel === translationKey) {
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
        } else {
          label = translatedLabel;
        }
      }

      if (customization?.href) {
        href = customization.href;
      }

      items.push({
        label,
        href,
        isLast,
      });
    });

    return items;
  }, [pathname, t, dynamicLabels]);

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <div className="flex items-center">
        <HomeIcon className="w-4 h-4 text-gray-400" />
      </div>

      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <ChevronRightIcon className="w-4 h-4 text-gray-400 rtl:rotate-180" />
          )}

          {item.isLast ? (
            <span className="font-medium text-gray-900 dark:text-white">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
