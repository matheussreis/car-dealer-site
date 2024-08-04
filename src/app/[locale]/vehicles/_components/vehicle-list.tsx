'use server';

import { formatCurrency } from '@/lib/formatters';
import { Vehicle } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface VehicleItemProps {
  id: string;
  name: string;
  bodyType?: string;
  price: number;
  src?: string;
  linkLabel: string;
}

function VehicleItem({
  id,
  name,
  bodyType,
  price,
  src,
  linkLabel,
}: VehicleItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        alt="Car Image"
        className="w-full h-48 object-cover"
        height={225}
        src={src || '/placeholder.svg'}
        style={{
          aspectRatio: '400/225',
          objectFit: 'cover',
        }}
        width={400}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500">{bodyType}</p>
        <p className="text-xl font-bold">{formatCurrency(price)}</p>
        <Link
          className="inline-flex items-center justify-center mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          href={`/vehicles/${id}`}
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
}

interface VehicleListProps {
  vehicles: Vehicle[];
  isPending: boolean;
}

export default async function VehicleList({
  vehicles,
  isPending,
}: VehicleListProps) {
  const t = await getTranslations('pages.vehicles');

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
            bodyType={vehicle.specs.bodyType}
            price={vehicle.specs.price}
            src={vehicle.imageSrc}
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
