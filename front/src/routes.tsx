import lazy from 'react-lazy-with-preload';
import { Route } from '@types';
import { RouteAuthType } from '@enums';

const VehicleCrudView = lazy(() => import('@components/vehicles/VehicleCrudView'));
const RouteCrudView = lazy(() => import('@components/routes/RouteCrudView'));
const PersonCrudView = lazy(() => import('@components/persons/PersonCrudView'));
const LocationCrudView = lazy(() => import('@components/locations/LocationCrudView'));
const HomeView = lazy(() => import('@components/home/HomeView'));
const LoginView = lazy(() => import('@components/auth/LoginView'));

export const routeTree: Route[] = [{
  type: RouteAuthType.AUTH,
  component: HomeView,
  path: '/rm'
}, {
  type: RouteAuthType.AUTH,
  component: VehicleCrudView,
  path: '/rm/vehicles/:view?/:id?'
}, {
  type: RouteAuthType.AUTH,
  component: RouteCrudView,
  path: '/rm/routes/:view?/:id?'
}, {
  type: RouteAuthType.AUTH,
  component: PersonCrudView,
  path: '/rm/persons/:view?/:id?'
}, {
  type: RouteAuthType.AUTH,
  component: LocationCrudView,
  path: '/rm/locations/:view?/:id?'
}, {
  type: RouteAuthType.PUBLIC,
  component: LoginView,
  path: '/login'
}];

export const publicRoutes = routeTree.filter(i => i.type === RouteAuthType.PUBLIC);
export const authRoutes = routeTree.filter(i => i.type === RouteAuthType.AUTH);
