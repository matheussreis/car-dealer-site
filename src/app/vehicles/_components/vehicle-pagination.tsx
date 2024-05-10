'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { SortingType } from '@/enums';
import { usePathname, useSearchParams } from 'next/navigation';
import PaginationControls from './vehicle-pagination-controls';

interface VehiclePaginationProps {
  limit: number;
  offset: number;
  totalCount: number;
  sorting: SortingType;
}

export default function VehiclePagination({
  limit = 8,
  offset = 0,
  totalCount,
  sorting,
}: VehiclePaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isPaginationItemDisabled = totalCount === 0;

  const offestParam = Number(offset || searchParams.get('offset') || 0);
  const limitParam = Number(limit || searchParams.get('limit') || 0);

  let numberOfPages = Math.round(totalCount / limit);
  if (totalCount <= limit * 2) {
    numberOfPages = 2;
  }

  const pages = [];

  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(
      <PaginationItem
        key={`${pathname}?offset=${i - 1}&sorting=${sorting}`}
        aria-disabled={isPaginationItemDisabled}
        tabIndex={isPaginationItemDisabled ? -1 : undefined}
        className={
          isPaginationItemDisabled
            ? 'pointer-events-none opacity-50'
            : undefined
        }
      >
        <PaginationLink href={`${pathname}?offset=${i - 1}&sorting=${sorting}`}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationControls
            limit={limitParam}
            offset={offestParam}
            pathname={pathname}
            totalCount={totalCount}
            sorting={sorting}
          >
            {pages}
          </PaginationControls>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
