'use client';

import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function PageLayout({
  children,
  title,
  description,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen ">
      <main className="flex-1">
        <div className="py-4">
          <div className="max-w-10xl mx-auto ">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            )}
            {description && (
              <p className="text-gray-500 mb-8 text-base">{description}</p>
            )}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
