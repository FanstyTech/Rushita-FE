import { Building2, User, MapPin, Clock, Globe } from 'lucide-react';

export default function ClinicProfileSkeleton() {
  return (
    <div className="w-auto space-y-8">
      {/* Header Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2"></div>
            </div>
          </div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Basic Information Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <User className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
          <div className="md:col-span-2">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Location Information Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
            <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-52 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Working Hours Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-60 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1"></div>
          </div>
        </div>

        <div className="space-y-4">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-20 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="w-8 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="w-32 h-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
