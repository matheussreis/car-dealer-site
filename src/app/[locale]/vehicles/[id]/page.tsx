'use server';

import { getTranslations } from 'next-intl/server';
import { getVehicleById } from '../../_actions/vehicles';
import { VehicleSpecItem, VehicleSpecs } from '@/interfaces';
import VehicleCarousel from './_components/vehicle-carousel';
import VehicleInfoCard from './_components/vehicle-info-card';
import VehicleExtraInfoCard from './_components/vehicle-extra-info-card';
import { getDropdownOptions } from '@/lib/filters';
import { Metadata } from 'next';

interface VehicleDetailsPageProps {
  params: { id: string };
}

const mainSpecs = {
  gearbox: true,
  fuelType: true,
  drivetrain: true,
  year: true,
  mileage: true,
  origin: true,
};

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const vehicle = await getVehicleById(id);
  const t = await getTranslations('site');
  return {
    title: `${vehicle.name} | ${t('name')}`,
  };
}

export default async function VehicleDetailsPage({
  params: { id },
}: VehicleDetailsPageProps) {
  const vehicle = await getVehicleById(id);
  const t = await getTranslations('pages.vehicle.specs');

  const dropdownOptions = await getDropdownOptions();

  const specs = Object.keys(vehicle.specs) as Array<keyof VehicleSpecs>;
  const vehicleMainSpecs: Array<VehicleSpecItem> = [];
  const vehicleExtraSpecs: Array<VehicleSpecItem> = [];

  for (const key of specs) {
    if (key === 'price') {
      continue;
    }

    let value = vehicle.specs[key];

    if (typeof value === 'string' && key in dropdownOptions) {
      value = dropdownOptions[key]?.[vehicle.specs[key] as string] || value;
    }

    const vehicleSpec = {
      name: key,
      label: t(key),
      value: value.toString(),
    };

    const specsArray = key in mainSpecs ? vehicleMainSpecs : vehicleExtraSpecs;
    specsArray.push(vehicleSpec);
  }

  return (
    <div className="grid gap-6 p-4 grid-cols-1 lg:grid-cols-2 lg:max-w-6xl lg:mx-auto">
      <div className="col-span-2 lg:col-span-1">
        <VehicleCarousel name={vehicle.name} images={vehicle.images} />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <VehicleInfoCard
          name={vehicle.name}
          specs={vehicleMainSpecs}
          price={vehicle.specs.price}
        />
      </div>
      <div className="col-span-2">
        <VehicleExtraInfoCard specs={vehicleExtraSpecs} />
      </div>
    </div>
  );
}
