'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export default function useUrlParams(baseUrl: string = '/vehicles') {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams.toString()}`;

  function getParamsFromUrl(url: string) {
    const params = url.split('?')[1] || '';
    return new URLSearchParams(params);
  }

  function urlParamsToString(urlSearchParams: URLSearchParams) {
    return `${baseUrl}?${urlSearchParams.toString()}`;
  }

  function getUrlParam(param: string) {
    return searchParams.get(param) || null;
  }

  function removeUrlParam(param: string) {
    const urlSearchParams = getParamsFromUrl(url);
    urlSearchParams.delete(param);
    return urlParamsToString(urlSearchParams);
  }

  function updateUrlParam(param: string, value: string) {
    const urlSearchParams = getParamsFromUrl(url);
    urlSearchParams.set(param, value);
    return urlParamsToString(urlSearchParams);
  }

  return {
    getUrlParam,
    removeUrlParam,
    updateUrlParam,
    currentUrl: url,
  };
}
