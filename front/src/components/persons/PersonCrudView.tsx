import { FC } from 'react';
import { useCrudView, useNavigation } from '@hooks';
import { CrudState } from '@enums';
import { CenterMessage } from '@components/common';
import { Cancel } from 'mdi-material-ui';

import {
  PersonList,
  ViewPerson,
  CreateNewPerson,
  UpdatePerson
} from '@components/persons';

const PersonCrudView: FC = () => {
  const { onNavigation, onRoutePreload } = useNavigation();
  const { id, view } = useCrudView();

  switch (view) {
    case CrudState.LIST:
      return (
        <PersonList
          onBack={onNavigation('/rm')}
          onCreate={onNavigation('/rm/persons/create')}
        />
      );
    case CrudState.CREATE:
      return (
        <CreateNewPerson
          onBack={onNavigation('/rm/persons')}
        />
      );
    case CrudState.UPDATE:
      return (
        <UpdatePerson
          personId={id}
          onBack={onNavigation(`/rm/persons/view/${id}`)}
        />
      );
    case CrudState.VIEW:
      return (
        <ViewPerson
          personId={id}
          onBack={onNavigation('/rm/persons')}
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

export default PersonCrudView;
