import { useCallback } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { FormikProps, useFormik } from 'formik';
import { CreateRoute, CreateRouteForm, RouteType } from '@types';
import { createRoute } from '@client';
import { Client, NotificationType } from '@enums';
import { createRouteSchema } from '@utils/validation';
import { CREATE_ROUTE } from '@utils/defaultObjects';
import { useApplication } from '@hooks';

interface CreateRouteContext {
  loading: boolean;
  formik: FormikProps<CreateRouteForm>;
}

export const useCreateRoute = (): CreateRouteContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const { mutateAsync } = useMutation(createRoute, {
    onSuccess: (data: RouteType) => {
      queryClient.invalidateQueries(Client.GetRoutes);
      queryClient.invalidateQueries(Client.GetRoutesWithPosition);
      queryClient.setQueryData([Client.GetRouteById, data.id], data);
    }
  });

  const onSubmit = useCallback(async (values: CreateRouteForm) => {
    if (values.destination === null || values.vehicle === null) {
      return;
    }

    setLoading(true);
    try {
      const route = await mutateAsync(values as CreateRoute);
      createNotification('Successfully created new route', NotificationType.Info);
      setLoading(false);
      push(`/rm/routes/view/${route.id}`);
    }
    catch (e) {
      createNotification('Failed to created new route', NotificationType.Error);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  const formik = useFormik<CreateRouteForm>({
    initialValues: CREATE_ROUTE,
    validationSchema: createRouteSchema,
    onSubmit
  });

  return {
    loading,
    formik
  };
};
