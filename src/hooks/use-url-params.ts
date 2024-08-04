'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export default function useUrlParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams.toString()}`;

  function getParamsFromUrl(url: string) {
    const params = url.split('?')[1] || '';
    return new URLSearchParams(params);
  }

  function removeUrlParam(param: string) {
    const urlSearchParams = getParamsFromUrl(url);
    urlSearchParams.delete(param);
    return Object.fromEntries(urlSearchParams.entries());
  }

  function updateUrlParam(param: string, value: string) {
    const urlSearchParams = getParamsFromUrl(url);
    urlSearchParams.set(param, value);
    return Object.fromEntries(urlSearchParams.entries());
  }

  return {
    removeUrlParam,
    updateUrlParam,
    currentUrl: url,
  };
}
