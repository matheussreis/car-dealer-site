'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarLinkProps {
  href: string;
  label: string;
}

export default function NavbarLink({ href, label }: NavbarLinkProps) {
  const pathname = usePathname();

  let className = 'text-gray-500 dark:text-gray-400';
  if (href === pathname) {
    className = 'font-bold';
  }

  return (
    <Link key={href} className={className} href={href}>
      {label}
    </Link>
  );
}
