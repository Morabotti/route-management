import { memo } from 'react';
import { Typography as T } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { PrimaryLoader } from '@components/common';
import { useAuthLayer } from '@hooks';

interface Props {
  children: JSX.Element;
}

export const AuthLayer = memo(({ children }: Props) => {
  const { loading, auth, pathname } = useAuthLayer();

  if (loading && auth === null) {
    return (
      <PrimaryLoader text='Loading...' />
    );
  }

  if (!loading && auth === null) {
    return (
      <Redirect
        to={`/login${pathname !== '/rm' ? `?redirect=${pathname}` : ''}`}
      />
    );
  }

  if (auth === null) {
    return (
      <T variant='body1'>Error</T>
    );
  }

  return (
    <>
      {children}
    </>
  );
});
