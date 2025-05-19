import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Providers } from "@/providers/Providers";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto">
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                  <Loading />
                  {children}      
                </main>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
