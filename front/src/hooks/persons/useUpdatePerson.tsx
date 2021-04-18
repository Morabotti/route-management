import { useCallback, useState } from 'react';
import { UseQueryResult, useQuery, useQueryClient, useMutation, Query } from 'react-query';
import { useHistory } from 'react-router';
import { LocationType, Person } from '@types';
import { getLocations, getPersonById, updatePerson } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';
import { useDebounce } from '@hooks/common/useDebounce';

interface UpdatePersonContext {
  loading: boolean;
  person: UseQueryResult<Person | null>;
  options: LocationType[];
  locationSearch: LocationType | null;
  locationSearchOpen: boolean;
  locationSearchLoading: boolean;
  onSubmit: (values: Person) => void;
  onToggleOpen: (set: boolean) => () => void;
  setLocationSearch: (set: LocationType | null) => void;
  setInputSearch: (set: string) => void;
}

export const useUpdatePerson = (id: number | null): UpdatePersonContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const [ inputSearch, setInputSearch ] = useState('');
  const [ locationSearchOpen, setLocationSearchOpen ] = useState(false);
  const [ locationSearch, setLocationSearch ] = useState<LocationType | null>(null);

  const debouncedSearch = useDebounce(inputSearch, 500);

  const person = useQuery(
    [Client.GET_PERSON_BY_ID, id],
    () => id === null ? null : getPersonById(id)
  );

  const locations = useQuery(
    [Client.GET_LOCATIONS, { limit: 20, offset: 0 }, { search: debouncedSearch }],
    () => getLocations({ limit: 20, offset: 0 }, { search: debouncedSearch })
  );

  const { mutateAsync } = useMutation(updatePerson, {
    onSuccess: (data: Person) => {
      queryClient.invalidateQueries(Client.GET_PERSONS);
      queryClient.setQueryData([Client.GET_PERSON_BY_ID, data.id], data);
      queryClient.invalidateQueries({
        predicate: (query: Query) => query.queryKey[0] === Client.GET_LOCATION_BY_ID
          && data.primaryLocations.map(i => i.location?.id)
            .filter(i => i !== undefined && i !== null)
            .includes(query.queryKey[1] as number)
      });
    }
  });

  const onSubmit = useCallback(async (values: Person) => {
    setLoading(true);
    try {
      await mutateAsync(values);
      createNotification('Successfully updated person', NotificationType.INFO);
      setLoading(false);
      push(`/rm/persons/view/${values.id}`);
    }
    catch (e) {
      createNotification('Failed to update person', NotificationType.ERROR);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  const onToggleOpen = useCallback((set: boolean) => () => {
    setLocationSearchOpen(set);
  }, []);

  return {
    loading,
    person,
    options: locations.data?.result || [],
    locationSearch,
    locationSearchLoading: locations.isFetching,
    locationSearchOpen,
    onSubmit,
    onToggleOpen,
    setInputSearch,
    setLocationSearch
  };
};
