import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { locales, pathnames } from './settings';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, pathnames });
