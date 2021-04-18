import { FC } from 'react';
import { useNavigation, useVehicleList } from '@hooks';
import { Button, InputAdornment, List, makeStyles, TextField } from '@material-ui/core';
import { CarOff, CarSide, Magnify, Plus } from 'mdi-material-ui';
import { useCommonStyles } from '@theme';

import {
  ApplicationContainer,
  CenterMessage,
  CrudListItem,
  ListPaginationControls
} from '@components/common';

const useStyles = makeStyles(theme => ({
  padding: {
    padding: theme.spacing(3, 3, 1),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 1.5, 1)
    }
  },
  fieldWrapper: {
    display: 'flex'
  },
  field: {
    flexGrow: 1
  }
}));

interface Props {
  onBack: () => void;
  onCreate: () => void;
}

export const VehicleList: FC<Props> = ({
  onBack,
  onCreate
}: Props) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const { vehicles, search, setSearch, onResetFilters } = useVehicleList();
  const { onNavigation } = useNavigation();

  return (
    <ApplicationContainer
      title='Vehicles'
      onBack={onBack}
      disablePadding
      actions={
        <ListPaginationControls
          length={vehicles.data?.length || 0}
          loading={vehicles.isLoading}
        />
      }
    >
      <div className={classes.padding}>
        <div className={classes.fieldWrapper}>
          <TextField
            variant='outlined'
            label='Search'
            fullWidth
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={classes.field}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify className={commonClasses.fieldIconColor} />
                </InputAdornment>
              )
            }}
          />
          <div>
            <Button
              variant='contained'
              color='primary'
              disableElevation
              className={commonClasses.fieldActionButton}
              onClick={onCreate}
              disabled={vehicles.isLoading}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <List>
        {vehicles.isLoading ? [...Array(8)].map((e, i) => (
          <CrudListItem
            key={i}
            primaryText='loading'
            icon={CarSide}
            fetching
          />
        )) : vehicles.data?.length === 0 ? (
          <CenterMessage
            icon={CarOff}
            text='No results found.'
            buttonText='Reset filters'
            onClick={onResetFilters}
          />
        ) : vehicles.data?.result.map(vehicle => (
          <CrudListItem
            key={vehicle.id}
            primaryText={vehicle.licenseNumber}
            icon={CarSide}
            onClick={onNavigation(`/rm/vehicles/view/${vehicle.id}`)}
          />
        ))}
      </List>
    </ApplicationContainer>
  );
};
