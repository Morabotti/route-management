import { FC } from 'react';
import { useUpdatePerson } from '@hooks';
import { LocationType } from '@types';
import { useCommonStyles } from '@theme';
import { Plus } from 'mdi-material-ui';

import {
  Actions,
  ApplicationContainer,
  AsyncAutoCompleteTextField,
  FormLocationBlock
} from '@components/common';

import {
  Button,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  locations: {
    '& > div:not(:last-child)': {
      marginBottom: theme.spacing(2)
    }
  },
  wrapper: {
    display: 'flex'
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
  const commonClasses = useCommonStyles();

  const {
    loading,
    options,
    formik,
    locationSearch,
    locationSearchLoading,
    locationSearchOpen,
    setInputSearch,
    setLocationSearch,
    onToggleOpen,
    onAddLocation,
    onDeleteLocation
  } = useUpdatePerson(personId);

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
            form='form-update-person'
            color='primary'
            type='submit'
            disableElevation
            variant='contained'
            disabled={loading}
          >
            Save
          </Button>
        </Actions>
      }
    >
      <form onSubmit={formik.handleSubmit} id='form-update-person'>
        <Grid container spacing={2}>
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
              className={commonClasses.formFieldAbsoluteBase}
              disabled={loading}
              FormHelperTextProps={{
                className: commonClasses.formFieldAbsoluteHelper
              }}
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
            {formik.values.primaryLocations.map((primary, index) => (
              <FormLocationBlock
                key={index}
                location={primary.location}
                onDelete={onDeleteLocation(primary?.location)}
              />
            ))}
          </Grid>
        </Grid>
      </form>
    </ApplicationContainer>
  );
};
