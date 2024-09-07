import { VehicleSpecItem } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface VehicleExtraInfoCardProps {
  specs: Array<VehicleSpecItem>;
}

export default function VehicleExtraInfoCard({
  specs,
}: VehicleExtraInfoCardProps) {
  const t = useTranslations('pages.vehicle.additionalDetails');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <VehicleExtraInfoItem items={specs} />
      </CardContent>
    </Card>
  );
}

interface VehicleExtraInfoItemProps {
  items: Array<VehicleSpecItem>;
}

function VehicleExtraInfoItem({ items }: VehicleExtraInfoItemProps) {
  const t = useTranslations('units');

  const valueMapping: { [key: string]: (value: string) => string } = {
    horsePower: (value) => `${value} ${t('horsePower')}`,
    co2Emissions: (value) => `${value} ${t('co2Emissions')}`,
    warranty: (value) => `${value} ${t('years')}`,
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((item, index) => {
        const { name, value, label } = item;
        const formattedValue = valueMapping[name]?.(value) || value;
        let formattedLabel = label;

        if (name === 'co2Emissions') {
          formattedLabel = label.replace('2', '<sub>2</sub>');
        }

        return (
          <div className="flex flex-col" key={`${name}-extrainfoitem-${index}`}>
            <label
              className="text-muted-foreground"
              htmlFor={name}
              dangerouslySetInnerHTML={{ __html: formattedLabel }}
            />

            <span>{formattedValue}</span>
          </div>
        );
      })}
    </div>
  );
}
