'use client';

import {
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useTranslations } from 'next-intl';

interface PaginationControlsProps {
  children: React.ReactNode;
  limit: number;
  offset: number;
  totalCount: number;
  updateUrlParam: (name: string, value: string) => { [k: string]: string };
}

export default function PaginationControls({
  children,
  limit,
  offset,
  totalCount,
  updateUrlParam,
}: PaginationControlsProps) {
  const t = useTranslations('pages.vehicles.buttons');

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
          label={t('previous')}
          href={{
            pathname: '/vehicles',
            query: updateUrlParam('offset', `${offset - 1}`),
          }}
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
          label={t('next')}
          href={{
            pathname: '/vehicles',
            query: updateUrlParam('offset', `${offset + 1}`),
          }}
        />
      </PaginationItem>
    </>
  );
}
