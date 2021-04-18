import { FC, useCallback } from 'react';
import { useFormik } from 'formik';
import { CreatePerson, LocationType } from '@types';
import { CREATE_PERSON } from '@utils/default-objects';
import { createPersonSchema } from '@utils/validation';
import { useCreatePerson } from '@hooks';
import { Plus } from 'mdi-material-ui';
import { useCommonStyles } from '@theme';

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
    locationSearch,
    options,
    locationSearchOpen,
    locationSearchLoading,
    setLocationSearch,
    setInputSearch,
    onSubmit,
    onToggleOpen
  } = useCreatePerson();

  const formik = useFormik<CreatePerson>({
    initialValues: CREATE_PERSON,
    validationSchema: createPersonSchema,
    onSubmit
  });

  const onAddLocation = useCallback(() => {
    if (!locationSearch) {
      return;
    }

    formik.setValues(prev => ({
      ...prev,
      primaryLocations: prev.primaryLocations.includes(locationSearch)
        ? prev.primaryLocations
        : [...prev.primaryLocations, locationSearch]
    }), false);

    setLocationSearch(null);
    setInputSearch('');
  }, [formik, locationSearch, setLocationSearch, setInputSearch]);

  const onDeleteLocation = useCallback((set: LocationType) => () => {
    formik.setValues(prev => ({
      ...prev,
      primaryLocations: prev.primaryLocations.filter(i => i.id !== set.id)
    }), false);
  }, [formik]);

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
