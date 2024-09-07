'use client';

import { Button } from '@/components/ui/button';
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@/components/ui/popover';
import { LuFilter } from 'react-icons/lu';
import { mergeFiltersIntoUrl } from '@/lib/filters';
import { useCallback, useState } from 'react';
import {
  RangeFilter,
  RangeInputFilter,
  SelectFilter,
} from './vehicle-filter-fields';
import { VehicleSpecRangeFilter, VehicleSpecsFilter } from '@/interfaces';
import useUrlParams from '@/hooks/use-url-params';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import useFilterOptions from '@/hooks/use-filter-options';

const defaultFilter: VehicleSpecsFilter = {
  mileage: { from: '', to: '' },
  year: { from: '', to: '' },
  bodyType: '',
  fuelType: '',
  gearbox: '',
  brand: '',
  origin: '',
  drivetrain: '',
};

interface VehicleFilterProps {
  filters: VehicleSpecsFilter;
}

export function VehicleFilter({ filters }: VehicleFilterProps) {
  const router = useRouter();
  const t = useTranslations('pages.vehicles');
  const filterOptions = useFilterOptions();

  const { removeUrlParam, currentUrl } = useUrlParams();

  const [selectedFilters, setSelectedFilters] = useState<VehicleSpecsFilter>(
    filters || defaultFilter
  );

  const selectFilterHandler = useCallback(
    (name: string, value: string | object) => {
      setSelectedFilters((prev) => {
        if (typeof value === 'object') {
          const selectFilter = prev[name] as VehicleSpecRangeFilter;

          return {
            ...prev,
            [name]: { ...selectFilter, ...value },
          };
        }

        return { ...prev, [name]: value };
      });
    },
    []
  );

  const applyFilterClickHandler = () => {
    const queryParams = mergeFiltersIntoUrl(selectedFilters, currentUrl);
    router.push({ pathname: '/vehicles', query: { ...queryParams } });
  };

  const clearFiltersClickHandler = () => {
    setSelectedFilters(defaultFilter);
    const queryParams = removeUrlParam('filters');
    router.push({ pathname: '/vehicles', query: { ...queryParams } });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          <LuFilter className="w-5 h-5" />
          {t('buttons.filters.title')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen max-w-[450px] p-6 rounded-lg shadow-lg md:p-8">
        <div className="grid grid-cols-1 md:lg:grid-cols-2 gap-5">
          <RangeInputFilter
            label={t('filters.titles.mileage')}
            name="mileage"
            onChange={selectFilterHandler}
            value={selectedFilters.mileage}
          />
          <RangeFilter
            label={t('filters.titles.year')}
            name="year"
            range={filterOptions.year}
            onSelect={selectFilterHandler}
            value={selectedFilters.year}
          />
          <SelectFilter
            label={t('filters.titles.bodyType')}
            id="bodyType"
            options={filterOptions.bodyType}
            onSelect={selectFilterHandler}
            value={selectedFilters.bodyType}
          />
          <SelectFilter
            label={t('filters.titles.fuelType')}
            id="fuelType"
            options={filterOptions.fuelType}
            onSelect={selectFilterHandler}
            value={selectedFilters.fuelType}
          />
          <SelectFilter
            label={t('filters.titles.gearbox')}
            id="gearbox"
            options={filterOptions.gearbox}
            onSelect={selectFilterHandler}
            value={selectedFilters.gearbox}
          />
          <SelectFilter
            label={t('filters.titles.brand')}
            id="brand"
            options={filterOptions.brand}
            onSelect={selectFilterHandler}
            value={selectedFilters.brand}
          />
          <SelectFilter
            label={t('filters.titles.origin')}
            id="origin"
            options={filterOptions.origin}
            onSelect={selectFilterHandler}
            value={selectedFilters.origin}
          />
          <SelectFilter
            label={t('filters.titles.drivetrain')}
            id="drivetrain"
            options={filterOptions.drivetrain}
            onSelect={selectFilterHandler}
            value={selectedFilters.drivetrain}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-6">
          <Button onClick={applyFilterClickHandler}>
            {t('buttons.filters.apply')}
          </Button>
          <Button onClick={clearFiltersClickHandler} variant="outline">
            {t('buttons.filters.clear')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
