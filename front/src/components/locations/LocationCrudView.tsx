import { FC } from 'react';
import { useCrudView, useNavigation } from '@hooks';
import { CrudState } from '@enums';
import { ApplicationContainer, CenterMessage } from '@components/common';
import { Cancel } from 'mdi-material-ui';

const LocationCrudView: FC = () => {
  const { onNavigation } = useNavigation();
  const { id, view } = useCrudView();

  switch (view) {
    case CrudState.LIST:
      return (
        <ApplicationContainer
          title='Locations'
          onBack={onNavigation('/rm')}
        >
          <div>
            List
          </div>
        </ApplicationContainer>
      );
    case CrudState.UPDATE:
      return (
        <ApplicationContainer
          title='Update Location'
          onBack={onNavigation('/rm/locations')}
        >
          <div>
            Update {id}
          </div>
        </ApplicationContainer>
      );
    case CrudState.VIEW:
      return (
        <ApplicationContainer
          title='View Location'
          onBack={onNavigation('/rm/locations')}
        >
          <div>
            VIEW {id}
          </div>
        </ApplicationContainer>
      );
    default:
      return (
        <ApplicationContainer
          title='Locations'
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

export default LocationCrudView;
