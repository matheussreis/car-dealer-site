import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n/settings';

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
});

export const config = {
  matcher: [
    '/',
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/([\\w-]+)?/vehicles/(.+)',
    '/([\\w-]+)?/about/(.+)',
    '/([\\w-]+)?/terms-of-service/(.+)',
    '/([\\w-]+)?/privacy-policy/(.+)',
  ],
};
