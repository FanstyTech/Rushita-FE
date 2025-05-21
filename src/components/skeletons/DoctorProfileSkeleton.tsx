export default function DoctorCardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Section Skeleton */}
      <div className="relative bg-gradient-to-br from-indigo-600/50 to-indigo-800/50 rounded-2xl overflow-hidden">
        <div className="relative px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image Skeleton */}
            <div className="relative">
              <div className="w-40 h-40 rounded-2xl bg-gray-300" />
            </div>

            {/* Profile Info Skeleton */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="h-8 w-64 bg-gray-300 rounded" />
              <div className="h-6 w-48 bg-gray-300 rounded" />
              <div className="h-6 w-32 bg-gray-300 rounded" />

              {/* Contact Grid Skeleton */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-gray-300 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6">
            <div className="space-y-3">
              <div className="h-4 w-24 bg-gray-300 rounded" />
              <div className="h-6 w-16 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Details Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6">
              <div className="h-6 w-32 bg-gray-300 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 w-full bg-gray-300 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Working Hours & Social Media Skeleton */}
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6">
              <div className="h-6 w-32 bg-gray-300 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-4 w-full bg-gray-300 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
