'use client';

import '@/app/globals.css';
import Link from 'next/link';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex flex-col min-h-screen')}>
        <main className="flex min-h-[90dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Oops, page not found!
            </h1>
            <p className="mt-4 text-muted-foreground">
              {
                "The page you're looking for doesn't exist. Check the URL or go back to the homepage."
              }
            </p>
            <div className="mt-6">
              <Link
                href="/en"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
