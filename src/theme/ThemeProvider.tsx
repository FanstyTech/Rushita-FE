'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { setCookie, getCookie } from 'cookies-next';

// Define theme type
export type Theme = 'light' | 'dark';

// Theme context interface
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isChangingTheme: boolean;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  isChangingTheme: false,
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme state from cookie or default to light
  const [theme, setThemeState] = useState<Theme>('light');
  const [isChangingTheme, setIsChangingTheme] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme from cookie on client side
  useEffect(() => {
    const savedTheme = getCookie('theme') as Theme | undefined;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    } else {
      // Check user's system preference if no cookie
      if (typeof window !== 'undefined') {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        setThemeState(prefersDark ? 'dark' : 'light');
      }
    }
    setIsMounted(true);
  }, []);

  // Update document theme class when theme changes
  useEffect(() => {
    if (!isMounted) return;

    // Apply theme class to document
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme, isMounted]);

  // Function to change theme
  const setTheme = (newTheme: Theme) => {
    setIsChangingTheme(true);

    // Set theme state
    setThemeState(newTheme);

    // Save theme preference in cookie for 30 days
    setCookie('theme', newTheme, { maxAge: 60 * 60 * 24 * 30 });

    // Reset changing state after a short delay
    setTimeout(() => {
      setIsChangingTheme(false);
    }, 300);
  };

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    isChangingTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
