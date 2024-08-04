'use client';

import { SortingType } from '@/enums';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LuArrowUpDown } from 'react-icons/lu';
import useUrlParams from '@/hooks/use-url-params';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface VehicleSortingProps {
  sorting: SortingType;
}

export default function VehicleSorting({ sorting }: VehicleSortingProps) {
  const [selectedSorting, setSelectedSorting] = useState<SortingType>(
    SortingType.DescendingDate
  );

  const { updateUrlParam } = useUrlParams();
  const t = useTranslations('pages.vehicles.buttons.sorting');

  const SORTING_OPTIONS: { [key in SortingType]: string } = useMemo(() => {
    return Object.values(SortingType).reduce((options, type) => {
      options[type] = t(type);
      return options;
    }, {} as { [key in SortingType]: string });
  }, [t]);

  const valueChangeHandler = useCallback((value: string) => {
    setSelectedSorting(value as unknown as SortingType);
  }, []);

  useEffect(() => {
    setSelectedSorting(sorting);
  }, [sorting]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="shrink-0" variant="outline">
          <LuArrowUpDown className="w-4 h-4 mr-2" />
          {SORTING_OPTIONS[selectedSorting] || t('title')}
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
                  href={{
                    pathname: '/vehicles',
                    query: updateUrlParam('sorting', `${option}`),
                  }}
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
