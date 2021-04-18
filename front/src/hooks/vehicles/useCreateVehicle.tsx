import { useCallback } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { FormikProps, useFormik } from 'formik';
import { CreateVehicle, Vehicle } from '@types';
import { createVehicle } from '@client';
import { Client, NotificationType } from '@enums';
import { createVehicleSchema } from '@utils/validation';
import { CREATE_VEHICLE } from '@utils/default-objects';
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
      queryClient.invalidateQueries(Client.GET_VEHICLES);
      queryClient.setQueryData([Client.GET_VEHICLE_BY_ID, data.id], data);
    }
  });

  const onSubmit = useCallback(async (values: CreateVehicle) => {
    setLoading(true);
    try {
      const vehicle = await mutateAsync(values);
      createNotification('Successfully created new vehicle', NotificationType.INFO);
      setLoading(false);
      push(`/rm/vehicles/view/${vehicle.id}`);
    }
    catch (e) {
      createNotification('Failed to created new vehicle', NotificationType.ERROR);
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
