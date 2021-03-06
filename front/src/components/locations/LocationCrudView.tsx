import { FC } from 'react';
import { useCrudView, useNavigation } from '@hooks';
import { CrudState } from '@enums';
import { CenterMessage } from '@components/common';
import { Cancel } from 'mdi-material-ui';

import {
  LocationList,
  ViewLocation,
  CreateNewLocation,
  UpdateLocation
} from '@components/locations';

const LocationCrudView: FC = () => {
  const { onNavigation, onRoutePreload } = useNavigation();
  const { id, view } = useCrudView();

  switch (view) {
    case CrudState.List:
      return (
        <LocationList
          onBack={onNavigation('/rm')}
          onCreate={onNavigation('/rm/locations/create')}
        />
      );
    case CrudState.Create:
      return (
        <CreateNewLocation
          onBack={onNavigation('/rm/locations')}
        />
      );
    case CrudState.Update:
      return (
        <UpdateLocation
          locationId={id}
          onBack={onNavigation(`/rm/locations/view/${id}`)}
        />
      );
    case CrudState.View:
      return (
        <ViewLocation
          locationId={id}
          onBack={onNavigation('/rm/locations')}
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

export default LocationCrudView;
