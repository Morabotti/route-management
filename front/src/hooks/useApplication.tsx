import React, {
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useState
} from 'react';

import { useSnackbar } from 'notistack';
import { NotificationType } from '@enums';

interface ApplicationContext {
  loading: boolean;
  setLoading: (set: boolean) => void;
  createNotification: (message: string, type?: NotificationType) => void;
}

interface Props {
  children: ReactNode;
}

export const __ApplicationContext = createContext<ApplicationContext>({
  loading: false,
  createNotification: () => {},
  setLoading: () => {}
});

export const ApplicationProvider = ({ children }: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const createNotification = useCallback((message: string, type?: NotificationType) => {
    enqueueSnackbar(message, { variant: type || 'default' });
  }, [enqueueSnackbar]);

  return (
    <__ApplicationContext.Provider
      value={{
        createNotification,
        loading,
        setLoading
      }}
    >
      {children}
    </__ApplicationContext.Provider>
  );
};

export const useApplication = (): ApplicationContext => useContext(__ApplicationContext);
