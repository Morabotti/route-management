import { FC } from 'react';
import { useCrudView, useNavigation } from '@hooks';
import { CrudState } from '@enums';
import { ApplicationContainer, CenterMessage } from '@components/common';
import { VehicleList } from '@components/vehicles';
import { Cancel } from 'mdi-material-ui';
import { CreateNewVehicle } from './CreateNewVehicle';

const VehicleCrudView: FC = () => {
  const { onNavigation } = useNavigation();
  const { id, view } = useCrudView();

  switch (view) {
    case CrudState.LIST:
      return (
        <VehicleList
          onBack={onNavigation('/rm')}
          onCreate={onNavigation('/rm/vehicles/create')}
        />
      );
    case CrudState.CREATE:
      return (
        <CreateNewVehicle
          onBack={onNavigation('/rm/vehicles')}
        />
      );
    case CrudState.UPDATE:
      return (
        <ApplicationContainer
          title='Update Vehicle'
          onBack={onNavigation('/rm/vehicles')}
        >
          <div>
            Update {id}
          </div>
        </ApplicationContainer>
      );
    case CrudState.VIEW:
      return (
        <ApplicationContainer
          title='View Vehicle'
          onBack={onNavigation('/rm/vehicles')}
        >
          <div>
            VIEW {id}
          </div>
        </ApplicationContainer>
      );
    default:
      return (
        <ApplicationContainer
          title='Vehicles'
          onBack={onNavigation('/rm')}
        >
          <CenterMessage
            icon={Cancel}
            text='Not implemented'
          />
        </ApplicationContainer>
      );
  }
};

export default VehicleCrudView;
