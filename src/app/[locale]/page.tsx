import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('pages.home.title')} | ${t('site.name')}`,
  };
}

export default function Home() {
  return <article>Hello World</article>;
}
