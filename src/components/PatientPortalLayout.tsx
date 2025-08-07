'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './patient-portal/Sidebar';
import { Header } from './patient-portal/Header';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/lib/api/hooks/useAuth';

export default function PatientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/patient-portal/auth');
    }
  }, [user, router]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for navigation */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        {/* Footer with theme toggle */}
        <footer className="bg-card p-4 border-t border-border">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rushita Health Portal
            </p>
            <ThemeToggle />
          </div>
        </footer>
      </div>
    </div>
  );
}
