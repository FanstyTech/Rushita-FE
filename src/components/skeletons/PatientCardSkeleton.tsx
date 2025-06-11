import React from 'react';

export default function PatientCardSkeleton() {
  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-md animate-pulse">
      <div className="h-2 w-full bg-gray-200" />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="flex items-center space-x-2 mt-2">
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-8 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
