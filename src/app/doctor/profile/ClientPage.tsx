'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import DoctorProfileSkeleton from '@/components/skeletons/DoctorProfileSkeleton';

// Dynamically import with SSR disabled
const DoctorProfileContent = dynamic(() => import('./DoctorProfileContent'), {
  ssr: false,
});

export default function ClientPage() {
  return (
    <Suspense fallback={<DoctorProfileSkeleton />}>
      <DoctorProfileContent />
    </Suspense>
  );
}
