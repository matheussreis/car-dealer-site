'use client';

import { useTranslations } from 'next-intl';
import { createArrayFromRange } from '@/lib/utils';
import { getYearFilter } from '@/lib/filters';
import { useEffect, useState } from 'react';

export default function useFilterOptions() {
  const [yearFilter, setYearFilter] = useState<string[]>([]);

  const t = useTranslations('pages.vehicles.filters.options');

  useEffect(() => {
    const getFilter = async () => {
      const filter = await getYearFilter();
      setYearFilter(filter);
    };

    getFilter();
  }, []);

  return {
    year: yearFilter,
    doors: createArrayFromRange(1, 7),
    seats: createArrayFromRange(1, 10),
    bodyType: {
      cityCar: t('bodyType.cityCar'),
      hatchback: t('bodyType.hatchback'),
      saloon: t('bodyType.saloon'),
      pickup: t('bodyType.pickup'),
      estate: t('bodyType.estate'),
      suv: t('bodyType.suv'),
      coupe: t('bodyType.coupe'),
      convertible: t('bodyType.convertible'),
      performance: t('bodyType.performance'),
      sevenSeater: t('bodyType.sevenSeater'),
      mpv: t('bodyType.mpv'),
    },
    fuelType: {
      petrol: t('fuelType.petrol'),
      diesel: t('fuelType.diesel'),
      electric: t('fuelType.electric'),
      hybrid: t('fuelType.hybrid'),
    },
    gearbox: {
      manual: t('gearbox.manual'),
      automatic: t('gearbox.automatic'),
    },
    brand: {
      alfaRomeo: t('brand.alfaRomeo'),
      audi: t('brand.audi'),
      bentley: t('brand.bentley'),
      bmw: t('brand.bmw'),
      cadillac: t('brand.cadillac'),
      chevrolet: t('brand.chevrolet'),
      citroen: t('brand.citroen'),
      dacia: t('brand.dacia'),
      dsAutomobiles: t('brand.dsAutomobiles'),
      fiat: t('brand.fiat'),
      ford: t('brand.ford'),
      honda: t('brand.honda'),
      hyundai: t('brand.hyundai'),
      isuzu: t('brand.isuzu'),
      jaguar: t('brand.jaguar'),
      jeep: t('brand.jeep'),
      kia: t('brand.kia'),
      landRover: t('brand.landRover'),
      lexus: t('brand.lexus'),
      maserati: t('brand.maserati'),
      mazda: t('brand.mazda'),
      mercedes: t('brand.mercedes'),
      mini: t('brand.mini'),
      mitsubishi: t('brand.mitsubishi'),
      nissan: t('brand.nissan'),
      opel: t('brand.opel'),
      peugeot: t('brand.peugeot'),
      porsche: t('brand.porsche'),
      renault: t('brand.renault'),
      rollsRoyce: t('brand.rollsRoyce'),
      seat: t('brand.seat'),
      skoda: t('brand.skoda'),
      smart: t('brand.smart'),
      subaru: t('brand.subaru'),
      suzuki: t('brand.suzuki'),
      tesla: t('brand.tesla'),
      toyota: t('brand.toyota'),
      vauxhall: t('brand.vauxhall'),
      volkswagen: t('brand.volkswagen'),
      volvo: t('brand.volvo'),
    },
    origin: {
      national: t('origin.national'),
      imported: t('origin.imported'),
    },
    drivetrain: {
      fwd: t('drivetrain.fwd'),
      rwd: t('drivetrain.rwd'),
      awd: t('drivetrain.awd'),
    },
  };
}
