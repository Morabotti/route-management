import { FC, useState } from 'react';
import { ApplicationContainer, CenterMessage } from '@components/common';
import { HomeNavigationButton } from '@components/home';
import { Grid } from '@material-ui/core';
import { useNavigation } from '@hooks';

import {
  Routes,
  Car,
  AccountMultiple,
  MapMarkerRadius,
  PostOutline
} from 'mdi-material-ui';

const routes = [{
  icon: Routes,
  text: 'Routes',
  path: '/rm/routes'
}, {
  icon: Car,
  text: 'Vehicles',
  path: '/rm/vehicles'
}, {
  icon: AccountMultiple,
  text: 'Persons',
  path: '/rm/persons'
}, {
  icon: MapMarkerRadius,
  text: 'Locations',
  path: '/rm/locations'
}];

const HomeView: FC = () => {
  const { onNavigation, onRoutePreload } = useNavigation();
  const [legacy, setLegacy] = useState(false);

  return (
    <ApplicationContainer title='Route Management'>
      {legacy ? (
        <Grid container spacing={3}>
          {routes.map(route => (
            <Grid item xs={6} key={route.path}>
              <HomeNavigationButton
                icon={route.icon}
                text={route.text}
                onClick={onNavigation(route.path)}
                onMouseEnter={onRoutePreload(route.path)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CenterMessage
          icon={PostOutline}
          text='New home page not implemented'
          buttonText='Show legacy'
          onClick={() => setLegacy(true)}
        />
      )}
    </ApplicationContainer>
  );
};

export default HomeView;
