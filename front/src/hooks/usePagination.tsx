import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface PaginationContext {
  offset: number;
  limit: number;
}

const getKeyFromUrl = (search: string, key: 'limit' | 'offset'): number | undefined => {
  const params = new URLSearchParams(search);

  const param = params.get(key);
  if (param && !isNaN(Number(param))) {
    return parseInt(param);
  }

  return undefined;
};

export const usePagination = (): PaginationContext => {
  const { search } = useLocation();

  const { offset, limit } = useMemo(() => {
    return {
      limit: getKeyFromUrl(search, 'limit') || 20,
      offset: getKeyFromUrl(search, 'offset') || 0
    };
  }, [search]);

  return {
    offset,
    limit
  };
};
