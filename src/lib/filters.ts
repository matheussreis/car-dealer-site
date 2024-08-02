import {
  Vehicle,
  VehicleSpecRangeFilter,
  VehicleSpecsFilter,
} from '@/interfaces';

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
      matchesStringFilter(filters.bodyTypes, item.specs.bodyType) &&
      matchesStringFilter(filters.fuelTypes, item.specs.fuelType) &&
      matchesStringFilter(filters.gearbox, item.specs.gearbox) &&
      matchesStringFilter(filters.brands, item.specs.brand) &&
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
