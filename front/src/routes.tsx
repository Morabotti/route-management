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
  type: RouteAuthType.Auth,
  component: HomeView,
  path: '/rm'
}, {
  type: RouteAuthType.Auth,
  component: VehicleCrudView,
  path: '/rm/vehicles/:view?/:id?'
}, {
  type: RouteAuthType.Auth,
  component: RouteCrudView,
  path: '/rm/routes/:view?/:id?'
}, {
  type: RouteAuthType.Auth,
  component: PersonCrudView,
  path: '/rm/persons/:view?/:id?'
}, {
  type: RouteAuthType.Auth,
  component: LocationCrudView,
  path: '/rm/locations/:view?/:id?'
}, {
  type: RouteAuthType.Public,
  component: LoginView,
  path: '/login'
}];

export const publicRoutes = routeTree.filter(i => i.type === RouteAuthType.Public);
export const authRoutes = routeTree.filter(i => i.type === RouteAuthType.Auth);
