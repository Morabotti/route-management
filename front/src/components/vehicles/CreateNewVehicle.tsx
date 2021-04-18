import { FC } from 'react';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid, TextField } from '@material-ui/core';
import { useCreateVehicle } from '@hooks';
import { useCommonStyles } from '@theme';

interface Props {
  onBack: () => void;
}

export const CreateNewVehicle: FC<Props> = ({
  onBack
}: Props) => {
  const commonClasses = useCommonStyles();
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
