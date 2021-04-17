import { FC } from 'react';
import { useNavigation, usePersonList } from '@hooks';
import { ApplicationContainer, CenterMessage, CrudListItem, ListPaginationControls } from '@components/common';
import { Button, InputAdornment, List, makeStyles, TextField } from '@material-ui/core';
import { Account, AccountOff, Magnify, Plus } from 'mdi-material-ui';

const useStyles = makeStyles(theme => ({
  padding: {
    padding: theme.spacing(3, 3, 1),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 1.5, 1)
    }
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)'
  },
  fieldWrapper: {
    display: 'flex'
  },
  field: {
    flexGrow: 1
  },
  button: {
    marginLeft: theme.spacing(2),
    borderRadius: 0,
    height: '100%',
    backgroundColor: theme.palette.primary.light,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main
    }
  }

}));

interface Props {
  onBack: () => void;
  onCreate: () => void;
}

export const PersonList: FC<Props> = ({
  onBack,
  onCreate
}: Props) => {
  const classes = useStyles();
  const { persons, search, setSearch, onResetFilters } = usePersonList();
  const { onNavigation } = useNavigation();

  return (
    <ApplicationContainer
      title='Persons'
      onBack={onBack}
      disablePadding
      actions={
        <ListPaginationControls
          length={persons.data?.length || 0}
          loading={persons.isLoading}
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
                  <Magnify className={classes.icon} />
                </InputAdornment>
              )
            }}
          />
          <div>
            <Button
              variant='contained'
              color='primary'
              disableElevation
              className={classes.button}
              onClick={onCreate}
              disabled={persons.isLoading}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <List>
        {persons.isLoading ? [...Array(8)].map((e, i) => (
          <CrudListItem
            key={i}
            primaryText='loading'
            secondaryText='loading'
            icon={Account}
            fetching
          />
        )) : persons.data?.length === 0 ? (
          <CenterMessage
            icon={AccountOff}
            text='No results found.'
            buttonText='Reset filters'
            onClick={onResetFilters}
          />
        ) : persons.data?.result.map(person => {
          const primary = person.primaryLocations[0]?.location;
          return (
            <CrudListItem
              key={person.id}
              primaryText={person.name}
              secondaryText={primary
                ? `${primary?.address}, ${primary?.zip} ${primary?.city}`
                : 'No address set'}
              icon={Account}
              onClick={onNavigation(`/rm/persons/view/${person.id}`)}
            />
          );
        })}
      </List>
    </ApplicationContainer>
  );
};
