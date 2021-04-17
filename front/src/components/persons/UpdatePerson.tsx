import { FC, useCallback } from 'react';
import { useFormik } from 'formik';
import { DEFAULT_PERSON, DEFAULT_PRIMARY_LOCATION } from '@utils/default-objects';
import { createPersonSchema } from '@utils/validation';
import { useUpdatePerson } from '@hooks';
import { LocationType, Person } from '@types';
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
  helper: {
    position: 'absolute',
    bottom: -19
  },
  field: {
    marginBottom: theme.spacing(1)
  },
  locations: {
    '& > div:not(:last-child)': {
      marginBottom: theme.spacing(2)
    }
  },
  button: {
    marginLeft: theme.spacing(2),
    borderRadius: 0,
    height: '100%',
    backgroundColor: theme.palette.primary.light,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main
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

  const {
    loading,
    options,
    person,
    locationSearch,
    locationSearchLoading,
    locationSearchOpen,
    setInputSearch,
    setLocationSearch,
    onSubmit,
    onToggleOpen
  } = useUpdatePerson(personId);

  const formik = useFormik<Person>({
    initialValues: person.data || DEFAULT_PERSON,
    validationSchema: createPersonSchema,
    onSubmit
  });

  const onAddLocation = useCallback(() => {
    if (!locationSearch) {
      return;
    }

    formik.setValues(prev => ({
      ...prev,
      primaryLocations: prev.primaryLocations
        .find(i => i.location?.id === locationSearch.id) !== undefined
        ? prev.primaryLocations
        : [...prev.primaryLocations, {
          ...DEFAULT_PRIMARY_LOCATION,
          location: locationSearch
        }]
    }), false);

    setLocationSearch(null);
    setInputSearch('');
  }, [formik, locationSearch, setLocationSearch, setInputSearch]);

  const onDeleteLocation = useCallback((set: LocationType | null) => () => {
    if (set === null) {
      return;
    }

    formik.setValues(prev => ({
      ...prev,
      primaryLocations: prev.primaryLocations.filter(i => i.location?.id !== set.id)
    }), false);
  }, [formik]);

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
                  className={classes.button}
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
