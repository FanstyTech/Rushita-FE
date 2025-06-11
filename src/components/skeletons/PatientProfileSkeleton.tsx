import React from 'react';

export default function PatientProfileSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-8 w-48 bg-gray-200 rounded-md" />
          <div className="h-4 w-32 bg-gray-200 rounded-md" />
        </div>
        <div className="h-10 w-24 bg-gray-200 rounded-md" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
            <div className="h-6 w-16 bg-gray-200 rounded-md" />
          </div>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-md" />
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-8">
        {/* Medical Conditions Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-200 rounded-full" />
            <div className="h-6 w-40 bg-gray-200 rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div className="h-5 w-32 bg-gray-200 rounded-md" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Allergies Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-200 rounded-full" />
            <div className="h-6 w-32 bg-gray-200 rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div className="h-5 w-32 bg-gray-200 rounded-md" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
                <div className="h-4 w-full bg-gray-200 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Family History Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-200 rounded-full" />
            <div className="h-6 w-36 bg-gray-200 rounded-md" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="h-5 w-32 bg-gray-200 rounded-md" />
                <div className="h-4 w-24 bg-gray-200 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
