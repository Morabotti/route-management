import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation, Query } from 'react-query';
import { useHistory } from 'react-router';
import { LocationType, Person } from '@types';
import { getLocations, getPersonById, updatePerson } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication, useDebounce } from '@hooks';
import { useFormik, FormikProps } from 'formik';
import { DEFAULT_PERSON, DEFAULT_PRIMARY_LOCATION } from '@utils/defaultObjects';
import { createPersonSchema } from '@utils/validation';

interface UpdatePersonContext {
  loading: boolean;
  formik: FormikProps<Person>;
  options: LocationType[];
  locationSearch: LocationType | null;
  locationSearchOpen: boolean;
  locationSearchLoading: boolean;
  setLocationSearch: (set: LocationType | null) => void;
  setInputSearch: (set: string) => void;
  onToggleOpen: (set: boolean) => () => void;
  onAddLocation: () => void;
  onDeleteLocation: (set: LocationType | null) => () => void;
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
    [Client.GetPersonById, id],
    () => id === null ? null : getPersonById(id)
  );

  const locations = useQuery(
    [Client.GetLocations, { limit: 20, offset: 0 }, { search: debouncedSearch }],
    () => getLocations({ limit: 20, offset: 0 }, { search: debouncedSearch })
  );

  const { mutateAsync } = useMutation(updatePerson, {
    onSuccess: (data: Person) => {
      queryClient.invalidateQueries(Client.GetPersons);
      queryClient.setQueryData([Client.GetPersonById, data.id], data);
      queryClient.invalidateQueries({
        predicate: (query: Query) => query.queryKey[0] === Client.GetLocationById
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
      createNotification('Successfully updated person', NotificationType.Info);
      setLoading(false);
      push(`/rm/persons/view/${values.id}`);
    }
    catch (e) {
      createNotification('Failed to update person', NotificationType.Error);
      setLoading(false);
    }
  }, [setLoading, createNotification, mutateAsync, push]);

  const onToggleOpen = useCallback((set: boolean) => () => {
    setLocationSearchOpen(set);
  }, []);

  const formik = useFormik<Person>({
    initialValues: person.data || DEFAULT_PERSON,
    validationSchema: createPersonSchema,
    onSubmit
  });

  const onAddLocation = useCallback(() => {
    if (!locationSearch) {
      return;
    }

    formik.setValues(prev => ({
      ...prev,
      primaryLocations: prev.primaryLocations
        .find(i => i.location?.id === locationSearch.id) !== undefined
        ? prev.primaryLocations
        : [...prev.primaryLocations, {
          ...DEFAULT_PRIMARY_LOCATION,
          location: locationSearch
        }]
    }), false);

    setLocationSearch(null);
    setInputSearch('');
  }, [formik, locationSearch, setLocationSearch, setInputSearch]);

  const onDeleteLocation = useCallback((set: LocationType | null) => () => {
    if (set === null) {
      return;
    }

    formik.setValues(prev => ({
      ...prev,
      primaryLocations: prev.primaryLocations.filter(i => i.location?.id !== set.id)
    }), false);
  }, [formik]);

  useEffect(() => {
    if (person.data && person.data.id !== formik.values.id) {
      formik.setValues(person.data, false);
    }
  }, [person.data, formik]);

  return {
    loading,
    options: locations.data?.result || [],
    formik,
    locationSearch,
    locationSearchLoading: locations.isFetching,
    locationSearchOpen,
    setInputSearch,
    setLocationSearch,
    onToggleOpen,
    onAddLocation,
    onDeleteLocation
  };
};
