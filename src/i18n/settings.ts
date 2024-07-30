import { Pathnames } from 'next-intl/routing';

export const locales = ['en', 'pt'];

export const defaultLocale = 'en';

export const pathnames = {
  '/': '/',
  '/vehicles': '/vehicles',
  '/about': '/about',
} satisfies Pathnames<typeof locales>;
