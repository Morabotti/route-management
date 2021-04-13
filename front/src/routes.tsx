import lazy from 'react-lazy-with-preload';
import { Route } from '@types';
import { RouteAuthType } from '@enums';

const DummyView = lazy(() => import('@components/common/DummyView'));
const LoginView = lazy(() => import('@components/auth/LoginView'));

export const routeTree: Route[] = [{
  type: RouteAuthType.AUTH,
  component: DummyView,
  path: '/rm'
}, {
  type: RouteAuthType.AUTH,
  component: DummyView,
  path: '/rm/menu'
}, {
  type: RouteAuthType.PUBLIC,
  component: LoginView,
  path: '/login'
}];

export const publicRoutes = routeTree.filter(i => i.type === RouteAuthType.PUBLIC);
export const authRoutes = routeTree.filter(i => i.type === RouteAuthType.AUTH);
