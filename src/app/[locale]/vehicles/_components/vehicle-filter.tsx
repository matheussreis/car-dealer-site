'use client';

import { Button } from '@/components/ui/button';
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@/components/ui/popover';
import { LuFilter } from 'react-icons/lu';
import { getFilters, mergeFiltersIntoUrl } from '@/lib/filters';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  RangeFilter,
  RangeInputFilter,
  SelectFilter,
} from './vehicle-filter-fields';
import { VehicleSpecRangeFilter, VehicleSpecsFilter } from '@/interfaces';
import useUrlParams from '@/hooks/use-url-params';

const defaultFilter: VehicleSpecsFilter = {
  mileage: { from: '', to: '' },
  year: { from: '', to: '' },
  bodyTypes: '',
  fuelTypes: '',
  gearbox: '',
  brands: '',
  origin: '',
  drivetrain: '',
};

interface VehicleFilterProps {
  filters: VehicleSpecsFilter;
}

export function VehicleFilter({ filters }: VehicleFilterProps) {
  const filterOptions = getFilters();

  const router = useRouter();

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
    const redirectUrl = mergeFiltersIntoUrl(selectedFilters, currentUrl);
    router.push(redirectUrl);
  };

  const clearFiltersClickHandler = () => {
    setSelectedFilters(defaultFilter);
    const redirectUrl = removeUrlParam('filters');
    router.push(redirectUrl);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          <LuFilter className="w-5 h-5" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen max-w-[450px] p-6 rounded-lg shadow-lg md:p-8">
        <div className="grid grid-cols-1 md:lg:grid-cols-2 gap-5">
          <RangeInputFilter
            label="Mileage"
            name="mileage"
            onChange={selectFilterHandler}
            value={selectedFilters.mileage}
          />
          <RangeFilter
            label="Year"
            name="year"
            range={filterOptions.year}
            onSelect={selectFilterHandler}
            value={selectedFilters.year}
          />
          <SelectFilter
            label="Body Type"
            id="bodyTypes"
            options={filterOptions.bodyTypes}
            onSelect={selectFilterHandler}
            value={selectedFilters.bodyTypes}
          />
          <SelectFilter
            label="Fuel Type"
            id="fuelTypes"
            options={filterOptions.fuelTypes}
            onSelect={selectFilterHandler}
            value={selectedFilters.fuelTypes}
          />
          <SelectFilter
            label="Gearbox"
            id="gearbox"
            options={filterOptions.gearbox}
            onSelect={selectFilterHandler}
            value={selectedFilters.gearbox}
          />
          <SelectFilter
            label="Brands"
            id="brands"
            options={filterOptions.brands}
            onSelect={selectFilterHandler}
            value={selectedFilters.brands}
          />
          <SelectFilter
            label="Origin"
            id="origin"
            options={filterOptions.origin}
            onSelect={selectFilterHandler}
            value={selectedFilters.origin}
          />
          <SelectFilter
            label="Drivetrain"
            id="drivetrain"
            options={filterOptions.drivetrain}
            onSelect={selectFilterHandler}
            value={selectedFilters.drivetrain}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-6">
          <Button onClick={applyFilterClickHandler}>Apply Filter</Button>
          <Button onClick={clearFiltersClickHandler} variant="outline">
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
