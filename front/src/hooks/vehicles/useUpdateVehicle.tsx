import { useCallback, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { Vehicle } from '@types';
import { getVehicleById, updateVehicle } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';
import { FormikProps, useFormik } from 'formik';
import { createVehicleSchema } from '@utils/validation';
import { DEFAULT_VEHICLE } from '@utils/default-objects';

interface UpdateVehicleContext {
  loading: boolean;
  formik: FormikProps<Vehicle>;
}

export const useUpdateVehicle = (id: number | null): UpdateVehicleContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const vehicle = useQuery(
    [Client.GET_VEHICLE_BY_ID, id],
    () => id === null ? null : getVehicleById(id)
  );

  const { mutateAsync } = useMutation(updateVehicle, {
    onSuccess: (data: Vehicle) => {
      queryClient.invalidateQueries(Client.GET_VEHICLES);
      queryClient.setQueryData([Client.GET_VEHICLE_BY_ID, data.id], data);
    }
  });

  const onSubmit = useCallback(async (values: Vehicle) => {
    setLoading(true);
    try {
      await mutateAsync(values);
      createNotification('Successfully updated vehicle', NotificationType.INFO);
      setLoading(false);
      push(`/rm/vehicles/view/${values.id}`);
    }
    catch (e) {
      createNotification('Failed to update vehicle', NotificationType.ERROR);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  const formik = useFormik<Vehicle>({
    initialValues: vehicle.data || DEFAULT_VEHICLE,
    validationSchema: createVehicleSchema,
    onSubmit
  });

  useEffect(() => {
    if (vehicle.data && vehicle.data.id !== formik.values.id) {
      formik.setValues(vehicle.data, false);
    }
  }, [vehicle.data, formik]);

  return {
    loading,
    formik
  };
};
