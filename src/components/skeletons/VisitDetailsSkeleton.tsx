import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

const VisitDetailsSkeleton: React.FC = () => {
  return (
    <div>
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Visit Header skeleton */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between">
            <div>
              <Skeleton className="h-6 w-36 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>

        {/* Visit Details skeleton */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Skeleton className="h-5 w-40 mb-4" />
            <div className="space-y-5">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-36" />
              </div>
            </div>
          </div>
          <div>
            <Skeleton className="h-5 w-40 mb-4" />
            <div className="space-y-5">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-36" />
              </div>
            </div>
          </div>
        </div>

        {/* Visit Notes skeleton */}
        <div className="p-6 border-t border-gray-100">
          <Skeleton className="h-5 w-20 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
};

export default VisitDetailsSkeleton;
