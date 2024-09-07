import { useTranslations } from 'next-intl';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { VehicleSpecItem } from '@/interfaces';

interface VehicleInfoProps {
  name: string;
  specs: VehicleSpecItem[];
  price: number;
}

export default function VehicleInfoCard({
  name,
  specs,
  price,
}: VehicleInfoProps) {
  const t = useTranslations();

  return (
    <Card className="sm:h-full md:h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {specs.map((spec, index) => {
            let value = spec.value;

            if (spec.name === 'mileage') {
              value = `${formatNumber(parseFloat(value))} ${t(
                'units.mileage'
              )}`;
            }

            return (
              <div
                className="flex flex-col"
                key={`${name}-vehicledetails-${index}`}
              >
                <label className="text-muted-foreground" htmlFor={spec.name}>
                  {spec.label}
                </label>
                <span>{value}</span>
              </div>
            );
          })}
        </div>
        <div className="grid gap-1 mt-7">
          <h3 className="text-xl font-semibold">
            {t('pages.vehicle.specs.price')}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{formatCurrency(price)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
