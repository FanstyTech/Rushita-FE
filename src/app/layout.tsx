'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import QuickMenu from '@/components/QuickMenu';
import QuickActions from '@/components/QuickActions';
import { usePathname } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import Loading from '@/components/Loading';
import { ToastProvider } from '@/components/ui/Toast';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if we're on the landing page
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ToastProvider>
            {isLandingPage ? (
              // Landing page layout - no sidebar or other chrome
              <main>{children}</main>
            ) : (
              // App layout with sidebar and other components
              <div className="flex h-screen overflow-hidden bg-gray-100">
                <Sidebar />
                <div className="flex-1 overflow-auto">
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="relative">
                      <QuickMenu />
                      <QuickActions />
                      <Header />
                      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                        <Loading />
                        {children}
                      </main>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
