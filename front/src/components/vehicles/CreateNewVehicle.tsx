import { FC } from 'react';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid } from '@material-ui/core';
import { useCreateVehicle } from '@hooks';
import { FormikTextField } from '@components/forms';

interface Props {
  onBack: () => void;
}

export const CreateNewVehicle: FC<Props> = ({
  onBack
}: Props) => {
  const { loading, formik } = useCreateVehicle();

  return (
    <ApplicationContainer
      title='Create New Vehicle'
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
            form='form-create-vehicle'
            color='primary'
            type='submit'
            autoFocus
            disableElevation
            variant='contained'
            disabled={loading}
          >
            Create
          </Button>
        </Actions>
      }
    >
      <form onSubmit={formik.handleSubmit} id='form-create-vehicle'>
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
