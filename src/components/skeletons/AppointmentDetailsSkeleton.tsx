import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Skeleton from '../ui/Skeleton';

export function AppointmentDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page header skeleton */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          asChild
          className="rounded-full border-border/50 hover:bg-muted/50"
        >
          <Link href="/patient-portal/appointments">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">العودة</span>
          </Link>
        </Button>
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Appointment status skeleton */}
      <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
        </CardContent>
      </Card>

      {/* Appointment details skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left column skeleton */}
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 md:col-span-1">
          <CardHeader className="bg-muted/30 backdrop-blur-sm border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>
          </CardHeader>
          <CardContent className="space-y-5 p-5">
            {/* Date skeleton */}
            <div className="flex items-start gap-3">
              <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
              <div className="flex-1">
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            {/* Time skeleton */}
            <div className="flex items-start gap-3">
              <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
              <div className="flex-1">
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Notes skeleton */}
            <div className="flex items-start gap-3">
              <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
              <div className="flex-1">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-border/50 my-2" />

            {/* Action buttons skeleton */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Right column skeleton */}
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 md:col-span-2">
          <CardHeader className="bg-muted/30 backdrop-blur-sm border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-5 w-40" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-5">
            {/* Doctor info skeleton */}
            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-border/50" />

            {/* Clinic info skeleton */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
