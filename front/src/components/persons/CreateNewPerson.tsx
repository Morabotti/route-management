import { FC } from 'react';
import { LocationType } from '@types';
import { useCreatePerson } from '@hooks';
import { useCommonStyles } from '@theme';
import { Plus } from 'mdi-material-ui';
import { FormikTextField } from '@components/forms';
import { Button, Grid, makeStyles } from '@material-ui/core';

import {
  Actions,
  ApplicationContainer,
  AsyncAutoCompleteTextField,
  FormLocationBlock
} from '@components/common';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex'
  },
  locations: {
    '& > div:not(:last-child)': {
      marginBottom: theme.spacing(2)
    }
  }
}));

interface Props {
  onBack: () => void;
}

export const CreateNewPerson: FC<Props> = ({
  onBack
}: Props) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const {
    loading,
    formik,
    locationSearch,
    options,
    locationSearchOpen,
    locationSearchLoading,
    setLocationSearch,
    setInputSearch,
    onAddLocation,
    onDeleteLocation,
    onToggleOpen
  } = useCreatePerson();

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormikTextField
              formik={formik}
              formikName='name'
              label='Person name'
              variant='outlined'
              required
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.wrapper}>
              <AsyncAutoCompleteTextField<LocationType>
                options={options}
                label='Add primary locations'
                value={locationSearch}
                open={locationSearchOpen}
                loading={locationSearchLoading}
                onToggleOpen={onToggleOpen}
                onSave={onAddLocation}
                setValue={setLocationSearch}
                setInputValue={setInputSearch}
                getOptionLabel={location => `${location.address}, ${location.city}`}
                getOptionSelected={(location, value) => location.id === value.id}
              />
              <div>
                <Button
                  variant='contained'
                  color='primary'
                  disableElevation
                  className={commonClasses.fieldActionButton}
                  onClick={onAddLocation}
                  disabled={locationSearchLoading}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.locations}>
            {formik.values.primaryLocations.map(location => (
              <FormLocationBlock
                key={location.id}
                location={location}
                onDelete={onDeleteLocation(location)}
              />
            ))}
          </Grid>
        </Grid>
      </form>
    </ApplicationContainer>
  );
};
