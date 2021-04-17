import { FC } from 'react';
import { useFormik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { Person } from '@types';
import { DEFAULT_PERSON } from '@utils/default-objects';
import { createPersonSchema } from '@utils/validation';
import { useApplication } from '@hooks';
import { getPersonById, updatePerson } from '@client';
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
  personId: number | null;
}

export const UpdatePerson: FC<Props> = ({
  onBack,
  personId
}: Props) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { loading, setLoading, createNotification } = useApplication();

  const person = useQuery(
    [Client.GET_PERSON_BY_ID, personId],
    () => personId === null ? null : getPersonById(personId)
  );

  const { mutateAsync } = useMutation(updatePerson, {
    onSuccess: (data: Person) => {
      queryClient.invalidateQueries(Client.GET_PERSONS);
      queryClient.setQueryData([Client.GET_PERSON_BY_ID, data.id], data);
    }
  });

  const formik = useFormik<Person>({
    initialValues: person.data || DEFAULT_PERSON,
    validationSchema: createPersonSchema,
    onSubmit: async (values: Person) => {
      setLoading(true);
      try {
        await mutateAsync(values);
        createNotification('Successfully updated person', NotificationType.INFO);
        setLoading(false);
        onBack();
      }
      catch (e) {
        createNotification('Failed to update person', NotificationType.ERROR);
        setLoading(false);
      }
    }
  });

  return (
    <ApplicationContainer
      title='Update Person'
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
