import { FC } from 'react';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { CreateVehicle } from '@types';
import { CREATE_VEHICLE } from '@utils/default-objects';
import { createVehicleSchema } from '@utils/validation';
import { useCreateVehicle } from '@hooks';

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
}

export const CreateNewVehicle: FC<Props> = ({
  onBack
}: Props) => {
  const classes = useStyles();
  const { loading, onSubmit } = useCreateVehicle();

  const formik = useFormik<CreateVehicle>({
    initialValues: CREATE_VEHICLE,
    validationSchema: createVehicleSchema,
    onSubmit
  });

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
