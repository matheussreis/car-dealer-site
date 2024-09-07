import {
  Vehicle,
  VehicleSpecRangeFilter,
  VehicleSpecsFilter,
} from '@/interfaces';
import { createArrayFromRange } from './utils';
import vehicles from '../../public/data.json';
import { getTranslations } from 'next-intl/server';

function matchesStringFilter(filterValue: string, itemValue: string) {
  return !filterValue || filterValue === itemValue;
}

function matchesRangeFilter(
  rangeFilter: VehicleSpecRangeFilter,
  itemValue: number
) {
  const from = rangeFilter.from
    ? parseInt(rangeFilter.from)
    : Number.MIN_SAFE_INTEGER;
  const to = rangeFilter.to
    ? parseInt(rangeFilter.to)
    : Number.MAX_SAFE_INTEGER;
  return itemValue >= from && itemValue <= to;
}

export function applyFilters(filters: VehicleSpecsFilter, list: Vehicle[]) {
  let newList = [];

  newList = list.filter(
    (item) =>
      matchesStringFilter(filters.bodyType, item.specs.bodyType) &&
      matchesStringFilter(filters.fuelType, item.specs.fuelType) &&
      matchesStringFilter(filters.gearbox, item.specs.gearbox) &&
      matchesStringFilter(filters.brand, item.specs.brand) &&
      matchesStringFilter(filters.origin, item.specs.origin) &&
      matchesStringFilter(filters.drivetrain, item.specs.drivetrain) &&
      matchesRangeFilter(filters.year, item.specs.year) &&
      matchesRangeFilter(filters.mileage, item.specs.mileage)
  );

  return newList;
}

export function mergeFiltersIntoUrl(filters: VehicleSpecsFilter, url: string) {
  const filterSearchParams = new URLSearchParams();
  const filterParams = encodeURIComponent(JSON.stringify(filters));
  filterSearchParams.append('filters', filterParams);

  const urlSearchParams = new URLSearchParams(
    url.substring(url.indexOf('?') + 1)
  );

  const searchParams = new URLSearchParams({
    ...Object.fromEntries(urlSearchParams),
    ...Object.fromEntries(filterSearchParams),
  });

  return Object.fromEntries(searchParams.entries());
}

export function getYearFilter() {
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

export async function getDropdownOptions() {
  const t = await getTranslations('pages.vehicles.filters.options');

  return {
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
    color: {
      red: t('color.red'),
      blue: t('color.blue'),
      green: t('color.green'),
      yellow: t('color.yellow'),
      orange: t('color.orange'),
      purple: t('color.purple'),
      black: t('color.black'),
      white: t('color.white'),
      gray: t('color.gray'),
      brown: t('color.brown'),
      pink: t('color.pink'),
      silver: t('color.silver'),
      beige: t('color.beige'),
      navyBlue: t('color.navyBlue'),
      olive: t('color.olive'),
      teal: t('color.teal'),
    },
  };
}
