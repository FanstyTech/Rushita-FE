'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { Toaster } from '@/components/ui/Toast';

let ReactQueryDevtools: any;
if (process.env.NODE_ENV === 'development') {
  ReactQueryDevtools =
    require('@tanstack/react-query-devtools').ReactQueryDevtools;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: false,
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      {process.env.NODE_ENV === 'development' && (
        <div suppressHydrationWarning>
          {typeof window !== 'undefined' && (
            // @ts-ignore - DevTools has issues with RSC
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </div>
      )}
    </QueryClientProvider>
  );
}
