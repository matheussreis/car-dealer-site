'use server';

import { SortingType } from '@/enums';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getVehicles } from '../_actions/vehicles';
import { getDropdownOptions } from '@/lib/filters';
import ImageWithFallback from '@/components/image-with-fallback';

export default async function FeaturedVehiclesSection() {
  const { vehicles } = await getVehicles(3, 0, SortingType.DescendingDate);
  const t = await getTranslations('pages.home.featuredVehicles');
  const dropdownOptions = await getDropdownOptions();

  return (
    <section className="w-full py-10 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t('title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {vehicles.length === 0 && (
            <div className="flex justify-center w-full h-full col-span-4 my-10 align-middle">
              <p>{t('noVehicles')}</p>
            </div>
          )}

          {vehicles.length > 0 &&
            vehicles.map((vehicle) => {
              return (
                <FeaturedVehicleItem
                  key={vehicle.id}
                  id={vehicle.id}
                  name={vehicle.name}
                  bodyType={dropdownOptions.bodyType[vehicle.specs.bodyType]}
                  cover={vehicle.cover}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}

interface FeaturedVehicleItemProps {
  id: string;
  name: string;
  bodyType: string;
  cover: string;
}

function FeaturedVehicleItem({
  id,
  name,
  bodyType,
  cover,
}: FeaturedVehicleItemProps) {
  const t = useTranslations('pages.home.featuredVehicles');

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-lg">
      <ImageWithFallback
        alt={name}
        className="w-full object-cover"
        fallbackSrc="/placeholder.svg"
        height="255"
        src={cover}
        style={{
          aspectRatio: '400/255',
          objectFit: 'cover',
        }}
        width="400"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400">{bodyType}</p>
        <Link
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href={`/vehicles/${id}` as '/vehicles'}
        >
          {t('buttons.learnMore')}
        </Link>
      </div>
    </div>
  );
}
