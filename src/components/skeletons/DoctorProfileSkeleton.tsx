import { Card } from "../ui/card";

function DivSkeleton({ className }: { className: string }) {
  return <div className={`animate-pulse dark:bg-primary-foreground bg-gray-300  rounded ${className}`}></div>
}
export default function DoctorCardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Section Skeleton */}
      <div className="relative bg-gradient-to-br from-indigo-600/50 to-indigo-800/50 rounded-2xl overflow-hidden">
        <div className="relative px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image Skeleton */}
            <div className="relative">
              <DivSkeleton className="w-40 h-40 rounded-2xl " />
            </div>

            {/* Profile Info Skeleton */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <DivSkeleton className="h-8 w-64  rounded" />
              <DivSkeleton className="h-6 w-48  rounded" />
              <DivSkeleton className="h-6 w-32  rounded" />

              {/* Contact Grid Skeleton */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {[1, 2, 3, 4].map((i) => (
                  <DivSkeleton key={i} className="h-12  rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className=" p-6 border-0">
            <div className="space-y-3">
              <DivSkeleton className="h-4 w-24  rounded" />
              <DivSkeleton className="h-6 w-16  rounded" />
            </div>
          </Card>
        ))}
      </div>

      {/* Details Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {[1, 2].map((i) => (
            <Card key={i} className=" p-6 border-0">
              <DivSkeleton className="h-6 w-32  rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <DivSkeleton key={j} className="h-4 w-full  rounded" />
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Working Hours & Social Media Skeleton */}
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <Card key={i} className=" p-6 border-0">
              <DivSkeleton className="h-6 w-32  rounded mb-4 " />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <DivSkeleton key={j} className="h-4 w-full  rounded" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
