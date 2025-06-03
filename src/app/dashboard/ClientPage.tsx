'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PageLayout from '@/components/layouts/PageLayout';

// Dynamically import with SSR disabled
const DashboardContent = dynamic(() => import('./DashboardContent'), {
  ssr: false,
});

// Loading skeleton that matches the structure of the content
function LoadingSkeleton() {
  return (
    <PageLayout title="Dashboard">
      <div className="space-y-6">
        {/* Health Metrics Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-16 h-8 bg-gray-300 rounded animate-pulse" />
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Activity Chart Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-8 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Recent Doctors Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 rounded mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default function ClientPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
