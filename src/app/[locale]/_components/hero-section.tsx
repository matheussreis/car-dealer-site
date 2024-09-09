'use server';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function HeroSection() {
  const t = await getTranslations('pages.home.heroSection');

  return (
    <section className="w-full py-10 md:py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 md:px-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {t('description')}
          </p>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/vehicles"
          >
            {t('buttons.explore')}
          </Link>
        </div>
        <Image
          alt={t('imageAlt')}
          className="mx-auto rounded-xl object-cover"
          height="500"
          src="/images/twingo_9c.jpg"
          style={{
            aspectRatio: '700/500',
            objectFit: 'cover',
          }}
          width="700"
        />
      </div>
    </section>
  );
}
