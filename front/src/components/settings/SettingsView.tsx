import { FC } from 'react';
import { useNavigation } from '@hooks';
import { ApplicationContainer } from '@components/common';

const SettingsView: FC = () => {
  const { onNavigation } = useNavigation();

  return (
    <ApplicationContainer
      title='Settings'
      onBack={onNavigation('/rm')}
    >
      <div>
        Settings
      </div>
    </ApplicationContainer>
  );
};

export default SettingsView;
