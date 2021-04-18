import { useCallback, useEffect, useRef, useState } from 'react';
import { usePagination, useDebounce } from '@hooks';
import { UseQueryResult, useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { PaginationResult, LocationType } from '@types';
import { getQueryStringParam, setQueryParam } from '@utils/query-utils';
import { getLocations } from '@client';
import { Client } from '@enums';

interface LocationListContext {
  locations: UseQueryResult<PaginationResult<LocationType>>;
  search: string;
  setSearch: (set: string) => void;
  onResetFilters: () => void;
}

export const useLocationList = (): LocationListContext => {
  const pagination = usePagination();
  const { pathname, search } = useLocation();
  const { replace } = useHistory();
  const refPathname = useRef(pathname);
  const refSearch = useRef(search);

  const [searchState, setSearchState] = useState(getQueryStringParam(search, 'search') || '');
  const debouncedSearch = useDebounce(searchState, 300);

  const locations = useQuery(
    [Client.GET_LOCATIONS, pagination, { search: debouncedSearch }],
    () => getLocations(pagination, { search: debouncedSearch }),
    { keepPreviousData: true }
  );

  useEffect(() => {
    const url = setQueryParam(
      refPathname.current,
      refSearch.current,
      'search',
      debouncedSearch,
      ''
    );
    replace(url);
  }, [debouncedSearch, replace]);

  const onResetFilters = useCallback(() => {
    setSearchState('');
  }, []);

  return {
    locations,
    search: searchState,
    setSearch: setSearchState,
    onResetFilters
  };
};
