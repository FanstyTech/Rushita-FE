'use client';

import './globals.css';
import Sidebar from '@/components/Sidebar';
import QuickMenu from '@/components/QuickMenu';
import QuickActions from '@/components/QuickActions';
import { usePathname } from 'next/navigation';
import Loading from '@/components/Splash';
import Header from '@/components/Header';
import { Providers } from '@/providers/Providers';
import { Suspense } from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <html lang="ar" dir="rtl" className={`  scroll-smooth`}>
      <body className="font-ibm-plex">
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            {isLandingPage || isAuthPage ? (
              <main>{children}</main>
            ) : (
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
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
