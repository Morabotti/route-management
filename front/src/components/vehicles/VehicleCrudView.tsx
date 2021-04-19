import { FC } from 'react';
import { useCrudView, useNavigation } from '@hooks';
import { CrudState } from '@enums';
import { CenterMessage } from '@components/common';
import { Cancel } from 'mdi-material-ui';

import {
  VehicleList,
  ViewVehicle,
  CreateNewVehicle,
  UpdateVehicle
} from '@components/vehicles';

const VehicleCrudView: FC = () => {
  const { onNavigation, onRoutePreload } = useNavigation();
  const { id, view } = useCrudView();

  switch (view) {
    case CrudState.List:
      return (
        <VehicleList
          onBack={onNavigation('/rm')}
          onCreate={onNavigation('/rm/vehicles/create')}
        />
      );
    case CrudState.Create:
      return (
        <CreateNewVehicle
          onBack={onNavigation('/rm/vehicles')}
        />
      );
    case CrudState.Update:
      return (
        <UpdateVehicle
          vehicleId={id}
          onBack={onNavigation(`/rm/vehicles/view/${id}`)}
        />
      );
    case CrudState.View:
      return (
        <ViewVehicle
          vehicleId={id}
          onBack={onNavigation('/rm/vehicles')}
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

export default VehicleCrudView;
