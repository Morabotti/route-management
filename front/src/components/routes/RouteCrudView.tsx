import { FC } from 'react';
import { useCrudView, useNavigation } from '@hooks';
import { CrudState } from '@enums';
import { CenterMessage } from '@components/common';
import { Cancel } from 'mdi-material-ui';

import {
  RouteList,
  ViewRoute,
  CreateNewRoute,
  UpdateRoute
} from '@components/routes';

const RouteCrudView: FC = () => {
  const { onNavigation, onRoutePreload } = useNavigation();
  const { id, view } = useCrudView();

  switch (view) {
    case CrudState.List:
      return (
        <RouteList
          onBack={onNavigation('/rm')}
          onCreate={onNavigation('/rm/routes/create')}
        />
      );
    case CrudState.Create:
      return (
        <CreateNewRoute
          onBack={onNavigation('/rm/routes')}
        />
      );
    case CrudState.Update:
      return (
        <UpdateRoute
          routeId={id}
          onBack={onNavigation(`/rm/routes/view/${id}`)}
        />
      );
    case CrudState.View:
      return (
        <ViewRoute
          routeId={id}
          onBack={onNavigation('/rm/routes')}
        />
      );
    default:
      return (
        <CenterMessage
          icon={Cancel}
          text='Not implemented'
          buttonText='Go back'
          onClick={onNavigation('/rm')}
          onMouseEnter={onRoutePreload('/rm')}
        />
      );
  }
};

export default RouteCrudView;
