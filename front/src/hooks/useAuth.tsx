import { useState, createContext, ReactNode, useContext, useCallback } from 'react';
import { LocalStorageKey } from '@enums';
import { AuthUser } from '@types';
import { useHistory } from 'react-router';

interface AuthContext {
  loading: boolean;
  auth: null | AuthUser;
  setAuth: (user: AuthUser) => void;
  revokeAuth: (queries?: string) => void;
  stopLoading: () => void;
}

interface Props {
  children: ReactNode;
}

export const __AuthContext = createContext<AuthContext>({
  loading: true,
  auth: null,
  setAuth: () => {},
  revokeAuth: () => {},
  stopLoading: () => {}
});

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [ auth, setStateAuth ] = useState<null | AuthUser>(null);
  const { push } = useHistory();

  const setAuth = useCallback((user: AuthUser) => {
    localStorage.setItem(LocalStorageKey.Token, user.token);
    setStateAuth(user);
    setLoading(false);
  }, [setStateAuth, setLoading]);

  const revokeAuth = useCallback((queries?: string) => {
    localStorage.removeItem(LocalStorageKey.Token);
    setStateAuth(null);
    push(queries ? `/login?${queries}` : '/login');
    setLoading(false);
  }, [setStateAuth, push, setLoading]);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <__AuthContext.Provider
      value={{
        loading,
        auth,
        setAuth,
        revokeAuth,
        stopLoading
      }}
    >
      {children}
    </__AuthContext.Provider>
  );
};

export const useAuth = (): AuthContext => useContext(__AuthContext);
