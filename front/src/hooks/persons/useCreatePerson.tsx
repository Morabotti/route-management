import { useCallback } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { CreatePerson, Person } from '@types';
import { createPerson } from '@client';
import { Client, NotificationType } from '@enums';
import { useApplication } from '@hooks';

interface CreatePersonContext {
  loading: boolean;
  onSubmit: (values: CreatePerson) => void;
}

export const useCreatePerson = (): CreatePersonContext => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { loading, setLoading, createNotification } = useApplication();

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

  return {
    loading,
    onSubmit
  };
};
