export default function ClinicCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-16 h-16 rounded-lg bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="w-20 h-6 rounded-full bg-gray-200" />
            <div className="w-12 h-6 rounded-full bg-gray-200" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-end gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-200" />
            <div className="w-8 h-8 rounded-lg bg-gray-200" />
            <div className="w-8 h-8 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
} 