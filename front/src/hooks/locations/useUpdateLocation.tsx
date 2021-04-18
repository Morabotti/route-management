import { useCallback, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { LocationType } from '@types';
import { getLocationById, updateLocation } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';
import { useFormik, FormikProps } from 'formik';
import { DEFAULT_LOCATION } from '@utils/default-objects';
import { createLocationSchema } from '@utils/validation';

interface UpdateLocationContext {
  loading: boolean;
  formik: FormikProps<LocationType>;
}

export const useUpdateLocation = (id: number | null): UpdateLocationContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const location = useQuery(
    [Client.GET_LOCATION_BY_ID, id],
    () => id === null ? null : getLocationById(id)
  );

  const { mutateAsync } = useMutation(updateLocation, {
    onSuccess: (data: LocationType) => {
      queryClient.invalidateQueries(Client.GET_LOCATIONS);
      queryClient.invalidateQueries(Client.GET_LOCATIONS_WITH_POSITION);
      queryClient.setQueryData([Client.GET_LOCATION_BY_ID, data.id], data);
    }
  });

  const onSubmit = useCallback(async (values: LocationType) => {
    setLoading(true);
    try {
      await mutateAsync(values);
      createNotification('Successfully updated location', NotificationType.INFO);
      setLoading(false);
      push(`/rm/locations/view/${values.id}`);
    }
    catch (e) {
      createNotification('Failed to update location', NotificationType.ERROR);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  const formik = useFormik<LocationType>({
    initialValues: location.data || DEFAULT_LOCATION,
    validationSchema: createLocationSchema,
    onSubmit
  });

  useEffect(() => {
    if (location.data && location.data.id !== formik.values.id) {
      formik.setValues(location.data, false);
    }
  }, [location.data, formik]);

  return {
    loading,
    formik
  };
};
