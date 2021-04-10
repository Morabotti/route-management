import { FC } from 'react';
import { SnackbarProvider } from 'notistack';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => createStyles({
  root: {
    marginTop: theme.spacing(8),
    zIndex: 2500
  }
}));

interface Props {
  children: React.ReactNode
}

export const SnackbarContainer: FC<Props> = ({
  children
}: Props) => {
  const classes = useStyles();

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      autoHideDuration={5000}
      classes={{ containerRoot: classes.root }}
    >
      {children}
    </SnackbarProvider>
  );
};
