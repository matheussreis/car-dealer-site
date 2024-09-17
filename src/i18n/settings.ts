import { Pathnames } from 'next-intl/routing';

export type Locale = 'en' | 'pt';

export const locales: Locale[] = ['en', 'pt'];

export const defaultLocale = 'en';

export const pathnames = {
  '/': '/',
  '/vehicles': '/vehicles',
  '/about': '/about',
  '/terms-of-service': '/terms-of-service',
  '/privacy-policy': '/privacy-policy',
} satisfies Pathnames<typeof locales>;
