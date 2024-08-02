'use server';

import Link from 'next/link';
import { Button } from './ui/button';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet';
import NavbarLink from './navbar-link';
import { LuMountain, LuMenu } from 'react-icons/lu';
import { getTranslations } from 'next-intl/server';
import LanguageSwitch from './language-switch';

type NavItem = {
  label: string;
  href: '/' | '/about' | '/vehicles';
};

export async function Navbar() {
  const t = await getTranslations('layout.navbar');

  const ITEMS: NavItem[] = [
    { label: t('home'), href: '/' },
    { label: t('vehicles'), href: '/vehicles' },
    { label: t('about'), href: '/about' },
  ];

  return (
    <header className="bg-black text-white flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
        <LuMountain className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="lg:hidden bg-black text-white"
            size="icon"
            variant="outline"
          >
            <LuMenu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="grid gap-6 p-6 text-lg font-medium">
            {ITEMS.map((item) => (
              <NavbarLink key={item.href} href={item.href}>
                {item.label}
              </NavbarLink>
            ))}
            <LanguageSwitch />
          </nav>
        </SheetContent>
      </Sheet>
      <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
        {ITEMS.map((item) => (
          <NavbarLink key={item.href} href={item.href}>
            {item.label}
          </NavbarLink>
        ))}
        <LanguageSwitch />
      </nav>
    </header>
  );
}
