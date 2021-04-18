import { useCallback, useState } from 'react';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { CreatePerson, LocationType, Person } from '@types';
import { createPerson, getLocations } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication, useDebounce } from '@hooks';
import { FormikProps, useFormik } from 'formik';
import { CREATE_PERSON } from '@utils/default-objects';
import { createPersonSchema } from '@utils/validation';

interface CreatePersonContext {
  loading: boolean;
  formik: FormikProps<CreatePerson>;
  locationSearch: LocationType | null;
  options: LocationType[];
  locationSearchOpen: boolean;
  locationSearchLoading: boolean;
  setLocationSearch: (set: LocationType | null) => void;
  setInputSearch: (set: string) => void;
  onToggleOpen: (set: boolean) => () => void;
  onAddLocation: () => void;
  onDeleteLocation: (set: LocationType) => () => void;
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

  const formik = useFormik<CreatePerson>({
    initialValues: CREATE_PERSON,
    validationSchema: createPersonSchema,
    onSubmit
  });

  const onAddLocation = useCallback(() => {
    if (!locationSearch) {
      return;
    }

    formik.setValues(prev => ({
      ...prev,
      primaryLocations: prev.primaryLocations.includes(locationSearch)
        ? prev.primaryLocations
        : [...prev.primaryLocations, locationSearch]
    }), false);

    setLocationSearch(null);
    setInputSearch('');
  }, [formik, locationSearch, setLocationSearch, setInputSearch]);

  const onDeleteLocation = useCallback((set: LocationType) => () => {
    formik.setValues(prev => ({
      ...prev,
      primaryLocations: prev.primaryLocations.filter(i => i.id !== set.id)
    }), false);
  }, [formik]);

  return {
    loading,
    options: locations.data?.result || [],
    formik,
    locationSearch,
    locationSearchOpen,
    locationSearchLoading: locations.isFetching,
    setLocationSearch: setLocationSearch,
    setInputSearch,
    onAddLocation,
    onToggleOpen,
    onDeleteLocation
  };
};
