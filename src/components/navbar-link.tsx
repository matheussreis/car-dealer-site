'use client';

import { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { pathnames } from '@/i18n/settings';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function NavbarLink<Pathname extends keyof typeof pathnames>({
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  let className = 'text-gray-500 dark:text-gray-400';
  if (isActive) {
    className = 'font-bold';
  }

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      href={href}
      className={className}
      {...rest}
    />
  );
}
