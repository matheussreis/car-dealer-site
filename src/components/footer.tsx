'use server';

import Link from 'next/link';
import { Link as NextIntlLink } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { FaXTwitter } from 'react-icons/fa6';
import { LuFacebook, LuInstagram } from 'react-icons/lu';

export async function Footer() {
  const t = await getTranslations('layout.footer');

  return (
    <footer className="bg-black text-gray-400 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">{t('companyName')}</h3>
            <p className="mb-2">
              <span className="font-medium">{`${t('titles.hours')}: `}</span>
              {t('hours')}
            </p>
            <p className="mb-2">
              <span className="font-medium">{`${t('titles.phone')}: `}</span>
              {t('phone')}
            </p>
            <p className="mb-2">
              <span className="font-medium">{`${t('titles.address')}: `}</span>
              {t('address')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">{t('titles.followUs')}</h3>
            <div className="flex space-x-4">
              <Link className="hover:text-gray-300" href="https://x.com">
                <FaXTwitter className="h-6 w-6" />
                <span className="sr-only">{t('social.twitter')}</span>
              </Link>
              <Link
                className="hover:text-gray-300"
                href="https://www.facebook.com/"
              >
                <LuFacebook className="h-6 w-6" />
                <span className="sr-only">{t('social.facebook')}</span>
              </Link>
              <Link
                className="hover:text-gray-300"
                href="https://www.instagram.com/"
              >
                <LuInstagram className="h-6 w-6" />
                <span className="sr-only">{t('social.instagram')}</span>
              </Link>
            </div>
          </div>
          <div />
          <div className="text-right">
            <p className="mb-2">{t('copyrights')}</p>
            <NextIntlLink
              className="text-gray-400 hover:text-gray-300"
              href="/terms-of-service"
            >
              {t('terms')}
            </NextIntlLink>
            <span className="mx-2">|</span>
            <Link className="text-gray-400 hover:text-gray-300" href="#">
              {t('privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
