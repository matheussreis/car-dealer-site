import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from './_components/hero-section';
import TeamSection from './_components/team-section';
import StoryAndAwardsSection from './_components/story-and-awards-section';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('pages.about.title')} | ${t('site.name')}`,
  };
}

export default function AboutUsPage() {
  return (
    <article>
      <HeroSection />
      <StoryAndAwardsSection />
      <TeamSection />
    </article>
  );
}
