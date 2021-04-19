import { useCallback, useEffect, useRef, useState } from 'react';
import { usePagination, useDebounce } from '@hooks';
import { UseQueryResult, useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { Vehicle, PaginationResult } from '@types';
import { getQueryStringParam, setQueryParam } from '@utils/queryUtils';
import { getVehicles } from '@client';
import { Client, QueryParams } from '@enums';

interface VehicleListContext {
  vehicles: UseQueryResult<PaginationResult<Vehicle>>;
  search: string;
  setSearch: (set: string) => void;
  onResetFilters: () => void;
}

export const useVehicleList = (): VehicleListContext => {
  const pagination = usePagination();
  const { pathname, search } = useLocation();
  const { replace } = useHistory();
  const refPathname = useRef(pathname);
  const refSearch = useRef(search);

  const [searchState, setSearchState] = useState(
    getQueryStringParam(search, QueryParams.Search) || ''
  );
  const debouncedSearch = useDebounce(searchState, 300);

  const vehicles = useQuery(
    [Client.GetVehicles, pagination, { search: debouncedSearch }],
    () => getVehicles(pagination, { search: debouncedSearch }),
    { keepPreviousData: true }
  );

  useEffect(() => {
    const url = setQueryParam(
      refPathname.current,
      refSearch.current,
      QueryParams.Search,
      debouncedSearch,
      ''
    );
    replace(url);
  }, [debouncedSearch, replace]);

  const onResetFilters = useCallback(() => {
    setSearchState('');
  }, []);

  return {
    vehicles,
    search: searchState,
    setSearch: setSearchState,
    onResetFilters
  };
};
