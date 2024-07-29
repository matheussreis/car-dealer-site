'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import PaginationControls from './vehicle-pagination-controls';
import useUrlParams from '@/hooks/use-url-params';

interface VehiclePaginationProps {
  limit: number;
  offset: number;
  totalCount: number;
}

export default function VehiclePagination({
  limit = 8,
  offset = 0,
  totalCount,
}: VehiclePaginationProps) {
  const { updateUrlParam } = useUrlParams();

  const isPaginationItemDisabled = totalCount === 0;

  const offestParam = Number(offset || 0);
  const limitParam = Number(limit || 0);

  let numberOfPages = Math.ceil(totalCount / limit);
  if (totalCount <= limit) {
    numberOfPages = 1;
  }

  const pages = [];

  for (let i = 1; i <= numberOfPages; i++) {
    const link = updateUrlParam('offset', `${i - 1}`);

    pages.push(
      <PaginationItem
        key={link}
        aria-disabled={isPaginationItemDisabled}
        tabIndex={isPaginationItemDisabled ? -1 : undefined}
        className={
          isPaginationItemDisabled
            ? 'pointer-events-none opacity-50'
            : undefined
        }
      >
        <PaginationLink href={link}>{i}</PaginationLink>
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
            totalCount={totalCount}
            updateUrlParam={updateUrlParam}
          >
            {pages}
          </PaginationControls>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
