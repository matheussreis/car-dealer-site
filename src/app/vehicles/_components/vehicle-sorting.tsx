'use client';

import { SortingType } from '@/enums';
import { useEffect, useState } from 'react';
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LuArrowUpDown } from 'react-icons/lu';
import Link from 'next/link';

const SORTING_OPTIONS: { [key in SortingType]: string } = {
  [SortingType.AscendingPrice]: 'Price: Low to High',
  [SortingType.DescendingPrice]: 'Price: High to Low',
  [SortingType.AscendingDate]: 'Date: Old to New',
  [SortingType.DescendingDate]: 'Date: New to Old',
  [SortingType.AscendingName]: 'Name: A to Z',
  [SortingType.DescendingName]: 'Name: Z to A',
};

interface VehicleSortingProps {
  sorting: SortingType;
}

export default function VehicleSorting({ sorting }: VehicleSortingProps) {
  const [selectedSorting, setSelectedSorting] = useState<SortingType>(
    SortingType.DescendingDate
  );
  const [isOpen, setIsOpen] = useState(false);

  const valueChangeHandler = (value: string) => {
    setSelectedSorting(value as unknown as SortingType);
  };

  useEffect(() => {
    setSelectedSorting(sorting);
  }, [sorting]);

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="shrink-0"
          variant="outline"
          onClick={() => setIsOpen(true)}
        >
          <LuArrowUpDown className="w-4 h-4 mr-2" />
          {SORTING_OPTIONS[selectedSorting] || 'Sort by'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuRadioGroup
          value={SORTING_OPTIONS[selectedSorting]}
          onValueChange={valueChangeHandler}
        >
          {Object.keys(SORTING_OPTIONS).map((option) => {
            return (
              <DropdownMenuRadioItem key={option} value={option.toString()}>
                <Link
                  href={`/vehicles?sorting=${option}`}
                  onClick={() => setIsOpen(false)}
                >
                  {SORTING_OPTIONS[option as SortingType]}
                </Link>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
