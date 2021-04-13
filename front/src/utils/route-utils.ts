import { matchPath } from 'react-router-dom';
import { routeTree } from '@routes';

export const routePreload = (url: string): void => {
  for (const route of routeTree) {
    const isMatch = matchPath(url, route.path);

    if (!isMatch) {
      continue;
    }

    if (isMatch.isExact) {
      if (route.component) {
        if ('preload' in route.component) {
          route.component.preload();
        }
        return;
      }
    }
  }
};
