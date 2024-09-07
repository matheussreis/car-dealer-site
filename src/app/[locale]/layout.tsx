import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

interface AppLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function AppLayout({
  children,
  params: { locale },
}: Readonly<AppLayoutProps>) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={locale}>
        <body className={cn(inter.className, 'flex flex-col min-h-screen')}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
