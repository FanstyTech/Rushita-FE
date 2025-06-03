'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if document is already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      // If not, wait for it to load
      const handleLoad = () => setIsLoading(false);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Handle route changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin">
            {/* Inner highlight */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-blue-600 rounded-full animate-spin-fast"></div>
          </div>

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-6 text-gray-600 font-medium tracking-wider">
          Loading...
        </div>
      </div>
    </div>
  );
}
