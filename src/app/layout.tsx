import './globals.css';
import { Providers } from '@/providers/Providers';
import { languages, defaultLanguage } from '@/middleware';
import ClientLayout from '@/components/ClientLayout';
import { cookies, headers } from 'next/headers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get language from cookie or headers on server-side
  const cookieStore = await cookies();
  const headersList = await headers();

  // Try to get language from cookie first
  let initialLang = cookieStore.get('language')?.value;

  // If no cookie, try to get from accept-language header
  if (!initialLang || !languages.includes(initialLang)) {
    const acceptLanguage = headersList.get('accept-language');
    if (acceptLanguage) {
      const browserLang = acceptLanguage.split(',')[0].split('-')[0];
      if (languages.includes(browserLang)) {
        initialLang = browserLang;
      }
    }
  }

  // Fallback to default if language is not supported
  if (!initialLang || !languages.includes(initialLang)) {
    initialLang = defaultLanguage;
  }

  // Set direction based on language
  const initialDir = initialLang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={initialLang} className='scroll-smooth' dir={initialDir} suppressHydrationWarning>
      <body className="font-ibm-plex" suppressHydrationWarning>
        <Providers>
          <ClientLayout languages={languages}>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
