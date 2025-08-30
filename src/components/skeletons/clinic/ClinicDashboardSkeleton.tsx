import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

const ClinicDashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-8 w-16 mb-3" />
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 rounded mr-1" />
                  <Skeleton className="h-4 w-12 mr-1" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-12 w-12 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart Skeleton */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-40" />
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-16 rounded-md" />
              ))}
            </div>
          </div>
          <div className="h-[350px] flex items-center justify-center">
            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>

        {/* Doughnut Chart Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="h-[300px] flex items-center justify-center">
            <div className="w-40 h-40 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2"
              >
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700"
              >
                <div className="relative">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg"
              >
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-40 mb-1" />
                  <Skeleton className="h-3 w-24 mb-2" />
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

export default ClinicDashboardSkeleton;
