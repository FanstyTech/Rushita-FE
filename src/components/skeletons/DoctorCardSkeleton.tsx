export default function DoctorCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-200 animate-pulse"></div>
            <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
        <div className="w-8 h-8 rounded bg-gray-200 animate-pulse"></div>
        <div className="w-8 h-8 rounded bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}
