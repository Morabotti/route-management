import { FC, useCallback, useEffect } from 'react';
import { useAuth } from '@hooks';
import { Button, makeStyles, Typography as T } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';

const useStyles = makeStyles(theme => ({
  hiddenLoad: {
    position: 'absolute',
    visibility: 'hidden'
  },
  medium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  light: {
    fontWeight: theme.typography.fontWeightLight
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold
  },
  regular: {
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const LoginView: FC = () => {
  const classes = useStyles();
  const { setAuth, auth } = useAuth();
  const { search } = useLocation();
  const { push } = useHistory();

  const onLogin = useCallback(() => {
    setAuth({
      token: '232ad232-sad-sadasd-dsaas',
      user: {
        deletedAt: null,
        id: 1,
        username: 'unknown-user'
      }
    });
  }, [setAuth]);

  useEffect(() => {
    if (auth !== null) {
      if (search !== '') {
        const params = new URLSearchParams(search);
        const redirect = params.get('redirect');
        const queries = params.get('params');

        const path = redirect || '/rm';
        const queryParmas = queries
          ? `?${new URLSearchParams(queries).toString()}`
          : '';

        push(`${path}${queryParmas}`);
      }
      else {
        push('/rm');
      }
    }
  }, [auth, push, search]);

  return (
    <div>
      <Button onClick={onLogin}>Login</Button>
      <div className={classes.hiddenLoad}>
        <T variant='body1' className={classes.regular}>.</T>
        <T variant='body1' className={classes.medium}>.</T>
        <T variant='body1' className={classes.light}>.</T>
        <T variant='body1' className={classes.bold}>.</T>
      </div>
    </div>
  );
};

export default LoginView;
