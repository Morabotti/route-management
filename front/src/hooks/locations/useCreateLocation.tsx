import { useCallback } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { CreateLocation, LocationType } from '@types';
import { createLocation } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';
import { FormikProps, useFormik } from 'formik';
import { CREATE_LOCATION } from '@utils/defaultObjects';
import { createLocationSchema } from '@utils/validation';

interface CreateLocationContext {
  loading: boolean;
  formik: FormikProps<CreateLocation>;
}

export const useCreateLocation = (): CreateLocationContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const { mutateAsync } = useMutation(createLocation, {
    onSuccess: (data: LocationType) => {
      queryClient.invalidateQueries(Client.GetLocations);
      queryClient.setQueryData([Client.GetLocationById, data.id], data);
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

      createNotification('Successfully created new location', NotificationType.Info);
      setLoading(false);
      push(`/rm/locations/view/${location.id}`);
    }
    catch (e) {
      createNotification('Failed to created new location', NotificationType.Error);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  const formik = useFormik<CreateLocation>({
    initialValues: CREATE_LOCATION,
    validationSchema: createLocationSchema,
    onSubmit
  });

  return {
    loading,
    formik
  };
};
