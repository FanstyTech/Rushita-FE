'use client';

import { JSX } from 'react';
import { Toaster } from 'react-hot-toast';

interface ToastProviderProps {
  children: JSX.Element;
}

export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Default options for all toasts
          className: '',
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            color: '#363636',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f3f4f6',
            fontSize: '14px',
            maxWidth: '400px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          },
          success: {
            style: {
              background: 'rgba(240, 253, 244, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #dcfce7',
              color: '#166534',
            },
            icon: '✓',
          },
          error: {
            style: {
              background: 'rgba(254, 242, 242, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #fee2e2',
              color: '#991b1b',
            },
            icon: '✕',
          },
          loading: {
            style: {
              background: 'rgba(248, 250, 252, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #f1f5f9',
              color: '#0f172a',
            },
          },
        }}
      />
      {children}
    </>
  );
}
