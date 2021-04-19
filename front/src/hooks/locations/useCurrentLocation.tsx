import { useCallback, useEffect, useState } from 'react';
import { UseQueryResult, useQuery, useQueryClient, useMutation, Query } from 'react-query';
import { useHistory } from 'react-router';
import { LocationType } from '@types';
import { deleteLocation, getLocationById } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication, useMap } from '@hooks';

interface LocationContext {
  deleting: boolean;
  loading: boolean;
  location: UseQueryResult<LocationType | null>;
  onUpdate: () => void;
  onDelete: () => void;
  onMove: () => void;
  onToggleDeleting: (set: boolean) => () => void;
}

export const useCurrentLocation = (id: number | null): LocationContext => {
  const { push } = useHistory();
  const queryClient = useQueryClient();
  const { loading, setLoading, createNotification } = useApplication();
  const [deleting, setDeleting] = useState(false);
  const { onLocationChange } = useMap();

  const location = useQuery(
    [Client.GetLocationById, id],
    () => id === null ? null : getLocationById(id)
  );

  const { mutateAsync: deleteAsync } = useMutation(deleteLocation, {
    onSuccess: (res: Response, data: LocationType) => {
      queryClient.invalidateQueries(Client.GetLocations);
      queryClient.invalidateQueries(Client.GetLocationWithPosition);
      queryClient.invalidateQueries([Client.GetLocationById, data.id], { stale: false });
      queryClient.invalidateQueries({
        predicate: (query: Query) => query.queryKey[0] === Client.GetPersonById
          && data.primaryPersons.map(i => i.person?.id)
            .filter(i => i !== undefined && i !== null)
            .includes(query.queryKey[1] as number)
      });
    }
  });

  const onDelete = useCallback(async () => {
    if (!location.data) {
      return;
    }

    setLoading(true);
    try {
      await deleteAsync(location.data);
      createNotification('Successfully deleted location', NotificationType.Info);
      setLoading(false);
      setDeleting(false);
      push(`/rm/locations`);
    }
    catch (e) {
      createNotification('Failed to delete location', NotificationType.Error);
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

  const onMove = useCallback(() => {
    if (location.data) {
      onLocationChange({
        lat: location.data.latitude,
        lng: location.data.longitude,
        zoom: 15
      });
    }
  }, [location.data, onLocationChange]);

  useEffect(onMove, [onMove]);

  return {
    loading,
    deleting,
    location,
    onToggleDeleting,
    onUpdate,
    onDelete,
    onMove
  };
};
