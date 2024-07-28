import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n/settings';

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
});

export const config = {
  matcher: ['/', '/(en|pt)/:path*'],
};
