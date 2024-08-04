'use client';

import { Vehicle } from '@/interfaces';
import { useTranslations } from 'next-intl';
import vehicles from '../../public/data.json';
import { createArrayFromRange } from '@/lib/utils';

function getYearFilter() {
  let list = [...vehicles] as Array<Vehicle>;

  let newest = 0;
  let oldest = new Date().getFullYear();

  list.forEach((vehicle) => {
    if (vehicle.specs.year > newest) {
      newest = vehicle.specs.year;
    }

    if (vehicle.specs.year < oldest) {
      oldest = vehicle.specs.year;
    }
  });

  return createArrayFromRange(newest, oldest);
}

export default function useFilterOptions() {
  const t = useTranslations('pages.vehicles.filters.options');

  return {
    year: getYearFilter(),
    doors: createArrayFromRange(1, 7),
    seats: createArrayFromRange(1, 10),
    bodyTypes: {
      cityCar: t('bodyTypes.cityCar'),
      hatchback: t('bodyTypes.hatchback'),
      saloon: t('bodyTypes.saloon'),
      pickup: t('bodyTypes.pickup'),
      estate: t('bodyTypes.estate'),
      suv: t('bodyTypes.suv'),
      coupe: t('bodyTypes.coupe'),
      convertible: t('bodyTypes.convertible'),
      performance: t('bodyTypes.performance'),
      sevenSeater: t('bodyTypes.sevenSeater'),
      mpv: t('bodyTypes.mpv'),
    },
    fuelTypes: {
      petrol: t('fuelTypes.petrol'),
      diesel: t('fuelTypes.diesel'),
      electric: t('fuelTypes.electric'),
      hybrid: t('fuelTypes.hybrid'),
    },
    gearbox: {
      manual: t('gearbox.manual'),
      automatic: t('gearbox.automatic'),
    },
    brands: {
      alfaRomeo: t('brands.alfaRomeo'),
      audi: t('brands.audi'),
      bentley: t('brands.bentley'),
      bmw: t('brands.bmw'),
      cadillac: t('brands.cadillac'),
      chevrolet: t('brands.chevrolet'),
      citroen: t('brands.citroen'),
      dacia: t('brands.dacia'),
      dsAutomobiles: t('brands.dsAutomobiles'),
      fiat: t('brands.fiat'),
      ford: t('brands.ford'),
      honda: t('brands.honda'),
      hyundai: t('brands.hyundai'),
      isuzu: t('brands.isuzu'),
      jaguar: t('brands.jaguar'),
      jeep: t('brands.jeep'),
      kia: t('brands.kia'),
      landRover: t('brands.landRover'),
      lexus: t('brands.lexus'),
      maserati: t('brands.maserati'),
      mazda: t('brands.mazda'),
      mercedesBenz: t('brands.mercedesBenz'),
      mini: t('brands.mini'),
      mitsubishi: t('brands.mitsubishi'),
      nissan: t('brands.nissan'),
      opel: t('brands.opel'),
      peugeot: t('brands.peugeot'),
      porsche: t('brands.porsche'),
      renault: t('brands.renault'),
      rollsRoyce: t('brands.rollsRoyce'),
      seat: t('brands.seat'),
      skoda: t('brands.skoda'),
      smart: t('brands.smart'),
      subaru: t('brands.subaru'),
      suzuki: t('brands.suzuki'),
      tesla: t('brands.tesla'),
      toyota: t('brands.toyota'),
      vauxhall: t('brands.vauxhall'),
      volkswagen: t('brands.volkswagen'),
      volvo: t('brands.volvo'),
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
