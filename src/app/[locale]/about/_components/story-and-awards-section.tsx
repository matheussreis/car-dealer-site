'use server';

import { LuAward } from 'react-icons/lu';
import { getTranslations } from 'next-intl/server';

const awardItemLabels = ['award1', 'award2', 'award3', 'award4'];

export default async function StoryAndAwardsSection() {
  const t = await getTranslations('pages.about.storyAndAwardsSection');

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {t('story.title')}
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              {t('story.description')}
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {t('awards.title')}
            </h2>
            <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
              {awardItemLabels.map((item) => (
                <li key={item}>
                  <LuAward className="mr-2 inline-block h-5 w-5 text-gray-900 dark:text-gray-50" />
                  {t(`awards.items.${item as 'award1'}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
