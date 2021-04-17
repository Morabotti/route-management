import { FC } from 'react';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { CreatePerson } from '@types';
import { CREATE_PERSON } from '@utils/default-objects';
import { createPersonSchema } from '@utils/validation';
import { useCreatePerson } from '@hooks';

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

export const CreateNewPerson: FC<Props> = ({
  onBack
}: Props) => {
  const classes = useStyles();
  const { loading, onSubmit } = useCreatePerson();

  const formik = useFormik<CreatePerson>({
    initialValues: CREATE_PERSON,
    validationSchema: createPersonSchema,
    onSubmit
  });

  return (
    <ApplicationContainer
      title='Create New Person'
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
            form='form-create-person'
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
      <form onSubmit={formik.handleSubmit} id='form-create-person'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='name'
              name='name'
              label='Person name'
              variant='outlined'
              required
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
