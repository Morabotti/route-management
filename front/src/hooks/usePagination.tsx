import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getQueryNumberParam } from '@utils/queryUtils';
import { QueryParams } from '@enums';

interface PaginationContext {
  offset: number;
  limit: number;
}

export const usePagination = (): PaginationContext => {
  const { search } = useLocation();

  const { offset, limit } = useMemo(() => {
    return {
      limit: getQueryNumberParam(search, QueryParams.Limit) || 20,
      offset: getQueryNumberParam(search, QueryParams.Offset) || 0
    };
  }, [search]);

  return {
    offset,
    limit
  };
};
