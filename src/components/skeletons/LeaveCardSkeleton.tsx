import React from 'react';

export default function LeaveCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      {/* Header with Avatar and Staff Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Avatar Skeleton */}
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          {/* Name Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        {/* Menu Button Skeleton */}
        <div className="w-8 h-8 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Status Badge Skeleton */}
      <div className="flex items-center">
        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* Dates Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-1">
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Reason Box */}
      <div className="bg-gray-50 rounded-md p-3 space-y-2">
        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Leave Type Tag */}
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
