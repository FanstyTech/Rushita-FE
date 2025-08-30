import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

const DoctorDashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Main Stats Cards Skeleton - 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-12 mb-3" />
                <div className="flex items-center">
                  <Skeleton className="h-4 w-8 mr-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <Skeleton className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Time Range Filter Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-32" />
          <div className="flex space-x-2">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-8 w-16 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="h-[300px] bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Appointment Status Chart Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-36" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-2">
                <Skeleton className="h-8 w-8 mx-auto mb-2" />
                <Skeleton className="h-6 w-8 mx-auto" />
              </div>
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Appointments & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <div className="relative">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="absolute -top-1 -right-1 h-4 w-4 rounded-full" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg"
              >
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                  <Skeleton className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-4 w-48 mb-1" />
                  <Skeleton className="h-3 w-32 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardSkeleton;
