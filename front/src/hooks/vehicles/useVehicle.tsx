import { useCallback, useState } from 'react';
import { UseQueryResult, useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { Vehicle } from '@types';
import { deleteVehicle, getVehicleById } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';

interface VehicleContext {
  deleting: boolean;
  loading: boolean;
  vehicle: UseQueryResult<Vehicle | null>;
  onUpdate: () => void;
  onDelete: () => void;
  onToggleDeleting: (set: boolean) => () => void;
}

export const useVehicle = (id: number | null): VehicleContext => {
  const { push } = useHistory();
  const queryClient = useQueryClient();
  const { loading, setLoading, createNotification } = useApplication();
  const [deleting, setDeleting] = useState(false);

  const vehicle = useQuery(
    [Client.GetVehicleById, id],
    () => id === null ? null : getVehicleById(id)
  );

  const { mutateAsync: deleteAsync } = useMutation(deleteVehicle, {
    onSuccess: (res: Response, id: number) => {
      queryClient.invalidateQueries(Client.GetVehicles);
      queryClient.invalidateQueries([Client.GetVehicleById, id], { stale: false });
    }
  });

  const onDelete = useCallback(async () => {
    if (!vehicle.data) {
      return;
    }

    setLoading(true);
    try {
      await deleteAsync(vehicle.data.id);
      createNotification('Successfully deleted vehicle', NotificationType.Info);
      setLoading(false);
      setDeleting(false);
      push(`/rm/vehicles`);
    }
    catch (e) {
      createNotification('Failed to delete vehicle', NotificationType.Error);
      setLoading(false);
      setDeleting(false);
    }
  }, [vehicle.data, push, createNotification, setLoading, deleteAsync]);

  const onUpdate = useCallback(() => {
    if (!vehicle.data) {
      return;
    }

    push(`/rm/vehicles/update/${vehicle.data.id}`);
  }, [vehicle.data, push]);

  const onToggleDeleting = useCallback((set: boolean) => () => {
    setDeleting(set);
  }, []);

  return {
    loading,
    deleting,
    vehicle,
    onToggleDeleting,
    onUpdate,
    onDelete
  };
};
