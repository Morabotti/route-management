import { FC } from 'react';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { CreateLocation } from '@types';
import { CREATE_LOCATION } from '@utils/default-objects';
import { createLocationSchema } from '@utils/validation';
import { useCreateLocation } from '@hooks';
import { useCommonStyles } from '@theme';

interface Props {
  onBack: () => void;
}

export const CreateNewLocation: FC<Props> = ({
  onBack
}: Props) => {
  const commonClasses = useCommonStyles();
  const { loading, onSubmit } = useCreateLocation();

  const formik = useFormik<CreateLocation>({
    initialValues: CREATE_LOCATION,
    validationSchema: createLocationSchema,
    onSubmit
  });

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
            <TextField
              fullWidth
              id='latitude'
              name='latitude'
              label='Latitude'
              variant='outlined'
              required
              value={formik.values.latitude}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.latitude && Boolean(formik.errors.latitude)}
              helperText={formik.touched.latitude && formik.errors.latitude}
              className={commonClasses.formFieldAbsoluteBase}
              disabled={loading}
              FormHelperTextProps={{
                className: commonClasses.formFieldAbsoluteHelper
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='longitude'
              name='longitude'
              label='Longitude'
              variant='outlined'
              required
              value={formik.values.longitude}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.longitude && Boolean(formik.errors.longitude)}
              helperText={formik.touched.longitude && formik.errors.longitude}
              className={commonClasses.formFieldAbsoluteBase}
              disabled={loading}
              FormHelperTextProps={{
                className: commonClasses.formFieldAbsoluteHelper
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='address'
              name='address'
              label='Address'
              variant='outlined'
              required
              autoComplete='street-address'
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              className={commonClasses.formFieldAbsoluteBase}
              disabled={loading}
              FormHelperTextProps={{
                className: commonClasses.formFieldAbsoluteHelper
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='zip'
              name='zip'
              label='Zip code'
              variant='outlined'
              autoComplete='postal_code'
              required
              value={formik.values.zip}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
              className={commonClasses.formFieldAbsoluteBase}
              disabled={loading}
              FormHelperTextProps={{
                className: commonClasses.formFieldAbsoluteHelper
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='city'
              name='city'
              label='City'
              variant='outlined'
              autoComplete='address-level2'
              required
              value={formik.values.city}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              className={commonClasses.formFieldAbsoluteBase}
              disabled={loading}
              FormHelperTextProps={{
                className: commonClasses.formFieldAbsoluteHelper
              }}
            />
          </Grid>
        </Grid>
      </form>
    </ApplicationContainer>
  );
};
