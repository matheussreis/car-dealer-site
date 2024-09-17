'use server';

import { Locale } from '@/i18n/settings';
import { formatDate } from '@/lib/formatters';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('pages.privacyPolicy.title')} | ${t('site.name')}`,
  };
}

type PrivacyPolicyKey =
  | 'collectedInformation'
  | 'useOfCollectedInformation'
  | 'trackingTechnologies'
  | 'thirdPartyLinks'
  | 'security'
  | 'childrenPrivacy'
  | 'changesToPrivacyPolicy';

type PrivacyPolicyWithSubitems =
  | 'collectedInformation'
  | 'useOfCollectedInformation';

type SubitemPoliciesCountMapping = Record<PrivacyPolicyWithSubitems, number>;

const subitemPoliciesCountMapping: SubitemPoliciesCountMapping = {
  collectedInformation: 1,
  useOfCollectedInformation: 2,
};

const privacyPolicyKeys: PrivacyPolicyKey[] = [
  'collectedInformation',
  'useOfCollectedInformation',
  'trackingTechnologies',
  'thirdPartyLinks',
  'security',
  'childrenPrivacy',
  'changesToPrivacyPolicy',
];

export default async function PrivacyPolicy() {
  const t = await getTranslations('site');

  return (
    <article className="bg-background text-foreground">
      <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <PrivacyPolicyHeader companyName={t('name')} />
          <ul className="list-none space-y-8">
            {privacyPolicyKeys.map((PrivacyPolicyKey, index) => (
              <PrivacyPolicyItem
                key={PrivacyPolicyKey}
                privacyPolicyKey={PrivacyPolicyKey}
                position={index + 1}
              />
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

interface PrivacyPolicyHeaderProps {
  companyName: string;
}

async function PrivacyPolicyHeader({ companyName }: PrivacyPolicyHeaderProps) {
  const t = await getTranslations('pages.privacyPolicy');
  const locale = await getLocale();

  const formattedDate = formatDate(
    new Date(t('effectiveDate.value')),
    locale as Locale
  );

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mt-2 font-medium text-1xl">
        {`${t('effectiveDate.title')}: ${formattedDate}`}
      </p>
      <p className="mt-3 text-muted-foreground text-1xl">
        {t('description', { companyName: companyName })}
      </p>
    </div>
  );
}

interface PrivacyPolicyItemProps {
  privacyPolicyKey: PrivacyPolicyKey;
  position: number;
}

async function PrivacyPolicyItem({
  privacyPolicyKey,
  position,
}: PrivacyPolicyItemProps) {
  const t = await getTranslations('pages.privacyPolicy.items');

  let subitemsCount = 0;

  if (privacyPolicyKey in subitemPoliciesCountMapping) {
    const key = privacyPolicyKey as PrivacyPolicyWithSubitems;
    subitemsCount = subitemPoliciesCountMapping[key];
  }

  return (
    <li className="space-y-1">
      <div className="mb-2">
        <h2 className="text-lg font-bold">
          {`${position}. ${t(`${privacyPolicyKey}.title`)}`}
        </h2>
        <p className="text-muted-foreground">
          {t(`${privacyPolicyKey}.description`)}
        </p>
      </div>
      {subitemsCount > 0 && (
        <PrivacyPolicySubitems
          privacyPolicyKey={privacyPolicyKey as PrivacyPolicyWithSubitems}
          subitemsCount={subitemsCount}
        />
      )}
    </li>
  );
}

interface PrivacyPolicySubitemsProps {
  privacyPolicyKey: PrivacyPolicyWithSubitems;
  subitemsCount: number;
}

async function PrivacyPolicySubitems({
  privacyPolicyKey,
  subitemsCount,
}: PrivacyPolicySubitemsProps) {
  const t = await getTranslations('pages.privacyPolicy.items');

  return (
    <ul className="space-y-4 list-disc ml-5">
      {Array.from({ length: subitemsCount }, (_, i) => {
        const key = `item${i + 1}`;

        const text = t(`${privacyPolicyKey}.subitems.${key as 'item1'}`);

        const [darkerText, regularText] = text.includes(':')
          ? text.split(':', 2)
          : [null, text];

        return (
          <li key={key}>
            {darkerText && <span className="font-medium">{darkerText}:</span>}
            <span className="text-muted-foreground m-0">{regularText}</span>
          </li>
        );
      })}
    </ul>
  );
}
