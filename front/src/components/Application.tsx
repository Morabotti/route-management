import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { AuthLayer } from '@components/auth';
import { publicRoutes, authRoutes } from '@routes';
import { ApplicationProvider } from '@hooks';
// import { ReactQueryDevtools } from 'react-query/devtools';

import {
  ApplicationProviders,
  PrimaryLoader,
  PageSuspense
} from '@components/common';

const ApplicationLayout = lazy(() => import('@components/common/ApplicationLayout'));

const Application = () => (
  <ApplicationProviders>
    <Suspense fallback={<PrimaryLoader />}>
      <Switch>
        <Route path='/rm'>
          <AuthLayer>
            <ApplicationProvider>
              <ApplicationLayout>
                <Switch>
                  <Suspense fallback={<PageSuspense />}>
                    {authRoutes.map(({ path, component: Component }) => (
                      <Route exact key={path} path={path}>
                        <Component />
                      </Route>
                    ))}
                  </Suspense>
                </Switch>
              </ApplicationLayout>
            </ApplicationProvider>
          </AuthLayer>
        </Route>
        <Redirect from='/' to='/login' exact />
        <Route path='/'>
          <Suspense fallback={<PageSuspense manualHeight />}>
            {publicRoutes.map(({ component: Component, path }) => (
              <Route key={path} exact path={path}>
                <Component />
              </Route>
            ))}
          </Suspense>
        </Route>
      </Switch>
    </Suspense>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </ApplicationProviders>
);

export default hot(module)(Application);
