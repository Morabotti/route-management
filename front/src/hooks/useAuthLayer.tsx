import { useEffect, useCallback, useMemo } from 'react';
import { AuthUser } from '@types';
import { useAuth } from '@hooks';
import { useLocation } from 'react-router-dom';
import { LocalStorageKey, QueryParams } from '@enums';
import { checkSession } from '@client';

interface AuthContext {
  loading: boolean;
  auth: null | AuthUser;
  queries: string;
}

export const useAuthLayer = (): AuthContext => {
  const { loading, auth, stopLoading, setAuth, revokeAuth } = useAuth();
  const { pathname, search } = useLocation();

  const queries = useMemo(() => {
    const params = new URLSearchParams(search).toString();
    const newParams = new URLSearchParams();

    if (pathname !== '/rm') {
      newParams.set(QueryParams.Redirect, pathname);
    }

    if (params !== '') {
      newParams.set(QueryParams.Params, params);
    }

    return newParams.toString();
  }, [search, pathname]);

  const getStatus = useCallback(async () => {
    const token = localStorage.getItem(LocalStorageKey.Token);
    if (auth === null && loading) {
      if (token) {
        try {
          const client = await checkSession(token);
          setAuth(client);
        }
        catch (e) {
          revokeAuth(queries);
        }
      }
      else {
        stopLoading();
      }
    }
  }, [loading, auth, stopLoading, revokeAuth, setAuth, queries]);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return {
    loading,
    auth,
    queries
  };
};
