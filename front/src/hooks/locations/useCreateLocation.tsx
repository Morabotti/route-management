import { useCallback } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { CreateLocation, LocationType } from '@types';
import { createLocation } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';

interface CreateLocationContext {
  loading: boolean;
  onSubmit: (values: CreateLocation) => void;
}

export const useCreateLocation = (): CreateLocationContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const { mutateAsync } = useMutation(createLocation, {
    onSuccess: (data: LocationType) => {
      queryClient.invalidateQueries(Client.GET_LOCATIONS);
      queryClient.setQueryData([Client.GET_LOCATION_BY_ID, data.id], data);
    }
  });

  const onSubmit = useCallback(async (values: CreateLocation) => {
    setLoading(true);
    try {
      const location = await mutateAsync({
        ...values,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude)
      });

      createNotification('Successfully created new location', NotificationType.INFO);
      setLoading(false);
      push(`/rm/locations/view/${location.id}`);
    }
    catch (e) {
      createNotification('Failed to created new location', NotificationType.ERROR);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  return {
    loading,
    onSubmit
  };
};
