'use client';

import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showBreadcrumb?: boolean;
}

export default function PageLayout({
  children,
  title,
  description,
  showBreadcrumb = true,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen ">
      <main className="flex-1">
        <div className="py-4">
          <div className="max-w-10xl mx-auto ">
            {showBreadcrumb && <Breadcrumb />}
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-base">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
