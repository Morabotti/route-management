import { FC } from 'react';
import { ApplicationContainer } from '@components/common';
import { HomeNavigationButton } from '@components/home';
import { Grid } from '@material-ui/core';
import { Routes, Car, AccountMultiple, MapMarkerRadius } from 'mdi-material-ui';
import { useNavigation } from '@hooks';

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

  return (
    <ApplicationContainer title='Route Management'>
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
    </ApplicationContainer>
  );
};

export default HomeView;
