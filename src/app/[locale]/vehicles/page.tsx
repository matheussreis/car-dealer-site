'use server';

import { SortingType } from '@/enums';
import { getVehicles } from '../_actions/vehicles';
import VehicleList from './_components/vehicle-list';
import VehiclePagination from './_components/vehicle-pagination';
import VehicleSorting from './_components/vehicle-sorting';
import { VehicleFilter } from './_components/vehicle-filter';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('pages.vehicles.title')} | ${t('site.name')}`,
  };
}

interface VehiclesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ITEMS_LIMIT = 8;

export default async function VehiclesPage({
  searchParams,
}: VehiclesPageProps) {
  const offset = Number(searchParams.offset || 0);
  const sorting = (searchParams.sorting ||
    SortingType.DescendingDate) as SortingType;

  let filters = null;
  if (searchParams.filters) {
    filters = JSON.parse(decodeURIComponent(searchParams.filters as string));
  }

  const { vehicles, totalCount } = await getVehicles(
    ITEMS_LIMIT,
    offset,
    sorting,
    filters
  );

  const t = await getTranslations('pages.vehicles');

  return (
    <article className="container mx-auto px-4 py-8 flex-grow-1 h-full flex flex-col">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-gray-500 dark:text-gray-400">{t('description')}</p>
        </div>
        <div className="flex items-center gap-4">
          <VehicleFilter filters={filters} disabled={vehicles.length === 0} />
          <VehicleSorting sorting={sorting} disabled={vehicles.length === 0} />
        </div>
      </div>
      <VehicleList vehicles={vehicles} isPending={false} />
      <div className="mt-8">
        <VehiclePagination
          limit={ITEMS_LIMIT}
          offset={offset}
          totalCount={totalCount}
        />
      </div>
    </article>
  );
}
