import { FC } from 'react';
import { useNavigation, useLocationList } from '@hooks';
import { Button, InputAdornment, List, makeStyles, TextField } from '@material-ui/core';
import { Magnify, MapMarkerOff, MapMarkerRadius, Plus } from 'mdi-material-ui';
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

export const LocationList: FC<Props> = ({
  onBack,
  onCreate
}: Props) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const { locations, search, setSearch, onResetFilters } = useLocationList();
  const { onNavigation } = useNavigation();

  return (
    <ApplicationContainer
      title='Locations'
      onBack={onBack}
      disablePadding
      actions={
        <ListPaginationControls
          length={locations.data?.length || 0}
          loading={locations.isLoading}
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
              disabled={locations.isLoading}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <List>
        {locations.isLoading ? [...Array(10)].map((e, i) => (
          <CrudListItem
            key={i}
            primaryText='loading'
            secondaryText='loading'
            icon={MapMarkerRadius}
            fetching
          />
        )) : locations.data?.length === 0 ? (
          <CenterMessage
            icon={MapMarkerOff}
            text='No results found.'
            buttonText='Reset filters'
            onClick={onResetFilters}
          />
        ) : locations.data?.result.map(location => (
          <CrudListItem
            key={location.id}
            primaryText={location.address}
            secondaryText={`${location.zip} ${location.city}`}
            icon={MapMarkerRadius}
            onClick={onNavigation(`/rm/locations/view/${location.id}`)}
          />
        ))}
      </List>
    </ApplicationContainer>
  );
};
