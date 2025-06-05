export default function ClinicStaffCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gray-200 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
