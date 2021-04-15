import { usePagination } from '@hooks';
import { UseQueryResult, useQuery } from 'react-query';
import { Client } from '@enums';
import { getVehicles } from '@client';
import { Vehicle, PaginationResult } from '@types';

interface VehicleListContext {
  vehicles: UseQueryResult<PaginationResult<Vehicle>>;
}

export const useVehicleList = (): VehicleListContext => {
  const pagination = usePagination();

  const vehicles = useQuery(
    [Client.GET_VEHICLES, pagination],
    () => getVehicles(pagination),
    { keepPreviousData: true }
  );

  return {
    vehicles
  };
};
