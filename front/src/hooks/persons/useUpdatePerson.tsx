import { useCallback } from 'react';
import { UseQueryResult, useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { Person } from '@types';
import { getPersonById, updatePerson } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';

interface UpdatePersonContext {
  loading: boolean;
  person: UseQueryResult<Person | null>;
  onSubmit: (values: Person) => void;
}

export const useUpdatePerson = (id: number | null): UpdatePersonContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

  const person = useQuery(
    [Client.GET_PERSON_BY_ID, id],
    () => id === null ? null : getPersonById(id)
  );

  const { mutateAsync } = useMutation(updatePerson, {
    onSuccess: (data: Person) => {
      queryClient.invalidateQueries(Client.GET_PERSONS);
      queryClient.setQueryData([Client.GET_PERSON_BY_ID, data.id], data);
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

  return {
    loading,
    person,
    onSubmit
  };
};
