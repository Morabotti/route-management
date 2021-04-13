import { FC } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0
  },
  wrap: {
    textAlign: 'center',
    userSelect: 'none',
    zIndex: 1000,
    color: theme.palette.primary.main
  },
  icon: {
    marginBottom: theme.spacing(2)
  },
  public: {
    height: '400px'
  }
}));

interface Props {
  manualHeight?: boolean;
}

export const PageSuspense: FC<Props> = ({ manualHeight }: Props) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.public]: manualHeight
      })}
    >
      <div className={classes.wrap}>
        <CircularProgress className={classes.icon} size={65} color='inherit' />
      </div>
    </div>
  );
};
