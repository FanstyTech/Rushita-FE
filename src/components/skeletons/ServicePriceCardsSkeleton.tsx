import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

const ServicePriceCardsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Generate 5 skeleton cards for each service type */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow border-2 border-transparent"
        >
          {/* Icon circle */}
          <Skeleton className="w-12 h-12 rounded-full mb-2" />

          {/* Service type name */}
          <Skeleton className="h-5 w-20 mb-4" />

          {/* Stats container */}
          <div className="flex justify-between w-full mt-2">
            {/* Count */}
            <div className="text-center px-2">
              <Skeleton className="h-3 w-10 mb-2" />
              <Skeleton className="h-5 w-8" />
            </div>

            {/* Average price */}
            <div className="text-center px-2 border-l border-gray-200 dark:border-gray-700">
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicePriceCardsSkeleton;
