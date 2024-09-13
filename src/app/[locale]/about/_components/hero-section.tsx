'use server';

import { getTranslations } from 'next-intl/server';
import ImageWithFallback from '@/components/image-with-fallback';

export default async function HeroSection() {
  const t = await getTranslations('pages.about.heroSection');

  return (
    <section className="w-full py-10 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_450px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <ImageWithFallback
            alt={t('imageAlt')}
            className="mx-auto rounded-xl object-cover"
            fallbackSrc="/placeholder.svg"
            height="500"
            src="/images/twingo_9c_side.jpg"
            style={{
              aspectRatio: '700/500',
              objectFit: 'cover',
            }}
            width="700"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="font-bold tracking-tighter text-4xl md:text-5xl">
                {t('title')}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {t('description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
