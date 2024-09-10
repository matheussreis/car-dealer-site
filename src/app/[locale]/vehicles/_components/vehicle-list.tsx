'use server';

import { Vehicle } from '@/interfaces';
import { getTranslations } from 'next-intl/server';
import VehicleItem from './vehicle-list-item';
import { getDropdownOptions } from '@/lib/filters';

interface VehicleListProps {
  vehicles: Vehicle[];
  isPending: boolean;
}

export default async function VehicleList({
  vehicles,
  isPending,
}: VehicleListProps) {
  const t = await getTranslations('pages.vehicles');
  const dropdownOptions = await getDropdownOptions();

  if (isPending) {
    return (
      <p className="flex justify-center w-full h-full col-span-4 my-10 align-middle">
        {t('loading')}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {vehicles.length > 0 &&
        vehicles.map((vehicle) => (
          <VehicleItem
            key={vehicle.id}
            id={vehicle.id}
            name={vehicle.name}
            bodyType={dropdownOptions.bodyType[vehicle.specs.bodyType]}
            price={vehicle.specs.price}
            src={vehicle.cover}
            linkLabel={t('buttons.details')}
          />
        ))}

      {vehicles.length === 0 && isPending === false && (
        <div className="flex justify-center w-full h-full col-span-4 my-10 align-middle">
          <p>{t('noVehicles')}</p>
        </div>
      )}
    </div>
  );
}
