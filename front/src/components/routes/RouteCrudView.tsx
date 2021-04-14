import { FC } from 'react';
import { useCrudView, useNavigation } from '@hooks';
import { CrudState } from '@enums';
import { ApplicationContainer, CenterMessage } from '@components/common';
import { Cancel } from 'mdi-material-ui';

const RouteCrudView: FC = () => {
  const { onNavigation } = useNavigation();
  const { id, view } = useCrudView();

  switch (view) {
    case CrudState.LIST:
      return (
        <ApplicationContainer
          title='Routes'
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
          title='Update Route'
          onBack={onNavigation('/rm/routes')}
        >
          <div>
            Update {id}
          </div>
        </ApplicationContainer>
      );
    case CrudState.VIEW:
      return (
        <ApplicationContainer
          title='View Route'
          onBack={onNavigation('/rm/routes')}
        >
          <div>
            VIEW {id}
          </div>
        </ApplicationContainer>
      );
    default:
      return (
        <ApplicationContainer
          title='Routes'
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

export default RouteCrudView;
