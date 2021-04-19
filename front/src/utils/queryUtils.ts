import { QueryParams } from '@enums';

const getQueryParam = (search: string, key: string): string | null => {
  const params = new URLSearchParams(search);
  const param = params.get(key);
  return param;
};

export const getQueryParamsLength = (params: URLSearchParams): number => {
  let numberOfKeys = 0;
  for (const k of params.keys()) {
    if (k) {
      numberOfKeys++;
    }
  }
  return numberOfKeys;
};

export const getQueryNumberParam = (search: string, key: string): number | undefined => {
  const param = getQueryParam(search, key);

  if (param && !isNaN(Number(param))) {
    return parseInt(param);
  }

  return undefined;
};

export const getQueryStringParam = (search: string, key: string): string | undefined => {
  const param = getQueryParam(search, key);

  return param || undefined;
};

export const setQueryParam = (
  pathname: string,
  search: string,
  key: QueryParams,
  value: string | number | undefined,
  defaultValue: string | number
): string => {
  const params = new URLSearchParams(search);
  const keyParam = params.get(key);

  if (!value || defaultValue === value) {
    params.delete(key);
  }
  else if ((keyParam || defaultValue) !== value) {
    params.set(key, value.toString());
  }

  const numberOfKeys = getQueryParamsLength(params);

  const url = numberOfKeys !== 0
    ? `${pathname}?${params}`
    : pathname;

  return url;
};
