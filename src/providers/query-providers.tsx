'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { Toaster } from '@/components/ui/Toast';
import dynamic from 'next/dynamic';

const ReactQueryDevtools = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then(
      (mod) => mod.ReactQueryDevtools
    ),
  {
    ssr: false,
  }
);

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
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </div>
      )}
    </QueryClientProvider>
  );
}
