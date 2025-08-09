'use client';

import { usePathname } from 'next/navigation';
import ClientLayout from '@/components/ClientLayout';
import PatientPortalLayout from '@/components/PatientPortalLayout';

interface ConditionalLayoutProps {
  children: React.ReactNode;
  languages: string[];
}

export default function ConditionalLayout({
  children,
  languages,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if current path is patient portal
  const isPatientPortal =
    pathname.startsWith('/patient-portal') ||
    pathname.startsWith('/portal') ||
    pathname.includes('/patient-portal');

  if (isPatientPortal) {
    return (
      <PatientPortalLayout languages={languages}>
        {children}
      </PatientPortalLayout>
    );
  }

  return <ClientLayout languages={languages}>{children}</ClientLayout>;
}
