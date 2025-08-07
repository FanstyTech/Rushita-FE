'use client';

import Skeleton from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Welcome section skeleton */}
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Skeleton className="h-10 w-48" />
        </CardContent>
      </Card>

      {/* Quick actions skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Tabs skeleton */}
      <div>
        <div className="border-b mb-6">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Overview cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50"
              >
                <CardHeader className="p-6">
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-full max-w-[200px]" />
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    {Array(3)
                      .fill(0)
                      .map((_, j) => (
                        <div key={j} className="flex items-start gap-4">
                          <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
                <CardContent className="p-6">
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
