import { useCallback, useState } from 'react';
import { UseQueryResult, useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { LocationType } from '@types';
import { deleteLocation, getLocationById } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';

interface LocationContext {
  deleting: boolean;
  loading: boolean;
  location: UseQueryResult<LocationType | null>;
  onUpdate: () => void;
  onDelete: () => void;
  onToggleDeleting: (set: boolean) => () => void;
}

export const useCurrentLocation = (id: number | null): LocationContext => {
  const { push } = useHistory();
  const queryClient = useQueryClient();
  const { loading, setLoading, createNotification } = useApplication();
  const [deleting, setDeleting] = useState(false);

  const location = useQuery(
    [Client.GET_LOCATION_BY_ID, id],
    () => id === null ? null : getLocationById(id)
  );

  const { mutateAsync: deleteAsync } = useMutation(deleteLocation, {
    onSuccess: (res: Response, id: number) => {
      queryClient.invalidateQueries(Client.GET_VEHICLES);
      queryClient.invalidateQueries([Client.GET_VEHICLE_BY_ID, id], { stale: false });
    }
  });

  const onDelete = useCallback(async () => {
    if (!location.data) {
      return;
    }

    setLoading(true);
    try {
      await deleteAsync(location.data.id);
      createNotification('Successfully deleted location', NotificationType.INFO);
      setLoading(false);
      setDeleting(false);
      push(`/rm/locations`);
    }
    catch (e) {
      createNotification('Failed to delete location', NotificationType.ERROR);
      setLoading(false);
      setDeleting(false);
    }
  }, [location.data, push, createNotification, setLoading, deleteAsync]);

  const onUpdate = useCallback(() => {
    if (!location.data) {
      return;
    }

    push(`/rm/locations/update/${location.data.id}`);
  }, [location.data, push]);

  const onToggleDeleting = useCallback((set: boolean) => () => {
    setDeleting(set);
  }, []);

  return {
    loading,
    deleting,
    location,
    onToggleDeleting,
    onUpdate,
    onDelete
  };
};
