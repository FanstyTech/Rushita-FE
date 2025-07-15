'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to determine if the code is running on the client side
 * Useful for avoiding hydration errors with server components
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
