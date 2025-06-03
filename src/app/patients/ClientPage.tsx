'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Dynamically import with SSR disabled
const PatientsContent = dynamic(() => import('./PatientsContent'), {
  ssr: false,
});

// Loading skeleton that matches the structure of the content
function LoadingSkeleton() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <div className="h-9 w-28 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="h-9 w-full bg-gray-100 rounded-md animate-pulse" />
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <div className="min-w-full divide-y divide-gray-300">
                    {/* Table Header */}
                    <div className="bg-gray-50 px-6 py-3">
                      <div className="grid grid-cols-6 gap-4">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="h-4 bg-gray-200 rounded animate-pulse"
                          />
                        ))}
                      </div>
                    </div>
                    {/* Table Body */}
                    <div className="bg-white">
                      {[...Array(5)].map((_, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="px-6 py-4 border-b border-gray-200 last:border-0"
                        >
                          <div className="grid grid-cols-6 gap-4">
                            {[...Array(6)].map((_, colIndex) => (
                              <div
                                key={colIndex}
                                className="h-4 bg-gray-100 rounded animate-pulse"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PatientsContent />
    </Suspense>
  );
}
