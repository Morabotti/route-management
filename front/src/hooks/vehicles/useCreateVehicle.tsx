import { useCallback } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { FormikProps, useFormik } from 'formik';
import { CreateVehicle, Vehicle } from '@types';
import { createVehicle } from '@client';
import { Client, NotificationType } from '@enums';
import { createVehicleSchema } from '@utils/validation';
import { CREATE_VEHICLE } from '@utils/defaultObjects';
import { useApplication } from '@hooks';

interface CreateVehicleContext {
  loading: boolean;
  formik: FormikProps<CreateVehicle>;
}

export const useCreateVehicle = (): CreateVehicleContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const { mutateAsync } = useMutation(createVehicle, {
    onSuccess: (data: Vehicle) => {
      queryClient.invalidateQueries(Client.GetVehicles);
      queryClient.setQueryData([Client.GetVehicleById, data.id], data);
    }
  });

  const onSubmit = useCallback(async (values: CreateVehicle) => {
    setLoading(true);
    try {
      const vehicle = await mutateAsync(values);
      createNotification('Successfully created new vehicle', NotificationType.Info);
      setLoading(false);
      push(`/rm/vehicles/view/${vehicle.id}`);
    }
    catch (e) {
      createNotification('Failed to created new vehicle', NotificationType.Error);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  const formik = useFormik<CreateVehicle>({
    initialValues: CREATE_VEHICLE,
    validationSchema: createVehicleSchema,
    onSubmit
  });

  return {
    loading,
    formik
  };
};
