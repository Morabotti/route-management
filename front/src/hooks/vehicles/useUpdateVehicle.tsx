import { useCallback } from 'react';
import { UseQueryResult, useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { Vehicle } from '@types';
import { getVehicleById, updateVehicle } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';

interface UpdateVehicleContext {
  loading: boolean;
  vehicle: UseQueryResult<Vehicle | null>;
  onSubmit: (values: Vehicle) => void;
}

export const useUpdateVehicle = (id: number | null): UpdateVehicleContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const vehicle = useQuery(
    [Client.GET_VEHICLE_BY_ID, id],
    () => id === null ? null : getVehicleById(id)
  );

  const { mutateAsync } = useMutation(updateVehicle, {
    onSuccess: (data: Vehicle) => {
      queryClient.invalidateQueries(Client.GET_VEHICLES);
      queryClient.setQueryData([Client.GET_VEHICLE_BY_ID, data.id], data);
    }
  });

  const onSubmit = useCallback(async (values: Vehicle) => {
    setLoading(true);
    try {
      await mutateAsync(values);
      createNotification('Successfully updated vehicle', NotificationType.INFO);
      setLoading(false);
      push(`/rm/vehicles/view/${values.id}`);
    }
    catch (e) {
      createNotification('Failed to update vehicle', NotificationType.ERROR);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  return {
    loading,
    vehicle,
    onSubmit
  };
};
