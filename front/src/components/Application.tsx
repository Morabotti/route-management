import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { AuthLayer } from '@components/auth';
import { publicRoutes, authRoutes } from '@routes';
import { ApplicationProvider, MapProvider } from '@hooks';

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
              <MapProvider>
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
              </MapProvider>
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
  </ApplicationProviders>
);

export default hot(module)(Application);
