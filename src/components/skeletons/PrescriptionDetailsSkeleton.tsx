import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const PrescriptionDetailsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb navigation skeleton */}
      <div className="flex items-center text-sm mb-6">
        <Skeleton className="h-4 w-16" />
        <span className="mx-2">/</span>
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Visit Card Skeleton */}
      <Card className="mb-6 overflow-hidden border border-gray-200 dark:border-gray-700">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/70 dark:to-gray-800/50 p-5">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              {/* Patient name skeleton */}
              <Skeleton className="h-6 w-48 mb-2" />

              {/* Visit info skeleton */}
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-1.5" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16 ml-1" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-1.5" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16 ml-1" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-1.5" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24 ml-1" />
                </div>
              </div>
            </div>
            {/* Medications count badge skeleton */}
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {/* Generate multiple medication item skeletons */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-5">
                {/* Medication header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    {/* Pill icon skeleton */}
                    <Skeleton className="h-9 w-9 rounded-full" />

                    {/* Medication name */}
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>

                    {/* Status badge */}
                    <Skeleton className="h-5 w-24 rounded-full ml-2" />
                  </div>

                  {/* Expand button */}
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>

                {/* Medication details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {/* Column 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2" />
                      <Skeleton className="h-4 w-16 mr-1" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2" />
                      <Skeleton className="h-4 w-16 mr-1" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <Skeleton className="h-4 w-4 mr-2" />
                          <Skeleton className="h-4 w-16 mr-1" />
                          <div className="flex items-center">
                            <Skeleton className="h-4 w-8 mr-1" />
                            <Skeleton className="h-4 w-8" />
                          </div>
                        </div>
                      </div>
                      {/* Progress bar skeleton */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                        <Skeleton className="h-1.5 w-3/4 rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2" />
                      <Skeleton className="h-4 w-16 mr-1" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>

                  {/* Column 3 - Action button */}
                  <div className="flex justify-end items-center">
                    <Skeleton className="h-9 w-36 rounded-md" />
                  </div>
                </div>

                {/* Add a divider except for the last item */}
                {index < 2 && (
                  <div className="border-b border-gray-100 dark:border-gray-800 mt-4"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optional: Expanded medication details skeleton */}
      <Card className="mb-6 overflow-hidden border border-gray-200 dark:border-gray-700">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-5 w-24 rounded-full ml-2" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Basic details skeletons */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-4 w-16 mr-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-4 w-16 mr-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>

          {/* Expanded details skeleton */}
          <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prescription Details */}
              <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <Skeleton className="h-5 w-40 mb-3" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2" />
                      <Skeleton className="h-4 w-28 mr-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded border-l-2 border-primary mt-2">
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>

              {/* Medication Information */}
              <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <Skeleton className="h-5 w-40 mb-3" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <Skeleton className="h-4 w-28 mr-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dispensing History Button */}
            <div className="mt-4 flex justify-end">
              <Skeleton className="h-8 w-40 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionDetailsSkeleton;
