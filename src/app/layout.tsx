'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import QuickMenu from '@/components/QuickMenu';
import QuickActions from '@/components/QuickActions';
import { usePathname } from 'next/navigation';
import Loading from '@/components/Splash';
import Header from '@/components/Header';
import { Providers } from '@/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
