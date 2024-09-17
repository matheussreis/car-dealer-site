import { Pathnames } from 'next-intl/routing';

type Locale = 'en' | 'pt';

export const locales: Locale[] = ['en', 'pt'];

export const defaultLocale = 'en';

export const pathnames = {
  '/': '/',
  '/vehicles': '/vehicles',
  '/about': '/about',
  '/terms-of-service': '/terms-of-service',
} satisfies Pathnames<typeof locales>;
