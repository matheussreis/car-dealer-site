import {
  Vehicle,
  VehicleSpecRangeFilter,
  VehicleSpecsFilter,
} from '@/interfaces';
import vehicles from '../../public/data.json';
import filters from '../../src/config/filters.json';
import { createArrayFromRange, createSteppedArray } from './utils';

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

export function getFilters() {
  return {
    year: getYearFilter(),
    doors: createArrayFromRange(1, 7),
    seats: createArrayFromRange(1, 10),
    price: createSteppedArray(0, 1000000, 10000),
    ...filters,
  };
}

function machesStringFilter(filterValue: string, itemValue: string) {
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
      machesStringFilter(filters.bodyTypes, item.specs.bodyType) &&
      machesStringFilter(filters.fuelTypes, item.specs.fuelType) &&
      machesStringFilter(filters.gearbox, item.specs.gearbox) &&
      machesStringFilter(filters.brands, item.specs.brand) &&
      machesStringFilter(filters.origin, item.specs.origin) &&
      machesStringFilter(filters.drivetrain, item.specs.drivetrain) &&
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

  return `/vehicles?${searchParams}`;
}
