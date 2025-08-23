import { useEffect } from 'react';

interface BreadcrumbOverride {
  label?: string;
  href?: string;
}

interface BreadcrumbCustomization {
  [path: string]: BreadcrumbOverride;
}

// Global breadcrumb customization store
let breadcrumbCustomizations: BreadcrumbCustomization = {};

export function useBreadcrumb(customizations?: BreadcrumbCustomization) {
  useEffect(() => {
    if (customizations) {
      breadcrumbCustomizations = {
        ...breadcrumbCustomizations,
        ...customizations,
      };
    }

    return () => {
      // Cleanup customizations when component unmounts
      if (customizations) {
        Object.keys(customizations).forEach((key) => {
          delete breadcrumbCustomizations[key];
        });
      }
    };
  }, [customizations]);

  return {
    setBreadcrumbLabel: (path: string, label: string) => {
      breadcrumbCustomizations[path] = {
        ...breadcrumbCustomizations[path],
        label,
      };
    },
    setBreadcrumbHref: (path: string, href: string) => {
      breadcrumbCustomizations[path] = {
        ...breadcrumbCustomizations[path],
        href,
      };
    },
    clearBreadcrumbCustomizations: () => {
      breadcrumbCustomizations = {};
    },
  };
}

export function getBreadcrumbCustomization(
  path: string
): BreadcrumbOverride | undefined {
  return breadcrumbCustomizations[path];
}
