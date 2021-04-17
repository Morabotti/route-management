import { useCallback, useState } from 'react';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { CreatePerson, LocationType, Person } from '@types';
import { createPerson, getLocations } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication, useDebounce } from '@hooks';

interface CreatePersonContext {
  loading: boolean;
  locationSearch: LocationType | null;
  options: LocationType[];
  locationSearchOpen: boolean;
  locationSearchLoading: boolean;
  onSubmit: (values: CreatePerson) => void;
  onToggleOpen: (set: boolean) => () => void;
  setLocationSearch: (set: LocationType | null) => void;
  setInputSearch: (set: string) => void;
}

export const useCreatePerson = (): CreatePersonContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const [ inputSearch, setInputSearch ] = useState('');
  const [ locationSearchOpen, setLocationSearchOpen ] = useState(false);
  const [ locationSearch, setLocationSearch ] = useState<LocationType | null>(null);

  const debouncedSearch = useDebounce(inputSearch, 500);

  const locations = useQuery(
    [Client.GET_LOCATIONS, { limit: 20, offset: 0 }, { search: debouncedSearch }],
    () => getLocations({ limit: 20, offset: 0 }, { search: debouncedSearch })
  );

  const { mutateAsync } = useMutation(createPerson, {
    onSuccess: (data: Person) => {
      queryClient.invalidateQueries(Client.GET_PERSONS);
      queryClient.setQueryData([Client.GET_PERSON_BY_ID, data.id], data);
    }
  });

  const onSubmit = useCallback(async (values: CreatePerson) => {
    setLoading(true);
    try {
      const person = await mutateAsync(values);
      createNotification('Successfully created new person', NotificationType.INFO);
      setLoading(false);
      push(`/rm/persons/view/${person.id}`);
    }
    catch (e) {
      createNotification('Failed to created new person', NotificationType.ERROR);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  const onToggleOpen = useCallback((set: boolean) => () => {
    setLocationSearchOpen(set);
  }, []);

  return {
    loading,
    options: locations.data?.result || [],
    locationSearch,
    locationSearchOpen,
    locationSearchLoading: locations.isFetching,
    setLocationSearch: setLocationSearch,
    setInputSearch,
    onSubmit,
    onToggleOpen
  };
};
