import { FC } from 'react';
import { colors, Divider, makeStyles } from '@material-ui/core';
import { NavigationLinkBox, NavigationButtonBox } from '@components/common';
import { customVariables } from '@theme';
import { matchPath, useLocation } from 'react-router';

import {
  Routes,
  Car,
  AccountMultiple,
  MapMarkerRadius,
  Home,
  Cog,
  LogoutVariant,
  ChevronRight
} from 'mdi-material-ui';

const useStyles = makeStyles(theme => ({
  navigation: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: colors.grey[100],
    width: customVariables.navigationSize + 1,
    minWidth: customVariables.navigationSize + 1
  },
  link: {
    textDecoration: 'none',
    height: '100px',
    width: '100%'
  },
  linkContent: {
    width: '100%',
    height: '100%'
  },
  grow: {
    flexGrow: 1
  },
  flipped: {
    transform: 'rotate(-180deg)'
  }
}));

const routes = [{
  icon: Home,
  text: 'Home',
  path: '/rm',
  exact: true
}, {
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

interface Props {
  expanded: boolean;
  onToggleExpand: () => void;
  onNavigation: (set: string) => (e?: React.MouseEvent<Element, MouseEvent> | undefined) => void;
  onRoutePreload: (set: string) => () => void;
}

export const ApplicationNavigation: FC<Props> = ({
  expanded,
  onToggleExpand,
  onNavigation,
  onRoutePreload
}: Props) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <nav className={classes.navigation}>
      {routes.map(route => (
        <NavigationLinkBox
          key={route.path}
          to={route.path}
          icon={route.icon}
          title={route.text}
          onClick={onNavigation(route.path)}
          onMouseEnter={onRoutePreload(route.path)}
          active={route.exact
            ? pathname === route.path
            : !!matchPath(pathname, route.path)
          }
          divider
        />
      ))}
      <div className={classes.grow} />
      <Divider />
      <NavigationButtonBox
        icon={Cog}
        onClick={() => console.log('settings')}
        title='Settings'
        divider
      />
      <NavigationButtonBox
        icon={LogoutVariant}
        onClick={() => console.log('logout')}
        title='Logout'
        divider
      />
      <NavigationButtonBox
        icon={ChevronRight}
        iconClassNames={!expanded ? classes.flipped : undefined}
        title={!expanded ? 'Expand' : 'Minimize'}
        onClick={onToggleExpand}
      />
    </nav>
  );
};
