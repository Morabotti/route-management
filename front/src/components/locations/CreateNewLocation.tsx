import { FC } from 'react';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid } from '@material-ui/core';
import { useCreateLocation } from '@hooks';
import { FormikTextField } from '@components/forms';

interface Props {
  onBack: () => void;
}

export const CreateNewLocation: FC<Props> = ({
  onBack
}: Props) => {
  const { loading, formik } = useCreateLocation();

  return (
    <ApplicationContainer
      title='Create New Location'
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
            form='form-create-location'
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
      <form onSubmit={formik.handleSubmit} id='form-create-location'>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormikTextField
              formik={formik}
              formikName='latitude'
              label='Latitude'
              variant='outlined'
              required
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={6}>
            <FormikTextField
              formik={formik}
              formikName='longitude'
              label='Longitude'
              variant='outlined'
              required
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <FormikTextField
              formik={formik}
              formikName='address'
              label='Address'
              variant='outlined'
              required
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={6}>
            <FormikTextField
              formik={formik}
              formikName='zip'
              label='Zip code'
              variant='outlined'
              autoComplete='postal_code'
              required
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={6}>
            <FormikTextField
              formik={formik}
              formikName='city'
              label='City'
              variant='outlined'
              autoComplete='address-level2'
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
