import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from './_components/hero-section';
import ContactUsSection from './_components/contact-us-section';
import FeaturedVehiclesSection from './_components/featured-vehicles-section';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('pages.home.title')} | ${t('site.name')}`,
  };
}

export default function Home() {
  return (
    <article className="mt-8">
      <HeroSection />
      <FeaturedVehiclesSection />
      <ContactUsSection />
    </article>
  );
}
