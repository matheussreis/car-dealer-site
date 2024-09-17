'use server';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('pages.termsOfService.title')} | ${t('site.name')}`,
  };
}

type TermsOfServiceKey =
  | 'acceptanceOfTerms'
  | 'websiteUsage'
  | 'vehicleListings'
  | 'noGuaranteedTransactions'
  | 'intellectualProperty'
  | 'thirdPartyLinks'
  | 'disclaimerOfWarranties'
  | 'limitationOfLiability'
  | 'changesToTermsOfService'
  | 'governingLaw';

const termsOfServiceKeys: TermsOfServiceKey[] = [
  'acceptanceOfTerms',
  'websiteUsage',
  'vehicleListings',
  'noGuaranteedTransactions',
  'intellectualProperty',
  'thirdPartyLinks',
  'disclaimerOfWarranties',
  'limitationOfLiability',
  'changesToTermsOfService',
  'governingLaw',
];

type TermsOfServiceWithSubitems = 'vehicleListings' | 'websiteUsage';

type SubitemTermsCountMapping = Record<TermsOfServiceWithSubitems, number>;

const subitemTermsCountMapping: SubitemTermsCountMapping = {
  vehicleListings: 3,
  websiteUsage: 4,
};

export default async function TermsOfService() {
  const t = await getTranslations('site');
  const companyName = t('name');

  return (
    <article className="bg-background text-foreground">
      <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <TermsOfServiceHeader companyName={companyName} />
          <ul className="space-y-8">
            {termsOfServiceKeys.map((termOfServiceKey, index) => (
              <TermsOfServiceItem
                key={termOfServiceKey}
                termOfServiceKey={termOfServiceKey}
                companyName={companyName}
                position={index + 1}
              />
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

interface TermsOfServiceHeaderProps {
  companyName: string;
}

async function TermsOfServiceHeader({
  companyName,
}: TermsOfServiceHeaderProps) {
  const t = await getTranslations('pages.termsOfService');

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mt-4 text-muted-foreground">
        {t('description', {
          companyName: companyName,
        })}
      </p>
    </div>
  );
}

interface TermOfServiceItemProps {
  termOfServiceKey: TermsOfServiceKey;
  companyName: string;
  position: number;
}

async function TermsOfServiceItem({
  termOfServiceKey,
  companyName,
  position,
}: TermOfServiceItemProps) {
  const t = await getTranslations('pages.termsOfService.items');

  let description = '';
  let subitemsCount = 0;

  if (
    termOfServiceKey === 'intellectualProperty' ||
    termOfServiceKey === 'limitationOfLiability'
  ) {
    description = t(`${termOfServiceKey}.description`, {
      companyName: companyName,
    });
  } else {
    description = t(`${termOfServiceKey}.description`);
  }

  if (termOfServiceKey in subitemTermsCountMapping) {
    const key = termOfServiceKey as TermsOfServiceWithSubitems;
    subitemsCount = subitemTermsCountMapping[key];
  }

  return (
    <li key={termOfServiceKey}>
      <h3 className="text-lg font-medium">{`${position}. ${t(
        `${termOfServiceKey}.title`
      )}`}</h3>
      <p className="text-muted-foreground">{description}</p>
      {subitemsCount > 0 && (
        <TermsOfServiceSubitems
          termOfServiceKey={termOfServiceKey as TermsOfServiceWithSubitems}
          subitemsCount={subitemsCount}
        />
      )}
    </li>
  );
}

interface TermsOfServiceSubitemsProps {
  termOfServiceKey: TermsOfServiceWithSubitems;
  subitemsCount: number;
}

async function TermsOfServiceSubitems({
  termOfServiceKey,
  subitemsCount,
}: TermsOfServiceSubitemsProps) {
  const t = await getTranslations('pages.termsOfService.items');

  return (
    <ul className="space-y-4 mt-2 list-disc ml-5">
      {Array.from({ length: subitemsCount }, (_, i) => {
        const key = `item${i + 1}`;

        const text = t(`${termOfServiceKey}.subitems.${key as 'item1'}`);

        const [boldText, regularText] = text.includes(':')
          ? text.split(':', 2)
          : [null, text];

        return (
          <li key={key}>
            {boldText && <b>{boldText}:</b>}
            <span className="text-muted-foreground m-0">{regularText}</span>
          </li>
        );
      })}
    </ul>
  );
}
