import {
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { SortingType } from '@/enums';

interface PaginationControlsProps {
  children: React.ReactNode;
  limit: number;
  offset: number;
  pathname: string;
  totalCount: number;
  sorting: SortingType;
}

export default function PaginationControls({
  children,
  limit,
  offset,
  pathname,
  totalCount,
  sorting,
}: PaginationControlsProps) {
  const isPreviousDisabled = offset === 0;
  let isNextDisabled = false;

  if (offset === 0) {
    isNextDisabled = totalCount <= limit;
  } else {
    isNextDisabled = totalCount <= limit * (offset + 1);
  }

  return (
    <>
      <PaginationItem
        aria-disabled={isPreviousDisabled}
        tabIndex={isPreviousDisabled ? -1 : undefined}
        className={
          isPreviousDisabled ? 'pointer-events-none opacity-50' : undefined
        }
      >
        <PaginationPrevious
          href={`${pathname}?offset=${offset - 1}&sorting=${sorting}`}
        />
      </PaginationItem>
      {children}
      <PaginationItem
        aria-disabled={isNextDisabled}
        tabIndex={isNextDisabled ? -1 : undefined}
        className={
          isNextDisabled ? 'pointer-events-none opacity-50' : undefined
        }
      >
        <PaginationNext
          href={`${pathname}?offset=${offset + 1}&sorting=${sorting}`}
        />
      </PaginationItem>
    </>
  );
}
