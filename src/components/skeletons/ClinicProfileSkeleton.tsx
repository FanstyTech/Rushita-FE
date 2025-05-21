const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

export default function ClinicProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <div className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="w-28 h-28 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="w-48 h-8" />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Skeleton className="w-24 h-6 mb-4" />
            <Skeleton className="w-full h-24" />
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Skeleton className="w-32 h-6 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 border rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="w-32 h-6" />
                    <Skeleton className="w-20 h-6" />
                  </div>
                  <Skeleton className="w-full h-12" />
                </div>
              ))}
            </div>
          </div>

          {/* Staff Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Skeleton className="w-40 h-6 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border rounded-xl"
                >
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="w-32 h-5" />
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-28 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offers Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Skeleton className="w-36 h-6 mb-4" />
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-2">
                      <Skeleton className="w-48 h-6" />
                      <Skeleton className="w-32 h-4" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="w-24 h-8 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="w-full h-16 mt-3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Skeleton className="w-40 h-6 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="w-5 h-5 mt-0.5" />
                  <div className="space-y-1">
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-32 h-5" />
                  </div>
                </div>
              ))}
              {/* Social Media */}
              <div className="pt-2 border-t">
                <Skeleton className="w-24 h-4 mb-3" />
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="w-10 h-10 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Skeleton className="w-36 h-6 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-20 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Skeleton className="w-32 h-6 mb-4" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-24 h-8 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
