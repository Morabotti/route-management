import { FC, Fragment } from 'react';
import { LocationType } from '@types';
import { Cancel } from 'mdi-material-ui';

import {
  colors,
  IconButton,
  makeStyles,
  Paper,
  Typography as T
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1, 2),
    width: '100%',
    display: 'flex',
    backgroundColor: colors.grey[100]
  },
  info: {
    flexGrow: 1
  },
  delete: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

interface Props {
  location: LocationType | null;
  onDelete: () => void;
}

export const FormLocationBlock: FC<Props> = ({
  location,
  onDelete
}: Props) => {
  const classes = useStyles();

  if (location === null) {
    return (
      <Fragment />
    );
  }

  return (
    <Paper
      square
      variant='outlined'
      className={classes.paper}
    >
      <div className={classes.info}>
        <T variant='body1' gutterBottom color='textPrimary'>{location.address}</T>
        <T variant='body2' color='textSecondary'>{location.zip} {location.city}</T>
      </div>
      <div className={classes.delete}>
        <IconButton onClick={onDelete}>
          <Cancel />
        </IconButton>
      </div>
    </Paper>
  );
};
