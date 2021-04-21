import { useCallback, useEffect, useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { CreateLocation, LocationType } from '@types';
import { createLocation } from '@client';
import { Client, MapTool, NotificationType } from '@enums';
import { useApplication, useMap } from '@hooks';
import { FormikProps, useFormik } from 'formik';
import { CREATE_LOCATION } from '@utils/defaultObjects';
import { createLocationSchema } from '@utils/validation';

interface CreateLocationContext {
  loading: boolean;
  formik: FormikProps<CreateLocation>;
}

export const useCreateLocation = (): CreateLocationContext => {
  const queryClient = useQueryClient();
  const { onSelectedChange, onToolChange } = useMap();
  const { state } = useLocation<null | google.maps.LatLngLiteral>();
  const { push } = useHistory();
  const [latest, setLatest] = useState<google.maps.LatLngLiteral | null>(null);
  const { loading, setLoading, createNotification } = useApplication();

  const { mutateAsync } = useMutation(createLocation, {
    onSuccess: (data: LocationType) => {
      queryClient.invalidateQueries(Client.GetLocations);
      queryClient.invalidateQueries(Client.GetLocationWithPosition);
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

  useEffect(() => {
    if (state
      && state.lng !== latest?.lng
      && state.lat !== latest?.lat
      && state.lat !== formik.values.latitude
      && state.lng !== formik.values.longitude
    ) {
      setLatest({ lat: state.lat, lng: state.lng });
      formik.setValues(prev => ({
        ...prev,
        latitude: Number(state.lat.toFixed(7)),
        longitude: Number(state.lng.toFixed(7))
      }));
    }
  }, [state, formik, latest]);

  useEffect(() => {
    onToolChange(MapTool.LocationTool);
    return () => {
      onToolChange(MapTool.Cursor);
      onSelectedChange(null);
    };
  }, [onToolChange, onSelectedChange]);

  useEffect(() => {
    if (state
      && (state?.lat !== formik.values.latitude || state?.lng !== formik.values.longitude)
    ) {
      onSelectedChange({ lat: formik.values.latitude, lng: formik.values.longitude, zoom: 0 });
    }
  }, [formik.values.latitude, formik.values.longitude, onSelectedChange, state]);

  return {
    loading,
    formik
  };
};
