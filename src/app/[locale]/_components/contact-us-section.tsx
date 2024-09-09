'use server';

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { LuLocate, LuMailbox, LuPhone } from 'react-icons/lu';

export default async function ContactUsSection() {
  const t = await getTranslations('pages.home.contactUs');

  return (
    <section className="w-full py-10 md:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Image
              alt={t('imageAlt')}
              className="w-full h-full object-cover rounded-xl"
              height="400"
              width="600"
              src="/images/golf.jpeg"
              style={{
                aspectRatio: '600/400',
                objectFit: 'cover',
              }}
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t('title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t('description')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <LuPhone className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span>{t('phone')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LuMailbox className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span>{t('email')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LuLocate className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span>{t('address')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
