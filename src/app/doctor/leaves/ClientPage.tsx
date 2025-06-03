'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PageLayout from '@/components/layouts/PageLayout';

// Dynamically import with SSR disabled
const DoctorLeavesContent = dynamic(() => import('./DoctorLeavesContent'), {
  ssr: false,
});

// Loading skeleton that matches the structure of the content
function LoadingSkeleton() {
  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Search and Filter Bar Loading State */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Leave Requests Loading State */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-6 w-48 bg-gray-200 rounded"></div>
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-64 bg-gray-200 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default function ClientPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DoctorLeavesContent />
    </Suspense>
  );
}
