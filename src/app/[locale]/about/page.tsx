import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('pages.about.title')} | ${t('site.name')}`,
  };
}

export default function AboutUsPage() {
  return <p>About Us Page</p>;
}
