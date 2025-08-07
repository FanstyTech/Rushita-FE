'use client';

import Skeleton from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Profile header skeleton */}
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </CardHeader>
      </Card>

      {/* Tabs skeleton */}
      <div>
        <div className=" mb-6">
          <div className="flex w-full justify-between gap-4">
            <Skeleton className="h-10 w-50" />
            <Skeleton className="h-10 w-50" />
            {/* <Skeleton className="h-10 w-50" /> */}
            <Skeleton className="h-10 w-50" />
          </div>
        </div>

        {/* Content cards skeleton */}
        <div className="space-y-6">
          <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
            <CardHeader className="p-6">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
            <CardHeader className="p-6">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
