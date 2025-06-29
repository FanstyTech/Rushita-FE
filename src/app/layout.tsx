import './globals.css';
import { Providers } from '@/providers/Providers';
import { languages, defaultLanguage } from '@/middleware';
import ClientLayout from '@/components/ClientLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side initial language and direction
  const initialLang = defaultLanguage;
  const initialDir = defaultLanguage === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={initialLang} dir={initialDir} className="scroll-smooth">
      <body className="font-ibm-plex">
        <Providers>
          <ClientLayout languages={languages}>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
