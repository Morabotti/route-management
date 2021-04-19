import { FC } from 'react';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid } from '@material-ui/core';
import { useCreateRoute } from '@hooks';

interface Props {
  onBack: () => void;
}

export const CreateNewRoute: FC<Props> = ({
  onBack
}: Props) => {
  const { loading, formik } = useCreateRoute();

  return (
    <ApplicationContainer
      title='Create New Route'
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
            form='form-create-route'
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
      <form onSubmit={formik.handleSubmit} id='form-create-route'>
        <Grid container spacing={2}>
          <Grid item xs={12} />
        </Grid>
      </form>
    </ApplicationContainer>
  );
};
