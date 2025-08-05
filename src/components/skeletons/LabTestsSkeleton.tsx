import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const LabTestsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Dashboard Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Skeleton className="h-12 w-12 rounded-full mb-3" />
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-4 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter bar skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 mb-3 sm:mb-0">
          {/* Search input skeleton */}
          <Skeleton className="h-10 w-full sm:w-64" />

          {/* Date filter skeleton */}
          <Skeleton className="h-10 w-full sm:w-40" />

          {/* Doctor filter skeleton */}
          <Skeleton className="h-10 w-full sm:w-40" />

          {/* Status filter skeleton */}
          <Skeleton className="h-10 w-full sm:w-40" />
        </div>

        {/* View toggle skeleton */}
        <Skeleton className="h-10 w-full sm:w-32" />
      </div>

      {/* Visit cards skeleton (for grouped view) */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border-b">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-40 mb-2" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {/* Test items within a visit */}
              {[...Array(2)].map((_, j) => (
                <div
                  key={j}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="pl-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <Skeleton className="h-5 w-40 mb-1 sm:mb-0" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <div className="flex space-x-1">
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Flat view tests skeleton */}
      <div className="space-y-3 hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="pl-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <div>
                  <Skeleton className="h-5 w-40 mb-1" />
                  <div className="flex items-center gap-2 mb-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <div className="flex space-x-1">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-8 w-20" />
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-md" />
          ))}
        </div>
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};

export default LabTestsSkeleton;
