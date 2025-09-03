import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rousheta - نظام إدارة العيادات الطبية',
  description:
    'نظام شامل لإدارة العيادات الطبية والمواعيد والمرضى - Comprehensive clinic management system',
  keywords: [
    'clinic management',
    'medical system',
    'appointments',
    'patients',
    'healthcare',
    'إدارة العيادات',
    'نظام طبي',
  ],
  authors: [{ name: 'Rousheta Team' }],
  creator: 'Rousheta',
  publisher: 'Rousheta',

  // Favicon and icons configuration
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },

  // Open Graph metadata for social sharing
  openGraph: {
    title: 'Rousheta - نظام إدارة العيادات الطبية',
    description: 'نظام شامل لإدارة العيادات الطبية والمواعيد والمرضى',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: ['en_US', 'es_ES'],
  },

  // Viewport and theme
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
};
