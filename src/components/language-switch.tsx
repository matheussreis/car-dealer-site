'use client';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LuFlag } from 'react-icons/lu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { locales } from '@/i18n/settings';
import { useTranslations } from 'next-intl';
import { Link, usePathname as useI18nPathname } from '@/i18n/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LanguageSwitch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const cleanPathname = useI18nPathname();
  const currentLocale = pathname.split('/')[1] ?? 'en';
  const t = useTranslations('layout.navbar.languages');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-sm">
          <span className="text-black">{currentLocale.toUpperCase()}</span>
          <ChevronDownIcon className="h-4 w-4 text-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem key={locale}>
            <Link
              href={{
                pathname: cleanPathname,
                query: Object.fromEntries(searchParams.entries()),
              }}
              locale={locale}
              className="flex items-center gap-2"
              prefetch={false}
            >
              <LuFlag className="h-4 w-4" />
              <span className="text-xs">{t(locale)}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
