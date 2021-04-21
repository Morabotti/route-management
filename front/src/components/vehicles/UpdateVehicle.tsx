import { FC } from 'react';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid } from '@material-ui/core';
import { useUpdateVehicle } from '@hooks';
import { FormikTextField } from '@components/forms';

interface Props {
  onBack: () => void;
  vehicleId: number | null;
}

export const UpdateVehicle: FC<Props> = ({
  onBack,
  vehicleId
}: Props) => {
  const { loading, formik } = useUpdateVehicle(vehicleId);

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormikTextField
              formik={formik}
              formikName='licenseNumber'
              label='License number'
              variant='outlined'
              required
              fullWidth
              disabled={loading}
            />
          </Grid>
        </Grid>
      </form>
    </ApplicationContainer>
  );
};
