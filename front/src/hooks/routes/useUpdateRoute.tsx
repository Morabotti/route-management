import { useCallback, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { RouteType } from '@types';
import { getRouteById, updateRoute } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';
import { FormikProps, useFormik } from 'formik';
import { createRouteSchema } from '@utils/validation';
import { DEFAULT_ROUTE } from '@utils/defaultObjects';

interface UpdateRouteContext {
  loading: boolean;
  formik: FormikProps<RouteType>;
}

export const useUpdateRoute = (id: number | null): UpdateRouteContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const route = useQuery(
    [Client.GetVehicleById, id],
    () => id === null ? null : getRouteById(id)
  );

  const { mutateAsync } = useMutation(updateRoute, {
    onSuccess: (data: RouteType) => {
      queryClient.invalidateQueries(Client.GetRoutes);
      queryClient.invalidateQueries(Client.GetRoutesWithPosition);
      queryClient.setQueryData([Client.GetRouteById, data.id], data);
    }
  });

  const onSubmit = useCallback(async (values: RouteType) => {
    setLoading(true);
    try {
      await mutateAsync(values);
      createNotification('Successfully updated route', NotificationType.Info);
      setLoading(false);
      push(`/rm/routes/view/${values.id}`);
    }
    catch (e) {
      createNotification('Failed to update route', NotificationType.Error);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  const formik = useFormik<RouteType>({
    initialValues: route.data || DEFAULT_ROUTE,
    validationSchema: createRouteSchema,
    onSubmit
  });

  useEffect(() => {
    if (route.data && route.data.id !== formik.values.id) {
      formik.setValues(route.data, false);
    }
  }, [route.data, formik]);

  return {
    loading,
    formik
  };
};
