import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import {
  ApplicationProviders,
  PrimaryLoader
} from '@components/common';

const Application = () => (
  <ApplicationProviders>
    <BrowserRouter>
      <Suspense fallback={<PrimaryLoader />}>
        <Switch>
          <Route path='/'>
            <div>
              Route Management
            </div>
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  </ApplicationProviders>
);

export default hot(module)(Application);
