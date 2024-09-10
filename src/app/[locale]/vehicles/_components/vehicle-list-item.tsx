'use client';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/formatters';
import { useRouter } from '@/i18n/navigation';
import { revalidateUrl } from '../../_actions/general';
import ImageWithFallback from '@/components/image-with-fallback';

interface VehicleItemProps {
  id: string;
  name: string;
  bodyType?: string;
  price: number;
  src: string;
  linkLabel: string;
}

export default function VehicleItem({
  id,
  name,
  bodyType,
  price,
  src,
  linkLabel,
}: VehicleItemProps) {
  const router = useRouter();

  const handleViewMoreClick = (url: string) => {
    return async () => {
      await revalidateUrl(url);
      router.push(url as '/vehicles');
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ImageWithFallback
        alt={name}
        className="w-full h-48 object-cover"
        fallbackSrc="/placeholder.svg"
        height={225}
        src={src}
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
        <Button
          className="inline-flex items-center justify-center mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handleViewMoreClick(`/vehicles/${id}`)}
          size="lg"
        >
          {linkLabel}
        </Button>
      </div>
    </div>
  );
}
