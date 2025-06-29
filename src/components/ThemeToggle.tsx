'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, isChangingTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center">
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        disabled={isChangingTheme}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white
          ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}
          ${isChangingTheme ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span
          className={`${
            theme === 'dark'
              ? 'ltr:translate-x-6 rtl:-translate-x-6'
              : 'ltr:translate-x-1 rtl:-translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />

        {/* Sun icon for light mode */}
        <span
          className={`absolute ltr:left-1 rtl:right-1 top-1/2 -translate-y-1/2 text-yellow-500 transition-opacity ${
            theme === 'light' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        {/* Moon icon for dark mode */}
        <span
          className={`absolute ltr:right-1 rtl:left-1 top-1/2 -translate-y-1/2 text-blue-200 transition-opacity ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
