import { FC } from 'react';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { Vehicle } from '@types';
import { DEFAULT_VEHICLE } from '@utils/default-objects';
import { createVehicleSchema } from '@utils/validation';
import { useApplication } from '@hooks';
import { getVehicleById, updateVehicle } from '@client';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Client, NotificationType } from '@enums';

const useStyles = makeStyles(theme => ({
  helper: {
    position: 'absolute',
    bottom: -19
  },
  field: {
    marginBottom: theme.spacing(1)
  }
}));

interface Props {
  onBack: () => void;
  vehicleId: number | null;
}

export const UpdateVehicle: FC<Props> = ({
  onBack,
  vehicleId
}: Props) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { loading, setLoading, createNotification } = useApplication();

  const vehicle = useQuery(
    [Client.GET_VEHICLE_BY_ID, vehicleId],
    () => vehicleId === null ? null : getVehicleById(vehicleId)
  );

  const { mutateAsync } = useMutation(updateVehicle, {
    onSuccess: (data: Vehicle) => {
      queryClient.invalidateQueries(Client.GET_VEHICLES);
      queryClient.setQueryData([Client.GET_VEHICLE_BY_ID, data.id], data);
    }
  });

  const formik = useFormik<Vehicle>({
    initialValues: vehicle.data || DEFAULT_VEHICLE,
    validationSchema: createVehicleSchema,
    onSubmit: async (values: Vehicle) => {
      setLoading(true);
      try {
        await mutateAsync(values);
        createNotification('Successfully updated vehicle', NotificationType.INFO);
        setLoading(false);
        onBack();
      }
      catch (e) {
        createNotification('Failed to update vehicle', NotificationType.ERROR);
        setLoading(false);
      }
    }
  });

  return (
    <ApplicationContainer
      title='Update Vehicle'
      onBack={onBack}
      actions={
        <Actions>
          <Button
            onClick={onBack}
            color='secondary'
            disableElevation
            variant='contained'
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={formik.handleReset}
            color='secondary'
            disableElevation
            variant='contained'
            disabled={loading}
          >
            Reset
          </Button>
          <Button
            form='form-update-vehicle'
            color='primary'
            type='submit'
            autoFocus
            disableElevation
            variant='contained'
            disabled={loading}
          >
            Save
          </Button>
        </Actions>
      }
    >
      <form onSubmit={formik.handleSubmit} id='form-update-vehicle'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='licenseNumber'
              name='licenseNumber'
              label='License number'
              variant='outlined'
              required
              value={formik.values.licenseNumber}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.licenseNumber && Boolean(formik.errors.licenseNumber)}
              helperText={formik.touched.licenseNumber && formik.errors.licenseNumber}
              className={classes.field}
              disabled={loading}
              FormHelperTextProps={{
                className: classes.helper
              }}
            />
          </Grid>
        </Grid>
      </form>
    </ApplicationContainer>
  );
};
