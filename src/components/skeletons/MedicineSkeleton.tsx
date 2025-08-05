import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

const MedicineSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Filter bar skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 mb-3 sm:mb-0">
          {/* Search input skeleton */}
          <Skeleton className="h-10 w-full sm:w-64" />

          {/* Type filter skeleton */}
          <Skeleton className="h-10 w-full sm:w-40" />
        </div>

        {/* Add new button skeleton */}
        <Skeleton className="h-10 w-full sm:w-32" />
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Table header skeleton */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 grid grid-cols-7 gap-4">
          <Skeleton className="h-6 w-20" /> {/* Code */}
          <Skeleton className="h-6 w-24" /> {/* Local Name */}
          <Skeleton className="h-6 w-24" /> {/* Foreign Name */}
          <Skeleton className="h-6 w-28" /> {/* Scientific Name */}
          <Skeleton className="h-6 w-28" /> {/* Medication Type */}
          <Skeleton className="h-6 w-16" /> {/* Status */}
          <Skeleton className="h-6 w-16" /> {/* Actions */}
        </div>

        {/* Table rows skeleton */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="p-4 border-b border-gray-100 dark:border-gray-700 grid grid-cols-7 gap-4 items-center"
          >
            <Skeleton className="h-5 w-16" /> {/* Code */}
            <Skeleton className="h-5 w-28" /> {/* Local Name */}
            <Skeleton className="h-5 w-28" /> {/* Foreign Name */}
            <Skeleton className="h-5 w-32" /> {/* Scientific Name */}
            <Skeleton className="h-5 w-24" /> {/* Medication Type */}
            <Skeleton className="h-5 w-16 rounded-full" /> {/* Status */}
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-md" /> {/* Edit button */}
              <Skeleton className="h-8 w-8 rounded-md" /> {/* Delete button */}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-between items-center p-4">
        <Skeleton className="h-5 w-32" /> {/* Page info */}
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md" /> {/* Previous button */}
          <Skeleton className="h-8 w-8 rounded-md" /> {/* Page number */}
          <Skeleton className="h-8 w-8 rounded-md" /> {/* Next button */}
        </div>
      </div>
    </div>
  );
};

export default MedicineSkeleton;
