'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

export default function AppointmentSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>

      {/* Calendar header skeleton */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Calendar grid skeleton */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div key={`day-${i}`} className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}

          {/* Calendar cells */}
          {Array(35)
            .fill(0)
            .map((_, i) => (
              <div key={`cell-${i}`} className="aspect-square p-1">
                <div className="h-full w-full rounded-md border border-gray-200 dark:border-gray-700 p-1">
                  <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                  {/* Appointment placeholders - static to avoid hydration errors */}
                  {i % 3 === 0 && (
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                  )}
                  {i % 5 === 0 && (
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Appointments list skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={`appointment-${i}`} className="p-3">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
