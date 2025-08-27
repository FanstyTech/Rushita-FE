'use client';

import * as React from 'react';
import { Toaster as Sonner } from 'sonner';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Toaster() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <Sonner
      className="toaster group"
      dir={isRTL ? 'rtl' : 'ltr'}
      position={isRTL ? 'bottom-left' : 'bottom-right'}
      closeButton
      expand={true}
      richColors
      toastOptions={{
        duration: 5000,
        classNames: {
          toast: `group toast group-[.toaster]:bg-white group-[.toaster]:dark:bg-gray-900 group-[.toaster]:text-gray-900 group-[.toaster]:dark:text-gray-100 group-[.toaster]:border group-[.toaster]:border-gray-200 group-[.toaster]:dark:border-gray-700 group-[.toaster]:shadow-xl group-[.toaster]:backdrop-blur-sm group-[.toaster]:rounded-xl group-[.toaster]:p-4 group-[.toaster]:min-h-[60px] group-[.toaster]:transition-all group-[.toaster]:duration-300 ${
            isRTL ? 'font-arabic text-right' : 'text-left'
          }`,
          title: 'group-[.toast]:text-sm group-[.toast]:font-semibold group-[.toast]:leading-tight group-[.toast]:mb-1',
          description: 'group-[.toast]:text-sm group-[.toast]:text-gray-600 group-[.toast]:dark:text-gray-400 group-[.toast]:leading-relaxed',
          actionButton:
            'group-[.toast]:bg-blue-600 group-[.toast]:hover:bg-blue-700 group-[.toast]:text-white group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:rounded-lg group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-colors group-[.toast]:duration-200',
          cancelButton:
            'group-[.toast]:bg-gray-100 group-[.toast]:hover:bg-gray-200 group-[.toast]:dark:bg-gray-800 group-[.toast]:dark:hover:bg-gray-700 group-[.toast]:text-gray-700 group-[.toast]:dark:text-gray-300 group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:rounded-lg group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-colors group-[.toast]:duration-200',
          closeButton: `group-[.toast]:bg-transparent group-[.toast]:hover:bg-gray-100 group-[.toast]:dark:hover:bg-gray-800 group-[.toast]:text-gray-500 group-[.toast]:hover:text-gray-700 group-[.toast]:dark:text-gray-400 group-[.toast]:dark:hover:text-gray-200 group-[.toast]:border-0 group-[.toast]:rounded-lg group-[.toast]:w-8 group-[.toast]:h-8 group-[.toast]:flex group-[.toast]:items-center group-[.toast]:justify-center group-[.toast]:transition-all group-[.toast]:duration-200 group-[.toast]:absolute group-[.toast]:top-2 ${
            isRTL ? 'group-[.toast]:left-2' : 'group-[.toast]:right-2'
          }`,
          success: 'group-[.toast]:border-green-200 group-[.toast]:dark:border-green-800 group-[.toast]:bg-green-50 group-[.toast]:dark:bg-green-900/20',
          error: 'group-[.toast]:border-red-200 group-[.toast]:dark:border-red-800 group-[.toast]:bg-red-50 group-[.toast]:dark:bg-red-900/20',
          warning: 'group-[.toast]:border-yellow-200 group-[.toast]:dark:border-yellow-800 group-[.toast]:bg-yellow-50 group-[.toast]:dark:bg-yellow-900/20',
          info: 'group-[.toast]:border-blue-200 group-[.toast]:dark:border-blue-800 group-[.toast]:bg-blue-50 group-[.toast]:dark:bg-blue-900/20',
        },
        closeButton: true,
      }}
    />
  );
}

export { toast } from 'sonner';
