import { FC } from 'react';
import { Actions, ApplicationContainer } from '@components/common';
import { Button, Grid } from '@material-ui/core';
import { useUpdateRoute } from '@hooks';

interface Props {
  onBack: () => void;
  routeId: number | null;
}

export const UpdateRoute: FC<Props> = ({
  onBack,
  routeId
}: Props) => {
  const { loading, formik } = useUpdateRoute(routeId);

  return (
    <ApplicationContainer
      title='Update Route'
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
            form='form-update-route'
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
      <form onSubmit={formik.handleSubmit} id='form-update-route'>
        <Grid container spacing={2}>
          <Grid item xs={12} />
        </Grid>
      </form>
    </ApplicationContainer>
  );
};
