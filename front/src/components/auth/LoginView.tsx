import { FC, useCallback, useEffect } from 'react';
import { useAuth } from '@hooks';
import { Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';

const LoginView: FC = () => {
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
        // eslint-disable-next-line
        push(search.replace(/^.*?\=/, ''))
      }
      else {
        push('/rm');
      }
    }
  }, [auth, push, search]);

  return (
    <div>
      <Button onClick={onLogin}>Login</Button>
    </div>
  );
};

export default LoginView;
