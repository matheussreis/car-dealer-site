'use server';

import { getTranslations } from 'next-intl/server';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const memberItemLabels = ['member1', 'member2', 'member3', 'member4'];

export default async function TeamSection() {
  const t = await getTranslations('pages.about.teamSection');

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              {t('description')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {memberItemLabels.map((memberItem) => {
              const name = t(`teamMembers.${memberItem as 'member1'}.name`);
              const role = t(`teamMembers.${memberItem as 'member1'}.role`);

              return (
                <div className="space-y-2" key={memberItem}>
                  <Avatar>
                    <AvatarFallback>
                      {name.split(' ').map((namePart) => namePart[0])}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{role}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
