import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getQueryNumberParam } from '@utils/query-utils';

interface PaginationContext {
  offset: number;
  limit: number;
}

export const usePagination = (): PaginationContext => {
  const { search } = useLocation();

  const { offset, limit } = useMemo(() => {
    return {
      limit: getQueryNumberParam(search, 'limit') || 20,
      offset: getQueryNumberParam(search, 'offset') || 0
    };
  }, [search]);

  return {
    offset,
    limit
  };
};
