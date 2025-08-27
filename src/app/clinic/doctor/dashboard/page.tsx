'use client';

import { Suspense } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import DoctorDashboardContent from './DoctorDashboardContent';

export default function DoctorDashboard() {
  return (
    <Suspense
      fallback={
        <PageLayout>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded w-20"></div>
                  ))}
                </div>
              </div>
              <div className="h-[300px] bg-gray-100 rounded animate-pulse"></div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
              </div>
              <div className="divide-y divide-gray-100">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="p-6 flex items-center justify-between animate-pulse"
                  >
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageLayout>
      }
    >
      <DoctorDashboardContent />
    </Suspense>
  );
}
