'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'admin' | 'clinic' | 'doctor' | null;

interface AuthContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual auth check
    const checkAuth = async () => {
      try {
        // Simulate API call to check auth status
        await new Promise(resolve => setTimeout(resolve, 1000));
        // For testing, set a default role - replace with actual auth logic
        setUserRole('admin');
      } catch (error) {
        console.error('Auth check failed:', error);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
