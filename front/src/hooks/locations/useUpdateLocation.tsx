import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation, Query } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { LocationType } from '@types';
import { getLocationById, updateLocation } from '@client';
import { Client, MapTool, NotificationType } from '@enums';
import { useApplication, useMap } from '@hooks';
import { useFormik, FormikProps } from 'formik';
import { DEFAULT_LOCATION } from '@utils/defaultObjects';
import { createLocationSchema } from '@utils/validation';

interface UpdateLocationContext {
  loading: boolean;
  formik: FormikProps<LocationType>;
}

export const useUpdateLocation = (id: number | null): UpdateLocationContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { state } = useLocation<null | google.maps.LatLngLiteral>();
  const { onSelectedChange, onToolChange } = useMap();
  const { loading, setLoading, createNotification } = useApplication();
  const [latest, setLatest] = useState<google.maps.LatLngLiteral | null>(null);

  const location = useQuery(
    [Client.GetLocationById, id],
    () => id === null ? null : getLocationById(id)
  );

  const { mutateAsync } = useMutation(updateLocation, {
    onSuccess: (data: LocationType) => {
      queryClient.invalidateQueries(Client.GetLocations);
      queryClient.invalidateQueries(Client.GetLocationWithPosition);
      queryClient.setQueryData([Client.GetLocationById, data.id], data);
      queryClient.invalidateQueries({
        predicate: (query: Query) => query.queryKey[0] === Client.GetPersonById
          && data.primaryPersons.map(i => i.person?.id)
            .filter(i => i !== undefined && i !== null)
            .includes(query.queryKey[1] as number)
      });
    }
  });

  const onSubmit = useCallback(async (values: LocationType) => {
    setLoading(true);
    try {
      await mutateAsync({
        ...values,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude)
      });

      createNotification('Successfully updated location', NotificationType.Info);
      setLoading(false);
      push(`/rm/locations/view/${values.id}`);
    }
    catch (e) {
      createNotification('Failed to update location', NotificationType.Info);
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
      setLatest({
        lat: location.data.latitude,
        lng: location.data.longitude
      });
    }
  }, [location.data, formik]);

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
    };
  }, [onToolChange]);

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
